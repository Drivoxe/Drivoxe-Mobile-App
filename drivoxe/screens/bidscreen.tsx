import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView, } from 'react-native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Room } from '../config/types';
import Colors from '../constants/Colors';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'bid'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'bid'>;


  
type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const Bidscreen: React.FC<Props> = ({ route, navigation })  => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState('');

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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png' }}
        style={styles.image}
      />
      <ScrollView style={styles.whitecontainer}>
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
        onPress={() => alert(`Placed Bid for $${selectedValue}`)}
      >
        <Text style={styles.buttonText}>Place Bid for ${selectedValue}</Text>
      </TouchableOpacity>
    <Modal  presentationStyle='pageSheet' visible={isModalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
            <ScrollView onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y > 0) {
                setModalVisible(false);
              }
            }}>
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
        </ScrollView>
      </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
    backgroundColor: '#000',
  },
  whitecontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
    backgroundColor: '#000',

  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  selectedBubble: {
    backgroundColor: Colors.primary,
  },
  bubbleText: {
    color: '#000',
  },
  button: {
    backgroundColor:  Colors.primary,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginVertical: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor:  Colors.primary,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default Bidscreen;
