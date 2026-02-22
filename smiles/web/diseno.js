import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, year } from '../widev.js';

const CACHE = 'wii_diseno';
let todos = [], filtrados = [], autenticado = !!getls('wiSmile');
const norm = s => (s||'').toLowerCase();
const toId = s => s.trim().toLowerCase().replace(/\s+/g,'');
const SKEL = Array(8).fill(`<div class="dis_skel"><div class="dis_skel_img shimmer"></div><div class="dis_skel_t shimmer"></div><div class="dis_skel_s shimmer"></div></div>`).join('');

export const render = () => `
  <div class="dis_wrap">
    <div class="dis_topbar">
      <h1 class="dis_titulo">Herramientas de <span class="dis_grad">Diseño IA</span></h1>
      <div class="dis_search_wrap">
        <i class="fas fa-search"></i>
        <input id="dis_search" type="text" placeholder="Buscar...">
        <button id="dis_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="dis_orden" class="dis_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="dis_refresh" class="dis_refresh_btn" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="dis_grid" id="dis_grid">${SKEL}</div>
    <div class="dis_empty" id="dis_empty" style="display:none">
      <i class="fas fa-palette"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalDiseno">
    <div class="modalBody dis_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="dis_modal_tit" id="dis_modal_tit"><i class="fas fa-palette"></i> Agregar Herramienta</h2>
      <form id="dis_form">
        <div class="dis_form_row">
          <div class="dis_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="dis_nombre" type="text" placeholder="Ej: Canva" required></div>
          <div class="dis_form_g"><label><i class="fas fa-key"></i> ID</label><input id="dis_id" type="text" placeholder="canva" required></div>
        </div>
        <div class="dis_form_g"><label><i class="fas fa-link"></i> URL</label><input id="dis_url" type="url" placeholder="https://..." required></div>
        <div class="dis_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="dis_img" type="url" placeholder="https://..."></div>
        <div class="dis_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="dis_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="dis_form_row">
          <div class="dis_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="dis_tags" type="text" placeholder="gratis, UI, branding"></div>
          <div class="dis_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="dis_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="dis_form_actions">
          <button type="button" id="dis_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="dis_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`;

export const init = () => {
  const traer = async (force = false) => {
    if (!force) { const cache = (getls(CACHE)||{}).data||[]; if (cache.length) { todos = cache; return aplicarOrden(); } }
    $('#dis_grid').html(SKEL);
    try {
      const snap = await getDocs(query(collection(db,'diseno'), orderBy('fecha','desc')));
      todos = snap.docs.map(d => ({id:d.id,...d.data()}));
      savels(CACHE, {data:todos}, 12); aplicarOrden();
    } catch(e) { console.error('❌',e); $('#dis_grid').html('<div class="dis_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>'); }
  };
  const actualizar = async () => {
    localStorage.removeItem(CACHE); todos = []; filtrados = [];
    wiSpin('#dis_refresh', true, ''); await traer(true);
    wiSpin('#dis_refresh', false, ''); $('#dis_refresh').html('<i class="fas fa-rotate-right"></i>');
    Notificacion('Actualizado ✓','success');
  };
  const aplicarOrden = () => {
    const ord = $('#dis_orden').val(), term = norm($('#dis_search').val().trim());
    const s = { fav:(a,b)=>(b.favorito|0)-(a.favorito|0), reciente:(a,b)=>(b.fecha?.seconds||0)-(a.fecha?.seconds||0), antiguo:(a,b)=>(a.fecha?.seconds||0)-(b.fecha?.seconds||0) };
    filtrados = [...todos].sort(s[ord]||s.fav);
    if (term) filtrados = filtrados.filter(x => [x.nombre, x.descripcion, ...(x.tags||[])].some(v => norm(v).includes(term)));
    renderizar(filtrados);
  };
  const renderizar = (lista) => {
    $('#dis_search').attr('placeholder', `Buscar en ${todos.length} herramientas...`);
    const $g = $('#dis_grid').empty();
    if (!lista.length && !autenticado) return $('#dis_empty').fadeIn(200);
    $('#dis_empty').hide();
    if (autenticado) $g.append(`<div class="dis_card dis_card_add" id="dis_agregar"><div class="dis_add_cnt"><div class="dis_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>`);
    if (!lista.length) return;
    lista.forEach((h,i) => $g.append(`
      <div class="dis_card" data-id="${h.id}" style="transition-delay:${Math.min(i*40,400)}ms">
        <div class="dis_card_img">
          <img src="${h.img||'/logo.webp'}" alt="${h.nombre}" loading="lazy">
          ${h.favorito ? '<div class="dis_fav_badge"><i class="fas fa-star"></i></div>' : ''}
          <div class="dis_over">
            <a href="${h.url}" target="_blank" rel="noopener" class="dis_over_btn" ${wiTip('Abrir')}><i class="fas fa-external-link-alt"></i></a>
            ${autenticado ? `<button class="dis_over_btn dis_edit" data-id="${h.id}" ${wiTip('Editar')}><i class="fas fa-edit"></i></button><button class="dis_over_btn dis_del" data-id="${h.id}" ${wiTip('Eliminar')}><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="dis_info"><h3>${h.nombre}</h3><p>${h.descripcion||''}</p>${h.tags?.length ? `<div class="dis_tags">${h.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join('')}</div>` : ''}</div>
      </div>`));
  };
  $('#dis_form').on('submit', async function(e) {
    e.preventDefault();
    const editId = $(this).data('editId');
    const docId  = editId || `${toId($('#dis_id').val())}_${Date.now()}`;
    const datos  = { nombre:$('#dis_nombre').val().trim(), url:$('#dis_url').val().trim(), img:$('#dis_img').val().trim(), descripcion:$('#dis_desc').val().trim(), tags:$('#dis_tags').val().split(',').map(t=>t.trim()).filter(Boolean), favorito:+$('#dis_fav').val(), autor:getls('wiSmile')?.usuario||'admin', fecha:serverTimestamp() };
    if (!datos.nombre||!datos.url) return Notificacion('Completa los campos','warning');
    wiSpin('#dis_save');
    try { await setDoc(doc(db,'diseno',docId), datos, {merge:true}); Notificacion(editId?'Actualizado ✓':'Guardado ✓','success'); cerrarModal('modalDiseno'); await traer(true); }
    catch { Notificacion('Error al guardar','error'); } finally { wiSpin('#dis_save', false); }
  });
  $(document).on('click','.dis_edit', function(e) {
    e.stopPropagation(); const p = todos.find(x => x.id===$(this).data('id')); if (!p) return;
    $('#dis_modal_tit').html('<i class="fas fa-edit"></i> Editar Herramienta');
    $('#dis_nombre').val(p.nombre); $('#dis_id').val(p.id).prop('readonly',true);
    $('#dis_url').val(p.url); $('#dis_img').val(p.img); $('#dis_desc').val(p.descripcion);
    $('#dis_tags').val((p.tags||[]).join(', ')); $('#dis_fav').val(p.favorito||0);
    $('#dis_form').data('editId',p.id); abrirModal('modalDiseno');
  });
  $(document).on('click','.dis_del', async function(e) {
    e.stopPropagation(); if (!confirm('¿Eliminar?')) return;
    try { await deleteDoc(doc(db,'diseno',$(this).data('id'))); Notificacion('Eliminada ✓','success'); await traer(true); }
    catch { Notificacion('Error al eliminar','error'); }
  });
  $(document).on('click','#dis_agregar', () => { $('#dis_form')[0].reset(); $('#dis_form').removeData('editId'); $('#dis_id').prop('readonly',false); $('#dis_modal_tit').html('<i class="fas fa-palette"></i> Agregar Herramienta'); abrirModal('modalDiseno'); });
  $('#dis_nombre').on('input', function() { if (!$('#dis_id').prop('readonly')) $('#dis_id').val(toId($(this).val())); });
  let to;
  $('#dis_search').on('input', function() { $('#dis_search_clr').toggle(!!$(this).val().trim()); clearTimeout(to); to = setTimeout(aplicarOrden, 220); });
  $('#dis_search_clr').on('click', () => $('#dis_search').val('').trigger('input').focus());
  $('#dis_cancel').on('click', () => cerrarModal('modalDiseno'));
  $('#dis_orden').on('change', aplicarOrden);
  $('#dis_refresh').on('click', actualizar);
  let ac = 0;
  $(document).on('click','.dis_titulo', () => { if (++ac >= 7) { autenticado = true; ac = 0; renderizar(filtrados); Notificacion('¡Dios te Ama! 🙏','success'); } });
  traer();
  console.log(`🎨 Diseño · ${year()}`);
};
export const cleanup = () => { autenticado = !!getls('wiSmile'); console.log('🧹 Diseño'); };