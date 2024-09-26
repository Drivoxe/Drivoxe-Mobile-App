import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView, FlatList, Alert } from 'react-native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import { getUserData } from '../services/api';
import { User } from '../config/types';
import auctionService from '../services/auctionservice';
import { io } from 'socket.io-client';
import axiosInstance from '../components/axiosinstance';
import Slider from 'react-native-hook-image-slider'; 

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'bid'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'bid'>;


type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const backendUrl = "http://localhost:4000";

const socket = io(backendUrl, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const Bidscreen: React.FC<Props> = ({ route, navigation }) => {
  const { room } = route.params;
  const auction = room.auction;
  const imagePath = room?.car?.imagePath?.[0];
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [bids, setBids] = useState<number[]>([]);
  const [totalBid, setTotalBid] = useState<number>(room.auction.currentPrice);
  const [currentBid, setcurrentBid] = useState<number>(room.auction.currentPrice);

  const [user, setUser] = useState<User | null>(null);
  const [bidUpdate, setBidUpdate] = useState<{ newBid: number; userName: string } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [auctionClosed, setAuctionClosed] = useState<boolean>(false);
  const imageUris = room.car.imagePath?.map((path) => `${backendUrl}/uploads/${path}`) || [];

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  
  const handleValueSelect = (value: number) => {
    setSelectedValue(value);
  };

  const handleCustomValue = () => {
    const value = parseInt(customValue);
    if (value >= 100) {
      setSelectedValue(value);
      setModalVisible(false);
    } else {
      alert('Minimum value is 100');
    }
  };

  useEffect(() => {
    const fetchLastBidder = async () => {
      try {
        const response = await axiosInstance.get(`${backendUrl}/auctions/${auction.id}/last_bidder`);
        const { bidAmount, bidder } = response.data;
        const userName = bidder ? bidder.name : 'No bidder';
        const newBid = bidAmount || 0;
        setBidUpdate({ newBid, userName });
      } catch (error) {
        console.error('Error fetching last bidder:', error);
      }
    };

    fetchLastBidder();

    socket.on('bidUpdate', (data: { newBid: number; userName: string }) => {
      setBidUpdate(data);
      setTotalBid((prevTotalBid) => prevTotalBid + data.newBid);
      setBids((prevBids) => [data.newBid, ...prevBids]);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

  

    return () => {
      socket.off('bidUpdate');
      socket.off('connect_error');
     

    };
  

  
  }, []);
  useEffect(() => {
    socket.on('countdown', (data: { auctionId: number; remaining: number }) => {
      if (auction && data.auctionId === auction.id) {
        setRemainingTime(data.remaining);
  
        if (data.remaining <= 0) {
          setAuctionClosed(true);
        }
      }
    });
  
    return () => {
      socket.off('countdown');
    };
  }, [auction]);
  
  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds < 0) {
      return '00:00:00'; // Return 0 when the auction is closed
    }
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  

  const placeBidonline = async () => {
    if (selectedValue !== null && user) {
      const bidAmount = currentBid + selectedValue;
      Alert.alert(
        "Confirm Bid",
        `Are you sure you want to place a bid of ${bidAmount} DT?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              try {
                const bidData = {
                  userId: user.id,
                  bidAmount: bidAmount,
                };
  
                const auctionId = room.auction.id;
  
                console.log('Placing bid with data:', { auctionId, bidData });
  
                // Only proceed with the payment and placing the bid if confirmed
                await auctionService.placeBid(auctionId, bidData.bidAmount, bidData.userId);
  
                setcurrentBid(bidData.bidAmount);
              } catch (error) {
                console.error('Error placing bid:', error);
                alert('Error placing bid');
              }
            },
          },
        ]
      );
    } else {
      alert('Please select a value before placing a bid');
    }
  };
  

  return (
    <View style={styles.container}>
         {imageUris.length > 0 ? (
          <Slider images={imageUris} />
        ) : (
          <Text>No Image Available</Text>
        )}

      <View style={styles.blackcontainer}>
        <Text style={styles.title}>{room.car.make} {room.car.model}</Text>
      </View>
      <View style={styles.containerBOX}>
      <View style={styles.priceContainer}>
        <View style={styles.section}>
          <Text style={styles.label}> Starting price</Text>
          <Text style={styles.price}> {room.auction.startingPrice} DT</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Current Bid Price</Text>
          <Text style={styles.price}>{currentBid.toLocaleString()} DT</Text>
        </View>
      </View>

      <View style={styles.liveContainer}>
     
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Time remaining</Text>
        <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
      </View>
    </View>
      <View style={styles.whitecontainer}>
        <View style={styles.latestBidsContainer}>
          <View style={styles.latestBids}>
            <Image source={require('../assets/live.png')} style={styles.tabIcon} />
            <Text style={styles.latestBidsTitle}>Latest Bids:</Text>
          </View>

          <ScrollView style={styles.latestBidsContainer}>
  {bids.map((bid, index) => (
    <View style={styles.BidsContainer} key={`${bid}-${index}`}>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.profile} />
      <Text style={styles.bidder}>{`${user?.name|| 'Unknown Bidder'}:`}</Text>
      <Text style={styles.latestBid}>{`${bid} DT`}</Text>
    </View>
  ))}
</ScrollView>

        </View>
        <View style={styles.bubbleContainer}>
          {[100, 250, 500].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.bubble,
                selectedValue === value && styles.selectedBubble,
              ]}
              onPress={() => handleValueSelect(value)}
            >
              <Text style={styles.bubbleText}>{value}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.bubble,
              selectedValue !== null && ![100, 250, 500].includes(selectedValue) && styles.selectedBubble,
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.bubbleText}>Custom</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={placeBidonline}
        >
          <Text style={styles.buttonText}>Place Bid for {selectedValue} DT</Text>
        </TouchableOpacity>
        <Modal  presentationStyle='overFullScreen' visible={isModalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <ScrollView onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y > 0) {
              setModalVisible(false);
            }
          }}>
            <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text>Enter Custom Value:</Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={customValue}
                onChangeText={setCustomValue}
              />
              <TouchableOpacity onPress={handleCustomValue} style={styles.modalButton}>
                <Text>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
                        </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  containerBOX: {
    marginTop: '1%', 

    backgroundColor: '#F3F2F2',
    padding: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '15%',
    backgroundColor: 'white',
    marginHorizontal:'1%',
  },
  blackcontainer: {
    width: 'auto',
    height: 70,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whitecontainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 'auto',
  },
  image: {
    width: '100%',
    height: '31%',
    resizeMode: 'contain',
    borderRadius: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: Colors.background,
    fontFamily: Font['poppins-bold'],
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1%',
  },
  bubble: {
    backgroundColor: '#e3e3e3',
    borderRadius: 20,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    marginHorizontal: '2%',
  },
  selectedBubble: {
    backgroundColor: Colors.primary,
  },
  bubbleText: {
    fontSize: 16,
    color: Colors.darkText,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: '3                             %',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.background,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '5%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',  // Adjust this to control how much of the screen the modal should cover
  },
  modalButton: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  latestBidsContainer: {
    flex: 1,
    marginVertical: 10,
  },
  latestBids: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  latestBidsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  BidsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bidder: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  latestBid: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Add semi-transparent background
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  section: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
  },
  liveText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    color: '#555',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginLeft: 8,
  },
});

export default Bidscreen;
