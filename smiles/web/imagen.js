import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, year } from '../widev.js';

// ============================================================
// 📦 ESTADO
// ============================================================
const CACHE = 'wii_imagen';
let todos = [], filtrados = [], autenticado = !!getls('wiSmile');
const norm = s => (s||'').toLowerCase();
const toId = s => s.trim().toLowerCase().replace(/\s+/g,'');
const SKEL = Array(8).fill(`
  <div class="img_skel">
    <div class="img_skel_img shimmer"></div>
    <div class="img_skel_t shimmer"></div>
    <div class="img_skel_s shimmer"></div>
  </div>`).join('');

// ============================================================
// 🏗️ RENDER HTML
// ============================================================
export const render = () => `
  <div class="img_wrap">

    <div class="img_topbar">
      <h1 class="img_titulo">Herramientas de <span class="img_grad">Imagen IA</span></h1>
      <div class="img_search_wrap">
        <i class="fas fa-search"></i>
        <input id="img_search" type="text" placeholder="Buscar...">
        <button id="img_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="img_orden" class="img_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="img_refresh" class="img_refresh_btn" ${wiTip('Actualizar')}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>

    <div class="img_grid" id="img_grid">${SKEL}</div>

    <div class="img_empty" id="img_empty" style="display:none">
      <i class="fas fa-image"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>

  </div>

  <div class="wiModal" id="modalImagen">
    <div class="modalBody img_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="img_modal_tit" id="img_modal_tit"><i class="fas fa-image"></i> Agregar Herramienta</h2>
      <form id="img_form">
        <div class="img_form_row">
          <div class="img_form_g">
            <label><i class="fas fa-heading"></i> Nombre</label>
            <input id="img_nombre" type="text" placeholder="Ej: Ideogram" required>
          </div>
          <div class="img_form_g">
            <label><i class="fas fa-key"></i> ID</label>
            <input id="img_id" type="text" placeholder="ideogram" required>
          </div>
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-link"></i> URL de la herramienta</label>
          <input id="img_url" type="url" placeholder="https://..." required>
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-image"></i> URL imagen/logo</label>
          <input id="img_img" type="url" placeholder="https://...">
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea id="img_desc" placeholder="Describe la herramienta..." rows="3" required></textarea>
        </div>
        <div class="img_form_row">
          <div class="img_form_g">
            <label><i class="fas fa-tags"></i> Tags (coma separados)</label>
            <input id="img_tags" type="text" placeholder="gratis, arte, realista">
          </div>
          <div class="img_form_g">
            <label><i class="fas fa-star"></i> Favorito</label>
            <select id="img_fav">
              <option value="0">No</option>
              <option value="1">Sí ⭐</option>
            </select>
          </div>
        </div>
        <div class="img_form_actions">
          <button type="button" id="img_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="img_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>
`;

// ============================================================
// ⚙️ LÓGICA / INIT
// ============================================================
export const init = () => {

  // 🔄 FIREBASE — traer datos
  const traer = async (force = false) => {
    if (!force) {
      const cache = (getls(CACHE)||{}).data||[];
      if (cache.length) { todos = cache; return aplicarOrden(); }
    }
    $('#img_grid').html(SKEL);
    try {
      const snap = await getDocs(query(collection(db,'imagen'), orderBy('fecha','desc')));
      todos = snap.docs.map(d => ({id:d.id,...d.data()}));
      savels(CACHE, {data:todos}, 12);
      aplicarOrden();
    } catch(e) {
      console.error('❌',e);
      $('#img_grid').html('<div class="img_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>');
    }
  };

  // 🔃 ACTUALIZAR — limpia cache y recarga desde Firestore
  const actualizar = async () => {
    localStorage.removeItem(CACHE);
    todos = []; filtrados = [];
    wiSpin('#img_refresh', true, '');
    await traer(true);
    wiSpin('#img_refresh', false, '');
    $('#img_refresh').html('<i class="fas fa-rotate-right"></i>');
    Notificacion('Actualizado ✓','success');
  };

  // 📊 ORDEN + FILTRO
  const aplicarOrden = () => {
    const ord  = $('#img_orden').val();
    const term = norm($('#img_search').val().trim());
    const s    = {
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

  // 🃏 RENDERIZAR CARDS
  const renderizar = (lista) => {
    $('#img_search').attr('placeholder', `Buscar en ${todos.length} herramientas...`);
    const $g = $('#img_grid').empty();
    if (!lista.length && !autenticado) return $('#img_empty').fadeIn(200);
    $('#img_empty').hide();

    if (autenticado) $g.append(`
      <div class="img_card img_card_add" id="img_agregar">
        <div class="img_add_cnt">
          <div class="img_add_ico"><i class="fas fa-plus"></i></div>
          <h3>Agregar</h3><p>Nueva herramienta</p>
        </div>
      </div>`);

    if (!lista.length) return;

    lista.forEach((h,i) => $g.append(`
      <div class="img_card" data-id="${h.id}" style="transition-delay:${Math.min(i*40,400)}ms">
        <div class="img_card_img">
          <img src="${h.img||'/logo.webp'}" alt="${h.nombre}" loading="lazy">
          ${h.favorito ? '<div class="img_fav_badge"><i class="fas fa-star"></i></div>' : ''}
          <div class="img_over">
            <a href="${h.url}" target="_blank" rel="noopener" class="img_over_btn" ${wiTip('Abrir')}><i class="fas fa-external-link-alt"></i></a>
            ${autenticado ? `
            <button class="img_over_btn img_edit" data-id="${h.id}" ${wiTip('Editar')}><i class="fas fa-edit"></i></button>
            <button class="img_over_btn img_del"  data-id="${h.id}" ${wiTip('Eliminar')}><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="img_info">
          <h3>${h.nombre}</h3>
          <p>${h.descripcion||''}</p>
          ${h.tags?.length ? `<div class="img_tags">${h.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>`));
  };

  // 💾 GUARDAR (crear / editar)
  $('#img_form').on('submit', async function(e) {
    e.preventDefault();
    const editId = $(this).data('editId');
    const docId  = editId || `${toId($('#img_id').val())}_${Date.now()}`;
    const datos  = {
      nombre:      $('#img_nombre').val().trim(),
      url:         $('#img_url').val().trim(),
      img:         $('#img_img').val().trim(),
      descripcion: $('#img_desc').val().trim(),
      tags:        $('#img_tags').val().split(',').map(t=>t.trim()).filter(Boolean),
      favorito:    +$('#img_fav').val(),
      autor:       getls('wiSmile')?.usuario||'admin',
      fecha:       serverTimestamp(),
    };
    if (!datos.nombre||!datos.url) return Notificacion('Completa los campos','warning');
    wiSpin('#img_save');
    try {
      await setDoc(doc(db,'imagen',docId), datos, {merge:true});
      Notificacion(editId?'Actualizado ✓':'Guardado ✓','success');
      cerrarModal('modalImagen');
      await traer(true);
    } catch { Notificacion('Error al guardar','error'); }
    finally { wiSpin('#img_save', false); }
  });

  // 📝 EDITAR
  $(document).on('click','.img_edit', function(e) {
    e.stopPropagation();
    const p = todos.find(x => x.id===$(this).data('id'));
    if (!p) return;
    $('#img_modal_tit').html('<i class="fas fa-edit"></i> Editar Herramienta');
    $('#img_nombre').val(p.nombre);
    $('#img_id').val(p.id).prop('readonly',true);
    $('#img_url').val(p.url);
    $('#img_img').val(p.img);
    $('#img_desc').val(p.descripcion);
    $('#img_tags').val((p.tags||[]).join(', '));
    $('#img_fav').val(p.favorito||0);
    $('#img_form').data('editId',p.id);
    abrirModal('modalImagen');
  });

  // 🗑️ ELIMINAR
  $(document).on('click','.img_del', async function(e) {
    e.stopPropagation();
    if (!confirm('¿Eliminar?')) return;
    try {
      await deleteDoc(doc(db,'imagen',$(this).data('id')));
      Notificacion('Eliminada ✓','success');
      await traer(true);
    } catch { Notificacion('Error al eliminar','error'); }
  });

  // ➕ ABRIR MODAL AGREGAR
  $(document).on('click','#img_agregar', () => {
    $('#img_form')[0].reset();
    $('#img_form').removeData('editId');
    $('#img_id').prop('readonly',false);
    $('#img_modal_tit').html('<i class="fas fa-image"></i> Agregar Herramienta');
    abrirModal('modalImagen');
  });

  // 🔤 ID automático desde nombre
  $('#img_nombre').on('input', function() {
    if (!$('#img_id').prop('readonly')) $('#img_id').val(toId($(this).val()));
  });

  // 🔍 BÚSQUEDA
  let to;
  $('#img_search').on('input', function() {
    $('#img_search_clr').toggle(!!$(this).val().trim());
    clearTimeout(to); to = setTimeout(aplicarOrden, 220);
  });

  // 🎛️ EVENTOS GLOBALES
  $('#img_search_clr').on('click', () => $('#img_search').val('').trigger('input').focus());
  $('#img_cancel').on('click',     () => cerrarModal('modalImagen'));
  $('#img_orden').on('change',     aplicarOrden);
  $('#img_refresh').on('click',    actualizar);

  // 🔑 AUTH — 7 clicks en título
  let ac = 0;
  $(document).on('click','.img_titulo', () => {
    if (++ac >= 7) { autenticado = true; ac = 0; renderizar(filtrados); Notificacion('¡Dios te Ama! 🙏','success'); }
  });

  traer();
  console.log(`🖼️ Imagen · ${year()}`);
};

export const cleanup = () => { autenticado = !!getls('wiSmile'); console.log('🧹 Imagen'); };