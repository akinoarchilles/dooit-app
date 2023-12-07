import {Action} from '../../../providers/StoreContext.provider';
import TodoRedux from './TodoRedux';

export const initialState: TodoRedux = {
  list: [],
};

function todoReducer(
  state: TodoRedux,
  target: string,
  action: Action,
): TodoRedux {
  const {payload} = action;
  switch (target) {
    case 'setTodos':
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
}

export default todoReducer;
