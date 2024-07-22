import axiosInstance from '../components/axiosinstance';

const API_URL = 'http://localhost:4000/';

export const getLastBidUpdatedAt = async (auctionId: number) => {
  try {
    const response = await axiosInstance.get(`/bids/auctions/${auctionId}/last-bid`);
    return response.data;
  } catch (error) {
    console.error('Error fetching last bid update date:', error);
    throw error;
  }
};
