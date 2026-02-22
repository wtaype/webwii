import{j as i}from"./vendor-gzd0YkcT.js";import{db as p}from"./firebase-CO18WnsV.js";import{s as I,d as y,a as S,b as x,g as C,q as j,c as q,o as z}from"./firebase-S0i6WGaj.js";import{g as v,N as o,w as m,c as w,a as $,y as B,b as f,s as H}from"./main-Cj6CcM5e.js";import"./main-DFM23v7O.js";const u="wii_diseno";let l=[],c=[],n=!!v("wiSmile");const D=r=>(r||"").toLowerCase(),k=r=>r.trim().toLowerCase().replace(/\s+/g,""),A=Array(8).fill('<div class="dis_skel"><div class="dis_skel_img shimmer"></div><div class="dis_skel_t shimmer"></div><div class="dis_skel_s shimmer"></div></div>').join(""),U=()=>`
  <div class="dis_wrap">
    <div class="dis_topbar">
      <h1 class="dis_titulo">Herramientas de <span class="dis_grad">Diseño IA</span></h1>
      <div class="dis_search_wrap">
        <i class="fas fa-search"></i>
        <input id="dis_search" type="text" placeholder="Buscar...">
        <button id="dis_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="dis_orden" class="dis_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="dis_refresh" class="dis_refresh_btn" ${f("Actualizar")}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="dis_grid" id="dis_grid">${A}</div>
    <div class="dis_empty" id="dis_empty" style="display:none">
      <i class="fas fa-palette"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalDiseno">
    <div class="modalBody dis_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="dis_modal_tit" id="dis_modal_tit"><i class="fas fa-palette"></i> Agregar Herramienta</h2>
      <form id="dis_form">
        <div class="dis_form_row">
          <div class="dis_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="dis_nombre" type="text" placeholder="Ej: Canva" required></div>
          <div class="dis_form_g"><label><i class="fas fa-key"></i> ID</label><input id="dis_id" type="text" placeholder="canva" required></div>
        </div>
        <div class="dis_form_g"><label><i class="fas fa-link"></i> URL</label><input id="dis_url" type="url" placeholder="https://..." required></div>
        <div class="dis_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="dis_img" type="url" placeholder="https://..."></div>
        <div class="dis_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="dis_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="dis_form_row">
          <div class="dis_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="dis_tags" type="text" placeholder="gratis, UI, branding"></div>
          <div class="dis_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="dis_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="dis_form_actions">
          <button type="button" id="dis_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="dis_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`,F=()=>{const r=async(d=!1)=>{if(!d){const s=(v(u)||{}).data||[];if(s.length)return l=s,_()}i("#dis_grid").html(A);try{l=(await C(j(q(p,"diseno"),z("fecha","desc")))).docs.map(a=>({id:a.id,...a.data()})),H(u,{data:l},12),_()}catch(s){console.error("❌",s),i("#dis_grid").html('<div class="dis_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}},E=async()=>{localStorage.removeItem(u),l=[],c=[],m("#dis_refresh",!0,""),await r(!0),m("#dis_refresh",!1,""),i("#dis_refresh").html('<i class="fas fa-rotate-right"></i>'),o("Actualizado ✓","success")},_=()=>{const d=i("#dis_orden").val(),s=D(i("#dis_search").val().trim()),a={fav:(e,t)=>(t.favorito|0)-(e.favorito|0),reciente:(e,t)=>(t.fecha?.seconds||0)-(e.fecha?.seconds||0),antiguo:(e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)};c=[...l].sort(a[d]||a.fav),s&&(c=c.filter(e=>[e.nombre,e.descripcion,...e.tags||[]].some(t=>D(t).includes(s)))),g(c)},g=d=>{i("#dis_search").attr("placeholder",`Buscar en ${l.length} herramientas...`);const s=i("#dis_grid").empty();if(!d.length&&!n)return i("#dis_empty").fadeIn(200);i("#dis_empty").hide(),n&&s.append('<div class="dis_card dis_card_add" id="dis_agregar"><div class="dis_add_cnt"><div class="dis_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>'),d.length&&d.forEach((a,e)=>s.append(`
      <div class="dis_card" data-id="${a.id}" style="transition-delay:${Math.min(e*40,400)}ms">
        <div class="dis_card_img">
          <img src="${a.img||"/logo.webp"}" alt="${a.nombre}" loading="lazy">
          ${a.favorito?'<div class="dis_fav_badge"><i class="fas fa-star"></i></div>':""}
          <div class="dis_over">
            <a href="${a.url}" target="_blank" rel="noopener" class="dis_over_btn" ${f("Abrir")}><i class="fas fa-external-link-alt"></i></a>
            ${n?`<button class="dis_over_btn dis_edit" data-id="${a.id}" ${f("Editar")}><i class="fas fa-edit"></i></button><button class="dis_over_btn dis_del" data-id="${a.id}" ${f("Eliminar")}><i class="fas fa-trash"></i></button>`:""}
          </div>
        </div>
        <div class="dis_info"><h3>${a.nombre}</h3><p>${a.descripcion||""}</p>${a.tags?.length?`<div class="dis_tags">${a.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join("")}</div>`:""}</div>
      </div>`))};i("#dis_form").on("submit",async function(d){d.preventDefault();const s=i(this).data("editId"),a=s||`${k(i("#dis_id").val())}_${Date.now()}`,e={nombre:i("#dis_nombre").val().trim(),url:i("#dis_url").val().trim(),img:i("#dis_img").val().trim(),descripcion:i("#dis_desc").val().trim(),tags:i("#dis_tags").val().split(",").map(t=>t.trim()).filter(Boolean),favorito:+i("#dis_fav").val(),autor:v("wiSmile")?.usuario||"admin",fecha:x()};if(!e.nombre||!e.url)return o("Completa los campos","warning");m("#dis_save");try{await I(y(p,"diseno",a),e,{merge:!0}),o(s?"Actualizado ✓":"Guardado ✓","success"),w("modalDiseno"),await r(!0)}catch{o("Error al guardar","error")}finally{m("#dis_save",!1)}}),i(document).on("click",".dis_edit",function(d){d.stopPropagation();const s=l.find(a=>a.id===i(this).data("id"));s&&(i("#dis_modal_tit").html('<i class="fas fa-edit"></i> Editar Herramienta'),i("#dis_nombre").val(s.nombre),i("#dis_id").val(s.id).prop("readonly",!0),i("#dis_url").val(s.url),i("#dis_img").val(s.img),i("#dis_desc").val(s.descripcion),i("#dis_tags").val((s.tags||[]).join(", ")),i("#dis_fav").val(s.favorito||0),i("#dis_form").data("editId",s.id),$("modalDiseno"))}),i(document).on("click",".dis_del",async function(d){if(d.stopPropagation(),!!confirm("¿Eliminar?"))try{await S(y(p,"diseno",i(this).data("id"))),o("Eliminada ✓","success"),await r(!0)}catch{o("Error al eliminar","error")}}),i(document).on("click","#dis_agregar",()=>{i("#dis_form")[0].reset(),i("#dis_form").removeData("editId"),i("#dis_id").prop("readonly",!1),i("#dis_modal_tit").html('<i class="fas fa-palette"></i> Agregar Herramienta'),$("modalDiseno")}),i("#dis_nombre").on("input",function(){i("#dis_id").prop("readonly")||i("#dis_id").val(k(i(this).val()))});let h;i("#dis_search").on("input",function(){i("#dis_search_clr").toggle(!!i(this).val().trim()),clearTimeout(h),h=setTimeout(_,220)}),i("#dis_search_clr").on("click",()=>i("#dis_search").val("").trigger("input").focus()),i("#dis_cancel").on("click",()=>w("modalDiseno")),i("#dis_orden").on("change",_),i("#dis_refresh").on("click",E);let b=0;i(document).on("click",".dis_titulo",()=>{++b>=7&&(n=!0,b=0,g(c),o("¡Dios te Ama! 🙏","success"))}),r(),console.log(`🎨 Diseño · ${B()}`)},G=()=>{n=!!v("wiSmile"),console.log("🧹 Diseño")};export{G as cleanup,F as init,U as render};
