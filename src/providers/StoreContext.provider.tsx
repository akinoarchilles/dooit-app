import {createContext, useContext, useEffect, useReducer} from 'react';
import TodoRedux from '../features/todos/models/TodoRedux';
import todoReducer, {
  initialState as todoInitialValue,
} from '../features/todos/models/todos.model';
import Storage from '@utils/async-storage';
import StoreConstants from '@constants/store';

type ContextData = {state: AppState; dispatch: Dispatch};
type AppState = {
  todos: TodoRedux;
};
export type Action = {
  type: string;
  payload?: any;
  onSuccess?: Function;
  onError?: Function;
};
export type Dispatch = (action: Action) => void;

const initialState: AppState = {
  todos: todoInitialValue,
};

const Store = createContext<ContextData | undefined>(undefined);

function rootReducer(state: AppState, action: any) {
  const actions = action.type.split('/');
  const targetReducer = actions[0];
  const targetFunction = actions[1];
  const {payload, ...rest} = action;
  switch (targetReducer) {
    case 'todos': {
      const newTodosState = todoReducer(state.todos, targetFunction, {
        payload,
        ...rest,
      });
      if (newTodosState) {
        return {
          ...state,
          todos: newTodosState,
        };
      }
      return state;
    }
    default: {
      throw new Error(`Unhandled reducer target: ${targetReducer}`);
    }
  }
}

const StoreProvider = ({children, initial}: any) => {
  const [state, dispatch] = useReducer(rootReducer, initial || initialState);
  useEffect(() => {
    Storage.setItem(StoreConstants.STORE, JSON.stringify(state));
  }, [state]);
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};

export const useStore = (slice?: keyof AppState): any =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  slice ? useContext(Store)!.state[slice] : useContext(Store)!.state;
export const useDispatch = () => useContext(Store)!.dispatch;
export default StoreProvider;
