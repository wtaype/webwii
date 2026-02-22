import './modelo.css';
import $ from 'jquery';
import { db } from '../smile/firebase.js';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { wiSpin, wiTip, Notificacion, abrirModal, cerrarModal, getls, savels, wiVista, wicopy } from '../widev.js';

// ============================================================
// 🔧 HELPERS
// ============================================================
export const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export const toId = s => s.trim().toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,'');
export const SKEL = (n=6) => Array(n).fill(`
  <div class="mo_skel">
    <div class="mo_skel_top shimmer"></div>
    <div class="mo_skel_b">
      <div class="mo_skel_t shimmer"></div>
      <div class="mo_skel_s shimmer"></div>
      <div class="mo_skel_s mo_skel_s2 shimmer"></div>
    </div>
  </div>`).join('');

// ============================================================
// 🏗️ HTML COMPARTIDO
// ============================================================
export const renderTopbar = ({ p, titulo, grad }) => `
  <div class="${p}_topbar mo_topbar">
    <h1 class="${p}_titulo mo_titulo">${titulo} <span class="${p}_grad mo_grad">${grad}</span></h1>
    <div class="mo_ctrl">
      <div class="mo_search_wrap">
        <i class="fas fa-search"></i>
        <input id="${p}_search" type="text" placeholder="Buscar herramientas...">
        <button id="${p}_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="${p}_orden" class="mo_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="${p}_refresh" class="mo_refresh_btn" ${wiTip('Actualizar')}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>`;

export const cardAgregar = (p) => `
  <div class="mo_card mo_card_add" id="${p}_agregar">
    <div class="mo_add_cnt">
      <div class="mo_add_ico"><i class="fas fa-plus"></i></div>
      <h3>Agregar</h3><p>Nueva herramienta</p>
    </div>
  </div>`;

export const renderPrompts = (p, prompts = []) => !prompts?.length ? '' : `
  <div class="mo_prompts">
    <p class="mo_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
    ${prompts.map(pr => `
      <div class="mo_prompt_item">
        <span>${pr}</span>
        <button class="${p}_copy_btn mo_copy_btn" data-prompt="${(pr||'').replace(/"/g,'&quot;')}" title="Copiar">
          <i class="fas fa-copy"></i>
        </button>
      </div>`).join('')}
  </div>`;

export const renderModal = ({ p, icon, campos = [], extraRows = '' }) => `
  <div class="wiModal" id="mo_modal_${p}">
    <div class="modalBody mo_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="mo_modal_tit" id="${p}_modal_tit">
        <i class="fas fa-${icon}"></i> Agregar Herramienta
      </h2>
      <form id="${p}_form" autocomplete="off">

        <!-- Nombre + ID -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-heading"></i> Nombre</label>
            <input id="${p}_nombre" type="text" placeholder="ElevenLabs" required>
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-key"></i> ID único</label>
            <input id="${p}_id" type="text" placeholder="elevenlabs" required>
            <span class="mo_id_hint" id="${p}_id_hint"></span>
          </div>
        </div>

        <!-- Link -->
        <div class="mo_form_g">
          <label><i class="fas fa-link"></i> Link</label>
          <input id="${p}_link" type="url" placeholder="https://..." required>
        </div>

        <!-- Precio + Velocidad -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-tag"></i> Precio</label>
            <input id="${p}_precio" type="text" placeholder="💳 Desde $5/mes">
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-bolt"></i> Velocidad</label>
            <select id="${p}_vel">
              <option value="⚡ Rápido">⚡ Rápido</option>
              <option value="🚀 Muy rápido">🚀 Muy rápido</option>
              <option value="🐢 Moderado">🐢 Moderado</option>
              <option value="🐌 Lento">🐌 Lento</option>
            </select>
          </div>
        </div>

        <!-- Favorito + Imagen/Logo -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-star"></i> Favorito</label>
            <select id="${p}_fav">
              <option value="false">No</option>
              <option value="true">Sí ⭐</option>
            </select>
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-image"></i> Logo / Imagen URL</label>
            <input id="${p}_img" type="url" placeholder="https://sitio.com/logo.png">
          </div>
        </div>

        <!-- Campos extra opcionales -->
        ${campos.map(c => `
        <div class="mo_form_g">
          <label><i class="fas fa-${c.icon}"></i> ${c.label}</label>
          ${c.tipo === 'select'
            ? `<select id="${p}_${c.id}">${c.opts.map(o=>`<option value="${o.v}">${o.t}</option>`).join('')}</select>`
            : `<input id="${p}_${c.id}" type="${c.tipo||'text'}" placeholder="${c.ph||''}">`}
        </div>`).join('')}

        ${extraRows}

        <!-- Descripción -->
        <div class="mo_form_g">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea id="${p}_desc" placeholder="Describe la herramienta..." rows="3" required></textarea>
        </div>

        <!-- Prompts -->
        <div class="mo_form_g">
          <label><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</label>
          <div id="${p}_prompts_list" class="mo_prompts_edit"></div>
          <button type="button" class="mo_btn_add_prompt" data-p="${p}">
            <i class="fas fa-plus"></i> Añadir prompt
          </button>
        </div>

        <!-- Acciones -->
        <div class="mo_form_actions">
          <button type="button" class="mo_cancel" data-p="${p}">
            <i class="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" id="${p}_save">
            <i class="fas fa-save"></i> Guardar
          </button>
        </div>

      </form>
    </div>
  </div>`;

// ============================================================
// ⚙️ FACTORY — crearModelo
// ============================================================
export const crearModelo = ({
  p,
  coleccion,
  icon,
  campos      = [],
  extraDatos  = () => ({}),
  extraFields = () => ({}),
}) => {
  const CACHE = `wii_${p}`;
  let todos = [], filtrados = [], autenticado = !!getls('wiSmile');

  // — Prompts —
  const getPrompts   = () => $(`#${p}_prompts_list .mo_prompt_input`).map((_,el) => $(el).val().trim()).get().filter(Boolean);
  const addPromptRow = (val = '') => {
    const n = $(`#${p}_prompts_list .mo_prompt_row`).length + 1;
    $(`#${p}_prompts_list`).append(`
      <div class="mo_prompt_row">
        <span class="mo_prompt_num">${n}</span>
        <input type="text" class="mo_prompt_input" placeholder="Prompt ${n}..." value="${val}">
        <button type="button" class="mo_del_prompt"><i class="fas fa-times"></i></button>
      </div>`);
  };
  const initPrompts = (lista = []) => {
    $(`#${p}_prompts_list`).empty();
    (lista.length ? lista : ['','','']).forEach(addPromptRow);
  };

  // — checkId —
  const checkId = val => {
    const existe = todos.some(h => h.id === val && val !== $(`#${p}_form`).data('editId'));
    $(`#${p}_id_hint`)
      .text(val ? (existe ? '⚠️ Ya existe — se actualizará' : '✓ Disponible') : '')
      .attr('class', val ? `mo_id_hint ${existe ? 'mo_id_dup' : 'mo_id_ok'}` : 'mo_id_hint');
    $(`#${p}_id`).toggleClass('mo_input_dup', !!val && existe);
  };

  // — Abrir agregar —
  const abrirAgregar = () => {
    $(`#${p}_form`)[0].reset();
    $(`#${p}_form`).removeData('editId');
    $(`#${p}_id`).prop('readonly', false).removeClass('mo_input_dup');
    $(`#${p}_id_hint`).text('').attr('class','mo_id_hint');
    $(`#${p}_modal_tit`).html(`<i class="fas fa-${icon}"></i> Agregar Herramienta`);
    initPrompts();
    abrirModal(`mo_modal_${p}`);
  };

  // — Abrir editar —
  const abrirEditar = h => {
    const fields = {
      [`#${p}_nombre`]: h.nombre,
      [`#${p}_id`]:     h.id,
      [`#${p}_link`]:   h.link,
      [`#${p}_precio`]: h.precio,
      [`#${p}_vel`]:    h.velocidad || '⚡ Rápido',
      [`#${p}_img`]:    h.img || '',
      [`#${p}_desc`]:   h.descripcion,
    };
    Object.entries({ ...fields, ...extraFields(h) }).forEach(([sel, val]) => $(sel).val(val));
    $(`#${p}_fav`).val(String(!!h.favorito));
    $(`#${p}_id`).prop('readonly', true).removeClass('mo_input_dup');
    $(`#${p}_id_hint`).text('').attr('class','mo_id_hint');
    $(`#${p}_modal_tit`).html(`<i class="fas fa-edit"></i> Editar Herramienta`);
    initPrompts(h.prompts || []);
    $(`#${p}_form`).data('editId', h.id);
    abrirModal(`mo_modal_${p}`);
  };

  // ══════════════════════════════════════════
  // 🚀 INIT
  // ══════════════════════════════════════════
  const init = (renderCard) => {

    // — renderizar —
    const renderizar = () => {
      $(`#${p}_search`).attr('placeholder', `Buscar en ${todos.length} herramientas...`);
      const $g = $(`#${p}_grid`).empty();
      if (!filtrados.length && !autenticado) { $(`#${p}_empty`).fadeIn(200); return; }
      $(`#${p}_empty`).hide();
      if (autenticado) $g.append(cardAgregar(p));
      if (filtrados.length) {
        $g.append(filtrados.map(h => renderCard(h, autenticado)).join(''));
        wiVista(`.mo_card:not(.mo_card_add)`, null, { anim: 'wi_fadeUp', stagger: 80 });
      }
    };

    // — aplicar orden/filtro —
    const aplicar = () => {
      const ord  = $(`#${p}_orden`).val() || 'fav';
      const term = norm($(`#${p}_search`).val().trim());
      const S = {
        fav:      (a,b) => (b.favorito?1:0)-(a.favorito?1:0),
        reciente: (a,b) => (b.fechaCreado?.seconds||0)-(a.fechaCreado?.seconds||0),
        antiguo:  (a,b) => (a.fechaCreado?.seconds||0)-(b.fechaCreado?.seconds||0),
      };
      filtrados = [...todos].sort(S[ord]||S.fav);
      if (term) filtrados = filtrados.filter(h =>
        [h.nombre, h.descripcion, h.precio, h.velocidad, ...(h.prompts||[])].some(v => norm(v).includes(term))
      );
      renderizar();
    };

    // — traer de Firestore —
    const traer = async (force = false) => {
      if (!force) {
        const cache = (getls(CACHE)||{}).data||[];
        if (cache.length) { todos = cache; return aplicar(); }
      }
      $(`#${p}_grid`).html(SKEL());
      try {
        const snap = await getDocs(query(collection(db, coleccion), orderBy('fechaCreado','desc')));
        todos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        savels(CACHE, { data: todos }, 12);
        aplicar();
      } catch(e) {
        console.error(`❌ ${coleccion}:`, e);
        $(`#${p}_grid`).html(`<div class="mo_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>`);
      }
    };

    // — Guardar —
    $(document).on('submit', `#${p}_form`, async function(e) {
      e.preventDefault();
      const editId = $(this).data('editId');
      const rawId  = $(`#${p}_id`).val().trim();
      if (!rawId) return Notificacion('El ID es obligatorio','warning');
      const datos = {
        nombre:      $(`#${p}_nombre`).val().trim(),
        descripcion: $(`#${p}_desc`).val().trim(),
        precio:      $(`#${p}_precio`).val().trim(),
        velocidad:   $(`#${p}_vel`).val(),
        link:        $(`#${p}_link`).val().trim(),
        img:         $(`#${p}_img`).val().trim(),
        prompts:     getPrompts(),
        favorito:    $(`#${p}_fav`).val() === 'true',
        usuario:     getls('wiSmile')?.usuario || 'admin',
        ...extraDatos(),
        ...(editId ? { Actualizado: serverTimestamp() } : { fechaCreado: serverTimestamp() }),
      };
      if (!datos.nombre || !datos.link) return Notificacion('Completa nombre y link','warning');
      wiSpin(`#${p}_save`);
      try {
        await setDoc(doc(db, coleccion, editId || rawId), datos, { merge: true });
        Notificacion(editId ? 'Actualizado ✓' : 'Guardado ✓','success');
        cerrarModal(`mo_modal_${p}`);
        await traer(true);
      } catch(err) { console.error(err); Notificacion('Error al guardar','error'); }
      finally { wiSpin(`#${p}_save`, false); }
    });

    // — Agregar —
    $(document).on('click', `#${p}_agregar`, abrirAgregar);

    // — Editar —
    $(document).on('click', `.${p}_edit_btn`, function(e) {
      e.stopPropagation();
      const h = todos.find(x => x.id === $(this).data('id'));
      if (h) abrirEditar(h);
    });

    // — Eliminar —
    $(document).on('click', `.${p}_del_btn`, async function(e) {
      e.stopPropagation();
      if (!confirm(`¿Eliminar "${$(this).data('id')}"?`)) return;
      try {
        await deleteDoc(doc(db, coleccion, $(this).data('id')));
        Notificacion('Eliminada ✓','success');
        await traer(true);
      } catch { Notificacion('Error al eliminar','error'); }
    });

    // — ID automático —
    $(document).on('input', `#${p}_nombre`, function() {
      if ($(`#${p}_id`).prop('readonly')) return;
      const g = toId($(this).val());
      $(`#${p}_id`).val(g); checkId(g);
    });
    $(document).on('input', `#${p}_id`, function() { checkId($(this).val()); });

    // — Prompts —
    $(document).on('click', `.mo_btn_add_prompt[data-p="${p}"]`, () => addPromptRow());
    $(document).on('click', `#${p}_prompts_list .mo_del_prompt`, function() {
      $(this).closest('.mo_prompt_row').remove();
      $(`#${p}_prompts_list .mo_prompt_num`).each((i,el) => $(el).text(i+1));
    });

    // — Copiar prompt —
    $(document).on('click', `.${p}_copy_btn, .mo_prompt_item`, function(e) {
      // si click fue en el botón o dentro de él
      const $btn = $(this).hasClass('mo_copy_btn')
        ? $(this)
        : $(this).find('.mo_copy_btn');

      const texto = $(this).hasClass('mo_copy_btn')
        ? $(this).data('prompt')
        : $(this).find('.mo_copy_btn').data('prompt');

      if (!texto) return;

      wicopy(texto, $btn[0], '¡Copiado!');

      // feedback visual en icono
      $btn.html('<i class="fas fa-check"></i>');
      setTimeout(() => $btn.html('<i class="fas fa-copy"></i>'), 1500);
    });

    // — Cancelar modal —
    $(document).on('click', `.mo_cancel[data-p="${p}"]`, () => cerrarModal(`mo_modal_${p}`));

    // — Búsqueda —
    let to;
    $(document).on('input', `#${p}_search`, function() {
      $(`#${p}_search_clr`).toggle(!!$(this).val().trim());
      clearTimeout(to); to = setTimeout(aplicar, 220);
    });
    $(document).on('click', `#${p}_search_clr`, () => $(`#${p}_search`).val('').trigger('input').focus());
    $(document).on('change', `#${p}_orden`, aplicar);

    // — Refresh —
    $(document).on('click', `#${p}_refresh`, async () => {
      localStorage.removeItem(CACHE); todos = []; filtrados = [];
      wiSpin(`#${p}_refresh`, true, '');
      await traer(true);
      wiSpin(`#${p}_refresh`, false, '');
      $(`#${p}_refresh`).html('<i class="fas fa-rotate-right"></i>');
      Notificacion('Actualizado ✓','success');
    });

    // — Auth oculto 7 clicks —
    let ac = 0;
    $(document).on('click', `.${p}_titulo`, () => {
      if (++ac >= 7) { autenticado = true; ac = 0; renderizar(); Notificacion('¡Dios te Ama! 🙏','success'); }
    });

    traer();
  };

  // — Cleanup —
  const cleanup = () => {
    autenticado = !!getls('wiSmile');
    const sels = [
      `#${p}_agregar`, `.${p}_edit_btn`, `.${p}_del_btn`, `.${p}_copy_btn`,
      `.${p}_titulo`, `.mo_btn_add_prompt[data-p="${p}"]`,
      `#${p}_prompts_list .mo_del_prompt`, `.mo_cancel[data-p="${p}"]`,
      `#${p}_search`, `#${p}_search_clr`, `#${p}_orden`, `#${p}_refresh`,
      `#${p}_form`, `#${p}_nombre`, `#${p}_id`,
    ];
    sels.forEach(s => $(document).off('click submit input change', s));
  };

  return { init, cleanup };
};