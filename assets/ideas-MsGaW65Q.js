import{j as i}from"./vendor-gzd0YkcT.js";import{db as p}from"./firebase-BeeHjrP0.js";import{s as D,d as y,b as S,c as j,e as x,q as C,f as q,o as z}from"./firebase-XdCz69j8.js";import{g as v,N as o,j as m,k as $,m as w,y as T,h as f,s as B}from"./main-TVeIJQEl.js";import"./main-BoRY3e99.js";const u="wii_ideas";let l=[],c=[],n=!!v("wiSmile");const I=r=>(r||"").toLowerCase(),k=r=>r.trim().toLowerCase().replace(/\s+/g,""),A=Array(8).fill('<div class="ide_skel"><div class="ide_skel_img shimmer"></div><div class="ide_skel_t shimmer"></div><div class="ide_skel_s shimmer"></div></div>').join(""),P=()=>`
  <div class="ide_wrap">
    <div class="ide_topbar">
      <h1 class="ide_titulo">Herramientas de <span class="ide_grad">Ideas IA</span></h1>
      <div class="ide_search_wrap">
        <i class="fas fa-search"></i>
        <input id="ide_search" type="text" placeholder="Buscar...">
        <button id="ide_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="ide_orden" class="ide_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="ide_refresh" class="ide_refresh_btn" ${f("Actualizar")}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="ide_grid" id="ide_grid">${A}</div>
    <div class="ide_empty" id="ide_empty" style="display:none">
      <i class="fas fa-lightbulb"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalIdeas">
    <div class="modalBody ide_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="ide_modal_tit" id="ide_modal_tit"><i class="fas fa-lightbulb"></i> Agregar Herramienta</h2>
      <form id="ide_form">
        <div class="ide_form_row">
          <div class="ide_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="ide_nombre" type="text" placeholder="Ej: ChatGPT" required></div>
          <div class="ide_form_g"><label><i class="fas fa-key"></i> ID</label><input id="ide_id" type="text" placeholder="chatgpt" required></div>
        </div>
        <div class="ide_form_g"><label><i class="fas fa-link"></i> URL</label><input id="ide_url" type="url" placeholder="https://..." required></div>
        <div class="ide_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="ide_img" type="url" placeholder="https://..."></div>
        <div class="ide_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="ide_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="ide_form_row">
          <div class="ide_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="ide_tags" type="text" placeholder="gratis, brainstorm, creativo"></div>
          <div class="ide_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="ide_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="ide_form_actions">
          <button type="button" id="ide_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="ide_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`,R=()=>{const r=async(d=!1)=>{if(!d){const a=(v(u)||{}).data||[];if(a.length)return l=a,_()}i("#ide_grid").html(A);try{l=(await x(C(q(p,"ideas"),z("fecha","desc")))).docs.map(e=>({id:e.id,...e.data()})),B(u,{data:l},12),_()}catch(a){console.error("❌",a),i("#ide_grid").html('<div class="ide_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}},E=async()=>{localStorage.removeItem(u),l=[],c=[],m("#ide_refresh",!0,""),await r(!0),m("#ide_refresh",!1,""),i("#ide_refresh").html('<i class="fas fa-rotate-right"></i>'),o("Actualizado ✓","success")},_=()=>{const d=i("#ide_orden").val(),a=I(i("#ide_search").val().trim()),e={fav:(s,t)=>(t.favorito|0)-(s.favorito|0),reciente:(s,t)=>(t.fecha?.seconds||0)-(s.fecha?.seconds||0),antiguo:(s,t)=>(s.fecha?.seconds||0)-(t.fecha?.seconds||0)};c=[...l].sort(e[d]||e.fav),a&&(c=c.filter(s=>[s.nombre,s.descripcion,...s.tags||[]].some(t=>I(t).includes(a)))),g(c)},g=d=>{i("#ide_search").attr("placeholder",`Buscar en ${l.length} herramientas...`);const a=i("#ide_grid").empty();if(!d.length&&!n)return i("#ide_empty").fadeIn(200);i("#ide_empty").hide(),n&&a.append('<div class="ide_card ide_card_add" id="ide_agregar"><div class="ide_add_cnt"><div class="ide_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>'),d.length&&d.forEach((e,s)=>a.append(`
      <div class="ide_card" data-id="${e.id}" style="transition-delay:${Math.min(s*40,400)}ms">
        <div class="ide_card_img">
          <img src="${e.img||"/logo.webp"}" alt="${e.nombre}" loading="lazy">
          ${e.favorito?'<div class="ide_fav_badge"><i class="fas fa-star"></i></div>':""}
          <div class="ide_over">
            <a href="${e.url}" target="_blank" rel="noopener" class="ide_over_btn" ${f("Abrir")}><i class="fas fa-external-link-alt"></i></a>
            ${n?`<button class="ide_over_btn ide_edit" data-id="${e.id}" ${f("Editar")}><i class="fas fa-edit"></i></button><button class="ide_over_btn ide_del" data-id="${e.id}" ${f("Eliminar")}><i class="fas fa-trash"></i></button>`:""}
          </div>
        </div>
        <div class="ide_info"><h3>${e.nombre}</h3><p>${e.descripcion||""}</p>${e.tags?.length?`<div class="ide_tags">${e.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join("")}</div>`:""}</div>
      </div>`))};i("#ide_form").on("submit",async function(d){d.preventDefault();const a=i(this).data("editId"),e=a||`${k(i("#ide_id").val())}_${Date.now()}`,s={nombre:i("#ide_nombre").val().trim(),url:i("#ide_url").val().trim(),img:i("#ide_img").val().trim(),descripcion:i("#ide_desc").val().trim(),tags:i("#ide_tags").val().split(",").map(t=>t.trim()).filter(Boolean),favorito:+i("#ide_fav").val(),autor:v("wiSmile")?.usuario||"admin",fecha:j()};if(!s.nombre||!s.url)return o("Completa los campos","warning");m("#ide_save");try{await D(y(p,"ideas",e),s,{merge:!0}),o(a?"Actualizado ✓":"Guardado ✓","success"),$("modalIdeas"),await r(!0)}catch{o("Error al guardar","error")}finally{m("#ide_save",!1)}}),i(document).on("click",".ide_edit",function(d){d.stopPropagation();const a=l.find(e=>e.id===i(this).data("id"));a&&(i("#ide_modal_tit").html('<i class="fas fa-edit"></i> Editar Herramienta'),i("#ide_nombre").val(a.nombre),i("#ide_id").val(a.id).prop("readonly",!0),i("#ide_url").val(a.url),i("#ide_img").val(a.img),i("#ide_desc").val(a.descripcion),i("#ide_tags").val((a.tags||[]).join(", ")),i("#ide_fav").val(a.favorito||0),i("#ide_form").data("editId",a.id),w("modalIdeas"))}),i(document).on("click",".ide_del",async function(d){if(d.stopPropagation(),!!confirm("¿Eliminar?"))try{await S(y(p,"ideas",i(this).data("id"))),o("Eliminada ✓","success"),await r(!0)}catch{o("Error al eliminar","error")}}),i(document).on("click","#ide_agregar",()=>{i("#ide_form")[0].reset(),i("#ide_form").removeData("editId"),i("#ide_id").prop("readonly",!1),i("#ide_modal_tit").html('<i class="fas fa-lightbulb"></i> Agregar Herramienta'),w("modalIdeas")}),i("#ide_nombre").on("input",function(){i("#ide_id").prop("readonly")||i("#ide_id").val(k(i(this).val()))});let h;i("#ide_search").on("input",function(){i("#ide_search_clr").toggle(!!i(this).val().trim()),clearTimeout(h),h=setTimeout(_,220)}),i("#ide_search_clr").on("click",()=>i("#ide_search").val("").trigger("input").focus()),i("#ide_cancel").on("click",()=>$("modalIdeas")),i("#ide_orden").on("change",_),i("#ide_refresh").on("click",E);let b=0;i(document).on("click",".ide_titulo",()=>{++b>=7&&(n=!0,b=0,g(c),o("¡Dios te Ama! 🙏","success"))}),r(),console.log(`💡 Ideas · ${T()}`)},F=()=>{n=!!v("wiSmile"),console.log("🧹 Ideas")};export{F as cleanup,R as init,P as render};
