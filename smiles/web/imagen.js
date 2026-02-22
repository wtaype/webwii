import { crearModelo, renderTopbar, renderModal } from './modelo.js';

// 📦 PREFIJO + MODELO
const P = 'img';
const modelo = crearModelo({ p: P, coleccion: 'imagen', icon: 'image' });

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
        <i class="fas fa-image" style="${h.img ? 'display:none' : ''}"></i>
      </div>

      <h3 class="mo_nombre ${P}_titulo">${h.nombre}</h3>
      <span class="mo_precio">${h.precio || ''}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${h.descripcion || ''}</p>
      ${h.prompts?.length ? `
        <div class="mo_prompts">
          <p class="mo_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
          ${h.prompts.map(pr => `
            <div class="mo_prompt_item">
              <span>${pr}</span>
              <button class="${P}_copy_btn mo_copy_btn" data-prompt="${(pr||'').replace(/"/g,'&quot;')}" title="Copiar">
                <i class="fas fa-copy"></i>
              </button>
            </div>`).join('')}
        </div>` : ''}
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
    ${renderTopbar({ p: P, titulo: 'Imágenes con', grad: 'Inteligencia Artificial' })}
    <div class="mo_grid" id="${P}_grid"></div>
    <div class="mo_empty" id="${P}_empty" style="display:none">
      <i class="fas fa-image"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${renderModal({ p: P, icon: 'image' })}`;

// ⚙️ INIT / CLEANUP
export const init    = () => { modelo.init(cardHtml); console.log('🖼️ Imagen IA · 2026'); };
export const cleanup = () => { modelo.cleanup();      console.log('🧹 Imagen'); };