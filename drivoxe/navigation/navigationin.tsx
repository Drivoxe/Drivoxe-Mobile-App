import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homescreen';
import profileScreen from '../screens/profilescreen';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTabBar from '../components/CustomTabBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import DetailsScreen from '../screens/Detailscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import alldeals from '../screens/alldealsscreen';
import Alldeals from '../screens/alldealsscreen';
import Searchscreen from '../screens/Searchscreen';
import Notificationscreen from '../screens/Notificationscreen';
import { Room } from '../config/types';
import SearchScreen from '../screens/Searchscreen';
import { TabView } from 'react-native-elements';
import Bidscreen from '../screens/bidscreen';
import WebView from 'react-native-webview';
import WebViewScreen from '../screens/WebViewScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();


const HomeStack = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false,}}  >
    <Stack.Screen name="Homestack" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="bid" component={Bidscreen} />
    <Stack.Screen name="deals" component={Alldeals} />

  </Stack.Navigator>
);


const Navigationin = () => {
  const handleFilter = (filteredRooms: Room[]) => {
    // Implement what you want to do with the filtered rooms
    console.log('Filtered Rooms:', filteredRooms);
  };
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,}}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      /> 

        <Tab.Screen name="Search">
        {(props) => <SearchScreen {...props} onFilter={(filteredRooms) => console.log(filteredRooms)} />}
      </Tab.Screen>
      
     
      <Tab.Screen
        name="Notifications"
        component={Notificationscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="Notifications" color={color} size={size} />
          ),
        }}
      />
     <Tab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};




const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    paddingTop: 200,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigationin;
