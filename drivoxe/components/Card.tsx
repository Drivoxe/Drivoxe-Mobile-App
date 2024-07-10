import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Room } from '../config/types'; // Adjust the path as needed

interface AuctionCardProps {
  room: Room;
  onPress?: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ room, onPress }) => {
  const imagePath = room?.car?.imagePath?.[0];
  console.log(imagePath);
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imagePath ? (
          <Image 
            source={{ uri: `https://auction-backend-o2l7.onrender.com/uploads/${imagePath}` }} 
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
      <Text style={styles.price}>Prix de départ {room.car.startingPrice} DT</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Participez à {room.car.participationFees} DT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
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
    width: '50%', // Change this to dynamically set progress
    height: '100%',
    backgroundColor: '#ff0000',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff0000',
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

export default AuctionCard;
