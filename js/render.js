// Отрисовка списка задач.

import { getTasks } from './store.js';
import { createElement } from './ui.js';

export const viewState = {};

let listElement = null;
let emptyElement = null;

export function initRender(list, empty) {
  listElement = list;
  emptyElement = empty;
}

export function render() {
  const tasks = getTasks();
  listElement.textContent = '';
  for (const task of tasks) {
    listElement.append(createTaskItem(task));
  }
  emptyElement.hidden = tasks.length > 0;
}

function formatDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
}

function createTaskItem(task) {
  const item = createElement('li', 'task-item');
  item.dataset.id = task.id;
  item.append(createViewBlock(task));
  return item;
}

function createViewBlock(task) {
  const body = createElement('div', 'task-item__body');
  body.append(createElement('span', 'task-item__title', task.title));
  if (task.date) {
    body.append(createElement('span', 'task-item__date', `Срок: ${formatDate(task.date)}`));
  }
  return body;
}