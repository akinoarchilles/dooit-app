import {createContext} from 'react';
import StoreContextInterface from '../models/interfaces/StoreContext.interface';

export const PreferencesContextInitialValue: StoreContextInterface = {
  theme: 'light',
};

export const StoreContext = createContext<StoreContextInterface>(
  PreferencesContextInitialValue,
);
