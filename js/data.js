// Статичные данные интерфейса.

export const FILTER_OPTIONS = [
  { value: 'all', label: 'Все задачи' },
  { value: 'active', label: 'Невыполненные' },
  { value: 'done', label: 'Выполненные' },
];

export const SORT_OPTIONS = [
  { value: 'custom', label: 'Свой порядок' },
  { value: 'date-asc', label: 'По дате: сначала ближайшие' },
  { value: 'date-desc', label: 'По дате: сначала дальние' },
];

export const STORAGE_KEY = 'todo-list-tasks';