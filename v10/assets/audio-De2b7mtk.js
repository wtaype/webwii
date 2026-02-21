import{j as a}from"./vendor-gzd0YkcT.js";import{db as v}from"./firebase-Bsd4Yijj.js";import{s as D,d as y,b as S,c as j,e as x,q as z,f as q,o as C}from"./firebase-XdCz69j8.js";import{g as f,N as o,h as _,j as $,k as w,y as L,f as m,s as B}from"./main-BHXIGezt.js";import"./main-qn7PxiNE.js";const p="wii_audio";let l=[],c=[],u=!!f("wiSmile");const A=r=>(r||"").toLowerCase(),k=r=>r.trim().toLowerCase().replace(/\s+/g,""),E=Array(8).fill('<div class="aud_skel"><div class="aud_skel_img shimmer"></div><div class="aud_skel_t shimmer"></div><div class="aud_skel_s shimmer"></div></div>').join(""),F=()=>`
  <div class="aud_wrap">
    <div class="aud_topbar">
      <h1 class="aud_titulo">Herramientas de <span class="aud_grad">Audio IA</span></h1>
      <div class="aud_search_wrap">
        <i class="fas fa-search"></i>
        <input id="aud_search" type="text" placeholder="Buscar...">
        <button id="aud_search_clr" style="display:none"><i class="fas fa-times"></i></button>
      </div>
      <select id="aud_orden" class="aud_orden_sel">
        <option value="fav">⭐ Favoritos</option>
        <option value="reciente">🕐 Recientes</option>
        <option value="antiguo">📅 Antiguos</option>
      </select>
      <button id="aud_refresh" class="aud_refresh_btn" ${m("Actualizar")}><i class="fas fa-rotate-right"></i></button>
    </div>
    <div class="aud_grid" id="aud_grid">${E}</div>
    <div class="aud_empty" id="aud_empty" style="display:none">
      <i class="fas fa-headphones"></i><h3>Sin resultados</h3><p>Intenta con otros términos</p>
    </div>
  </div>
  <div class="wiModal" id="modalAudio">
    <div class="modalBody aud_modal_body">
      <button class="modalX"><i class="fas fa-times"></i></button>
      <h2 class="aud_modal_tit" id="aud_modal_tit"><i class="fas fa-headphones"></i> Agregar Herramienta</h2>
      <form id="aud_form">
        <div class="aud_form_row">
          <div class="aud_form_g"><label><i class="fas fa-heading"></i> Nombre</label><input id="aud_nombre" type="text" placeholder="Ej: ElevenLabs" required></div>
          <div class="aud_form_g"><label><i class="fas fa-key"></i> ID</label><input id="aud_id" type="text" placeholder="elevenlabs" required></div>
        </div>
        <div class="aud_form_g"><label><i class="fas fa-link"></i> URL</label><input id="aud_url" type="url" placeholder="https://..." required></div>
        <div class="aud_form_g"><label><i class="fas fa-image"></i> URL imagen/logo</label><input id="aud_img" type="url" placeholder="https://..."></div>
        <div class="aud_form_g"><label><i class="fas fa-align-left"></i> Descripción</label><textarea id="aud_desc" placeholder="Describe la herramienta..." rows="3" required></textarea></div>
        <div class="aud_form_row">
          <div class="aud_form_g"><label><i class="fas fa-tags"></i> Tags</label><input id="aud_tags" type="text" placeholder="voz, música, gratis"></div>
          <div class="aud_form_g"><label><i class="fas fa-star"></i> Favorito</label><select id="aud_fav"><option value="0">No</option><option value="1">Sí ⭐</option></select></div>
        </div>
        <div class="aud_form_actions">
          <button type="button" id="aud_cancel"><i class="fas fa-times"></i> Cancelar</button>
          <button type="submit" id="aud_save"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  </div>`,G=()=>{const r=async(e=!1)=>{if(!e){const i=(f(p)||{}).data||[];if(i.length)return l=i,n()}a("#aud_grid").html(E);try{l=(await x(z(q(v,"audio"),C("fecha","desc")))).docs.map(d=>({id:d.id,...d.data()})),B(p,{data:l},12),n()}catch(i){console.error("❌",i),a("#aud_grid").html('<div class="aud_err"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar</p></div>')}},I=async()=>{localStorage.removeItem(p),l=[],c=[],_("#aud_refresh",!0,""),await r(!0),_("#aud_refresh",!1,""),a("#aud_refresh").html('<i class="fas fa-rotate-right"></i>'),o("Actualizado ✓","success")},n=()=>{const e=a("#aud_orden").val(),i=A(a("#aud_search").val().trim()),d={fav:(s,t)=>(t.favorito|0)-(s.favorito|0),reciente:(s,t)=>(t.fecha?.seconds||0)-(s.fecha?.seconds||0),antiguo:(s,t)=>(s.fecha?.seconds||0)-(t.fecha?.seconds||0)};c=[...l].sort(d[e]||d.fav),i&&(c=c.filter(s=>[s.nombre,s.descripcion,...s.tags||[]].some(t=>A(t).includes(i)))),g(c)},g=e=>{a("#aud_search").attr("placeholder",`Buscar en ${l.length} herramientas...`);const i=a("#aud_grid").empty();if(!e.length&&!u)return a("#aud_empty").fadeIn(200);a("#aud_empty").hide(),u&&i.append('<div class="aud_card aud_card_add" id="aud_agregar"><div class="aud_add_cnt"><div class="aud_add_ico"><i class="fas fa-plus"></i></div><h3>Agregar</h3><p>Nueva herramienta</p></div></div>'),e.length&&e.forEach((d,s)=>i.append(`
      <div class="aud_card" data-id="${d.id}" style="transition-delay:${Math.min(s*40,400)}ms">
        <div class="aud_card_img">
          <img src="${d.img||"/logo.webp"}" alt="${d.nombre}" loading="lazy">
          ${d.favorito?'<div class="aud_fav_badge"><i class="fas fa-star"></i></div>':""}
          <div class="aud_over">
            <a href="${d.url}" target="_blank" rel="noopener" class="aud_over_btn" ${m("Abrir")}><i class="fas fa-external-link-alt"></i></a>
            ${u?`<button class="aud_over_btn aud_edit" data-id="${d.id}" ${m("Editar")}><i class="fas fa-edit"></i></button><button class="aud_over_btn aud_del" data-id="${d.id}" ${m("Eliminar")}><i class="fas fa-trash"></i></button>`:""}
          </div>
        </div>
        <div class="aud_info"><h3>${d.nombre}</h3><p>${d.descripcion||""}</p>${d.tags?.length?`<div class="aud_tags">${d.tags.slice(0,3).map(t=>`<span>#${t}</span>`).join("")}</div>`:""}</div>
      </div>`))};a("#aud_form").on("submit",async function(e){e.preventDefault();const i=a(this).data("editId"),d=i||`${k(a("#aud_id").val())}_${Date.now()}`,s={nombre:a("#aud_nombre").val().trim(),url:a("#aud_url").val().trim(),img:a("#aud_img").val().trim(),descripcion:a("#aud_desc").val().trim(),tags:a("#aud_tags").val().split(",").map(t=>t.trim()).filter(Boolean),favorito:+a("#aud_fav").val(),autor:f("wiSmile")?.usuario||"admin",fecha:j()};if(!s.nombre||!s.url)return o("Completa los campos","warning");_("#aud_save");try{await D(y(v,"audio",d),s,{merge:!0}),o(i?"Actualizado ✓":"Guardado ✓","success"),$("modalAudio"),await r(!0)}catch{o("Error al guardar","error")}finally{_("#aud_save",!1)}}),a(document).on("click",".aud_edit",function(e){e.stopPropagation();const i=l.find(d=>d.id===a(this).data("id"));i&&(a("#aud_modal_tit").html('<i class="fas fa-edit"></i> Editar Herramienta'),a("#aud_nombre").val(i.nombre),a("#aud_id").val(i.id).prop("readonly",!0),a("#aud_url").val(i.url),a("#aud_img").val(i.img),a("#aud_desc").val(i.descripcion),a("#aud_tags").val((i.tags||[]).join(", ")),a("#aud_fav").val(i.favorito||0),a("#aud_form").data("editId",i.id),w("modalAudio"))}),a(document).on("click",".aud_del",async function(e){if(e.stopPropagation(),!!confirm("¿Eliminar?"))try{await S(y(v,"audio",a(this).data("id"))),o("Eliminada ✓","success"),await r(!0)}catch{o("Error al eliminar","error")}}),a(document).on("click","#aud_agregar",()=>{a("#aud_form")[0].reset(),a("#aud_form").removeData("editId"),a("#aud_id").prop("readonly",!1),a("#aud_modal_tit").html('<i class="fas fa-headphones"></i> Agregar Herramienta'),w("modalAudio")}),a("#aud_nombre").on("input",function(){a("#aud_id").prop("readonly")||a("#aud_id").val(k(a(this).val()))});let h;a("#aud_search").on("input",function(){a("#aud_search_clr").toggle(!!a(this).val().trim()),clearTimeout(h),h=setTimeout(n,220)}),a("#aud_search_clr").on("click",()=>a("#aud_search").val("").trigger("input").focus()),a("#aud_cancel").on("click",()=>$("modalAudio")),a("#aud_orden").on("change",n),a("#aud_refresh").on("click",I);let b=0;a(document).on("click",".aud_titulo",()=>{++b>=7&&(u=!0,b=0,g(c),o("¡Dios te Ama! 🙏","success"))}),r(),console.log(`🎵 Audio · ${L()}`)},P=()=>{u=!!f("wiSmile"),console.log("🧹 Audio")};export{P as cleanup,G as init,F as render};
