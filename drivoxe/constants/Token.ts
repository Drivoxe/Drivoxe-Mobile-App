
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store the token
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('access_token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Function to retrieve the token
export const getToken = async () : Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to remove the token
export const removeToken = async () : Promise<void> => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
