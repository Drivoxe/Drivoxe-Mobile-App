import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Modal, Text, ScrollView, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Room, Car } from '../config/types';
import { fetchFilterOptions } from '../services/roomservice';

interface SearchBarProps {
  rooms: Room[];
  onFilter: (filteredRooms: Room[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ rooms, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Partial<Record<keyof Car, string[]>>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Partial<Record<keyof Car, string[]>>>({});

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

    if (searchTerm) {
      filteredRooms = filteredRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredRooms = filteredRooms.filter(room =>
      Object.keys(filters).every(key =>
        filters[key as keyof Car]?.includes(String(room.car[key as keyof Car]))
      )
    );

    onFilter(filteredRooms);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      <Button title="Filters" onPress={() => setIsModalVisible(true)} />
      
      <Modal presentationStyle='pageSheet' visible={isModalVisible} animationType="fade">
        <ScrollView>
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
            <Button title="Apply Filters" onPress={applyFilters} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 20,
    paddingTop: 60,
  },
  input: {
    marginBottom: 20,
  },
  modalContainer: {
    padding: 10,
    paddingTop: 60,
  },
  checkboxContainer: {
    marginBottom: 30,
  },
});

export default SearchBar;
