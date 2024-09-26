import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Room } from '../config/types'; // Adjust the path as needed
import Font from '../constants/Font';
import { getLastBidUpdatedAt } from '../services/auctionservice';
import { colors } from 'react-native-elements';
import Colors from '../constants/Colors';


interface AuctionCardProps {
  room: Room;
  onPress?: () => void;
}
const backendUrl = "http://localhost:4000"; // Update this to your backend URL

const AuctionCard: React.FC<AuctionCardProps> = ({ room, onPress }) => {
  const isAuctionAvailable = room?.auction?.auctionStatus ;
  const imageUris = room.car.imagePath?.map((path) => `${backendUrl}/uploads/${path}`) || [];
  // Construct the full URI for the image
  

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
      <Text style={styles.title}>{room.car.model}</Text>
      <Text style={styles.date}>Encher le {new Date(room.startDate).toLocaleDateString()}</Text>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.pricetextblack}>Prix de départ </Text>
        <Text style={styles.price}>{room.car.startingPrice} DT</Text>
      </View>   
      <TouchableOpacity
  style={[
    styles.button,
    room.auction?.auctionStatus === 'closed' && styles.buttonDisabled, // gray for closed
    (room.auction?.auctionStatus === 'ongoing' || room.auction?.auctionStatus === 'not_opened_yet') && styles.buttonOrange // orange for ongoing or not_opened_yet
  ]}
  onPress={
    room.auction?.auctionStatus === 'ongoing' || room.auction?.auctionStatus === 'not_opened_yet' 
      ? onPress 
      : undefined
  }
  disabled={room.auction?.auctionStatus === 'closed'}
>
  <Text style={styles.buttonText}>
    {room.auction?.auctionStatus === 'ongoing' && 'Participate'}
    {room.auction?.auctionStatus === 'closed' && 'Closed'}
    {room.auction?.auctionStatus === 'not_opened_yet' && 'Check the Auction'}
    {!room.auction?.auctionStatus && 'Coming Soon'}
  </Text>
</TouchableOpacity>

     
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    height: 380,
    width: 204.32,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    padding: 8,
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
    width: 187.54,
    height: 150.32,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 187.54,
    height: 150.32,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontFamily: Font['poppins-bold'],
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: Font['poppins-regular'],
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 16,
    fontFamily: Font['poppins-bold'],
  },
  pricetextblack: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    fontFamily: Font['poppins-bold'],
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
    fontFamily: Font['poppins-bold'],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
    
    buttonOrange: {
      backgroundColor: Colors.primary,
    },
    buttonDisabled: {
      backgroundColor: 'gray',
    },
    
});

export default AuctionCard;
