import 'normalize.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './main.scss';

import DownloadField from './blocks/download-field/download-field';

Array.from(document.querySelectorAll('.download-field')).forEach(
  element => new DownloadField(element),
);
