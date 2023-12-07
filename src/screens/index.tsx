import HomeScreen from '@features/todos/screens/Home';
import TodoDetailScreen, {
  TodoDetailScreenProps,
} from '@features/todos/screens/TodoDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import StoreConstants from '../constants/store';
import OnboardingScreen from '../features/onboarding/screens/Onboarding';
import {useAppTheme} from '../providers/theme';
import Storage from '../utils/async-storage';

const Stack = createNativeStackNavigator<GeneralStackParamList>();

export default function AppScreens(): JSX.Element[] | undefined {
  const theme = useAppTheme();
  const [initialRouteName, setInitialRouteName] = useState<
    'Onboarding' | 'Home' | undefined
  >();

  const getInitialRouteName = useCallback(async () => {
    if (!initialRouteName) {
      const shouldOnboardLocal = await Storage.getItem(
        StoreConstants.ONBOARDING,
        true,
      );
      if (shouldOnboardLocal === true) {
        setInitialRouteName('Onboarding');
      } else {
        setInitialRouteName('Home');
      }
      return;
    }
  }, [initialRouteName]);

  useEffect(() => {
    async function getDefaultRoot() {
      await getInitialRouteName();
    }
    getDefaultRoot();
  }, [initialRouteName, getInitialRouteName]);

  return (
    initialRouteName && [
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          statusBarColor: theme.colors.background,
        }}>
        {initialRouteName === 'Onboarding' && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              statusBarColor: 'black',
            }}
          />
        )}
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="TodoDetail"
          component={TodoDetailScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerShadowVisible: false,
          }}></Stack.Screen>
      </Stack.Navigator>,
    ]
  );
}

export type GeneralStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  TodoDetail: TodoDetailScreenProps | undefined;
};
