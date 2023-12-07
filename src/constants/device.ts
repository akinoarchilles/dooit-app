import {Dimensions, Platform} from 'react-native';

export default class DeviceContants {
  /**
   * Device Constants
   */
  static screenWidth: number = Dimensions.get('screen').width;
  static screenHeight: number = Dimensions.get('screen').height;
  static windowWidth: number = Dimensions.get('window').width;
  static windowHeight: number = Dimensions.get('window').height;

  /**
   * Boolean Constants
   */
  static isAndroid: boolean = Platform.OS === 'android';
  static isIos: boolean = Platform.OS === 'ios';
}
