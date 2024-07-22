import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, ScrollView } from 'react-native';
import SearchBar from '../components/test';
import { Room } from '../config/types';
import { getRooms } from '../services/roomservice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



const Testscreen: React.FC = () => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Add delay to simulate loading
      }
    };

    fetchRooms();
  }, []);

  const handlePress = (room: Room) => {
    navigation.navigate('Details', { room });
  };

  const getFilteredRooms = () => {
    if (selectedFilter === 'All') {
      return rooms;
    }
    return rooms.filter(room => room.car.category === selectedFilter);
  };

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView>
    <View>
      <SearchBar rooms={rooms} onFilter={setFilteredRooms} />
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.car.make} {item.car.model}</Text>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default Testscreen;
