import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  /**
   * Get value in local storage by key
   * @param key key to read value in storage
   * @param defaultReturn default return value if value of key read not existed in storage
   * @returns default return value supplied or string by default
   */
  static getItem = (key: string, defaultReturn: any = ''): any => {
    return new Promise((resolve, _) => {
      return AsyncStorage.getItem(
        key,
        (_?: Error | null | undefined, result?: string | null | undefined) => {
          if (result) {
            try {
              resolve(JSON.parse(result));
            } catch (err) {
              resolve(defaultReturn);
            }
          } else {
            resolve(defaultReturn);
          }
        }
      );
    });
  };

  /**
   * Set local storage value of item by key
   * @param key key of local storage item to be set
   * @param value value of key to be set
   */
  static setItem = (key: string, value: any) => {
    value = JSON.stringify(value);
    AsyncStorage.setItem(key, value);
  };

  /**
   * Remove local storage item
   * @param key key of local storage item to be removed
   * @returns void
   */
  static removeItem = (key: string): void => {
    AsyncStorage.removeItem(key);
  };

  /**
   * Clear all local storage item
   * @returns void
   */
  static clearItem = (): void => {
    AsyncStorage.clear();
  };
}
