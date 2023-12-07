import {CustomDarkTheme, CustomDefaultTheme} from './theme';
import PreferencesContext from './context';
import {useTheme} from 'react-native-paper';

export {CustomDarkTheme, CustomDefaultTheme, PreferencesContext};

export type AppTheme = typeof CustomDefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
