import{j as o}from"./vendor-gzd0YkcT.js";import{a as c,v as r,l as t,b as n,w as s,c as d,y as e,d as _}from"./main-CML6jtkv.js";import"./main-DQHh3IIT.js";const p=[{num:"50+",label:"Herramientas",icon:"fa-robot"},{num:"7",label:"Categorías",icon:"fa-layer-group"},{num:"100%",label:"Gratis",icon:"fa-heart"},{num:e(),label:"Actualizado",icon:"fa-calendar-check"}],m=[{icon:"fa-bolt",color:"Cielo",titulo:"Acceso Inmediato",desc:"Sin registro ni pasos. Entra y usa cualquier herramienta IA en segundos."},{icon:"fa-wand-magic-sparkles",color:"Dulce",titulo:"Prompts Incluidos",desc:"Cada herramienta incluye prompts recomendados listos para copiar y usar."},{icon:"fa-layer-group",color:"Paz",titulo:"Todo Organizado",desc:"7 categorías temáticas con más de 50 herramientas clasificadas."},{icon:"fa-rotate-right",color:"Mora",titulo:"Siempre Actualizado",desc:"Añadimos constantemente las IAs más nuevas y populares del mercado."},{icon:"fa-mobile-screen",color:"Cielo",titulo:"100% Responsive",desc:"Diseño optimizado para verse perfecto en todos tus dispositivos."},{icon:"fa-palette",color:"Dulce",titulo:"5 Temas de Color",desc:"Personaliza tu experiencia con 5 temas visuales únicos."}],i=[{num:"1",icon:"fa-compass",titulo:"Explora",desc:"Navega por las categorías y descubre herramientas de IA increíbles."},{num:"2",icon:"fa-copy",titulo:"Copia",desc:"Toma los prompts recomendados directamente desde cada herramienta."},{num:"3",icon:"fa-rocket",titulo:"¡Úsala!",desc:"Abre la herramienta y comienza a crear con el poder de la IA."}],v=[{icon:"fab fa-js",label:"JavaScript ES6+"},{icon:"fab fa-css3-alt",label:"CSS3 Moderno"},{icon:"fab fa-html5",label:"HTML5 Semántico"},{icon:"fas fa-fire",label:"Firebase"},{icon:"fas fa-bolt",label:"Vite"},{icon:"fas fa-mobile-screen",label:"Responsive"}],u=[{nombre:"YouTube",icon:"fab fa-youtube",url:"https://youtube.com",seguidores:"10K+",color:"#FF0000",desc:"Videos y tutoriales de IA"},{nombre:"TikTok",icon:"fab fa-tiktok",url:"https://tiktok.com",seguidores:"50K+",color:"#000000",desc:"Tips rápidos de herramientas IA"},{nombre:"Instagram",icon:"fab fa-instagram",url:"https://instagram.com",seguidores:"15K+",color:"#E4405F",desc:"Diseños e inspiración visual"},{nombre:"Facebook",icon:"fab fa-facebook",url:"https://facebook.com",seguidores:"25K+",color:"#1877F2",desc:"Comunidad y novedades diarias"}],b=()=>`
  <div class="ac_wrap">

    <!-- ══ HERO ══ -->
    <section class="ac_hero">
      <div class="ac_hero_orb ac_orb1"></div>
      <div class="ac_hero_orb ac_orb2"></div>
      <div class="ac_hero_body">
        <div class="ac_hero_logo">
          <img src="/logo.webp" alt="${c}" loading="lazy">
        </div>
        <div class="ac_hero_badge"><i class="fas fa-robot"></i> Centro de Inteligencia Artificial</div>
        <h1 class="ac_hero_tit">${c}</h1>
        <p class="ac_hero_sub">
          Descubre, usa y domina las mejores <strong>herramientas de IA</strong> del mundo.
          Organizadas, listas y completamente gratis para ti.
        </p>
        <div class="ac_hero_stats">
          ${p.map(a=>`
            <div class="ac_stat">
              <i class="fas ${a.icon}"></i>
              <strong>${a.num}</strong>
              <span>${a.label}</span>
            </div>`).join("")}
        </div>
        <div class="ac_hero_btns">
          <a href="/imagen" class="ac_btn_p"><i class="fas fa-rocket"></i> Explorar IA</a>
          <button class="ac_btn_s" id="ac_compartir"><i class="fas fa-share-nodes"></i> Compartir</button>
        </div>
      </div>
    </section>

    <!-- ══ FEATURES ══ -->
    <section class="ac_sec">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-star"></i> ¿Qué ofrecemos?</div>
        <h2 class="ac_sec_tit">Todo lo que necesitas <span class="ac_grad">en un lugar</span></h2>
      </div>
      <div class="ac_feat_grid">
        ${m.map(a=>`
          <div class="ac_feat_card wi_fadeUp ac_color_${a.color.toLowerCase()}">
            <div class="ac_feat_ico"><i class="fas ${a.icon}"></i></div>
            <h3>${a.titulo}</h3>
            <p>${a.desc}</p>
          </div>`).join("")}
      </div>
    </section>

    <!-- ══ CÓMO FUNCIONA ══ -->
    <section class="ac_sec ac_sec_alt">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-route"></i> Cómo funciona</div>
        <h2 class="ac_sec_tit">3 pasos para <span class="ac_grad">empezar ahora</span></h2>
      </div>
      <div class="ac_pasos">
        ${i.map((a,l)=>`
          <div class="ac_paso wi_fadeUp">
            <div class="ac_paso_num">${a.num}</div>
            <div class="ac_paso_ico"><i class="fas ${a.icon}"></i></div>
            <h3>${a.titulo}</h3>
            <p>${a.desc}</p>
          </div>
          ${l<i.length-1?'<div class="ac_paso_sep"><i class="fas fa-chevron-right"></i></div>':""}`).join("")}
      </div>
    </section>

    <!-- ══ MISIÓN / VISIÓN ══ -->
    <section class="ac_sec">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-bullseye"></i> Misión y Visión</div>
        <h2 class="ac_sec_tit">Lo que nos <span class="ac_grad">mueve</span></h2>
      </div>
      <div class="ac_mv_grid">
        <div class="ac_mv_card wi_fadeUp">
          <div class="ac_mv_ico"><i class="fas fa-bullseye"></i></div>
          <h3>Nuestra Misión</h3>
          <p>Hacer que cualquier persona pueda descubrir y dominar las herramientas de IA más modernas, sin complicaciones y totalmente gratis. Democratizar el acceso a la inteligencia artificial.</p>
        </div>
        <div class="ac_mv_card wi_fadeUp">
          <div class="ac_mv_ico"><i class="fas fa-eye"></i></div>
          <h3>Nuestra Visión</h3>
          <p>Convertirnos en el directorio de IA más completo y actualizado en español, siendo el punto de partida para millones de personas que quieren aprovechar el poder de la inteligencia artificial.</p>
        </div>
        <div class="ac_mv_card wi_fadeUp">
          <div class="ac_mv_ico"><i class="fas fa-hands-praying"></i></div>
          <h3>Nuestros Valores</h3>
          <p>Gratuidad, transparencia, actualización constante y accesibilidad para todos. Creemos que la tecnología debe estar al alcance de cada persona, sin importar su nivel técnico.</p>
        </div>
      </div>
    </section>

    <!-- ══ REDES ══ -->
    <section class="ac_sec ac_sec_alt">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-share-nodes"></i> Síguenos</div>
        <h2 class="ac_sec_tit">Encuéntranos en <span class="ac_grad">redes sociales</span></h2>
      </div>
      <div class="ac_redes_grid">
        ${u.map(a=>`
          <a href="${a.url}" target="_blank" rel="noopener" class="ac_red_card wi_fadeUp"
             style="--rc:${a.color}" ${_(`Ir a ${a.nombre}`)}>
            <div class="ac_red_ico"><i class="${a.icon}"></i></div>
            <h3>${a.nombre}</h3>
            <span class="ac_red_subs">${a.seguidores} seguidores</span>
            <p>${a.desc}</p>
            <div class="ac_red_btn">Seguir <i class="fas fa-arrow-right"></i></div>
          </a>`).join("")}
      </div>
    </section>

    <!-- ══ TECNOLOGÍA ══ -->
    <section class="ac_sec">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-code"></i> Stack técnico</div>
        <h2 class="ac_sec_tit">Construido con <span class="ac_grad">lo mejor</span></h2>
      </div>
      <div class="ac_tech_grid">
        ${v.map(a=>`
          <div class="ac_tech_item wi_fadeUp">
            <i class="${a.icon}"></i>
            <span>${a.label}</span>
          </div>`).join("")}
      </div>
    </section>

    <!-- ══ CTA ══ -->
    <section class="ac_cta_sec">
      <div class="ac_cta_wrap wi_fadeUp">
        <div class="ac_cta_glow"></div>
        <div class="ac_cta_inner">
          <span class="ac_cta_emoji">💙</span>
          <h2>¿Listo para empezar?</h2>
          <p>Explora más de 50 herramientas de IA organizadas y listas para usar</p>
          <div class="ac_cta_btns">
            <a href="/imagen" class="ac_btn_p"><i class="fas fa-rocket"></i> Explorar Ahora</a>
            <a href="/" class="ac_btn_s"><i class="fas fa-house"></i> Ir al Inicio</a>
          </div>
          <p class="ac_footer_txt">
            ${c} ${r} · Hecho con <i class="fas fa-heart"></i> por
            <a href="${t}" target="_blank" rel="noopener">${n}</a> · ${e()}
          </p>
        </div>
      </div>
    </section>

  </div>`,$=()=>{s(".ac_feat_card",null,{anim:"wi_fadeUp",stagger:80}),s(".ac_paso",null,{anim:"wi_fadeUp",stagger:120}),s(".ac_mv_card",null,{anim:"wi_fadeUp",stagger:100}),s(".ac_red_card",null,{anim:"wi_fadeUp",stagger:80}),s(".ac_tech_item",null,{anim:"wi_fadeUp",stagger:60}),s(".ac_cta_wrap",null,{anim:"wi_fadeUp"}),o("#ac_compartir").on("click",function(){const a="https://webwii.web.app/";navigator.share?navigator.share({title:`${c}`,text:`💙 ${c} — Centro de Herramientas de IA`,url:a}).catch(()=>{}):d(a,this,"¡Link copiado! ✨")}),console.log(`📖 ${c} ${r} · Acerca ${e()}`)},y=()=>{o("#ac_compartir").off("click"),console.log("🧹 Acerca")};export{y as cleanup,$ as init,b as render};
