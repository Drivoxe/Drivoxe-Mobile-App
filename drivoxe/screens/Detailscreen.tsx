import React from 'react';
import { View, Text, StyleSheet, ScrollView , Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Room } from '../config/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
const localImage = require('../assets/Peugeot_308.png');
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
   
    <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{room.name}</Text>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>

    {imagePath ? (
          <Image 
            source={ localImage } 
            style={styles.image} 
          />
        ) : (
          <Text>No Image Available</Text>
        )}

      <Text style={styles.title}>{room.name}</Text>
  

    <Text style={styles.subtitle}>description</Text>
    <Text style={styles.detail}>Make: {room.car.make} </Text>
      <Text style={styles.detail}>Car Model: {room.car.model}</Text>
      <Text style={styles.detail}>Starting Price: {room.car.startingPrice}DT </Text>
      <Text style={styles.detail}>Market Price: {room.car.marketPrice} DT</Text>
      <Text style={styles.detail}>Year: {room.car.year} </Text>
      <Text style={styles.detail}>Power cheuvaux dine: {room.car.power_ch_in} </Text>
      <Text style={styles.detail}>Fiscal Power: {room.car.fiscal_power} </Text>
      <Text style={styles.detail}>Energy: {room.car.energy} </Text>
      <Text style={styles.detail}>Mileage: {room.car.mileage} </Text>
      <Text style={styles.detail}>Transmission: {room.car.transmission} </Text>
      <Text style={styles.detail}>Make: {room.car.make} </Text>
      <Text style={styles.detail}>Color: {room.car.color} </Text>
      <Text style={styles.detail}>Provider: {room.car.provider} </Text>
      <Text style={styles.detail}>category: {room.car.category} </Text>
      




   
     



   <Text style={styles.subtitle}>description</Text>
   <Text style={styles.detail}> {room.car.description} </Text>

    </ScrollView>
    <View style={styles.buttoncontainer}  >
    <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Participez à 100 DT</Text>
      </TouchableOpacity>
     </View>
  </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttoncontainer:{


    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10,
  },
  scrollViewContent: {
    padding: 16,
 textAlign: "center",
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  description: {
    width: '100%',
  },
  button: {
    width: 300,
    height:65,
    padding: 16,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },});

export default DetailsScreen;
