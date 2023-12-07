import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3Theme,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import fontConfig from './font';

type AdditionalThemeColorProps = {
  colors: {
    text: string;
    caption: string;
  };
};

export const CustomDefaultTheme: MD3Theme & AdditionalThemeColorProps = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: 'white',
    background: '#FFFFFF',
    secondaryContainer: '#919191',

    // Text
    text: '#000000',
    caption: '#C4C4C4',
  },
  roundness: 1,
  fonts: configureFonts({
    // @ts-ignore
    config: fontConfig,
  }),
};

export const CustomDarkTheme: MD3Theme & AdditionalThemeColorProps = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: 'white',
    secondaryContainer: '#919191',
    // Text
    text: '#FFFFFF',
    caption: '#C4C4C4',
  },
  roundness: 1,
  fonts: configureFonts({
    // @ts-ignore
    config: fontConfig,
  }),
};

const {DarkTheme, LightTheme} = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  reactNavigationLight: NavigationDefaultTheme,
});

export {DarkTheme, LightTheme};
