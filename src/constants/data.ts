import TodoLabelEnum from '@features/todos/models/interfaces/enum/TodoLabel.enum';

export default class DataConstants {
  static TODO_LABELS: TodoLabelEnum[] = [
    TodoLabelEnum.PERSONAL,
    TodoLabelEnum.WORK,
    TodoLabelEnum.FINANCE,
    TodoLabelEnum.OTHER,
  ];
}
