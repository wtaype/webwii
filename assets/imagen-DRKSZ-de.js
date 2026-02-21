import{j as i}from"./vendor-gzd0YkcT.js";import{db as v}from"./firebase-DVHtvaaI.js";import{s as D,d as y,b as S,c as j,e as x,q,f as z,o as C}from"./firebase-XdCz69j8.js";import{g as f,N as l,h as g,j as $,k as w,y as B,f as _,s as H}from"./main-DWKjSpF4.js";import"./main-GjtgUQuo.js";const p="wii_imagen";let m=[],d=[],c=!!f("wiSmile");const I=o=>(o||"").toLowerCase(),k=o=>o.trim().toLowerCase().replace(/\s+/g,""),A=Array(8).fill(`
  <div class="img_skel">
    <div class="img_skel_img shimmer"></div>
    <div class="img_skel_t shimmer"></div>
    <div class="img_skel_s shimmer"></div>
  </div>`).join(""),F=()=>`
  <div class="img_wrap">

    <div class="img_topbar">
      <h1 class="img_titulo">Herramientas de <span class="img_grad">Imagen IA</span></h1>
      <div class="img_search_wrap">
        <i class="fas fa-search"></i>
        <input id="img_search" type="text" placeholder="Buscar...">
        <button id="img_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="img_orden" class="img_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="img_refresh" class="img_refresh_btn" ${_("Actualizar")}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>

    <div class="img_grid" id="img_grid">${A}</div>

    <div class="img_empty" id="img_empty" style="display:none">
      <i class="fas fa-image"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>

  </div>

  <div class="wiModal" id="modalImagen">
    <div class="modalBody img_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="img_modal_tit" id="img_modal_tit"><i class="fas fa-image"></i> Agregar Herramienta</h2>
      <form id="img_form">
        <div class="img_form_row">
          <div class="img_form_g">
            <label><i class="fas fa-heading"></i> Nombre</label>
            <input id="img_nombre" type="text" placeholder="Ej: Ideogram" required>
          </div>
          <div class="img_form_g">
            <label><i class="fas fa-key"></i> ID</label>
            <input id="img_id" type="text" placeholder="ideogram" required>
          </div>
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-link"></i> URL de la herramienta</label>
          <input id="img_url" type="url" placeholder="https://..." required>
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-image"></i> URL imagen/logo</label>
          <input id="img_img" type="url" placeholder="https://...">
        </div>
        <div class="img_form_g">
          <label><i class="fas fa-align-left"></i> Descripción</label>
          <textarea id="img_desc" placeholder="Describe la herramienta..." rows="3" required></textarea>
        </div>
        <div class="img_form_row">
          <div class="img_form_g">
            <label><i class="fas fa-tags"></i> Tags (coma separados)</label>
            <input id="img_tags" type="text" placeholder="gratis, arte, realista">
          </div>
          <div class="img_form_g">
            <label><i class="fas fa-star"></i> Favorito</label>
            <select id="img_fav">
              <option value="0">No</option>
              <option value="1">Sí ⭐</option>
            </select>
          </div>
        </div>
        <div class="img_form_actions">
          <button type="button" id="img_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="img_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>
`,G=()=>{const o=async(t=!1)=>{if(!t){const a=(f(p)||{}).data||[];if(a.length)return m=a,n()}i("#img_grid").html(A);try{m=(await x(q(z(v,"imagen"),C("fecha","desc")))).docs.map(e=>({id:e.id,...e.data()})),H(p,{data:m},12),n()}catch(a){console.error("❌",a),i("#img_grid").html('<div class="img_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}},E=async()=>{localStorage.removeItem(p),m=[],d=[],g("#img_refresh",!0,""),await o(!0),g("#img_refresh",!1,""),i("#img_refresh").html('<i class="fas fa-rotate-right"></i>'),l("Actualizado ✓","success")},n=()=>{const t=i("#img_orden").val(),a=I(i("#img_search").val().trim()),e={fav:(s,r)=>(r.favorito|0)-(s.favorito|0),reciente:(s,r)=>(r.fecha?.seconds||0)-(s.fecha?.seconds||0),antiguo:(s,r)=>(s.fecha?.seconds||0)-(r.fecha?.seconds||0)};d=[...m].sort(e[t]||e.fav),a&&(d=d.filter(s=>[s.nombre,s.descripcion,...s.tags||[]].some(r=>I(r).includes(a)))),u(d)},u=t=>{i("#img_search").attr("placeholder",`Buscar en ${m.length} herramientas...`);const a=i("#img_grid").empty();if(!t.length&&!c)return i("#img_empty").fadeIn(200);i("#img_empty").hide(),c&&a.append(`
      <div class="img_card img_card_add" id="img_agregar">
        <div class="img_add_cnt">
          <div class="img_add_ico"><i class="fas fa-plus"></i></div>
          <h3>Agregar</h3><p>Nueva herramienta</p>
        </div>
      </div>`),t.length&&t.forEach((e,s)=>a.append(`
      <div class="img_card" data-id="${e.id}" style="transition-delay:${Math.min(s*40,400)}ms">
        <div class="img_card_img">
          <img src="${e.img||"/logo.webp"}" alt="${e.nombre}" loading="lazy">
          ${e.favorito?'<div class="img_fav_badge"><i class="fas fa-star"></i></div>':""}
          <div class="img_over">
            <a href="${e.url}" target="_blank" rel="noopener" class="img_over_btn" ${_("Abrir")}><i class="fas fa-external-link-alt"></i></a>
            ${c?`
            <button class="img_over_btn img_edit" data-id="${e.id}" ${_("Editar")}><i class="fas fa-edit"></i></button>
            <button class="img_over_btn img_del"  data-id="${e.id}" ${_("Eliminar")}><i class="fas fa-trash"></i></button>`:""}
          </div>
        </div>
        <div class="img_info">
          <h3>${e.nombre}</h3>
          <p>${e.descripcion||""}</p>
          ${e.tags?.length?`<div class="img_tags">${e.tags.slice(0,3).map(r=>`<span>#${r}</span>`).join("")}</div>`:""}
        </div>
      </div>`))};i("#img_form").on("submit",async function(t){t.preventDefault();const a=i(this).data("editId"),e=a||`${k(i("#img_id").val())}_${Date.now()}`,s={nombre:i("#img_nombre").val().trim(),url:i("#img_url").val().trim(),img:i("#img_img").val().trim(),descripcion:i("#img_desc").val().trim(),tags:i("#img_tags").val().split(",").map(r=>r.trim()).filter(Boolean),favorito:+i("#img_fav").val(),autor:f("wiSmile")?.usuario||"admin",fecha:j()};if(!s.nombre||!s.url)return l("Completa los campos","warning");g("#img_save");try{await D(y(v,"imagen",e),s,{merge:!0}),l(a?"Actualizado ✓":"Guardado ✓","success"),$("modalImagen"),await o(!0)}catch{l("Error al guardar","error")}finally{g("#img_save",!1)}}),i(document).on("click",".img_edit",function(t){t.stopPropagation();const a=m.find(e=>e.id===i(this).data("id"));a&&(i("#img_modal_tit").html('<i class="fas fa-edit"></i> Editar Herramienta'),i("#img_nombre").val(a.nombre),i("#img_id").val(a.id).prop("readonly",!0),i("#img_url").val(a.url),i("#img_img").val(a.img),i("#img_desc").val(a.descripcion),i("#img_tags").val((a.tags||[]).join(", ")),i("#img_fav").val(a.favorito||0),i("#img_form").data("editId",a.id),w("modalImagen"))}),i(document).on("click",".img_del",async function(t){if(t.stopPropagation(),!!confirm("¿Eliminar?"))try{await S(y(v,"imagen",i(this).data("id"))),l("Eliminada ✓","success"),await o(!0)}catch{l("Error al eliminar","error")}}),i(document).on("click","#img_agregar",()=>{i("#img_form")[0].reset(),i("#img_form").removeData("editId"),i("#img_id").prop("readonly",!1),i("#img_modal_tit").html('<i class="fas fa-image"></i> Agregar Herramienta'),w("modalImagen")}),i("#img_nombre").on("input",function(){i("#img_id").prop("readonly")||i("#img_id").val(k(i(this).val()))});let h;i("#img_search").on("input",function(){i("#img_search_clr").toggle(!!i(this).val().trim()),clearTimeout(h),h=setTimeout(n,220)}),i("#img_search_clr").on("click",()=>i("#img_search").val("").trigger("input").focus()),i("#img_cancel").on("click",()=>$("modalImagen")),i("#img_orden").on("change",n),i("#img_refresh").on("click",E);let b=0;i(document).on("click",".img_titulo",()=>{++b>=7&&(c=!0,b=0,u(d),l("¡Dios te Ama! 🙏","success"))}),o(),console.log(`🖼️ Imagen · ${B()}`)},P=()=>{c=!!f("wiSmile"),console.log("🧹 Imagen")};export{P as cleanup,G as init,F as render};
