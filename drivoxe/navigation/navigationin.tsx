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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();


const HomeStack = () => (
  <Stack.Navigator   >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="alldeals" component={Alldeals} />
  </Stack.Navigator>
);

const Navigationin = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
      }}   tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="house" color={Colors.primary} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={profileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

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
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigationin;
