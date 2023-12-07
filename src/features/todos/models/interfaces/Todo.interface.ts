import TodoLabelEnum from './enum/TodoLabel.enum';

export interface TodoContent {
  done: boolean;
  content: string;
}

export default interface TodoInterface {
  title: string;
  list: TodoContent[];
  label: TodoLabelEnum[];
  color: string;
}
