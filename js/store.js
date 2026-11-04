// Работа с данными: список задач хранится в памяти страницы
let tasks = [];

export function getTasks() {
    return tasks;
}

export function addTask(title, date) {
    tasks.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        date,
        done: false,
    });
}