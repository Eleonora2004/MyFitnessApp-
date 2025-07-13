import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Failed to save data', e);
  }
};

// Retrieve data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};

// Remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove data', e);
  }
};
