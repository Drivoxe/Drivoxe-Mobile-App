import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Modal, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Car, Room } from '../config/types';
import { fetchFilterOptions, getRooms } from '../services/roomservice';
import Colors from '../constants/Colors';
import { CheckBox } from 'react-native-elements';

interface SearchScreenProps {
  onFilter: (filteredRooms: Room[]) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onFilter }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState<Partial<Record<keyof Car, string[]>>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Partial<Record<keyof Car, string[]>>>({});

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
      setFilteredRooms(data); // Initialize with full data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    };

    loadFilterOptions();
  }, []);

  useEffect(() => {
    refineFilterOptions();
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const handleFilterChange = (key: keyof Car, value: string) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[key] || [];
      if (currentValues.includes(value)) {
        return { ...prevFilters, [key]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prevFilters, [key]: [...currentValues, value] };
      }
    });
  };

  const refineFilterOptions = () => {
    let refinedOptions: Partial<Record<keyof Car, string[]>> = {};

    rooms.forEach(room => {
      const car = room.car;
      const includeCar = Object.keys(filters).every(key =>
        filters[key as keyof Car]?.length
          ? filters[key as keyof Car]?.includes(String(car[key as keyof Car]))
          : true
      );

      if (includeCar) {
        Object.keys(car).forEach(key => {
          refinedOptions[key as keyof Car] = refinedOptions[key as keyof Car] || [];
          if (!refinedOptions[key as keyof Car]?.includes(String(car[key as keyof Car]))) {
            refinedOptions[key as keyof Car]?.push(String(car[key as keyof Car]));
          }
        });
      }
    });

    setFilterOptions(refinedOptions);
  };

  const applyFilters = () => {
    let filteredRooms = rooms;

    if (searchQuery) {
      filteredRooms = filteredRooms.filter(room =>
        room.car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredRooms = filteredRooms.filter(room =>
      Object.keys(filters).every(key =>
        filters[key as keyof Car]?.length ? filters[key as keyof Car]?.includes(String(room.car[key as keyof Car])) : true
      )
    );

    setFilteredRooms(filteredRooms); // Update filtered rooms state
    onFilter(filteredRooms); // Pass the filtered data back
  };

  const resetFilters = () => {
    setFilters({});
  };

  const renderItem = ({ item }: { item: Room }) => (
    <View style={styles.card}>
      <Image source={require('../assets/car.png')} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.car.make} {item.car.model}</Text>
        <Text style={styles.cardDate}>Encher le {new Date(item.startDate).toLocaleDateString()}</Text>
        <View style={styles.searchBar}>
          <Text style={styles.Text}>Prix de départ </Text>
          <Text style={styles.cardPrice}> {item.car.startingPrice} DT</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Participez à {item.car.participationFees} DT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Search</Text>
        <Text style={styles.searchSubtitle}>Discover the best deals!</Text>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#ccc" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Cars"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setIsModalVisible(true)} >
            <Icon name="filter" size={20} color="#ccc" />
          </TouchableOpacity>

          <Modal presentationStyle='pageSheet' visible={isModalVisible} animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
            <ScrollView onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y > 0) {
                setIsModalVisible(false);
              }
            }}>
              <View style={styles.modalContainer}>
                {Object.keys(filterOptions).map((key) => (
                  <View key={key} style={styles.checkboxContainer}>
                    <Text>{key}</Text>
                    {filterOptions[key as keyof Car]?.map((option) => (
                      <CheckBox
                        key={option}
                        title={option}
                        checked={filters[key as keyof Car]?.includes(option) || false}
                        onPress={() => handleFilterChange(key as keyof Car, option)}
                      />
                    ))}
                  </View>
                ))}
                <Button title="Apply Filters" onPress={() => setIsModalVisible(false)} />
                <Button title="Reset Filters" onPress={resetFilters} />
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              </View>
            </ScrollView>
          </Modal>
        </View>
      </View>

      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 150,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
    color: '#777',
  },
  Text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 50,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    padding: 10,
    paddingTop: 60,
  },
  checkboxContainer: {
    marginBottom: 30,
  },
});

export default SearchScreen;
