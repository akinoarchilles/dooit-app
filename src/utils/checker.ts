import TodoInterface from '@features/todos/models/interfaces/Todo.interface';

export function isEmpty(data: TodoInterface) {
  if (
    !data ||
    (data.label.length <= 0 && data.list.length <= 0 && data.title === '')
  )
    return true;
  return false;
}
