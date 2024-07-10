import React from 'react';
import { View, Text, StyleSheet, ScrollView , Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Room } from '../config/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
  Details: { room: Room };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { room } = route.params;
  const imagePath = room?.car?.imagePath?.[0];
  console.log(imagePath);
  return (
    <SafeAreaProvider>
    <ScrollView style={styles.container}>
    {imagePath ? (
          <Image 
            source={{ uri: `https://auction-backend-o2l7.onrender.com/uploads/${imagePath}` }} 
            style={styles.image} 
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.detail}>Car Model: {room.car.model}</Text>
      <Text style={styles.detail}>Starting Price: {room.car.startingPrice} DT</Text>
      <Text style={styles.detail}> {room.car.description} </Text>

      {/* Add more details as needed */}
    </ScrollView></SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 18,
    marginVertical: 4,
  },
  imageContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default DetailsScreen;
