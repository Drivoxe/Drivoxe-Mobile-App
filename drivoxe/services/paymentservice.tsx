// paymentService.tsx
import axios from 'axios';
import { Alert } from 'react-native';
import { PaymentDto, Room, User } from '../config/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
const API_URL = 'http://localhost:4000/pay'; // Replace with your actual backend URL

class PaymentService {
  // Method to create a payment, now with navigation passed as an argument
  async createPayment(
    user: User,
    room: Room,
    totalAmount: number,
    navigation: NativeStackNavigationProp<RootStackParamList, 'WebViewScreen'>
  ) {
    try {
      const response = await axios.post(`${API_URL}`, {
        userId: Number(user.id),
        roomId: Number(room.id),
        amount: totalAmount,

        orderId: `room${room.id}`,
        note: 'subscription',
      });

      if (response.data.message === 'Success' && response.data.data.payment_url) {
        // Use navigation to navigate to the WebView screen
        navigation.navigate('WebViewScreen', { url: response.data.data.payment_url });
      } else {
        Alert.alert('Erreur', 'Échec de l\'initiation du paiement');
      }
    } catch (error: any) {
      console.error(
        'Erreur lors de l\'initiation du paiement:',
        error.response ? error.response.data : error.message
      );
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'initiation du paiement');
    }
  }

  // Method to handle webhook
  async handleWebhook(webhookData: any) {
    try {
      const response = await axios.post(`${API_URL}/webhook`, webhookData);
      return response.data;
    } catch (error: unknown) {
      const err = error as any; // or as AxiosError if using axios-specific error
      console.error('Failed to handle webhook:', err);
      throw new Error(err?.response?.data?.message || 'Webhook handling failed');
    }
  }

  // Method to process refund
  async refundSubscription(userId: number, amount: number, order: string) {
    try {
      const response = await axios.post(`${API_URL}/refund`, {
        userId,
        amount,
        order,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as any; // or as AxiosError if using axios-specific error
      console.error('Failed to process refund:', err);
      throw new Error(err?.response?.data?.message || 'Refund process failed');
    }
  }
}

export default new PaymentService();
