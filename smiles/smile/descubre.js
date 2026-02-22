import './descubre.css';
import $ from 'jquery';
import { app, version, autor, link } from '../wii.js';
import { wiVista, year, wiTip, wicopy } from '../widev.js';

// ============================================================
// 📦 DATA
// ============================================================
const stats = [
  { num: '50+',  label: 'Herramientas',  icon: 'fa-robot' },
  { num: '7',    label: 'Categorías',    icon: 'fa-layer-group' },
  { num: '100%', label: 'Gratis',        icon: 'fa-heart' },
  { num: year(), label: 'Actualizado',   icon: 'fa-calendar-check' },
];

const features = [
  { icon: 'fa-bolt',               color: 'Cielo', titulo: 'Acceso Inmediato',     desc: 'Sin registro ni pasos. Entra y usa cualquier herramienta IA en segundos.' },
  { icon: 'fa-wand-magic-sparkles',color: 'Dulce', titulo: 'Prompts Incluidos',    desc: 'Cada herramienta incluye prompts recomendados listos para copiar y usar.' },
  { icon: 'fa-layer-group',        color: 'Paz',   titulo: 'Todo Organizado',      desc: '7 categorías temáticas con más de 50 herramientas clasificadas.' },
  { icon: 'fa-rotate-right',       color: 'Mora',  titulo: 'Siempre Actualizado',  desc: 'Añadimos constantemente las IAs más nuevas y populares del mercado.' },
  { icon: 'fa-mobile-screen',      color: 'Cielo', titulo: '100% Responsive',      desc: 'Diseño optimizado para verse perfecto en todos tus dispositivos.' },
  { icon: 'fa-palette',            color: 'Dulce', titulo: '5 Temas de Color',     desc: 'Personaliza tu experiencia con 5 temas visuales únicos.' },
];

const pasos = [
  { num: '1', icon: 'fa-compass',   titulo: 'Explora',   desc: 'Navega por las categorías y descubre herramientas de IA increíbles.' },
  { num: '2', icon: 'fa-copy',      titulo: 'Copia',     desc: 'Toma los prompts recomendados directamente desde cada herramienta.' },
  { num: '3', icon: 'fa-rocket',    titulo: '¡Úsala!',   desc: 'Abre la herramienta y comienza a crear con el poder de la IA.' },
];

const tecnologias = [
  { icon: 'fab fa-js',         label: 'JavaScript ES6+' },
  { icon: 'fab fa-css3-alt',   label: 'CSS3 Moderno' },
  { icon: 'fab fa-html5',      label: 'HTML5 Semántico' },
  { icon: 'fas fa-fire',       label: 'Firebase' },
  { icon: 'fas fa-bolt',       label: 'Vite' },
  { icon: 'fas fa-mobile-screen', label: 'Responsive' },
];

const redes = [
  { nombre: 'YouTube',   icon: 'fab fa-youtube',   url: 'https://youtube.com', seguidores: '10K+',  color: '#FF0000', desc: 'Videos y tutoriales de IA' },
  { nombre: 'TikTok',    icon: 'fab fa-tiktok',    url: 'https://tiktok.com',  seguidores: '50K+',  color: '#000000', desc: 'Tips rápidos de herramientas IA' },
  { nombre: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com',seguidores: '15K+', color: '#E4405F', desc: 'Diseños e inspiración visual' },
  { nombre: 'Facebook',  icon: 'fab fa-facebook',  url: 'https://facebook.com',seguidores: '25K+',  color: '#1877F2', desc: 'Comunidad y novedades diarias' },
];

// ============================================================
// 🎨 RENDER
// ============================================================
export const render = () => `
  <div class="ac_wrap">

    <!-- ══ HERO ══ -->
    <section class="ac_hero">
      <div class="ac_hero_orb ac_orb1"></div>
      <div class="ac_hero_orb ac_orb2"></div>
      <div class="ac_hero_body">
        <div class="ac_hero_logo">
          <img src="/logo.webp" alt="${app}" loading="lazy">
        </div>
        <div class="ac_hero_badge"><i class="fas fa-robot"></i> Centro de Inteligencia Artificial</div>
        <h1 class="ac_hero_tit">${app}</h1>
        <p class="ac_hero_sub">
          Descubre, usa y domina las mejores <strong>herramientas de IA</strong> del mundo.
          Organizadas, listas y completamente gratis para ti.
        </p>
        <div class="ac_hero_stats">
          ${stats.map(s => `
            <div class="ac_stat">
              <i class="fas ${s.icon}"></i>
              <strong>${s.num}</strong>
              <span>${s.label}</span>
            </div>`).join('')}
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
        ${features.map(f => `
          <div class="ac_feat_card wi_fadeUp ac_color_${f.color.toLowerCase()}">
            <div class="ac_feat_ico"><i class="fas ${f.icon}"></i></div>
            <h3>${f.titulo}</h3>
            <p>${f.desc}</p>
          </div>`).join('')}
      </div>
    </section>

    <!-- ══ CÓMO FUNCIONA ══ -->
    <section class="ac_sec ac_sec_alt">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-route"></i> Cómo funciona</div>
        <h2 class="ac_sec_tit">3 pasos para <span class="ac_grad">empezar ahora</span></h2>
      </div>
      <div class="ac_pasos">
        ${pasos.map((p, i) => `
          <div class="ac_paso wi_fadeUp">
            <div class="ac_paso_num">${p.num}</div>
            <div class="ac_paso_ico"><i class="fas ${p.icon}"></i></div>
            <h3>${p.titulo}</h3>
            <p>${p.desc}</p>
          </div>
          ${i < pasos.length - 1 ? '<div class="ac_paso_sep"><i class="fas fa-chevron-right"></i></div>' : ''}`
        ).join('')}
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
        ${redes.map(r => `
          <a href="${r.url}" target="_blank" rel="noopener" class="ac_red_card wi_fadeUp"
             style="--rc:${r.color}" ${wiTip(`Ir a ${r.nombre}`)}>
            <div class="ac_red_ico"><i class="${r.icon}"></i></div>
            <h3>${r.nombre}</h3>
            <span class="ac_red_subs">${r.seguidores} seguidores</span>
            <p>${r.desc}</p>
            <div class="ac_red_btn">Seguir <i class="fas fa-arrow-right"></i></div>
          </a>`).join('')}
      </div>
    </section>

    <!-- ══ TECNOLOGÍA ══ -->
    <section class="ac_sec">
      <div class="ac_sec_head">
        <div class="ac_sec_badge"><i class="fas fa-code"></i> Stack técnico</div>
        <h2 class="ac_sec_tit">Construido con <span class="ac_grad">lo mejor</span></h2>
      </div>
      <div class="ac_tech_grid">
        ${tecnologias.map(t => `
          <div class="ac_tech_item wi_fadeUp">
            <i class="${t.icon}"></i>
            <span>${t.label}</span>
          </div>`).join('')}
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
            ${app} ${version} · Hecho con <i class="fas fa-heart"></i> por
            <a href="${link}" target="_blank" rel="noopener">${autor}</a> · ${year()}
          </p>
        </div>
      </div>
    </section>

  </div>`;

// ============================================================
// ⚡ INIT
// ============================================================
export const init = () => {
  wiVista('.ac_feat_card',  null, { anim: 'wi_fadeUp', stagger: 80 });
  wiVista('.ac_paso',       null, { anim: 'wi_fadeUp', stagger: 120 });
  wiVista('.ac_mv_card',    null, { anim: 'wi_fadeUp', stagger: 100 });
  wiVista('.ac_red_card',   null, { anim: 'wi_fadeUp', stagger: 80 });
  wiVista('.ac_tech_item',  null, { anim: 'wi_fadeUp', stagger: 60 });
  wiVista('.ac_cta_wrap',   null, { anim: 'wi_fadeUp' });

  $('#ac_compartir').on('click', function() {
    const url = `https://webwii.web.app/`;
    if (navigator.share) {
      navigator.share({ title: `${app}`, text: `💙 ${app} — Centro de Herramientas de IA`, url }).catch(() => {});
    } else {
      wicopy(url, this, '¡Link copiado! ✨');
    }
  });

  console.log(`📖 ${app} ${version} · Acerca ${year()}`);
};

export const cleanup = () => {
  $('#ac_compartir').off('click');
  console.log('🧹 Acerca');
};