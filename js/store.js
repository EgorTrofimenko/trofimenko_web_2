// Работа с данными: список задач хранится в памяти страницы
import { STORAGE_KEY } from './data.js';

let tasks = [];

export function getTasks() {
    return tasks;
}

export function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    tasks = [];
  }
}

export function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(title, date) {
    tasks.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        date,
        done: false,
    });
    saveTasks();
}

export function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  saveTasks();
}

export function updateTask(id, changes) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  Object.assign(task, changes);
  saveTasks();
}