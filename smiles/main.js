import $ from 'jquery';
import { getls } from './widev.js';
import { rutas } from './rutas/ruta.js';

  ['inicio','imagen','video','audio','ideas','diseno','escritura','avatar','acerca'].forEach(pg => rutas.register(`/${pg}`, () => import(`./web/${pg}.js`)));
  ['descubre','login','descubre','smile'].forEach(pg => rutas.register(`/${pg}`, () => import(`./smile/${pg}.js`)));
  // rutas.register('/smile', () => getls('wiSmile') ? import('./smile/smile.js') : import('./smile/descubre.js'));
  import('./header.js'); import('./footer.js')
  rutas.init();

