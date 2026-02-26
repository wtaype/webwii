import{renderTopbar as d,renderModal as n,crearModelo as t,renderPrompts as e}from"./modelo-BlcTeCQt.js";import"./vendor-gzd0YkcT.js";import"./firebase-DfqSFEva.js";import"./main-BP15flfZ.js";import"./main-BqLeQpKs.js";import"./firebase-C69Prz-Z.js";const o="aud",a=t({p:o,coleccion:"audio",icon:"headphones"}),l=(i,s)=>`
  <div class="mo_card wi_fadeUp" data-id="${i.id}">

    <div class="mo_card_top">
      <span class="mo_vel_badge">${i.velocidad||"⚡ Rápido"}</span>
      ${i.favorito?'<span class="mo_fav"><i class="fas fa-star"></i></span>':""}

      <div class="mo_icon_wrap">
        ${i.img?`<img src="${i.img}" alt="${i.nombre}" loading="lazy"
               onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
        <i class="fas fa-headphones-simple" style="${i.img?"display:none":""}"></i>
      </div>

      <h3 class="mo_nombre ${o}_titulo">${i.nombre}</h3>
      <span class="mo_precio">${i.precio||""}</span>
    </div>

    <div class="mo_body">
      <p class="mo_desc">${i.descripcion||""}</p>
      ${e(o,i.prompts)}
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
    ${d({p:o,titulo:"Audio con",grad:"Inteligencia Artificial"})}
    <div class="mo_grid" id="${o}_grid"></div>
    <div class="mo_empty" id="${o}_empty" style="display:none">
      <i class="fas fa-headphones"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>
  </div>
  ${n({p:o,icon:"headphones"})}`,f=()=>{a.init(l),console.log("🎧 Audio IA · 2026")},b=()=>{a.cleanup(),console.log("🧹 Audio")};export{b as cleanup,f as init,$ as render};
