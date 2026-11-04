// Точка входа: подключение ресурсов и сборка страницы.

import { buildLayout } from './ui.js';

function connectResources() {
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = './css/style.css';
  document.head.append(styles);

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = './assets/favicon.svg';
  document.head.append(favicon);
}

connectResources();
buildLayout();