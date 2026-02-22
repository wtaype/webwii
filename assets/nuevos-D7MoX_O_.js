import{renderTopbar as l,renderModal as n,crearModelo as e}from"./modelo-B5bAtUyM.js";import"./vendor-gzd0YkcT.js";import"./firebase-DTJZ19yy.js";import"./main-QiU_4_Cu.js";import"./main-BWatBalw.js";import"./firebase-C69Prz-Z.js";const a="new",o=e({p:a,coleccion:"nuevos",icon:"bolt"}),d=(s,t)=>`
  <div class="mo_card wi_fadeUp" data-id="${s.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${s.velocidad||"⚡ Rápido"}</span>
      ${s.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${s.img?`<img src="${s.img}" alt="${s.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-image" style="${s.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${a}_titulo">${s.nombre}</h3>
      <span class="mo_precio">${s.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${s.descripcion||""}</p>
      ${s.prompts?.length?`
        <div class="mo_prompts">
          <p class="mo_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
          ${s.prompts.map(i=>`
            <div class="mo_prompt_item">
              <span>${i}</span>
              <button class="${a}_copy_btn mo_copy_btn" data-prompt="${(i||"").replace(/"/g,"&quot;")}" title="Copiar">
                <i class="fas fa-copy"></i>
              </button>
            </div>`).join("")}
        </div>`:""}
    </div>

    <div class="mo_foot">
      ${t?`
      <div class="mo_foot_admin">
        <button class="${a}_edit_btn mo_edit_btn" data-id="${s.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${a}_del_btn mo_del_btn" data-id="${s.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>`:""}
      <a href="${s.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`,$=()=>`
  <div class="mo_wrap">
    ${l({p:a,titulo:"Nuevos ",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${a}_grid"></div>
    <div class="mo_empty" id="${a}_empty" style="display:none">
      <i class="fas fa-image"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${n({p:a,icon:"image"})}`,b=()=>{o.init(d),console.log("🖼️ Nuevos IA · 2026")},f=()=>{o.cleanup(),console.log("🧹 Nuevos")};export{f as cleanup,b as init,$ as render};
