import {SetStateAction} from 'react';

export default interface StoreContextInterface {
  theme: 'dark' | 'light' | string;
  setTheme: SetStateAction<any>;
}
