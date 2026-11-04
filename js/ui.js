// Построение макета страницы.

import { FILTER_OPTIONS, SORT_OPTIONS } from './data.js';

export function createElement(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function fillSelect(select, options) {
  for (const { value, label } of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.append(option);
  }
}

export function buildLayout() {
  const header = createElement('header', 'page-header');
  header.append(
    createElement('h1', 'page-header__title', 'To-Do List'),
    createElement('p', 'page-header__subtitle', 'Планировщик задач на чистом JavaScript'),
  );

  const main = createElement('main', 'page-main');

  const form = createElement('form', 'task-form');

  const titleInput = createElement('input', 'task-form__input task-form__input--title');
  titleInput.type = 'text';
  titleInput.placeholder = 'Название задачи';
  titleInput.maxLength = 120;
  titleInput.required = true;

  const dateInput = createElement('input', 'task-form__input task-form__input--date');
  dateInput.type = 'date';
  dateInput.setAttribute('aria-label', 'Дата выполнения');

  const submitButton = createElement('button', 'task-form__submit', 'Добавить');
  submitButton.type = 'submit';

  form.append(titleInput, dateInput, submitButton);

  const toolbar = createElement('section', 'toolbar');
  toolbar.setAttribute('aria-label', 'Управление списком задач');

  const searchInput = createElement('input', 'toolbar__search');
  searchInput.type = 'search';
  searchInput.placeholder = 'Поиск по названию';

  const filterSelect = createElement('select', 'toolbar__filter');
  filterSelect.setAttribute('aria-label', 'Фильтр по статусу');
  fillSelect(filterSelect, FILTER_OPTIONS);

  const sortSelect = createElement('select', 'toolbar__sort');
  sortSelect.setAttribute('aria-label', 'Сортировка задач');
  fillSelect(sortSelect, SORT_OPTIONS);

  toolbar.append(searchInput, filterSelect, sortSelect);

  const list = createElement('ul', 'task-list');
  const emptyMessage = createElement('p', 'task-list__empty', 'Задач пока нет — добавьте первую.');
  emptyMessage.hidden = true;

  main.append(form, toolbar, list, emptyMessage);

  const footer = createElement('footer', 'page-footer');
  footer.append(
    createElement('p', 'page-footer__text', 'Лабораторная работа «Веб-программирование»: список задач на чистом JavaScript.'),
  );

  document.body.append(header, main, footer);

  return { form, titleInput, dateInput, searchInput, filterSelect, sortSelect, list, emptyMessage };
}