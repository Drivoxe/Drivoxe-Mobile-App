import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView } from 'react-native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';
import Font from '../constants/Font';
import { getUserData } from '../services/api'; // Update import path if needed
import { User } from '../config/types';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'bid'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'bid'>;
const localImage = require('../assets/Peugeot_308.png');

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const Bidscreen: React.FC<Props> = ({ route, navigation }) => {
  const { room } = route.params;
  const imagePath = room?.car?.imagePath?.[0];
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [bids, setBids] = useState<number[]>([]);
  const [totalBid, setTotalBid] = useState<number>(room.car.startingPrice) ;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    fetchUserData();
  }, []);

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

  const placeBid = () => {
    if (selectedValue !== null) {
      setTotalBid((prevTotalBid) => {
        const newTotalBid = prevTotalBid + selectedValue;
        setBids((prevBids) => [newTotalBid, ...prevBids]);
        return newTotalBid;
      });
    } else {
      alert('Please select a value before placing a bid');
    }
  };

  return (
    <View style={styles.container}>
      {imagePath ? (
        <Image source={localImage} style={styles.image} />
      ) : (
        <Text>No Image Available</Text>
      )}
      <View style={styles.blackcontainer}>
        <Text style={styles.title}>{room.car.make} {room.car.model}</Text>
      </View>

      <View style={styles.whitecontainer}>
        <View style={styles.latestBidsContainer}>
          <View style={styles.latestBids}>
            <Image source={require('../assets/live.png')} style={styles.tabIcon} />
            <Text style={styles.latestBidsTitle}>Latest Bids:</Text>
          </View>

          <ScrollView style={styles.latestBidsContainer}>
            {bids.map((bid, index) => (
              <View style={styles.BidsContainer} key={`${bid}-${index}`}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.profile} />
                <Text style={styles.bidder}>{`${user?.name} ${user?.lastname} :`}</Text>
                <Text style={styles.latestBid}>{`${bid} DT`}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
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
          onPress={placeBid}
        >
          <Text style={styles.buttonText}>Place Bid for {selectedValue} DT</Text>
        </TouchableOpacity>
        <Modal presentationStyle='pageSheet' visible={isModalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
    backgroundColor: 'blue',
  },
  blackcontainer: {
    width: 'auto',
    height: 70,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whitecontainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 'auto',
  },
  image: {
    width: '100%',
    height: '33%',
    resizeMode: 'contain',
    backgroundColor: 'blue',
  },
  BidsContainer: {
    flexDirection: 'row',
  },
  latestBidsContainer: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
  },
  latestBids: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  latestBidsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  latestBid: {
    color: '#333',
    fontSize: 26,
    paddingVertical: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontFamily: Font["poppins-bold"],
  },
  bidder: {
    color: '#333',
    fontSize: 26,
    paddingVertical: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    fontFamily: Font["poppins-bold"],
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
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    fontFamily: Font["poppins-bold"],
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
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  profile:{
    width: 50, 
    height: 50,
    borderRadius: 50,
  }
});

export default Bidscreen;
