import axios from 'axios';


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
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) { // Type casting error to any
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};
