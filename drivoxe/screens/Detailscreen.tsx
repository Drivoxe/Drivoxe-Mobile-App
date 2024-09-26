import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Room, User } from '../config/types';
import Slider from 'react-native-hook-image-slider';
import axiosInstance from '../components/axiosinstance';
import { RootStackParamList } from '../types';
import RoomsService from '../services/roomcheck';
import { getUserData } from '../services/api';
import WebView from 'react-native-webview';
import axios from 'axios';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const backendUrl = "http://localhost:4000";

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { room } = route.params;
  const [lastBidAmount, setLastBidAmount] = useState<number | null>(null);
  const [lastBidUpdatedAt, setLastBidUpdatedAt] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const isAuctionClosed = room.auction?.auctionStatus === 'closed';
  const [bidUpdate, setBidUpdate] = useState<{ newBid: number; userName: string } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [participationFees, setParticipationFees] = useState<number>(room.car.participationFees || 0);
  const [user, setUser] = useState<User | null>(null);
  const [haspaid, sethaspaid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const openLinkInModal = (link: string) => {
    setUrl(link);
    setModalVisible(true);
  };
  const handleWebViewNavigationStateChange = (navState: { url: any; }) => {
    const { url } = navState;
  
    // If the URL starts with "https://www.drivoxe.com/room-page/roomId"
    const roomPageUrl = `https://www.drivoxe.com/room-page/${room.id}`;

    if (url.startsWith(roomPageUrl)) {
      // Ensure 'user' is defined and 'user.id' is a number
      if (user?.id) {
        handlecheckpayment(user.id); // Now the id is guaranteed to be a number
        setModalVisible(false);
      } else {
        console.error('User or user ID is undefined');
      }
    }
  };
  const handlecheckpayment = async (userId: number) => {
    try {
      const rooms: Room[] = await RoomsService.getRoomsByUserID(userId);
      const matchedRoom = rooms.find((r: Room) => r.id === room.id);
      console.log('matched',matchedRoom);

      if (matchedRoom) {
        
        if (matchedRoom.subscribers ) {
          sethaspaid(true);
        }
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
        handlecheckpayment(userData.id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log(haspaid);

  }, []);

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Erreur', 'Veuillez vous connecter pour procéder au paiement.');
      return;
    }
  
    const paymeeFee = participationFees * 0.019;
    const tva = participationFees * 0.19;
    const totalAmount = participationFees + paymeeFee + tva;
  
    try {
      console.log('User ID:', user?.id);
      console.log('Room ID:', room.id);
      console.log('Total Amount:', totalAmount);
  
      const response = await axios.post(`${backendUrl}/pay`, {
        userId: Number(user.id),
        roomId: Number(room.id),
        amount: totalAmount,
        orderId: `room${room.id}`,
        note: 'subscription',
      });
  
      console.log('Response:', response.data);
  
      if (response.data.message === "Success" && response.data.data.payment_url) {
        const paymentUrl = response.data.data.payment_url;
        console.log(paymentUrl)
  
        // Check if the payment URL is valid
        if (paymentUrl.startsWith('http')) {
          // For navigation, use a WebView to open the payment page
          openLinkInModal(paymentUrl);
        } else {
          Alert.alert('Erreur', 'URL de paiement invalide');
        }
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'initiation du paiement');
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'initiation du paiement:', error.response ? error.response.data : error.message);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'initiation du paiement');
    }
  };
  const imageUris = room.car.imagePath?.map((path) => `${backendUrl}/uploads/${path}`) || [];

  const handleParticipateClick = (room: Room) => {
    if (room.auction?.auctionStatus === 'not_opened_yet') {
      Alert.alert("L'enchère n'est pas encore ouverte");
      return;
    }
    navigation.navigate('bid', { room });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {imageUris.length > 0 ? (
  <Slider images={imageUris} />
) : (
  <Text>No Image Available</Text>
)}

        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.detail}>Make: {room.car.make}</Text>
        <Text style={styles.detail}>Model: {room.car.model}</Text>
        <Text style={styles.detail}>Year: {room.car.year}</Text>
      </ScrollView>

      <View style={styles.detailsContainer}>
        <Text>Status: {room.auction?.auctionStatus}</Text>

        <View style={styles.buttonContainer}>
          {haspaid ? ( <TouchableOpacity style={styles.buttonAlreadyPaid} onPress={() => handleParticipateClick(room)}>
              <Text style={styles.buttonText} >
                {room.auction?.auctionStatus === 'not_opened_yet' ? 'Auction Not Opened Yet' : 'Proceed to Auction'}
              </Text>
            </TouchableOpacity>
          ) : (
            
          <TouchableOpacity
          style={styles.button}
          onPress={
           
              handleSubmit
          }
        >
          <Text style={styles.buttonText}>participate</Text>
        </TouchableOpacity>)}
        </View>

        {/* Modal for WebView */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent={false}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <WebView source={{ uri: url }} style={styles.webview} onNavigationStateChange={handleWebViewNavigationStateChange} />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 18,
    marginVertical: 4,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: 300,
    height: 65,
    padding: 16,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonAlreadyPaid: {
    width: 300,
    height: 65,
    padding: 16,
    backgroundColor: 'green',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
    padding: 10,
    backgroundColor: '#024da3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;

