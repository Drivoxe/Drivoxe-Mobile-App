// roomsService.tsx
import axios from 'axios';
import { Room } from '../config/types'; // Import Room type


const API_URL = 'http://localhost:4000/rooms'; // Replace with your backend URL

// Define the Room interface based on the Room entity in your backend


// Service class to handle API requests
class RoomsService {
  // Create a new room
  async createRoom(name: string, carId: number, startDate: Date): Promise<Room> {
    try {
      const response = await axios.post(`${API_URL}`, { name, carId, startDate });
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error creating room:', err);
      throw new Error(err?.response?.data?.message || 'Room creation failed');
    }
  }

  // Get room by ID
  async getRoomById(id: number): Promise<Room> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error fetching room:', err);
      throw new Error(err?.response?.data?.message || 'Failed to fetch room');
    }
  }

  // Update room details
  async updateRoom(id: number, updateData: Partial<Room>): Promise<Room> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updateData);
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error updating room:', err);
      throw new Error(err?.response?.data?.message || 'Room update failed');
    }
  }

  // Delete room by ID
  async deleteRoom(id: number): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error deleting room:', err);
      throw new Error(err?.response?.data?.message || 'Room deletion failed');
    }
  }

  // Get all rooms
  async getAllRooms(): Promise<Room[]> {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error fetching rooms:', err);
      throw new Error('Error fetching rooms');
    }
  }

  // Get subscriber count by room ID
  async getSubscribersCount(id: number): Promise<number> {
    try {
      const response = await axios.get(`${API_URL}/by_id/${id}/subscribers-count`);
      return response.data;
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error fetching subscribers count:', err);
      throw new Error('Error fetching subscribers count');
    }
  }

  // Get rooms by user ID
  async getRoomsByUserID(userId: number): Promise<Room[]>  {
    try {
      const response = await axios.get(`${API_URL}/by_user_id/${userId}`);
      return response.data as Room[];
    } catch (error: unknown) {
      const err = error as any;
      console.error('Error fetching rooms by user ID:', err);
      throw new Error('Error fetching rooms by user ID');
    }
  }
}

export default new RoomsService();
