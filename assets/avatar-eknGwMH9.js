import{renderTopbar as t,renderModal as r,crearModelo as n,renderPrompts as e}from"./modelo-BFcgB9WJ.js";import"./vendor-gzd0YkcT.js";import"./firebase-Dh67YOPY.js";import"./main-CML6jtkv.js";import"./main-DQHh3IIT.js";import"./firebase-C69Prz-Z.js";const s="ava",i=n({p:s,coleccion:"avatar",icon:"user-astronaut"}),l=(a,o)=>`
  <div class="mo_card wi_fadeUp" data-id="${a.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${a.velocidad||"⚡ Rápido"}</span>
      ${a.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${a.img?`<img src="${a.img}" alt="${a.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-user-astronaut" style="${a.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${s}_titulo">${a.nombre}</h3>
      <span class="mo_precio">${a.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${a.descripcion||""}</p>
      ${e(s,a.prompts)}
    </div>

    <div class="mo_foot">
      ${o?`
      <div class="mo_foot_admin">
        <button class="${s}_edit_btn mo_edit_btn" data-id="${a.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="${s}_del_btn mo_del_btn" data-id="${a.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>`:""}
      <a href="${a.link}" target="_blank" rel="noopener" class="mo_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`,$=()=>`
  <div class="mo_wrap">
    ${t({p:s,titulo:"Avatares con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${s}_grid"></div>
    <div class="mo_empty" id="${s}_empty" style="display:none">
      <i class="fas fa-user-astronaut"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${r({p:s,icon:"user-astronaut"})}`,f=()=>{i.init(l),console.log("🧑‍🚀 Avatar IA · 2026")},b=()=>{i.cleanup(),console.log("🧹 Avatar")};export{b as cleanup,f as init,$ as render};
