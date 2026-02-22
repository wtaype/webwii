import{renderTopbar as d,renderModal as t,crearModelo as e,renderPrompts as n}from"./modelo-CxZmK5nZ.js";import"./vendor-gzd0YkcT.js";import"./firebase-CaHTBJiW.js";import"./main-makJ-61Z.js";import"./main-Cf4PAAqi.js";import"./firebase-C69Prz-Z.js";const o="vid",a=e({p:o,coleccion:"video",icon:"video"}),l=(i,s)=>`
  <div class="mo_card wi_fadeUp" data-id="${i.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${i.velocidad||"⚡ Rápido"}</span>
      ${i.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${i.img?`<img src="${i.img}" alt="${i.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-clapperboard" style="${i.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${o}_titulo">${i.nombre}</h3>
      <span class="mo_precio">${i.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${i.descripcion||""}</p>
      ${n(o,i.prompts)}
    </div>

    <div class="mo_foot">
      ${s?`
      <div class="mo_foot_admin">
        <button class="${o}_edit_btn mo_edit_btn" data-id="${i.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${o}_del_btn mo_del_btn" data-id="${i.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>`:""}
      <a href="${i.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`,$=()=>`
  <div class="mo_wrap">
    ${d({p:o,titulo:"Video con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${o}_grid"></div>
    <div class="mo_empty" id="${o}_empty" style="display:none">
      <i class="fas fa-clapperboard"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${t({p:o,icon:"video"})}`,b=()=>{a.init(l),console.log("🎬 Video IA · 2026")},f=()=>{a.cleanup(),console.log("🧹 Video")};export{f as cleanup,b as init,$ as render};
