import{j as i}from"./vendor-gzd0YkcT.js";import{db as p}from"./firebase-DVHtvaaI.js";import{s as I,d as y,b as x,c as S,e as V,q as j,f as q,o as z}from"./firebase-XdCz69j8.js";import{g as f,N as o,h as _,j as w,k as $,y as C,f as m,s as H}from"./main-DWKjSpF4.js";import"./main-GjtgUQuo.js";const u="wii_video";let l=[],c=[],v=!!f("wiSmile");const k=r=>(r||"").toLowerCase(),A=r=>r.trim().toLowerCase().replace(/\s+/g,""),E=Array(8).fill(`
  <div class="vid_skel">
    <div class="vid_skel_img shimmer"></div>
    <div class="vid_skel_t shimmer"></div>
    <div class="vid_skel_s shimmer"></div>
  </div>`).join(""),R=()=>`
  <div class="vid_wrap">
    <div class="vid_topbar">
      <h1 class="vid_titulo">Herramientas de <span class="vid_grad">Video IA</span></h1>
      <div class="vid_search_wrap">
        <i class="fas fa-search"></i>
        <input id="vid_search" type="text" placeholder="Buscar...">
        <button id="vid_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="vid_orden" class="vid_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="vid_refresh" class="vid_refresh_btn" ${m("Actualizar")}>
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>
    <div class="vid_grid" id="vid_grid">${E}</div>
    <div class="vid_empty" id="vid_empty" style="display:none">
      <i class="fas fa-film"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalVideo">
    <div class="modalBody vid_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="vid_modal_tit" id="vid_modal_tit"><i class="fas fa-film"></i> Agregar Herramienta</h2>
      <form id="vid_form">
        <div class="vid_form_row">
          <div class="vid_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="vid_nombre" type="text" placeholder="Ej: Runway" required></div>
          <div class="vid_form_g"><label><i class="fas fa-key"></i> ID</label><input id="vid_id" type="text" placeholder="runway" required></div>
        </div>
        <div class="vid_form_g"><label><i class="fas fa-link"></i> URL de la herramienta</label><input id="vid_url" type="url" placeholder="https://..." required></div>
        <div class="vid_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="vid_img" type="url" placeholder="https://..."></div>
        <div class="vid_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="vid_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="vid_form_row">
          <div class="vid_form_g"><label><i class="fas fa-tags"></i> Tags (coma separados)</label><input id="vid_tags" type="text" placeholder="gratis, texto a video, HD"></div>
          <div class="vid_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="vid_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="vid_form_actions">
          <button type="button" id="vid_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="vid_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`,F=()=>{const r=async(s=!1)=>{if(!s){const a=(f(u)||{}).data||[];if(a.length)return l=a,n()}i("#vid_grid").html(E);try{l=(await V(j(q(p,"video"),z("fecha","desc")))).docs.map(d=>({id:d.id,...d.data()})),H(u,{data:l},12),n()}catch(a){console.error("❌",a),i("#vid_grid").html('<div class="vid_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}},D=async()=>{localStorage.removeItem(u),l=[],c=[],_("#vid_refresh",!0,""),await r(!0),_("#vid_refresh",!1,""),i("#vid_refresh").html('<i class="fas fa-rotate-right"></i>'),o("Actualizado ✓","success")},n=()=>{const s=i("#vid_orden").val(),a=k(i("#vid_search").val().trim()),d={fav:(e,t)=>(t.favorito|0)-(e.favorito|0),reciente:(e,t)=>(t.fecha?.seconds||0)-(e.fecha?.seconds||0),antiguo:(e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)};c=[...l].sort(d[s]||d.fav),a&&(c=c.filter(e=>[e.nombre,e.descripcion,...e.tags||[]].some(t=>k(t).includes(a)))),g(c)},g=s=>{i("#vid_search").attr("placeholder",`Buscar en ${l.length} herramientas...`);const a=i("#vid_grid").empty();if(!s.length&&!v)return i("#vid_empty").fadeIn(200);i("#vid_empty").hide(),v&&a.append(`
      <div class="vid_card vid_card_add" id="vid_agregar">
        <div class="vid_add_cnt">
          <div class="vid_add_ico"><i class="fas fa-plus"></i></div>
          <h3>Agregar</h3><p>Nueva herramienta</p>
        </div>
      </div>`),s.length&&s.forEach((d,e)=>a.append(`
      <div class="vid_card" data-id="${d.id}" style="transition-delay:${Math.min(e*40,400)}ms">
        <div class="vid_card_img">
          <img src="${d.img||"/logo.webp"}" alt="${d.nombre}" loading="lazy">
          ${d.favorito?'<div class="vid_fav_badge"><i class="fas fa-star"></i></div>':""}
          <div class="vid_over">
            <a href="${d.url}" target="_blank" rel="noopener" class="vid_over_btn" ${m("Abrir")}><i class="fas fa-external-link-alt"></i></a>
            ${v?`
            <button class="vid_over_btn vid_edit" data-id="${d.id}" ${m("Editar")}><i class="fas fa-edit"></i></button>
            <button class="vid_over_btn vid_del"  data-id="${d.id}" ${m("Eliminar")}><i class="fas fa-trash"></i></button>`:""}
          </div>
        </div>
        <div class="vid_info">
          <h3>${d.nombre}</h3>
          <p>${d.descripcion||""}</p>
          ${d.tags?.length?`<div class="vid_tags">${d.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join("")}</div>`:""}
        </div>
      </div>`))};i("#vid_form").on("submit",async function(s){s.preventDefault();const a=i(this).data("editId"),d=a||`${A(i("#vid_id").val())}_${Date.now()}`,e={nombre:i("#vid_nombre").val().trim(),url:i("#vid_url").val().trim(),img:i("#vid_img").val().trim(),descripcion:i("#vid_desc").val().trim(),tags:i("#vid_tags").val().split(",").map(t=>t.trim()).filter(Boolean),favorito:+i("#vid_fav").val(),autor:f("wiSmile")?.usuario||"admin",fecha:S()};if(!e.nombre||!e.url)return o("Completa los campos","warning");_("#vid_save");try{await I(y(p,"video",d),e,{merge:!0}),o(a?"Actualizado ✓":"Guardado ✓","success"),w("modalVideo"),await r(!0)}catch{o("Error al guardar","error")}finally{_("#vid_save",!1)}}),i(document).on("click",".vid_edit",function(s){s.stopPropagation();const a=l.find(d=>d.id===i(this).data("id"));a&&(i("#vid_modal_tit").html('<i class="fas fa-edit"></i> Editar Herramienta'),i("#vid_nombre").val(a.nombre),i("#vid_id").val(a.id).prop("readonly",!0),i("#vid_url").val(a.url),i("#vid_img").val(a.img),i("#vid_desc").val(a.descripcion),i("#vid_tags").val((a.tags||[]).join(", ")),i("#vid_fav").val(a.favorito||0),i("#vid_form").data("editId",a.id),$("modalVideo"))}),i(document).on("click",".vid_del",async function(s){if(s.stopPropagation(),!!confirm("¿Eliminar?"))try{await x(y(p,"video",i(this).data("id"))),o("Eliminada ✓","success"),await r(!0)}catch{o("Error al eliminar","error")}}),i(document).on("click","#vid_agregar",()=>{i("#vid_form")[0].reset(),i("#vid_form").removeData("editId"),i("#vid_id").prop("readonly",!1),i("#vid_modal_tit").html('<i class="fas fa-film"></i> Agregar Herramienta'),$("modalVideo")}),i("#vid_nombre").on("input",function(){i("#vid_id").prop("readonly")||i("#vid_id").val(A(i(this).val()))});let h;i("#vid_search").on("input",function(){i("#vid_search_clr").toggle(!!i(this).val().trim()),clearTimeout(h),h=setTimeout(n,220)}),i("#vid_search_clr").on("click",()=>i("#vid_search").val("").trigger("input").focus()),i("#vid_cancel").on("click",()=>w("modalVideo")),i("#vid_orden").on("change",n),i("#vid_refresh").on("click",D);let b=0;i(document).on("click",".vid_titulo",()=>{++b>=7&&(v=!0,b=0,g(c),o("¡Dios te Ama! 🙏","success"))}),r(),console.log(`🎬 Video · ${C()}`)},G=()=>{v=!!f("wiSmile"),console.log("🧹 Video")};export{G as cleanup,F as init,R as render};
