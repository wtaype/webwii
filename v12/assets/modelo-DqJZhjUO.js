import{j as o}from"./vendor-gzd0YkcT.js";import{db as k}from"./firebase-CkPxCxD6.js";import{s as N,d as E,a as R,b as P,g as T,q as B,c as F,o as H}from"./firebase-C69Prz-Z.js";import{g as h,d as V,N as u,e as b,f as L,c as G,s as U,h as M,w as K}from"./main-uyFLFgO4.js";import"./main-CYbCrJE3.js";const S=a=>(a||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),O=a=>a.trim().toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9]/g,""),Q=(a=10)=>Array(a).fill(`
  <div class="mo_skel">
    <div class="mo_skel_top shimmer"></div>
    <div class="mo_skel_b">
      <div class="mo_skel_t shimmer"></div>
      <div class="mo_skel_s shimmer"></div>
      <div class="mo_skel_s mo_skel_s2 shimmer"></div>
    </div>
  </div>`).join(""),ia=({p:a,titulo:c,grad:m})=>`
  <div class="${a}_topbar mo_topbar">
    <h1 class="${a}_titulo mo_titulo">${c} <span class="${a}_grad mo_grad">${m}</span></h1>
    <div class="mo_ctrl">
      <div class="mo_search_wrap">
        <i class="fas fa-search"></i>
        <input id="${a}_search" type="text" placeholder="Buscar herramientas...">
        <button id="${a}_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="${a}_orden" class="mo_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="${a}_refresh" class="mo_refresh_btn" ${V("Actualizar")}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
  </div>`,X=a=>`
  <div class="mo_card mo_card_add" id="${a}_agregar">
    <div class="mo_add_cnt">
      <div class="mo_add_ico"><i class="fas fa-plus"></i></div>
      <h3>Agregar</h3><p>Nueva herramienta</p>
    </div>
  </div>`,ea=(a,c=[])=>c?.length?`
  <div class="mo_prompts">
    <p class="mo_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
    ${c.map(m=>`
      <div class="mo_prompt_item">
        <span>${m}</span>
        <button class="${a}_copy_btn mo_copy_btn" data-prompt="${(m||"").replace(/"/g,"&quot;")}" title="Copiar">
          <i class="fas fa-copy"></i>
        </button>
      </div>`).join("")}
  </div>`:"",sa=({p:a,icon:c,campos:m=[],extraRows:w=""})=>`
  <div class="wiModal" id="mo_modal_${a}">
    <div class="modalBody mo_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="mo_modal_tit" id="${a}_modal_tit">
        <i class="fas fa-${c}"></i> Agregar Herramienta
      </h2>
      <form id="${a}_form" autocomplete="off">

        <!-- Nombre + ID -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-heading"></i> Nombre</label>
            <input id="${a}_nombre" type="text" placeholder="ElevenLabs" required>
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-key"></i> ID único</label>
            <input id="${a}_id" type="text" placeholder="elevenlabs" required>
            <span class="mo_id_hint" id="${a}_id_hint"></span>
          </div>
        </div>

        <!-- Link -->
        <div class="mo_form_g">
          <label><i class="fas fa-link"></i> Link</label>
          <input id="${a}_link" type="url" placeholder="https://..." required>
        </div>

        <!-- Precio + Velocidad -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-tag"></i> Precio</label>
            <input id="${a}_precio" type="text" placeholder="💳 Desde $5/mes">
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-image"></i> Logo / Imagen URL</label>
            <input id="${a}_img" type="url" placeholder="Imagenlogo.png">
          </div>
        </div>

        <!-- Favorito + Imagen/Logo -->
        <div class="mo_form_row">
          <div class="mo_form_g">
            <label><i class="fas fa-bolt"></i> Velocidad</label>
            <select id="${a}_vel">
            <option value="🐢 Moderado">🐢 Moderado</option>
              <option value="⚡ Rápido">⚡ Rápido</option>
              <option value="🚀 Muy rápido">🚀 Muy rápido</option>
              <option value="🐌 Lento">🐌 Lento</option>
            </select>
          </div>
          <div class="mo_form_g">
            <label><i class="fas fa-star"></i> Favorito</label>
            <select id="${a}_fav">
              <option value="false">No</option>
              <option value="true">Sí ⭐</option>
            </select>
          </div>
        </div>

        <!-- Campos extra opcionales -->
        ${m.map(d=>`
        <div class="mo_form_g">
          <label><i class="fas fa-${d.icon}"></i> ${d.label}</label>
          ${d.tipo==="select"?`<select id="${a}_${d.id}">${d.opts.map(g=>`<option value="${g.v}">${g.t}</option>`).join("")}</select>`:`<input id="${a}_${d.id}" type="${d.tipo||"text"}" placeholder="${d.ph||""}">`}
        </div>`).join("")}

        ${w}

        <!-- Descripción -->
        <div class="mo_form_g">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea id="${a}_desc" placeholder="Describe la herramienta..." rows="3" required></textarea>
        </div>

        <!-- Prompts -->
        <div class="mo_form_g">
          <label><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</label>
          <div id="${a}_prompts_list" class="mo_prompts_edit"></div>
          <button type="button" class="mo_btn_add_prompt" data-p="${a}">
            <i class="fas fa-plus"></i> Añadir prompt
          </button>
        </div>

        <!-- Acciones -->
        <div class="mo_form_actions">
          <button type="button" class="mo_cancel" data-p="${a}">
            <i class="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" id="${a}_save">
            <i class="fas fa-save"></i> Guardar
          </button>
        </div>

      </form>
    </div>
  </div>`,ra=({p:a,coleccion:c,icon:m,campos:w=[],extraDatos:d=()=>({}),extraFields:g=()=>({})})=>{const y=`wii_${a}`;let _=[],p=[],v=!!h("wiSmile");const j=()=>o(`#${a}_prompts_list .mo_prompt_input`).map((t,s)=>o(s).val().trim()).get().filter(Boolean),C=(t="")=>{const s=o(`#${a}_prompts_list .mo_prompt_row`).length+1;o(`#${a}_prompts_list`).append(`
      <div class="mo_prompt_row">
        <span class="mo_prompt_num">${s}</span>
        <input type="text" class="mo_prompt_input" placeholder="Prompt ${s}..." value="${t}">
        <button type="button" class="mo_del_prompt"><i class="fas fa-times"></i></button>
      </div>`)},x=(t=[])=>{o(`#${a}_prompts_list`).empty(),(t.length?t:["","",""]).forEach(C)},I=t=>{const s=_.some(f=>f.id===t&&t!==o(`#${a}_form`).data("editId"));o(`#${a}_id_hint`).text(t?s?"⚠️ Ya existe — se actualizará":"✓ Disponible":"").attr("class",t?`mo_id_hint ${s?"mo_id_dup":"mo_id_ok"}`:"mo_id_hint"),o(`#${a}_id`).toggleClass("mo_input_dup",!!t&&s)},z=()=>{o(`#${a}_form`)[0].reset(),o(`#${a}_form`).removeData("editId"),o(`#${a}_id`).prop("readonly",!1).removeClass("mo_input_dup"),o(`#${a}_id_hint`).text("").attr("class","mo_id_hint"),o(`#${a}_modal_tit`).html(`<i class="fas fa-${m}"></i> Agregar Herramienta`),x(),M(`mo_modal_${a}`)},q=t=>{const s={[`#${a}_nombre`]:t.nombre,[`#${a}_id`]:t.id,[`#${a}_link`]:t.link,[`#${a}_precio`]:t.precio,[`#${a}_vel`]:t.velocidad||"⚡ Rápido",[`#${a}_img`]:t.img||"",[`#${a}_desc`]:t.descripcion};Object.entries({...s,...g(t)}).forEach(([f,$])=>o(f).val($)),o(`#${a}_fav`).val(String(!!t.favorito)),o(`#${a}_id`).prop("readonly",!0).removeClass("mo_input_dup"),o(`#${a}_id_hint`).text("").attr("class","mo_id_hint"),o(`#${a}_modal_tit`).html('<i class="fas fa-edit"></i> Editar Herramienta'),x(t.prompts||[]),o(`#${a}_form`).data("editId",t.id),M(`mo_modal_${a}`)};return{init:t=>{const s=()=>{o(`#${a}_search`).attr("placeholder",`Buscar en ${_.length} herramientas...`);const e=o(`#${a}_grid`).empty();if(!p.length&&!v){o(`#${a}_empty`).fadeIn(200);return}o(`#${a}_empty`).hide(),v&&e.append(X(a)),p.length&&(e.append(p.map(i=>t(i,v)).join("")),K(".mo_card:not(.mo_card_add)",null,{anim:"wi_fadeUp",stagger:80}))},f=()=>{const e=o(`#${a}_orden`).val()||"fav",i=S(o(`#${a}_search`).val().trim()),l={fav:(r,n)=>(n.favorito?1:0)-(r.favorito?1:0),reciente:(r,n)=>(n.fechaCreado?.seconds||0)-(r.fechaCreado?.seconds||0),antiguo:(r,n)=>(r.fechaCreado?.seconds||0)-(n.fechaCreado?.seconds||0)};p=[..._].sort(l[e]||l.fav),i&&(p=p.filter(r=>[r.nombre,r.descripcion,r.precio,r.velocidad,...r.prompts||[]].some(n=>S(n).includes(i)))),s()},$=async(e=!1)=>{if(!e){const i=(h(y)||{}).data||[];if(i.length)return _=i,f()}o(`#${a}_grid`).html(Q());try{_=(await T(B(F(k,c),H("fechaCreado","desc")))).docs.map(l=>({id:l.id,...l.data()})),U(y,{data:_},12),f()}catch(i){console.error(`❌ ${c}:`,i),o(`#${a}_grid`).html('<div class="mo_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}};o(document).on("submit",`#${a}_form`,async function(e){e.preventDefault();const i=o(this).data("editId"),l=o(`#${a}_id`).val().trim();if(!l)return u("El ID es obligatorio","warning");const r={nombre:o(`#${a}_nombre`).val().trim(),descripcion:o(`#${a}_desc`).val().trim(),precio:o(`#${a}_precio`).val().trim(),velocidad:o(`#${a}_vel`).val(),link:o(`#${a}_link`).val().trim(),img:o(`#${a}_img`).val().trim(),prompts:j(),favorito:o(`#${a}_fav`).val()==="true",usuario:h("wiSmile")?.usuario||"admin",...d(),...i?{Actualizado:P()}:{fechaCreado:P()}};if(!r.nombre||!r.link)return u("Completa nombre y link","warning");b(`#${a}_save`);try{await N(E(k,c,i||l),r,{merge:!0}),u(i?"Actualizado ✓":"Guardado ✓","success"),L(`mo_modal_${a}`),await $(!0)}catch(n){console.error(n),u("Error al guardar","error")}finally{b(`#${a}_save`,!1)}}),o(document).on("click",`#${a}_agregar`,z),o(document).on("click",`.${a}_edit_btn`,function(e){e.stopPropagation();const i=_.find(l=>l.id===o(this).data("id"));i&&q(i)}),o(document).on("click",`.${a}_del_btn`,async function(e){if(e.stopPropagation(),!!confirm(`¿Eliminar "${o(this).data("id")}"?`))try{await R(E(k,c,o(this).data("id"))),u("Eliminada ✓","success"),await $(!0)}catch{u("Error al eliminar","error")}}),o(document).on("input",`#${a}_nombre`,function(){if(o(`#${a}_id`).prop("readonly"))return;const e=O(o(this).val());o(`#${a}_id`).val(e),I(e)}),o(document).on("input",`#${a}_id`,function(){I(o(this).val())}),o(document).on("click",`.mo_btn_add_prompt[data-p="${a}"]`,()=>C()),o(document).on("click",`#${a}_prompts_list .mo_del_prompt`,function(){o(this).closest(".mo_prompt_row").remove(),o(`#${a}_prompts_list .mo_prompt_num`).each((e,i)=>o(i).text(e+1))}),o(document).on("click",`.${a}_copy_btn, .mo_prompt_item`,function(e){const i=o(this).hasClass("mo_copy_btn")?o(this):o(this).find(".mo_copy_btn"),l=o(this).hasClass("mo_copy_btn")?o(this).data("prompt"):o(this).find(".mo_copy_btn").data("prompt");l&&(G(l,i[0],"¡Copiado!"),i.html('<i class="fas fa-check"></i>'),setTimeout(()=>i.html('<i class="fas fa-copy"></i>'),1500))}),o(document).on("click",`.mo_cancel[data-p="${a}"]`,()=>L(`mo_modal_${a}`));let A;o(document).on("input",`#${a}_search`,function(){o(`#${a}_search_clr`).toggle(!!o(this).val().trim()),clearTimeout(A),A=setTimeout(f,220)}),o(document).on("click",`#${a}_search_clr`,()=>o(`#${a}_search`).val("").trigger("input").focus()),o(document).on("change",`#${a}_orden`,f),o(document).on("click",`#${a}_refresh`,async()=>{localStorage.removeItem(y),_=[],p=[],b(`#${a}_refresh`,!0,""),await $(!0),b(`#${a}_refresh`,!1,""),o(`#${a}_refresh`).html('<i class="fas fa-rotate-right"></i>'),u("Actualizado ✓","success")});let D=0;o(document).on("click",`.${a}_titulo`,()=>{++D>=7&&(v=!0,D=0,s(),u("¡Dios te Ama! 🙏","success"))}),$()},cleanup:()=>{v=!!h("wiSmile"),[`#${a}_agregar`,`.${a}_edit_btn`,`.${a}_del_btn`,`.${a}_copy_btn`,`.${a}_titulo`,`.mo_btn_add_prompt[data-p="${a}"]`,`#${a}_prompts_list .mo_del_prompt`,`.mo_cancel[data-p="${a}"]`,`#${a}_search`,`#${a}_search_clr`,`#${a}_orden`,`#${a}_refresh`,`#${a}_form`,`#${a}_nombre`,`#${a}_id`].forEach(s=>o(document).off("click submit input change",s))}}};export{Q as SKEL,X as cardAgregar,ra as crearModelo,S as norm,sa as renderModal,ea as renderPrompts,ia as renderTopbar,O as toId};
