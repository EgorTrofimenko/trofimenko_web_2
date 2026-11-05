// Отрисовка списка задач.

import { getTasks, deleteTask } from './store.js';
import { createElement } from './ui.js';

export const viewState = {};

let listElement = null;
let emptyElement = null;

export function initRender(list, empty) {
  listElement = list;
  emptyElement = empty;
  registerListEvents();
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
  item.append(createViewBlock(task), createControls());
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

function createControls() {
  const controls = createElement('div', 'task-item__controls');
  const deleteButton = createElement('button', 'task-item__button task-item__button--delete', 'Удалить');
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  controls.append(deleteButton);
  return controls;
}

function registerListEvents() {
  listElement.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const item = event.target.closest('.task-item');
    if (!item) return;

    if (button.dataset.action === 'delete') {
      deleteTask(item.dataset.id);
      render();
    }
  });
}