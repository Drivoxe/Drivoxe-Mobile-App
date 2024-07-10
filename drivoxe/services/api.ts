// src/services/authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../components/axiosinstance';
import { storeToken } from '../constants/Token';

const API_URL = 'http://localhost:4000/';

const getSecretKey = async (): Promise<string> => {
    // Retrieve the secret key from secure storage
    const secretKey = await SecureStore.getItemAsync('secretKey');
    if (!secretKey) {
        throw new Error('Secret key not found');
    }
    return secretKey;
};

export const login = async (email: string, password: string) => {
 try {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    const token = response.headers.access_token;
    console.log('Received token:', token); 
    console.log(response);//
    await storeToken(token);
    return response.headers;
  } catch (error: any) { // Type casting error to any
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
  
};

export const getToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem('access_token');
};

export const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    console.log(getToken());
};

export const authService = {
    login,
    getToken,
    logout,
    getSecretKey
};
export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name, 
      email,
      password,
    });
    return response.data;
  } catch (error: any) { // Type casting error to any
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};
console.log(Error);

export const resetpassword = async ( email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/request-password-reset`, {
      email,   
    });
    return response.data;
  } catch (error: any) { // Type casting error to any
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};
console.log(Error);
export default { login, logout, getToken };

