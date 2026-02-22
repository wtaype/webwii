import{j as t}from"./vendor-gzd0YkcT.js";import{a as l,l as v,b as u,v as p,w as o,S as h,d as s,y as r}from"./main-QiU_4_Cu.js";import"./main-BWatBalw.js";const g=["Centro de IA 🤖","Herramientas listas ✨","Totalmente gratis 💙","Organizado para ti 🗂️"],b=[{valor:50,label:"Herramientas IA",sufijo:"+"},{valor:9,label:"Categorías",sufijo:""},{valor:100,label:"Gratis",sufijo:"%"},{valor:2026,label:"Actualizado",sufijo:""}],d=[{id:"imagen",icon:"fa-image",emoji:"🖼️",color:"#0EBEFF",nombre:"Imagen",desc:"Genera imágenes increíbles con IA",tools:[{name:"Ideogram",desc:"Imágenes con texto preciso",icon:"fa-pen-ruler",url:"https://ideogram.ai"},{name:"ChatGPT",desc:"Texto + imagen + edición",icon:"fa-robot",url:"https://chat.openai.com"},{name:"Qwen",desc:"Modelo multilingüe de alto nivel",icon:"fa-globe",url:"https://qwen.ai"}]},{id:"video",icon:"fa-film",emoji:"🎬",color:"#FF4D4D",nombre:"Video",desc:"Edita y genera videos con IA",tools:[{name:"Runway",desc:"Generación de video estilo cine",icon:"fa-wand-magic-sparkles",url:"https://runwayml.com"},{name:"CapCut",desc:"Edición simple y rápida",icon:"fa-scissors",url:"https://www.capcut.com"},{name:"Kling AI",desc:"Video realista con IA",icon:"fa-clapperboard",url:"https://klingai.com"}]},{id:"audio",icon:"fa-headphones",emoji:"🎧",color:"#00C9A7",nombre:"Audio",desc:"Clona y genera voces con IA",tools:[{name:"ElevenLabs",desc:"Voces hiperrealistas",icon:"fa-microphone",url:"https://elevenlabs.io"},{name:"Murf AI",desc:"Locuciones para videos",icon:"fa-volume-high",url:"https://murf.ai"},{name:"PlayHT",desc:"Podcasts con IA",icon:"fa-podcast",url:"https://play.ht"}]},{id:"ideas",icon:"fa-lightbulb",emoji:"💡",color:"#FFB800",nombre:"Ideas",desc:"Inspírate y encuentra tendencias",tools:[{name:"Google Trends",desc:"Tendencias en tiempo real",icon:"fa-chart-line",url:"https://trends.google.com"},{name:"ChatGPT",desc:"IA multidisciplinaria",icon:"fa-robot",url:"https://chat.openai.com"},{name:"Pinterest",desc:"Motor de ideas creativo",icon:"fa-thumbtack",url:"https://www.pinterest.com"}]},{id:"diseno",icon:"fa-palette",emoji:"🎨",color:"#29C72E",nombre:"Diseño",desc:"Diseña con potencia de IA",tools:[{name:"Canva",desc:"Diseño gráfico multiplataforma",icon:"fa-pen-nib",url:"https://www.canva.com"},{name:"Figma",desc:"UI/UX colaborativo",icon:"fa-vector-square",url:"https://www.figma.com"},{name:"Photoshop",desc:"Adobe Firefly IA profesional",icon:"fa-layer-group",url:"https://www.adobe.com/products/photoshop.html"}]},{id:"escritura",icon:"fa-pen-nib",emoji:"✍️",color:"#7000FF",nombre:"Escritura",desc:"Redacta y razona con IA",tools:[{name:"Claude",desc:"Razonamiento profundo y largo",icon:"fa-brain",url:"https://claude.ai"},{name:"Gemini",desc:"IA multimodal de Google",icon:"fa-google",url:"https://gemini.google.com"},{name:"DeepSeek",desc:"Modelo técnico avanzado",icon:"fa-code",url:"https://deepseek.com"}]},{id:"avatares",icon:"fa-user-astronaut",emoji:"🎭",color:"#FF5C69",nombre:"Avatares",desc:"Crea presentadores y avatares con IA",tools:[{name:"HeyGen",desc:"Avatares con traducción de labios",icon:"fa-video",url:"https://www.heygen.com"},{name:"Synthesia",desc:"Presentadores IA para empresas",icon:"fa-person-chalkboard",url:"https://www.synthesia.io"},{name:"Creatify",desc:"Anuncios de video con IA",icon:"fa-bullhorn",url:"https://creatify.ai"}]},{id:"favoritos",icon:"fa-star",emoji:"⭐",color:"#F59E0B",nombre:"Favoritos",desc:"Las herramientas más populares y recomendadas",tools:[{name:"ChatGPT",desc:"El más usado en el mundo",icon:"fa-robot",url:"https://chat.openai.com"},{name:"Canva",desc:"Diseño para todos",icon:"fa-pen-nib",url:"https://www.canva.com"},{name:"ElevenLabs",desc:"Mejor voz IA del mercado",icon:"fa-microphone",url:"https://elevenlabs.io"}]},{id:"otros",icon:"fa-sparkles",emoji:"🌟",color:"#FF8C00",nombre:"Otros",desc:"Más herramientas IA increíbles",tools:[{name:"Perplexity",desc:"Buscador inteligente con IA",icon:"fa-magnifying-glass",url:"https://www.perplexity.ai"},{name:"Notion AI",desc:"Organiza y escribe con IA",icon:"fa-table-columns",url:"https://www.notion.so"},{name:"Gamma",desc:"Presentaciones con IA automáticas",icon:"fa-display",url:"https://gamma.app"}]}],y=()=>`
  <div class="ini_wrap">

    <section class="ini_hero">
      <div class="ini_hero_content">
        <div class="ini_saludo"><span>${h()} Bienvenido!</span><span class="ini_wave">👋</span></div>
        <h1 class="ini_titulo">Explora el mejor <span class="ini_grad">Centro de IA</span></h1>
        <div class="ini_roles">
          ${g.map((i,a)=>`<span class="ini_role${a===0?" active":""}">${i}</span>`).join("")}
        </div>
        <p class="ini_sub">Descubre, usa y domina las mejores herramientas de Inteligencia Artificial. Organizadas por categoría, listas para usar. 100% gratis.</p>
        <div class="ini_stats" id="in_stats">
          ${b.map(i=>`
            <div class="ini_stat">
              <div class="ini_stat_n" data-target="${i.valor}" data-sufijo="${i.sufijo}">0</div>
              <div class="ini_stat_l">${i.label}</div>
            </div>`).join("")}
        </div>
        <div class="ini_btns">
          <a href="/imagen" class="ini_btn_p"><i class="fas fa-rocket"></i> Explorar IA</a>
          <a href="/acerca" class="ini_btn_s"><i class="fas fa-circle-info"></i> Saber más</a>
        </div>
      </div>

      <div class="ini_hero_visual">
        <div class="ini_profile_container">
          <div class="ini_profile_ring"></div>
          <div class="ini_profile_ring ini_ring2"></div>
          <img src="/webwii/logo.webp" alt="${l}" class="ini_profile_img" loading="lazy"/>
          <div class="ini_profile_badge"><i class="fas fa-circle"></i> Online</div>
        </div>
        <div class="ini_ftech ini_ft1" ${s("Imágenes IA")}><i class="fas fa-image"></i></div>
        <div class="ini_ftech ini_ft2" ${s("Videos IA")}><i class="fas fa-film"></i></div>
        <div class="ini_ftech ini_ft3" ${s("Audio IA")}><i class="fas fa-headphones"></i></div>
        <div class="ini_ftech ini_ft4" ${s("Escritura IA")}><i class="fas fa-pen-nib"></i></div>
      </div>
    </section>

    <section id="in_cats" class="ini_cats_sec">
      <div class="ini_sec_head">
        <h2 class="ini_sec_tit">Categorías <span class="ini_grad">de IA</span></h2>
        <div class="ini_sec_line"></div>
        <p class="ini_sec_desc">9 categorías con las mejores herramientas organizadas para ti</p>
      </div>
      <div class="ini_cats_grid">
        ${d.map(i=>`
          <div class="ini_cat_card" style="--cc:${i.color}" id="in_cat_${i.id}">
            <div class="ini_cat_bar"></div>
            <div class="ini_cat_top">
              <div class="ini_cat_ico"><i class="fas ${i.icon}"></i></div>
              <div class="ini_cat_info"><h3>${i.emoji} ${i.nombre}</h3><p>${i.desc}</p></div>
            </div>
            <ul class="ini_cat_tools">
              ${i.tools.map(a=>`
                <li><a href="${a.url}" target="_blank" rel="noopener" class="ini_tool_a">
                  <i class="fas ${a.icon}"></i>
                  <div><strong>${a.name}</strong><span>${a.desc}</span></div>
                  <i class="fas fa-arrow-up-right-from-square ini_ext"></i>
                </a></li>`).join("")}
            </ul>
          </div>`).join("")}
      </div>
    </section>

    <section id="in_about" class="ini_about_sec">
      <div class="ini_sec_head">
        <h2 class="ini_sec_tit">¿Qué es <span class="ini_grad">${l}?</span></h2>
        <div class="ini_sec_line"></div>
      </div>
      <div class="ini_about_grid">
        <div class="ini_about_card" id="in_ac1">
          <div class="ini_card_ico"><i class="fas fa-brain"></i></div>
          <h3>Nuestra Misión</h3>
          <p>Hacer que cualquier persona pueda descubrir y dominar las herramientas de IA más modernas, sin complicaciones y totalmente gratis.</p>
        </div>
        <div class="ini_about_card" id="in_ac2">
          <div class="ini_card_ico"><i class="fas fa-layer-group"></i></div>
          <h3>Organizado</h3>
          <ul class="ini_check_list">
            <li><i class="fas fa-check-circle"></i> 9 categorías temáticas</li>
            <li><i class="fas fa-check-circle"></i> 50+ herramientas IA</li>
            <li><i class="fas fa-check-circle"></i> Descripciones claras</li>
            <li><i class="fas fa-check-circle"></i> Links directos oficiales</li>
          </ul>
        </div>
        <div class="ini_about_card" id="in_ac3">
          <div class="ini_card_ico"><i class="fas fa-rocket"></i></div>
          <h3>Siempre Actualizado</h3>
          <p>Mantenemos el directorio actualizado con las IAs más modernas y tendencias del ${r()} para que siempre tengas lo mejor.</p>
        </div>
      </div>
    </section>

    <section id="in_cta" class="ini_cta_sec">
      <div class="ini_cta_wrap">
        <i class="fas fa-wand-magic-sparkles ini_cta_ico"></i>
        <h2>¿Listo para explorar?</h2>
        <p>Elige la categoría que más te interese y empieza ahora</p>
        <div class="ini_cta_chips">
          ${d.map(i=>`
            <a href="${i.tools[0].url}" target="_blank" rel="noopener"
               class="ini_chip" style="--cc:${i.color}" ${s(i.desc)}>
              <i class="fas ${i.icon}"></i> ${i.nombre}
            </a>`).join("")}
        </div>
        <p class="ini_cta_autor">Creado con ❤️ por <a href="${v}" target="_blank" rel="noopener">${u}</a> · ${p} © ${r()}</p>
      </div>
    </section>

  </div>
`,j=()=>{let i=0;const a=t(".ini_role");setInterval(()=>{a.removeClass("active"),a.eq(i=(i+1)%a.length).addClass("active")},3e3),o("#in_stats",(m,w)=>{t(m).find(".ini_stat_n").each(function(){const e=t(this),n=+e.data("target"),_=e.data("sufijo")||"";let c=0;const f=setInterval(()=>{c+=n/50,c>=n?(e.text(n+_),clearInterval(f)):e.text(Math.floor(c))},30)})}),o(".ini_cat_card",null,{anim:"wi_fadeUp",stagger:80}),o(".ini_about_card",null,{anim:"wi_fadeUp",stagger:150}),o(".ini_cta_wrap",null,{anim:"wi_fadeUp"}),console.log(`🤖 ${l} ${p} - Inicio cargado`)},C=()=>console.log("🧹 Inicio limpiado");export{C as cleanup,j as init,y as render};
