import * as SecureStore from 'expo-secure-store';

/**
 * Sanitize key for SecureStore
 * SecureStore only allows alphanumeric characters, ".", "-", and "_"
 * Firebase uses ":", "[", "]" which are not allowed
 */
function sanitizeKey(key: string): string {
  return key
    .replace(/:/g, '_')
    .replace(/\[/g, '_')
    .replace(/]/g, '_')
    .replace(/\//g, '_');
}

/**
 * Secure storage adapter for Firebase Auth
 * Uses Keychain on iOS and EncryptedSharedPreferences on Android
 */
export const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const sanitizedKey = sanitizeKey(key);
      return await SecureStore.getItemAsync(sanitizedKey);
    } catch (error) {
      console.error(`Error getting item ${key} from SecureStore:`, error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      const sanitizedKey = sanitizeKey(key);
      await SecureStore.setItemAsync(sanitizedKey, value);
    } catch (error) {
      console.error(`Error setting item ${key} in SecureStore:`, error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      const sanitizedKey = sanitizeKey(key);
      await SecureStore.deleteItemAsync(sanitizedKey);
    } catch (error) {
      console.error(`Error removing item ${key} from SecureStore:`, error);
    }
  },
};
