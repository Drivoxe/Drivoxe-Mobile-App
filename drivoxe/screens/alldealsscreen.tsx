import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getRooms } from '../services/roomservice';
import { Room } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import GridCard from '../components/gridcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Font from '../constants/Font';

const Alldeals = () => {
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  const filteredRooms = getFilteredRooms();

  return (
<SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View>
      <ScrollView horizontal style={styles.filtersContainer} contentContainerStyle={styles.filtersContent}>
        {['All', 'CITADINE', 'SUV', 'COMPACTE', 'BERLINE', 'COUPÉ', 'UTILITAIRE', 'MONOSPACE', 'PICK UP', 'CABRIOLET'].map((filter) => (
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
      </ScrollView>
      </View>

      {filteredRooms.length === 0 ? (
        <View style={styles.noRoomsContainer}>
          <Text style={styles.noRoomsText}>No rooms available</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          renderItem={({ item }) => (
            <GridCard room={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 0,
    backgroundColor: '#FFF',
    
    paddingLeft: 0,
  },
  safecontainer: {
    flex: 1,
 
  },
  filtersContainer: {
    borderBottomColor: '#ddd',
  },
  filtersContent: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 4,
  },
  selectedFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  filterText: {
    fontSize: 14,
    color: 'black',
    fontFamily: Font["poppins-regular"],

  },
  selectedFilterText: {
    color: 'red',
    fontFamily: Font["poppins-regular"],

  },
  grid: {
    paddingRight: 0,
    backgroundColor: '#FFF',


  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Font["poppins-bold"],

  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
    fontFamily: Font["poppins-regular"],

  },
  cardPrice: {
    fontSize: 16,
    color: 'red',
    fontFamily: Font["poppins-regular"],

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
    fontFamily: Font["poppins-regular"],

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRoomsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRoomsText: {
    fontSize: 18,
    color: 'gray',
    fontFamily: Font["poppins-regular"],
  },
});

export default Alldeals;
