import { crearModelo, renderTopbar, renderPrompts, renderModal } from './modelo.js';

// 📦 PREFIJO + MODELO
const P = 'esc';
const modelo = crearModelo({ p: P, coleccion: 'escritura', icon: 'pen-nib' });

// 🃏 CARD
const cardHtml = (h, auth) => `
  <div class="mo_card wi_fadeUp" data-id="${h.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${h.velocidad || '⚡ Rápido'}</span>
      ${h.favorito ? '<span class="mo_fav"><i class="fas fa-star"></i></span>' : ''}

      <div class="mo_icon_wrap">
        ${h.img
          ? `<img src="${h.img}" alt="${h.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <i class="fas fa-pen-nib" style="${h.img ? 'display:none' : ''}"></i>
      </div>

      <h3 class="mo_nombre ${P}_titulo">${h.nombre}</h3>
      <span class="mo_precio">${h.precio || ''}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${h.descripcion || ''}</p>
      ${renderPrompts(P, h.prompts)}
    </div>

    <div class="mo_foot">
      ${auth ? `
      <div class="mo_foot_admin">
        <button class="${P}_edit_btn mo_edit_btn" data-id="${h.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${P}_del_btn mo_del_btn" data-id="${h.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>` : ''}
      <a href="${h.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`;

// 🏗️ RENDER
export const render = () => `
  <div class="mo_wrap">
    ${renderTopbar({ p: P, titulo: 'Escritura con', grad: 'Inteligencia Artificial' })}
    <div class="mo_grid" id="${P}_grid"></div>
    <div class="mo_empty" id="${P}_empty" style="display:none">
      <i class="fas fa-pen-nib"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${renderModal({ p: P, icon: 'pen-nib' })}`;

// ⚙️ INIT / CLEANUP
export const init    = () => { modelo.init(cardHtml); console.log('✍️ Escritura IA · 2026'); };
export const cleanup = () => { modelo.cleanup();      console.log('🧹 Escritura'); };