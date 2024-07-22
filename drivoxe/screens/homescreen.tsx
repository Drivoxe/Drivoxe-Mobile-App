import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import AuctionCard from '../components/Card';
import { getRooms } from '../services/roomservice';
import { Room } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;


const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const navigation = useNavigation();
  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      fetchRooms();
      setRefreshing(false);
    }, 2000);
  }, [rooms]);
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
    navigation.navigate('deals');
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
    <ScrollView style={styles.container}   refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.header}>
      <View style={styles.horizontal}>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.profile} />

        <Text style={styles.greeting}>Hello, Ujang</Text>
        </View >
        <Text style={styles.subheading}>Let's Start The Auction!</Text>
      </View>
      <View style={styles.currentAuction}>
        <Image source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.HqVqTgyrAY4AghvNaCYu7wHaJg&pid=Api&P=0&h=180' }} style={styles.image} />
        <View style={styles.auctionDetails}>
          <Text style={styles.carModel}>Mercedes C200 AMG</Text>
          <Text style={styles.auctionStatus}>The auction is almost closed! Don’t miss your chance to bid now!</Text>
          <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Participez à 100 DT</Text>
      </TouchableOpacity>
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
            <View key={room.id} >
              <AuctionCard room={room} onPress={() => handlePress(room)}/>
            </View>
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
            <View key={room.id} >
              <AuctionCard room={room} onPress={() => handlePress(room)}/>
            </View>
          ))
        ) : (
          <Text>No rooms available</Text>
        )}
      </ScrollView>
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  header: {
    marginVertical: 20,
  },
  greeting: {
    paddingTop: 15,
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  currentAuction: {
    backgroundColor: Colors.primary,
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
    color: Colors.onPrimary,
  },
  auctionStatus: {
    fontSize: 14,
    color: Colors.onPrimary,
    marginBottom:10,
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
    color: Colors.primary,  },
  viewAll: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  horizontal:{
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    paddingTop: 10,
    backgroundColor: 'gray',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default HomeScreen;
