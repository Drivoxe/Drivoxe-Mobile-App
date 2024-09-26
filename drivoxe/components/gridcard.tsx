import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Room } from '../config/types'; // Adjust the path as needed

const localImage = require('../assets/Peugeot_308.png');


interface AuctionCardProps {
  room: Room;
  onPress?: () => void;
}
const backendUrl = "http://localhost:4000"; // Update this to your backend URL

const GridCard: React.FC<AuctionCardProps> = ({ room, onPress }) => {
  const imageUris = room.car.imagePath?.map((path) => `${backendUrl}/uploads/${path}`) || [];

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imageUris ? (
          <Image 
        source= {{uri: imageUris[0]}}
                    style={styles.image} 
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.date}>Encher le {new Date(room.startDate).toLocaleDateString()}</Text>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
      <View style={styles.searchBar}>
          <Text style={styles.pricetextblack}>Prix de départ </Text>
          <Text style={styles.price}> {room.car.startingPrice} DT</Text>
        </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Participez à {room.car.participationFees} DT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: '45%',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 10,

  },
  imageContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 10,
    color: '#666',
    marginBottom: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progress: {
    width: '20%', // Change this to dynamically set progress
    height: '100%',
    backgroundColor: '#747474',
  },
  price: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 16,
  },
  pricetextblack: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
   
  },
});

export default GridCard;
