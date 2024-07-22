import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Room } from '../config/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getLastBidUpdatedAt } from '../services/auctionservice';
import { RootStackParamList } from '../types';
const localImage = require('../assets/Peugeot_308.png');


type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { room } = route.params;
  const imagePath = room?.car?.imagePath?.[0];
  const [lastBidAmount, setLastBidAmount] = useState<number | null>(null);
  const [lastBidUpdatedAt, setLastBidUpdatedAt] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const isAuctionClosed = room.auction?.auctionStatus === 'closed';

  const fetchLastBid = async () => {
    try {
      const data = await getLastBidUpdatedAt(room.auction.id);
      const lastBidUpdatedDate = new Date(data.updated_at);
      setLastBidUpdatedAt(
        lastBidUpdatedDate.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
      setLastBidAmount(data.bidAmount);
    } catch (error) {
      console.error('Error fetching last bid update date:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLastBid().finally(() => setRefreshing(false));
  }, [room.auction.id, isAuctionClosed]);

  useEffect(() => {
    if (isAuctionClosed) {
      fetchLastBid();
    }
  }, [room.auction.id, isAuctionClosed]);

  const handleParticipateClick = (room: Room)  => {
    navigation.navigate('bid', { room });
    // Navigation logic for participation
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {imagePath ? (
          <Image source={localImage} style={styles.image} />
        ) : (
          <Text>No Image Available</Text>
        )}

        <Text style={styles.title}>{room.name}</Text>

        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.detail}>Make: {room.car.make}</Text>
        <Text style={styles.detail}>Car Model: {room.car.model}</Text>
        <Text style={styles.detail}>Starting Price: {room.car.startingPrice} DT</Text>
        <Text style={styles.detail}>Market Price: {room.car.marketPrice} DT</Text>
        <Text style={styles.detail}>Year: {room.car.year}</Text>
        <Text style={styles.detail}>Power cheuvaux dine: {room.car.power_ch_in}</Text>
        <Text style={styles.detail}>Fiscal Power: {room.car.fiscal_power}</Text>
        <Text style={styles.detail}>Energy: {room.car.energy}</Text>
        <Text style={styles.detail}>Mileage: {room.car.mileage}</Text>
        <Text style={styles.detail}>Transmission: {room.car.transmission}</Text>
        <Text style={styles.detail}>Color: {room.car.color}</Text>
        <Text style={styles.detail}>Provider: {room.car.provider}</Text>
        <Text style={styles.detail}>Category: {room.car.category}</Text>
        <Text style={styles.detail}>{room.car.description}</Text>
      </ScrollView>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.status}>
            {isAuctionClosed ? (
              <>{lastBidUpdatedAt}</>
            ) : room.auction?.auctionStatus === 'ongoing' ? (
              <Text style={styles.ongoingStatus}>En cours</Text>
            ) : (
              <>Prévu le {new Date(room.startDate).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}</>
            )}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.priceLabel}>{isAuctionClosed ? 'Vendu à' : 'Prix de départ'}</Text>
          <Text style={styles.priceValue}>
            {isAuctionClosed ? (lastBidAmount !== null && lastBidAmount) : room.car.startingPrice} DT
          </Text>
        </View>
        {isAuctionClosed ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSold}>
              <Text style={styles.buttonText}>Closed</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleParticipateClick(room)}>
              <Text style={styles.buttonText}>Participez à 100 DT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    padding: 16,
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 18,
    marginVertical: 4,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  ongoingStatus: {
    fontSize: 14,
    color: 'red',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  priceValue: {
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: 300,
    height: 65,
    padding: 16,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonSold: {
    width: 300,
    height: 65,
    padding: 16,
    backgroundColor: 'gray',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
