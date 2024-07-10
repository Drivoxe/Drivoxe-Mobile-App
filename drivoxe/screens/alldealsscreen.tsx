import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getRooms } from '../services/roomservice';
import { Room } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import AuctionCard from '../components/Card';

const Alldeals = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

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

  const renderDeal = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDate}>Encher le {item.date}</Text>
      <Text style={styles.cardPrice}>Prix de départ {item.price}</Text>
      <TouchableOpacity style={styles.participateButton}>
        <Text style={styles.participateText}>Participez à 20 DT</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {['All', 'Luxe', 'Popular', 'Commercial'].map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <AuctionCard room={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Number of columns in the grid
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  filterText: {
    fontSize: 16,
    color: 'black',
  },
  selectedFilterText: {
    color: 'red',
  },
  grid: {
    padding: 8,
  },
  card: {
    flex: 1,
    width : 172.52,
    height: 250.76,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  cardPrice: {
    fontSize: 16,
    color: 'red',
  },
  participateButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  participateText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Alldeals;
