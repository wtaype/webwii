import{renderTopbar as t,renderModal as l,crearModelo as d,renderPrompts as n}from"./modelo-DqJZhjUO.js";import"./vendor-gzd0YkcT.js";import"./firebase-CkPxCxD6.js";import"./main-uyFLFgO4.js";import"./main-CYbCrJE3.js";import"./firebase-C69Prz-Z.js";const s="ide",a=d({p:s,coleccion:"ideas",icon:"lightbulb"}),e=(i,o)=>`
  <div class="mo_card wi_fadeUp" data-id="${i.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${i.velocidad||"⚡ Rápido"}</span>
      ${i.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${i.img?`<img src="${i.img}" alt="${i.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-lightbulb" style="${i.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${s}_titulo">${i.nombre}</h3>
      <span class="mo_precio">${i.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${i.descripcion||""}</p>
      ${n(s,i.prompts)}
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
    ${t({p:s,titulo:"Ideas con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${s}_grid"></div>
    <div class="mo_empty" id="${s}_empty" style="display:none">
      <i class="fas fa-lightbulb"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${l({p:s,icon:"lightbulb"})}`,$=()=>{a.init(e),console.log("💡 Ideas IA · 2026")},f=()=>{a.cleanup(),console.log("🧹 Ideas")};export{f as cleanup,$ as init,v as render};
