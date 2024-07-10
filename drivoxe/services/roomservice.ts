// services/roomService.ts
import axios from 'axios';

const API_UR = 'http://localhost:4000';
const API_URL = 'https://auction-backend-o2l7.onrender.com';


export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching rooms: ' + error  );
  }
};

export const getRoomById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching room: '  );
  }
};
