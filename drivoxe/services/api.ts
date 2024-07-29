import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../components/axiosinstance';
import { storeToken } from '../constants/Token';
import { decodeToken } from '../utils/jwtUtils';
import { User } from '../config/types'; // Adjust the path to where your User interface is located

const API_URL = 'http://localhost:4000/';

const getSecretKey = async (): Promise<string> => {
    // Retrieve the secret key from secure storage
    const secretKey = await SecureStore.getItemAsync('secretKey');
    if (!secretKey) {
        throw new Error('Secret key not found');
    }
    return secretKey;
};
export const getUserData = async (): Promise<User | null> => {
  const userData = await AsyncStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};


export const login = async (email: string, password: string): Promise<User> => {
    try {
        const response = await axiosInstance.post(`/auth/login`, {
            email,
            password,
        });
        const token = response.headers.access_token;
        console.log('Received token:', token);

        // Store the token
        await storeToken(token);

        // Decode the token and store user data in local storage
        const secretKey = '860e3dab94e6b0d8ae7ee3de4a849fae147ec0465cf6c8b5ef148565339c0f03';
        const decoded = decodeToken(token,secretKey ) as User;
        await AsyncStorage.setItem('user_data', JSON.stringify(decoded));
        console.log(decoded);

        return decoded;
    } catch (error: any) { // Type casting error to any
        const errorMessage = error.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};

export const getToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem('access_token');
};

export const logout = async (): Promise<void> => {
    // Remove the token and user data from local storage
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user_data');
    console.log(await getToken());
};

export const authService = {
    login,
    getToken,
    logout,
    getSecretKey
};

export const signup = async (name: string, email: string, password: string): Promise<any> => {
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

export const resetPassword = async (email: string): Promise<any> => {
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

export default { login, logout, getToken, signup, resetPassword };
