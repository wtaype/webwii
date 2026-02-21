import './video.css';
import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, year } from '../widev.js';

const CACHE = 'wii_video';
let todos = [], filtrados = [], autenticado = !!getls('wiSmile');
const norm = s => (s||'').toLowerCase();
const toId = s => s.trim().toLowerCase().replace(/\s+/g,'');
const SKEL = Array(8).fill(`
  <div class="vid_skel">
    <div class="vid_skel_img shimmer"></div>
    <div class="vid_skel_t shimmer"></div>
    <div class="vid_skel_s shimmer"></div>
  </div>`).join('');

export const render = () => `
  <div class="vid_wrap">
    <div class="vid_topbar">
      <h1 class="vid_titulo">Herramientas de <span class="vid_grad">Video IA</span></h1>
      <div class="vid_search_wrap">
        <i class="fas fa-search"></i>
        <input id="vid_search" type="text" placeholder="Buscar...">
        <button id="vid_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="vid_orden" class="vid_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="vid_refresh" class="vid_refresh_btn" ${wiTip('Actualizar')}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
    <div class="vid_grid" id="vid_grid">${SKEL}</div>
    <div class="vid_empty" id="vid_empty" style="display:none">
      <i class="fas fa-film"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalVideo">
    <div class="modalBody vid_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="vid_modal_tit" id="vid_modal_tit"><i class="fas fa-film"></i> Agregar Herramienta</h2>
      <form id="vid_form">
        <div class="vid_form_row">
          <div class="vid_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="vid_nombre" type="text" placeholder="Ej: Runway" required></div>
          <div class="vid_form_g"><label><i class="fas fa-key"></i> ID</label><input id="vid_id" type="text" placeholder="runway" required></div>
        </div>
        <div class="vid_form_g"><label><i class="fas fa-link"></i> URL de la herramienta</label><input id="vid_url" type="url" placeholder="https://..." required></div>
        <div class="vid_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="vid_img" type="url" placeholder="https://..."></div>
        <div class="vid_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="vid_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="vid_form_row">
          <div class="vid_form_g"><label><i class="fas fa-tags"></i> Tags (coma separados)</label><input id="vid_tags" type="text" placeholder="gratis, texto a video, HD"></div>
          <div class="vid_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="vid_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="vid_form_actions">
          <button type="button" id="vid_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="vid_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`;

export const init = () => {
  const traer = async (force = false) => {
    if (!force) {
      const cache = (getls(CACHE)||{}).data||[];
      if (cache.length) { todos = cache; return aplicarOrden(); }
    }
    $('#vid_grid').html(SKEL);
    try {
      const snap = await getDocs(query(collection(db,'video'), orderBy('fecha','desc')));
      todos = snap.docs.map(d => ({id:d.id,...d.data()}));
      savels(CACHE, {data:todos}, 12);
      aplicarOrden();
    } catch(e) {
      console.error('❌',e);
      $('#vid_grid').html('<div class="vid_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>');
    }
  };

  const actualizar = async () => {
    localStorage.removeItem(CACHE); todos = []; filtrados = [];
    wiSpin('#vid_refresh', true, '');
    await traer(true);
    wiSpin('#vid_refresh', false, '');
    $('#vid_refresh').html('<i class="fas fa-rotate-right"></i>');
    Notificacion('Actualizado ✓','success');
  };

  const aplicarOrden = () => {
    const ord = $('#vid_orden').val();
    const term = norm($('#vid_search').val().trim());
    const s = {
      fav:     (a,b) => (b.favorito|0)-(a.favorito|0),
      reciente:(a,b) => (b.fecha?.seconds||0)-(a.fecha?.seconds||0),
      antiguo: (a,b) => (a.fecha?.seconds||0)-(b.fecha?.seconds||0),
    };
    filtrados = [...todos].sort(s[ord]||s.fav);
    if (term) filtrados = filtrados.filter(x =>
      [x.nombre, x.descripcion, ...(x.tags||[])].some(v => norm(v).includes(term))
    );
    renderizar(filtrados);
  };

  const renderizar = (lista) => {
    $('#vid_search').attr('placeholder', `Buscar en ${todos.length} herramientas...`);
    const $g = $('#vid_grid').empty();
    if (!lista.length && !autenticado) return $('#vid_empty').fadeIn(200);
    $('#vid_empty').hide();
    if (autenticado) $g.append(`
      <div class="vid_card vid_card_add" id="vid_agregar">
        <div class="vid_add_cnt">
          <div class="vid_add_ico"><i class="fas fa-plus"></i></div>
          <h3>Agregar</h3><p>Nueva herramienta</p>
        </div>
      </div>`);
    if (!lista.length) return;
    lista.forEach((h,i) => $g.append(`
      <div class="vid_card" data-id="${h.id}" style="transition-delay:${Math.min(i*40,400)}ms">
        <div class="vid_card_img">
          <img src="${h.img||'/logo.webp'}" alt="${h.nombre}" loading="lazy">
          ${h.favorito ? '<div class="vid_fav_badge"><i class="fas fa-star"></i></div>' : ''}
          <div class="vid_over">
            <a href="${h.url}" target="_blank" rel="noopener" class="vid_over_btn" ${wiTip('Abrir')}><i class="fas fa-external-link-alt"></i></a>
            ${autenticado ? `
            <button class="vid_over_btn vid_edit" data-id="${h.id}" ${wiTip('Editar')}><i class="fas fa-edit"></i></button>
            <button class="vid_over_btn vid_del"  data-id="${h.id}" ${wiTip('Eliminar')}><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="vid_info">
          <h3>${h.nombre}</h3>
          <p>${h.descripcion||''}</p>
          ${h.tags?.length ? `<div class="vid_tags">${h.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>`));
  };

  $('#vid_form').on('submit', async function(e) {
    e.preventDefault();
    const editId = $(this).data('editId');
    const docId  = editId || `${toId($('#vid_id').val())}_${Date.now()}`;
    const datos  = {
      nombre: $('#vid_nombre').val().trim(), url: $('#vid_url').val().trim(),
      img: $('#vid_img').val().trim(), descripcion: $('#vid_desc').val().trim(),
      tags: $('#vid_tags').val().split(',').map(t=>t.trim()).filter(Boolean),
      favorito: +$('#vid_fav').val(), autor: getls('wiSmile')?.usuario||'admin',
      fecha: serverTimestamp(),
    };
    if (!datos.nombre||!datos.url) return Notificacion('Completa los campos','warning');
    wiSpin('#vid_save');
    try {
      await setDoc(doc(db,'video',docId), datos, {merge:true});
      Notificacion(editId?'Actualizado ✓':'Guardado ✓','success');
      cerrarModal('modalVideo'); await traer(true);
    } catch { Notificacion('Error al guardar','error'); }
    finally { wiSpin('#vid_save', false); }
  });

  $(document).on('click','.vid_edit', function(e) {
    e.stopPropagation();
    const p = todos.find(x => x.id===$(this).data('id')); if (!p) return;
    $('#vid_modal_tit').html('<i class="fas fa-edit"></i> Editar Herramienta');
    $('#vid_nombre').val(p.nombre); $('#vid_id').val(p.id).prop('readonly',true);
    $('#vid_url').val(p.url); $('#vid_img').val(p.img);
    $('#vid_desc').val(p.descripcion); $('#vid_tags').val((p.tags||[]).join(', '));
    $('#vid_fav').val(p.favorito||0); $('#vid_form').data('editId',p.id);
    abrirModal('modalVideo');
  });

  $(document).on('click','.vid_del', async function(e) {
    e.stopPropagation();
    if (!confirm('¿Eliminar?')) return;
    try {
      await deleteDoc(doc(db,'video',$(this).data('id')));
      Notificacion('Eliminada ✓','success'); await traer(true);
    } catch { Notificacion('Error al eliminar','error'); }
  });

  $(document).on('click','#vid_agregar', () => {
    $('#vid_form')[0].reset(); $('#vid_form').removeData('editId');
    $('#vid_id').prop('readonly',false);
    $('#vid_modal_tit').html('<i class="fas fa-film"></i> Agregar Herramienta');
    abrirModal('modalVideo');
  });

  $('#vid_nombre').on('input', function() {
    if (!$('#vid_id').prop('readonly')) $('#vid_id').val(toId($(this).val()));
  });

  let to;
  $('#vid_search').on('input', function() {
    $('#vid_search_clr').toggle(!!$(this).val().trim());
    clearTimeout(to); to = setTimeout(aplicarOrden, 220);
  });

  $('#vid_search_clr').on('click', () => $('#vid_search').val('').trigger('input').focus());
  $('#vid_cancel').on('click', () => cerrarModal('modalVideo'));
  $('#vid_orden').on('change', aplicarOrden);
  $('#vid_refresh').on('click', actualizar);

  let ac = 0;
  $(document).on('click','.vid_titulo', () => {
    if (++ac >= 7) { autenticado = true; ac = 0; renderizar(filtrados); Notificacion('¡Dios te Ama! 🙏','success'); }
  });

  traer();
  console.log(`🎬 Video · ${year()}`);
};

export const cleanup = () => { autenticado = !!getls('wiSmile'); console.log('🧹 Video'); };