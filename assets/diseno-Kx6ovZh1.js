import{renderTopbar as t,renderModal as e,crearModelo as l,renderPrompts as n}from"./modelo-B9tD2XsX.js";import"./vendor-gzd0YkcT.js";import"./firebase-C0e3_QMp.js";import"./main-Dyv4DaiV.js";import"./main-CK5omezQ.js";import"./firebase-C69Prz-Z.js";const s="dis",o=l({p:s,coleccion:"diseno",icon:"palette"}),d=(i,a)=>`
  <div class="mo_card wi_fadeUp" data-id="${i.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${i.velocidad||"⚡ Rápido"}</span>
      ${i.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${i.img?`<img src="${i.img}" alt="${i.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-palette" style="${i.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${s}_titulo">${i.nombre}</h3>
      <span class="mo_precio">${i.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${i.descripcion||""}</p>
      ${n(s,i.prompts)}
    </div>

    <div class="mo_foot">
      ${a?`
      <div class="mo_foot_admin">
        <button class="${s}_edit_btn mo_edit_btn" data-id="${i.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${s}_del_btn mo_del_btn" data-id="${i.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>`:""}
      <a href="${i.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`,$=()=>`
  <div class="mo_wrap">
    ${t({p:s,titulo:"Diseño con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${s}_grid"></div>
    <div class="mo_empty" id="${s}_empty" style="display:none">
      <i class="fas fa-palette"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${e({p:s,icon:"palette"})}`,f=()=>{o.init(d),console.log("🎨 Diseño IA · 2026")},b=()=>{o.cleanup(),console.log("🧹 Diseño")};export{b as cleanup,f as init,$ as render};
