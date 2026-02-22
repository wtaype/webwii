import{renderTopbar as n,renderModal as t,crearModelo as r,renderPrompts as e}from"./modelo-BFcgB9WJ.js";import"./vendor-gzd0YkcT.js";import"./firebase-Dh67YOPY.js";import"./main-CML6jtkv.js";import"./main-DQHh3IIT.js";import"./firebase-C69Prz-Z.js";const s="esc",a=r({p:s,coleccion:"escritura",icon:"pen-nib"}),l=(i,o)=>`
  <div class="mo_card wi_fadeUp" data-id="${i.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${i.velocidad||"⚡ Rápido"}</span>
      ${i.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${i.img?`<img src="${i.img}" alt="${i.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-pen-nib" style="${i.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${s}_titulo">${i.nombre}</h3>
      <span class="mo_precio">${i.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${i.descripcion||""}</p>
      ${e(s,i.prompts)}
    </div>

    <div class="mo_foot">
      ${o?`
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

  </div>`,v=()=>`
  <div class="mo_wrap">
    ${n({p:s,titulo:"Escritura con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${s}_grid"></div>
    <div class="mo_empty" id="${s}_empty" style="display:none">
      <i class="fas fa-pen-nib"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${t({p:s,icon:"pen-nib"})}`,$=()=>{a.init(l),console.log("✍️ Escritura IA · 2026")},f=()=>{a.cleanup(),console.log("🧹 Escritura")};export{f as cleanup,$ as init,v as render};
