import $ from 'jquery';
import { getls } from './widev.js';
import { rutas } from './rutas/ruta.js';

  ['inicio','nuevos','imagen','video','audio','ideas','diseno','escritura','avatar','acerca'].forEach(pg => rutas.register(`/${pg}`, () => import(`./web/${pg}.js`)));
  ['descubre','login','descubre','smile'].forEach(pg => rutas.register(`/${pg}`, () => import(`./smile/${pg}.js`)));
  import('./header.js'); import('./footer.js')
  rutas.init();

