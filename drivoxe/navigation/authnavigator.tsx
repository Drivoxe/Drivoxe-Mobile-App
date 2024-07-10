// src/navigation/AuthNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/homescreen';
import ProfileScreen from '../screens/profilescreen';
import { AuthContext } from '../context/LoginProvider';
import { RootStackParamList } from '../types';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import App from '../App';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, "App">;
const AppTabs: React.FC<Props> = () => {
    return(
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    );
};

const AuthNavigator = () => {
    const authContext = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authContext?.isAuthenticated ? (
                    <Stack.Screen name="App" component={AppTabs} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
