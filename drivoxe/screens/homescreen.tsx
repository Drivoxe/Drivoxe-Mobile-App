import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AuctionCard from '../components/Card';
import { getRooms } from '../services/roomservice';
import { Room } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

const HomeScreen: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const handlePress = (room: Room) => {
    navigation.navigate('Details', { room });
  };

  const handleViewAll = (type: string) => {
    console.log(`${type} View All clicked`);
    navigation.navigate('alldeals');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Ujang</Text>
        <Text style={styles.subheading}>Let's Start The Auction!</Text>
      </View>
      <View style={styles.currentAuction}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <View style={styles.auctionDetails}>
          <Text style={styles.carModel}>Mercedes C200 AMG</Text>
          <Text style={styles.auctionStatus}>The auction is almost closed! Don’t miss your chance to bid now!</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Now</Text>
        <TouchableOpacity onPress={() => handleViewAll('available')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.horizontalScroll}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <TouchableOpacity key={room.id} onPress={() => handlePress(room)}>
              <AuctionCard room={room} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No rooms available</Text>
        )}
      </ScrollView>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Closed Auctions</Text>
        <TouchableOpacity onPress={() => handleViewAll('closed')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.horizontalScroll}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <TouchableOpacity key={room.id} onPress={() => handlePress(room)}>
              <AuctionCard room={room} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No rooms available</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
  },
  currentAuction: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  auctionDetails: {
    flex: 1,
  },
  carModel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  auctionStatus: {
    fontSize: 14,
    color: 'red',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    marginVertical: 10,
  },
});

export default HomeScreen;
