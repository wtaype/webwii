import{renderTopbar as n,renderModal as e,crearModelo as l}from"./modelo-BFcgB9WJ.js";import"./vendor-gzd0YkcT.js";import"./firebase-Dh67YOPY.js";import"./main-CML6jtkv.js";import"./main-DQHh3IIT.js";import"./firebase-C69Prz-Z.js";const i="img",o=l({p:i,coleccion:"imagen",icon:"image"}),d=(a,t)=>`
  <div class="mo_card wi_fadeUp" data-id="${a.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${a.velocidad||"⚡ Rápido"}</span>
      ${a.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${a.img?`<img src="${a.img}" alt="${a.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-image" style="${a.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${i}_titulo">${a.nombre}</h3>
      <span class="mo_precio">${a.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${a.descripcion||""}</p>
      ${a.prompts?.length?`
        <div class="mo_prompts">
          <p class="mo_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
          ${a.prompts.map(s=>`
            <div class="mo_prompt_item">
              <span>${s}</span>
              <button class="${i}_copy_btn mo_copy_btn" data-prompt="${(s||"").replace(/"/g,"&quot;")}" title="Copiar">
                <i class="fas fa-copy"></i>
              </button>
            </div>`).join("")}
        </div>`:""}
    </div>

    <div class="mo_foot">
      ${t?`
      <div class="mo_foot_admin">
        <button class="${i}_edit_btn mo_edit_btn" data-id="${a.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${i}_del_btn mo_del_btn" data-id="${a.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>`:""}
      <a href="${a.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`,v=()=>`
  <div class="mo_wrap">
    ${n({p:i,titulo:"Imágenes con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${i}_grid"></div>
    <div class="mo_empty" id="${i}_empty" style="display:none">
      <i class="fas fa-image"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${e({p:i,icon:"image"})}`,$=()=>{o.init(d),console.log("🖼️ Imagen IA · 2026")},f=()=>{o.cleanup(),console.log("🧹 Imagen")};export{f as cleanup,$ as init,v as render};
