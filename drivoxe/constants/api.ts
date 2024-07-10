import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeToken, removeToken } from '../constants/Token';
import axiosInstance from '../components/axiosinstance';

const API_URL = 'https://auction-backend-o2l7.onrender.com';

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

export const logout = async () => {
  await removeToken();
}