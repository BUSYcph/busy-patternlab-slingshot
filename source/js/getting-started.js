import '../scss/main.scss';

import facade from './common/facade';
import loader from './common/loader';

loader.init();

facade.publish('loader:refresh');