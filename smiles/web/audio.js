import './audio.css';
import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, year } from '../widev.js';

const CACHE = 'wii_audio';
let todos = [], filtrados = [], autenticado = !!getls('wiSmile');
const norm = s => (s||'').toLowerCase();
const toId = s => s.trim().toLowerCase().replace(/\s+/g,'');
const SKEL = Array(8).fill(`<div class="aud_skel"><div class="aud_skel_img shimmer"></div><div class="aud_skel_t shimmer"></div><div class="aud_skel_s shimmer"></div></div>`).join('');

export const render = () => `
  <div class="aud_wrap">
    <div class="aud_topbar">
      <h1 class="aud_titulo">Herramientas de <span class="aud_grad">Audio IA</span></h1>
      <div class="aud_search_wrap">
        <i class="fas fa-search"></i>
        <input id="aud_search" type="text" placeholder="Buscar...">
        <button id="aud_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="aud_orden" class="aud_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="aud_refresh" class="aud_refresh_btn" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="aud_grid" id="aud_grid">${SKEL}</div>
    <div class="aud_empty" id="aud_empty" style="display:none">
      <i class="fas fa-headphones"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalAudio">
    <div class="modalBody aud_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="aud_modal_tit" id="aud_modal_tit"><i class="fas fa-headphones"></i> Agregar Herramienta</h2>
      <form id="aud_form">
        <div class="aud_form_row">
          <div class="aud_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="aud_nombre" type="text" placeholder="Ej: ElevenLabs" required></div>
          <div class="aud_form_g"><label><i class="fas fa-key"></i> ID</label><input id="aud_id" type="text" placeholder="elevenlabs" required></div>
        </div>
        <div class="aud_form_g"><label><i class="fas fa-link"></i> URL</label><input id="aud_url" type="url" placeholder="https://..." required></div>
        <div class="aud_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="aud_img" type="url" placeholder="https://..."></div>
        <div class="aud_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="aud_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="aud_form_row">
          <div class="aud_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="aud_tags" type="text" placeholder="voz, música, gratis"></div>
          <div class="aud_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="aud_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="aud_form_actions">
          <button type="button" id="aud_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="aud_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`;

export const init = () => {
  const traer = async (force = false) => {
    if (!force) { const cache = (getls(CACHE)||{}).data||[]; if (cache.length) { todos = cache; return aplicarOrden(); } }
    $('#aud_grid').html(SKEL);
    try {
      const snap = await getDocs(query(collection(db,'audio'), orderBy('fecha','desc')));
      todos = snap.docs.map(d => ({id:d.id,...d.data()}));
      savels(CACHE, {data:todos}, 12); aplicarOrden();
    } catch(e) { console.error('❌',e); $('#aud_grid').html('<div class="aud_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>'); }
  };
  const actualizar = async () => {
    localStorage.removeItem(CACHE); todos = []; filtrados = [];
    wiSpin('#aud_refresh', true, ''); await traer(true);
    wiSpin('#aud_refresh', false, ''); $('#aud_refresh').html('<i class="fas fa-rotate-right"></i>');
    Notificacion('Actualizado ✓','success');
  };
  const aplicarOrden = () => {
    const ord = $('#aud_orden').val(), term = norm($('#aud_search').val().trim());
    const s = { fav:(a,b)=>(b.favorito|0)-(a.favorito|0), reciente:(a,b)=>(b.fecha?.seconds||0)-(a.fecha?.seconds||0), antiguo:(a,b)=>(a.fecha?.seconds||0)-(b.fecha?.seconds||0) };
    filtrados = [...todos].sort(s[ord]||s.fav);
    if (term) filtrados = filtrados.filter(x => [x.nombre, x.descripcion, ...(x.tags||[])].some(v => norm(v).includes(term)));
    renderizar(filtrados);
  };
  const renderizar = (lista) => {
    $('#aud_search').attr('placeholder', `Buscar en ${todos.length} herramientas...`);
    const $g = $('#aud_grid').empty();
    if (!lista.length && !autenticado) return $('#aud_empty').fadeIn(200);
    $('#aud_empty').hide();
    if (autenticado) $g.append(`<div class="aud_card aud_card_add" id="aud_agregar"><div class="aud_add_cnt"><div class="aud_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>`);
    if (!lista.length) return;
    lista.forEach((h,i) => $g.append(`
      <div class="aud_card" data-id="${h.id}" style="transition-delay:${Math.min(i*40,400)}ms">
        <div class="aud_card_img">
          <img src="${h.img||'/logo.webp'}" alt="${h.nombre}" loading="lazy">
          ${h.favorito ? '<div class="aud_fav_badge"><i class="fas fa-star"></i></div>' : ''}
          <div class="aud_over">
            <a href="${h.url}" target="_blank" rel="noopener" class="aud_over_btn" ${wiTip('Abrir')}><i class="fas fa-external-link-alt"></i></a>
            ${autenticado ? `<button class="aud_over_btn aud_edit" data-id="${h.id}" ${wiTip('Editar')}><i class="fas fa-edit"></i></button><button class="aud_over_btn aud_del" data-id="${h.id}" ${wiTip('Eliminar')}><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="aud_info"><h3>${h.nombre}</h3><p>${h.descripcion||''}</p>${h.tags?.length ? `<div class="aud_tags">${h.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join('')}</div>` : ''}</div>
      </div>`));
  };
  $('#aud_form').on('submit', async function(e) {
    e.preventDefault();
    const editId = $(this).data('editId');
    const docId  = editId || `${toId($('#aud_id').val())}_${Date.now()}`;
    const datos  = { nombre:$('#aud_nombre').val().trim(), url:$('#aud_url').val().trim(), img:$('#aud_img').val().trim(), descripcion:$('#aud_desc').val().trim(), tags:$('#aud_tags').val().split(',').map(t=>t.trim()).filter(Boolean), favorito:+$('#aud_fav').val(), autor:getls('wiSmile')?.usuario||'admin', fecha:serverTimestamp() };
    if (!datos.nombre||!datos.url) return Notificacion('Completa los campos','warning');
    wiSpin('#aud_save');
    try { await setDoc(doc(db,'audio',docId), datos, {merge:true}); Notificacion(editId?'Actualizado ✓':'Guardado ✓','success'); cerrarModal('modalAudio'); await traer(true); }
    catch { Notificacion('Error al guardar','error'); } finally { wiSpin('#aud_save', false); }
  });
  $(document).on('click','.aud_edit', function(e) {
    e.stopPropagation(); const p = todos.find(x => x.id===$(this).data('id')); if (!p) return;
    $('#aud_modal_tit').html('<i class="fas fa-edit"></i> Editar Herramienta');
    $('#aud_nombre').val(p.nombre); $('#aud_id').val(p.id).prop('readonly',true);
    $('#aud_url').val(p.url); $('#aud_img').val(p.img); $('#aud_desc').val(p.descripcion);
    $('#aud_tags').val((p.tags||[]).join(', ')); $('#aud_fav').val(p.favorito||0);
    $('#aud_form').data('editId',p.id); abrirModal('modalAudio');
  });
  $(document).on('click','.aud_del', async function(e) {
    e.stopPropagation(); if (!confirm('¿Eliminar?')) return;
    try { await deleteDoc(doc(db,'audio',$(this).data('id'))); Notificacion('Eliminada ✓','success'); await traer(true); }
    catch { Notificacion('Error al eliminar','error'); }
  });
  $(document).on('click','#aud_agregar', () => { $('#aud_form')[0].reset(); $('#aud_form').removeData('editId'); $('#aud_id').prop('readonly',false); $('#aud_modal_tit').html('<i class="fas fa-headphones"></i> Agregar Herramienta'); abrirModal('modalAudio'); });
  $('#aud_nombre').on('input', function() { if (!$('#aud_id').prop('readonly')) $('#aud_id').val(toId($(this).val())); });
  let to;
  $('#aud_search').on('input', function() { $('#aud_search_clr').toggle(!!$(this).val().trim()); clearTimeout(to); to = setTimeout(aplicarOrden, 220); });
  $('#aud_search_clr').on('click', () => $('#aud_search').val('').trigger('input').focus());
  $('#aud_cancel').on('click', () => cerrarModal('modalAudio'));
  $('#aud_orden').on('change', aplicarOrden);
  $('#aud_refresh').on('click', actualizar);
  let ac = 0;
  $(document).on('click','.aud_titulo', () => { if (++ac >= 7) { autenticado = true; ac = 0; renderizar(filtrados); Notificacion('¡Dios te Ama! 🙏','success'); } });
  traer();
  console.log(`🎵 Audio · ${year()}`);
};
export const cleanup = () => { autenticado = !!getls('wiSmile'); console.log('🧹 Audio'); };