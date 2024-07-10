
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../constants/Token';

const API_URL = 'https://auction-backend-o2l7.onrender.com';
const API_UR = 'http://localhost:4000/';
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_UR
  ,
});

// Add a request interceptor to include the token in headers

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
