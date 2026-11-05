// Точка входа: подключение ресурсов, сборка страницы и события.

import { buildLayout } from './ui.js';
import { addTask } from './store.js';
import { initRender, render, viewState } from './render.js';

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

const ui = buildLayout();
initRender(ui.list, ui.emptyMessage);

ui.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = ui.titleInput.value.trim();
  if (!title) return;
  addTask(title, ui.dateInput.value);
  ui.form.reset();
  ui.titleInput.focus();
  render();
});

ui.sortSelect.addEventListener('change', () => {
  viewState.sort = ui.sortSelect.value;
  render();
});

ui.filterSelect.addEventListener('change', () => {
  viewState.filter = ui.filterSelect.value;
  render();
});

ui.searchInput.addEventListener('input', () => {
  viewState.search = ui.searchInput.value;
  render();
});

render();