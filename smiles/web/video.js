import './video.css';
import $ from 'jquery';
import { wiVista } from '../widev.js';

const VIDEOS = [
  {
    id: 'runway', nombre: 'Runway', categoria: 'Generación',
    desc: 'Genera y edita videos con IA de nivel cinematográfico. Usado en producciones reales de Hollywood.',
    img: 'https://cdn.worldvectorlogo.com/logos/runway-2.svg',
    url: 'https://runwayml.com', fav: true,
    precio: '💳 Desde $12/mes', velocidad: '⚡ Rápido',
    prompts: [
      'A cinematic drone shot of a futuristic city at sunset, 4K, ultra realistic',
      'Close-up of a woman crying in the rain, dramatic lighting, film noir style',
      'Time-lapse of a blooming flower in a magical forest, soft pastel colors',
    ],
  },
  {
    id: 'kling', nombre: 'Kling AI', categoria: 'Generación',
    desc: 'Generación de video hiperrealista con IA. Uno de los más avanzados en movimiento natural.',
    img: 'https://kling.kuaishou.com/favicon.ico',
    url: 'https://klingai.com', fav: true,
    precio: '🆓 66 tokens gratis/día', velocidad: '🐢 Moderado',
    prompts: [
      'A person walking through a neon-lit rainy street in Tokyo, slow motion',
      'A majestic eagle soaring over snow-capped mountains, ultra HD',
      'An astronaut floating in space with Earth in the background, cinematic',
    ],
  },
  {
    id: 'kaiber', nombre: 'Kaiber AI', categoria: 'Animación',
    desc: 'Transforma música y texto en videos animados únicos. Ideal para artistas y creadores.',
    img: 'https://kaiber.ai/favicon.ico',
    url: 'https://kaiber.ai', fav: true,
    precio: '🆓 7 días gratis', velocidad: '⚡ Rápido',
    prompts: [
      'Abstract colorful waves pulsing to the rhythm of music, psychedelic art style',
      'A synthwave city at night with neon lights reacting to bass beats',
      'Geometric shapes morphing and dancing in perfect sync with the music',
    ],
  },
  {
    id: 'sora', nombre: 'Sora', categoria: 'Generación',
    desc: 'El modelo de generación de video de OpenAI. Crea escenas increíbles desde texto.',
    img: 'https://openai.com/favicon.ico',
    url: 'https://sora.com', fav: true,
    precio: '💳 Incluido en ChatGPT Plus', velocidad: '🐢 Lento',
    prompts: [
      'A golden retriever running through a field of sunflowers in slow motion, magical light',
      'A futuristic Tokyo street with flying cars and holographic advertisements',
      'Ocean waves crashing on a cliff at sunset, hyper-realistic 8K footage',
    ],
  },
  {
    id: 'hailuo', nombre: 'Hailuo AI', categoria: 'Generación',
    desc: 'Generador de video IA de MiniMax. Alta calidad y movimientos fluidos sorprendentes.',
    img: 'https://hailuoai.video/favicon.ico',
    url: 'https://hailuoai.video', fav: false,
    precio: '🆓 Gratis con límite diario', velocidad: '⚡ Rápido',
    prompts: [
      'Ocean waves crashing on rocks during a storm, dramatic lighting, cinematic',
      'A samurai warrior standing in a bamboo forest, mist and morning light',
      'A child blowing dandelion seeds in a meadow, soft bokeh background',
    ],
  },
  {
    id: 'luma', nombre: 'Luma Dream', categoria: 'Generación',
    desc: 'Genera videos 3D y escenas realistas con IA. Ideal para visualizaciones y demos.',
    img: 'https://lumalabs.ai/favicon.ico',
    url: 'https://lumalabs.ai/dream-machine', fav: false,
    precio: '🆓 30 generaciones gratis/mes', velocidad: '⚡ Rápido',
    prompts: [
      'A 3D rotating futuristic car on a dark showroom floor with neon reflections',
      'A crystal palace in the middle of a frozen tundra, northern lights above',
      'Product showcase of a perfume bottle with water droplets, luxury style',
    ],
  },
  {
    id: 'pika', nombre: 'Pika Labs', categoria: 'Generación',
    desc: 'Crea y edita videos desde texto o imagen con IA. Interfaz sencilla y resultados rápidos.',
    img: 'https://pika.art/favicon.ico',
    url: 'https://pika.art', fav: false,
    precio: '🆓 250 créditos gratis/mes', velocidad: '⚡ Rápido',
    prompts: [
      'A coffee cup with steam rising, cozy morning light, close-up macro shot',
      'A neon sign flickering in a dark alley during rain, cyberpunk aesthetic',
      'A book opening and its pages turning into flying birds, magical realism',
    ],
  },
  {
    id: 'capcut', nombre: 'CapCut', categoria: 'Edición',
    desc: 'Editor de video simple y potente de TikTok. Perfecto para reels y contenido rápido.',
    img: 'https://lf16-capcut.com/obj/capcutpc-packages-us/capcut_website_new/cap-cut-img/capcut-logo.ico',
    url: 'https://www.capcut.com', fav: false,
    precio: '🆓 100% gratuito', velocidad: '⚡ Muy rápido',
    prompts: [
      'Usa la plantilla "Dynamic Beat" con tus fotos para un reels viral automático',
      'Aplica el efecto "AI Slow Motion" a un video de 60fps para dramatismo',
      'Usa "Auto Captions" con fuente bold para subtítulos estilo TikTok viral',
    ],
  },
  {
    id: 'picsart', nombre: 'Picsart', categoria: 'Edición',
    desc: 'Edición creativa de fotos y videos con filtros IA. Comunidad de millones de creadores.',
    img: 'https://picsart.com/favicon.ico',
    url: 'https://picsart.com', fav: false,
    precio: '🆓 Plan gratis disponible', velocidad: '⚡ Rápido',
    prompts: [
      'Aplica el filtro AI "Anime Style" a tu selfie para convertirte en personaje animado',
      'Usa "AI Background Remove + Replace" con fondo de galaxia para tu foto de perfil',
      'Genera un collage automático de 9 fotos con el estilo "Aesthetic Pastel"',
    ],
  },
  {
    id: 'invideo', nombre: 'InVideo AI', categoria: 'Edición',
    desc: 'Crea videos completos desde un prompt de texto. Plantillas profesionales con IA.',
    img: 'https://invideo.io/favicon.ico',
    url: 'https://invideo.io', fav: false,
    precio: '🆓 4 videos gratis/semana', velocidad: '🐢 Moderado',
    prompts: [
      'Create a 60-second YouTube intro about the top 5 AI tools in 2026 with voiceover',
      'Make a motivational Instagram reel about productivity with upbeat background music',
      'Generate a product explainer video for a mobile app with professional transitions',
    ],
  },
  {
    id: 'synthesia', nombre: 'Synthesia', categoria: 'Avatares',
    desc: 'Crea videos con avatares IA presentando tu contenido. Sin cámara ni actores.',
    img: 'https://www.synthesia.io/favicon.ico',
    url: 'https://www.synthesia.io', fav: false,
    precio: '💳 Desde $22/mes', velocidad: '🐢 Moderado',
    prompts: [
      'Create a 2-minute onboarding video with a professional female avatar in English',
      'Generate a training video about workplace safety with subtitles in Spanish',
      'Make a product demo video with an avatar presenting 5 key features clearly',
    ],
  },
  {
    id: 'hedra', nombre: 'Hedra', categoria: 'Avatares',
    desc: 'Anima fotos con voz y expresiones reales usando IA. Perfecto para contenido con presentadores.',
    img: 'https://www.hedra.com/favicon.ico',
    url: 'https://www.hedra.com', fav: false,
    precio: '🆓 Plan gratuito disponible', velocidad: '⚡ Rápido',
    prompts: [
      'Animate a portrait photo saying "Bienvenido a Webwii" with natural lip sync',
      'Create a talking avatar from a cartoon illustration with an energetic voice',
      'Generate a news presenter style video from a photo with formal speech delivery',
    ],
  },
];

let filtrados = [...VIDEOS];
let orden     = 'fav';
let busqueda  = '';

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// ============================================================
// 🏗️ RENDER
// ============================================================
export const render = () => `
  <div class="vid_wrap">

    <div class="vid_topbar">
      <h1 class="vid_titulo">Videos con <span class="vid_grad">Inteligencia Artificial</span></h1>
      <div class="vid_ctrl">
        <div class="vid_search_wrap">
          <i class="fas fa-search"></i>
          <input id="vid_search" type="text" placeholder="${VIDEOS.length} herramientas...">
          <button id="vid_search_clr" style="display:none"><i class="fas fa-times"></i></button>
        </div>
        <select id="vid_orden" class="vid_sel">
          <option value="fav">⭐ Favoritos</option>
          <option value="nombre">🔤 Nombre</option>
          <option value="cat">📁 Categoría</option>
        </select>
        <button id="vid_refresh" class="vid_refresh_btn" title="Actualizar">
          <i class="fas fa-rotate-right"></i>
        </button>
      </div>
    </div>

    <div class="vid_grid" id="vid_grid"></div>

    <div class="vid_empty" id="vid_empty" style="display:none">
      <i class="fas fa-film"></i>
      <h3>Sin resultados</h3>
      <p>Intenta con otros términos</p>
    </div>

  </div>`;

// ============================================================
// 🃏 CARD
// ============================================================
const cardHtml = h => `
  <div class="vid_card wi_fadeUp" data-id="${h.id}">

    <div class="vid_card_top">
      <span class="vid_vel">${h.velocidad}</span>
      ${h.fav ? '<span class="vid_fav"><i class="fas fa-star"></i></span>' : ''}
      <img src="${h.img}" alt="${h.nombre}" loading="lazy"
           onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(h.nombre)}&background=random&size=80'">
      <h3 class="vid_nombre">${h.nombre}</h3>
      <span class="vid_precio">${h.precio}</span>
    </div>

    <div class="vid_body">
      <p class="vid_desc">${h.desc}</p>
      <div class="vid_prompts">
        <p class="vid_prompts_label"><i class="fas fa-wand-magic-sparkles"></i> Prompts recomendados</p>
        ${h.prompts.map(p => `
          <div class="vid_prompt_item">
            <span>${p}</span>
            <button class="vid_copy_btn" data-prompt="${p.replace(/"/g, '&quot;')}" title="Copiar">
              <i class="fas fa-copy"></i>
            </button>
          </div>`).join('')}
      </div>
    </div>

    <div class="vid_foot">
      <a href="${h.url}" target="_blank" rel="noopener" class="vid_btn_abrir">
        <i class="fas fa-external-link-alt"></i> Abrir herramienta
      </a>
    </div>

  </div>`;

// ============================================================
// ⚙️ INIT
// ============================================================
export const init = () => {

  const aplicar = () => {
    const ord = { fav:(a,b)=>(b.fav?1:0)-(a.fav?1:0), nombre:(a,b)=>a.nombre.localeCompare(b.nombre), cat:(a,b)=>a.categoria.localeCompare(b.categoria) };
    filtrados = [...VIDEOS].sort(ord[orden] || ord.fav);
    if (busqueda) filtrados = filtrados.filter(v => [v.nombre, v.desc, v.categoria, v.precio, ...v.prompts].some(x => norm(x).includes(norm(busqueda))));
    renderizar();
  };

  const renderizar = () => {
    const $g = $('#vid_grid').empty();
    if (!filtrados.length) { $('#vid_empty').fadeIn(200); return; }
    $('#vid_empty').hide();
    $g.html(filtrados.map(cardHtml).join(''));
    wiVista('.vid_card', null, { anim: 'wi_fadeUp', stagger: 80 });
  };

  // Copiar prompt
  $(document).on('click', '.vid_copy_btn', function (e) {
    e.preventDefault();
    const $b = $(this);
    navigator.clipboard?.writeText($b.data('prompt')).then(() => {
      $b.html('<i class="fas fa-check"></i>');
      setTimeout(() => $b.html('<i class="fas fa-copy"></i>'), 1500);
    });
  });

  // Búsqueda
  let to;
  $('#vid_search').on('input', function () {
    busqueda = $(this).val().trim();
    $('#vid_search_clr').toggle(!!busqueda);
    clearTimeout(to); to = setTimeout(aplicar, 220);
  });
  $('#vid_search_clr').on('click', () => $('#vid_search').val('').trigger('input').focus());

  // Orden
  $('#vid_orden').on('change', function () { orden = $(this).val(); aplicar(); });

  // Refresh
  $('#vid_refresh').on('click', function () {
    busqueda = ''; orden = 'fav';
    $('#vid_search').val('').trigger('input');
    $('#vid_orden').val('fav');
    const $i = $(this).find('i');
    $i.css({ transition: 'transform .5s', transform: 'rotate(360deg)' });
    setTimeout(() => $i.css({ transition: 'none', transform: 'rotate(0deg)' }), 520);
    aplicar();
  });

  aplicar();
  console.log('🎬 Video IA · 2026');
};

export const cleanup = () => {
  orden = 'fav'; busqueda = '';
  $(document).off('click', '.vid_copy_btn');
  console.log('🧹 Video');
};