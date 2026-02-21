import './ideas.css';
import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, year } from '../widev.js';

const CACHE = 'wii_ideas';
let todos = [], filtrados = [], autenticado = !!getls('wiSmile');
const norm = s => (s||'').toLowerCase();
const toId = s => s.trim().toLowerCase().replace(/\s+/g,'');
const SKEL = Array(8).fill(`<div class="ide_skel"><div class="ide_skel_img shimmer"></div><div class="ide_skel_t shimmer"></div><div class="ide_skel_s shimmer"></div></div>`).join('');

export const render = () => `
  <div class="ide_wrap">
    <div class="ide_topbar">
      <h1 class="ide_titulo">Herramientas de <span class="ide_grad">Ideas IA</span></h1>
      <div class="ide_search_wrap">
        <i class="fas fa-search"></i>
        <input id="ide_search" type="text" placeholder="Buscar...">
        <button id="ide_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="ide_orden" class="ide_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="ide_refresh" class="ide_refresh_btn" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="ide_grid" id="ide_grid">${SKEL}</div>
    <div class="ide_empty" id="ide_empty" style="display:none">
      <i class="fas fa-lightbulb"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalIdeas">
    <div class="modalBody ide_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="ide_modal_tit" id="ide_modal_tit"><i class="fas fa-lightbulb"></i> Agregar Herramienta</h2>
      <form id="ide_form">
        <div class="ide_form_row">
          <div class="ide_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="ide_nombre" type="text" placeholder="Ej: ChatGPT" required></div>
          <div class="ide_form_g"><label><i class="fas fa-key"></i> ID</label><input id="ide_id" type="text" placeholder="chatgpt" required></div>
        </div>
        <div class="ide_form_g"><label><i class="fas fa-link"></i> URL</label><input id="ide_url" type="url" placeholder="https://..." required></div>
        <div class="ide_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="ide_img" type="url" placeholder="https://..."></div>
        <div class="ide_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="ide_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="ide_form_row">
          <div class="ide_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="ide_tags" type="text" placeholder="gratis, brainstorm, creativo"></div>
          <div class="ide_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="ide_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="ide_form_actions">
          <button type="button" id="ide_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="ide_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`;

export const init = () => {
  const traer = async (force = false) => {
    if (!force) { const cache = (getls(CACHE)||{}).data||[]; if (cache.length) { todos = cache; return aplicarOrden(); } }
    $('#ide_grid').html(SKEL);
    try {
      const snap = await getDocs(query(collection(db,'ideas'), orderBy('fecha','desc')));
      todos = snap.docs.map(d => ({id:d.id,...d.data()}));
      savels(CACHE, {data:todos}, 12); aplicarOrden();
    } catch(e) { console.error('❌',e); $('#ide_grid').html('<div class="ide_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>'); }
  };
  const actualizar = async () => {
    localStorage.removeItem(CACHE); todos = []; filtrados = [];
    wiSpin('#ide_refresh', true, ''); await traer(true);
    wiSpin('#ide_refresh', false, ''); $('#ide_refresh').html('<i class="fas fa-rotate-right"></i>');
    Notificacion('Actualizado ✓','success');
  };
  const aplicarOrden = () => {
    const ord = $('#ide_orden').val(), term = norm($('#ide_search').val().trim());
    const s = { fav:(a,b)=>(b.favorito|0)-(a.favorito|0), reciente:(a,b)=>(b.fecha?.seconds||0)-(a.fecha?.seconds||0), antiguo:(a,b)=>(a.fecha?.seconds||0)-(b.fecha?.seconds||0) };
    filtrados = [...todos].sort(s[ord]||s.fav);
    if (term) filtrados = filtrados.filter(x => [x.nombre, x.descripcion, ...(x.tags||[])].some(v => norm(v).includes(term)));
    renderizar(filtrados);
  };
  const renderizar = (lista) => {
    $('#ide_search').attr('placeholder', `Buscar en ${todos.length} herramientas...`);
    const $g = $('#ide_grid').empty();
    if (!lista.length && !autenticado) return $('#ide_empty').fadeIn(200);
    $('#ide_empty').hide();
    if (autenticado) $g.append(`<div class="ide_card ide_card_add" id="ide_agregar"><div class="ide_add_cnt"><div class="ide_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>`);
    if (!lista.length) return;
    lista.forEach((h,i) => $g.append(`
      <div class="ide_card" data-id="${h.id}" style="transition-delay:${Math.min(i*40,400)}ms">
        <div class="ide_card_img">
          <img src="${h.img||'/logo.webp'}" alt="${h.nombre}" loading="lazy">
          ${h.favorito ? '<div class="ide_fav_badge"><i class="fas fa-star"></i></div>' : ''}
          <div class="ide_over">
            <a href="${h.url}" target="_blank" rel="noopener" class="ide_over_btn" ${wiTip('Abrir')}><i class="fas fa-external-link-alt"></i></a>
            ${autenticado ? `<button class="ide_over_btn ide_edit" data-id="${h.id}" ${wiTip('Editar')}><i class="fas fa-edit"></i></button><button class="ide_over_btn ide_del" data-id="${h.id}" ${wiTip('Eliminar')}><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="ide_info"><h3>${h.nombre}</h3><p>${h.descripcion||''}</p>${h.tags?.length ? `<div class="ide_tags">${h.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join('')}</div>` : ''}</div>
      </div>`));
  };
  $('#ide_form').on('submit', async function(e) {
    e.preventDefault();
    const editId = $(this).data('editId');
    const docId  = editId || `${toId($('#ide_id').val())}_${Date.now()}`;
    const datos  = { nombre:$('#ide_nombre').val().trim(), url:$('#ide_url').val().trim(), img:$('#ide_img').val().trim(), descripcion:$('#ide_desc').val().trim(), tags:$('#ide_tags').val().split(',').map(t=>t.trim()).filter(Boolean), favorito:+$('#ide_fav').val(), autor:getls('wiSmile')?.usuario||'admin', fecha:serverTimestamp() };
    if (!datos.nombre||!datos.url) return Notificacion('Completa los campos','warning');
    wiSpin('#ide_save');
    try { await setDoc(doc(db,'ideas',docId), datos, {merge:true}); Notificacion(editId?'Actualizado ✓':'Guardado ✓','success'); cerrarModal('modalIdeas'); await traer(true); }
    catch { Notificacion('Error al guardar','error'); } finally { wiSpin('#ide_save', false); }
  });
  $(document).on('click','.ide_edit', function(e) {
    e.stopPropagation(); const p = todos.find(x => x.id===$(this).data('id')); if (!p) return;
    $('#ide_modal_tit').html('<i class="fas fa-edit"></i> Editar Herramienta');
    $('#ide_nombre').val(p.nombre); $('#ide_id').val(p.id).prop('readonly',true);
    $('#ide_url').val(p.url); $('#ide_img').val(p.img); $('#ide_desc').val(p.descripcion);
    $('#ide_tags').val((p.tags||[]).join(', ')); $('#ide_fav').val(p.favorito||0);
    $('#ide_form').data('editId',p.id); abrirModal('modalIdeas');
  });
  $(document).on('click','.ide_del', async function(e) {
    e.stopPropagation(); if (!confirm('¿Eliminar?')) return;
    try { await deleteDoc(doc(db,'ideas',$(this).data('id'))); Notificacion('Eliminada ✓','success'); await traer(true); }
    catch { Notificacion('Error al eliminar','error'); }
  });
  $(document).on('click','#ide_agregar', () => { $('#ide_form')[0].reset(); $('#ide_form').removeData('editId'); $('#ide_id').prop('readonly',false); $('#ide_modal_tit').html('<i class="fas fa-lightbulb"></i> Agregar Herramienta'); abrirModal('modalIdeas'); });
  $('#ide_nombre').on('input', function() { if (!$('#ide_id').prop('readonly')) $('#ide_id').val(toId($(this).val())); });
  let to;
  $('#ide_search').on('input', function() { $('#ide_search_clr').toggle(!!$(this).val().trim()); clearTimeout(to); to = setTimeout(aplicarOrden, 220); });
  $('#ide_search_clr').on('click', () => $('#ide_search').val('').trigger('input').focus());
  $('#ide_cancel').on('click', () => cerrarModal('modalIdeas'));
  $('#ide_orden').on('change', aplicarOrden);
  $('#ide_refresh').on('click', actualizar);
  let ac = 0;
  $(document).on('click','.ide_titulo', () => { if (++ac >= 7) { autenticado = true; ac = 0; renderizar(filtrados); Notificacion('¡Dios te Ama! 🙏','success'); } });
  traer();
  console.log(`💡 Ideas · ${year()}`);
};
export const cleanup = () => { autenticado = !!getls('wiSmile'); console.log('🧹 Ideas'); };