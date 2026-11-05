// Отрисовка списка задач.

import { getTasks, deleteTask, updateTask } from './store.js';
import { createElement } from './ui.js';

export const viewState = {
  editingId: null,
  sort: 'custom',
  filter: 'all',
};

let listElement = null;
let emptyElement = null;

export function initRender(list, empty) {
  listElement = list;
  emptyElement = empty;
  registerListEvents();
}

export function render() {
  const tasks = getVisibleTasks();
  listElement.textContent = '';
  for (const task of tasks) {
    listElement.append(createTaskItem(task));
  }
  emptyElement.hidden = tasks.length > 0;
}

function getVisibleTasks() {
  let visible = [...getTasks()];

  if (viewState.filter === 'active') {
    visible = visible.filter((task) => !task.done);
  }
  if (viewState.filter === 'done') {
    visible = visible.filter((task) => task.done);
  }

  if (viewState.sort !== 'custom') {
    const direction = viewState.sort === 'date-asc' ? 1 : -1;
    visible.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      if (a.date === b.date) return 0;
      return (a.date < b.date ? -1 : 1) * direction;
    });
  }

  return visible;
}

function formatDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
}

function createTaskItem(task) {
  const item = createElement('li', 'task-item');
  item.dataset.id = task.id;
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', 'Отметить выполнение задачи');

  item.classList.toggle('task-item--done', task.done);
  if (viewState.editingId === task.id) {
    item.append(checkbox, createEditBlock(task));
  } else {
    item.append(checkbox, createViewBlock(task), createControls());
  }
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
  const editButton = createElement('button', 'task-item__button task-item__button--edit', 'Изменить');
  editButton.type = 'button';
  editButton.dataset.action = 'edit';
  const deleteButton = createElement('button', 'task-item__button task-item__button--delete', 'Удалить');
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';

  controls.append(editButton, deleteButton);
  return controls;
}

function registerListEvents() {
  listElement.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const item = event.target.closest('.task-item');
    if (!item) return;

    if (button.dataset.action === 'edit') {
      viewState.editingId = item.dataset.id;
      render();
    }

    if (button.dataset.action === 'cancel') {
      viewState.editingId = null;
      render();
    }

    if (button.dataset.action === 'save') {
      saveEdit(item.dataset.id, item);
    }

    if (button.dataset.action === 'delete') {
      deleteTask(item.dataset.id);
      render();
    }
  });

  listElement.addEventListener('change', (event) => {
    if (!event.target.classList.contains('task-item__checkbox')) return;
    const item = event.target.closest('.task-item');
    if (!item) return;
    updateTask(item.dataset.id, { done: event.target.checked });
    render();
  });
}

function createEditBlock(task) {
  const body = createElement('div', 'task-item__body');

  const titleInput = createElement('input', 'task-item__edit-title');
  titleInput.type = 'text';
  titleInput.value = task.title;
  titleInput.maxLength = 120;

  const dateInput = createElement('input', 'task-item__edit-date');
  dateInput.type = 'date';
  dateInput.value = task.date;

  const controls = createElement('div', 'task-item__controls');

  const saveButton = createElement('button', 'task-item__button task-item__button--save', 'Сохранить');
  saveButton.type = 'button';
  saveButton.dataset.action = 'save';

  const cancelButton = createElement('button', 'task-item__button task-item__button--cancel', 'Отмена');
  cancelButton.type = 'button';
  cancelButton.dataset.action = 'cancel';

  controls.append(saveButton, cancelButton);
  body.append(titleInput, dateInput, controls);
  return body;
}

function saveEdit(id, item) {
  const titleInput = item.querySelector('.task-item__edit-title');
  const dateInput = item.querySelector('.task-item__edit-date');
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.classList.add('task-item__edit-title--invalid');
    return;
  }
  updateTask(id, { title, date: dateInput.value });
  viewState.editingId = null;
  render();
}