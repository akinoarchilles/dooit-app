import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3Theme, PaperProvider} from 'react-native-paper';
import {NavigationTheme} from 'react-native-paper/lib/typescript/types';
import {StoreContext} from './src/providers/StoreContext';
import StoreProvider from './src/providers/StoreContext.provider';
import {CustomDefaultTheme} from './src/providers/theme';
import AppScreens from './src/screens';
import {navigationRef} from './src/utils/navigation';
import Storage from '@utils/async-storage';
import StoreConstants from '@constants/store';

type ThemeType = {
  paper: MD3Theme;
  navigation: NavigationTheme;
};

function App(): JSX.Element {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [exitApp, setExitApp] = useState(0);
  const [theme, setTheme] = useState<ThemeType>({
    paper: CustomDefaultTheme,
    navigation: DefaultTheme,
  });
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    const backAction = () => {
      if (!navigationRef.canGoBack()) {
        setTimeout(() => {
          setExitApp(0);
        }, 2000); // 2 seconds to tap second-time

        if (exitApp === 0) {
          setExitApp(exitApp + 1);
        } else if (exitApp === 1) {
          BackHandler.exitApp();
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [exitApp]);

  useEffect(() => {
    async function getInitialStore() {
      const store = await Storage.getItem(
        StoreConstants.STORE,
        `{"todos": {"list": []}}`,
      );

      setInitialState(JSON.parse(store));
    }
    getInitialStore();
  }, []);

  return (
    <StoreContext.Provider value={{theme: isThemeDark ? 'dark' : 'light'}}>
      <PaperProvider theme={theme.paper}>
        {initialState && (
          <StoreProvider initial={initialState}>
            <NavigationContainer ref={navigationRef} theme={theme.navigation}>
              <GestureHandlerRootView style={styles.container}>
                <AppScreens />
              </GestureHandlerRootView>
            </NavigationContainer>
          </StoreProvider>
        )}
      </PaperProvider>
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
