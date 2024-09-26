import axiosInstance from '../components/axiosinstance';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:4000';

interface CreateAuctionDto {
  roomId: string;
  startingPrice: number;
  countdown: number;
}

interface BidData {
  userId: number;
  bidAmount: number;
}

interface BidUpdateData {
  auctionId: number;
  newBid: number;
  bidderId: number;
}
export const getLastBidUpdatedAt = async (auctionId: number) => {
  try {
    const response = await axiosInstance.get(`/bids/auctions/${auctionId}/last-bid`);
    return response.data;
  } catch (error) {
    console.error('Error fetching last bid update date:', error);
    throw error;
  }
};
const fetchLastBidUpdatedAt = async (auctionId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bids/auctions/${auctionId}/last-bid`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch last bid update date: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching last bid update date:', error);
    throw error;
  }
};


const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('access_token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const auctionService = {
  getAllAuctions: async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/auctions`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAuctionById: async (id: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/auctions/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createAuction: async (createAuctionDto: CreateAuctionDto) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(`${API_URL}/auctions`, createAuctionDto, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  startAuctionExternally: async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(`${API_URL}/auctions/${id}/start-externally`, {}, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  placeBid: async (auctionId: number,  bidAmount: number, userId: number ) => {
    try {
      const headers = await getAuthHeaders();
      const endpoint = `${API_URL}/auctions/${auctionId}/bid`;
      const response = await axiosInstance.post(endpoint,{bidAmount,userId }, {headers}  );
      console.log(response.data);
      console.log(headers);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateBid: async (bidUpdateData: BidUpdateData) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(`${API_URL}/auctions/update-bid`, bidUpdateData, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteAuction: async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.delete(`${API_URL}/auctions/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getLastBidder: async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/auctions/${id}/last_bidder`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default auctionService;
