import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: any, params?: Object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params || {});
  }
}
