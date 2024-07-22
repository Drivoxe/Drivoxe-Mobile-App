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
import Navigationin from './navigationin';
import NavigationOut from './navigationout';
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import Forgetscreen from "../screens/forgetpassword";
import Stepper from '../components/stepper';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, "App">;
const AppTabs: React.FC<Props> = () => {
    return(
        <Navigationin />
    );
};

const AuthNavigator = () => {
    const authContext = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator >
                {authContext?.isAuthenticated ? (
                    <Stack.Screen name="App" component={AppTabs} options={{ headerShown: false }} />
                ) : (
                    <><Stack.Screen name="Stepper" component={Stepper} options={{ headerShown: false }} /><Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} /><Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /><Stack.Screen name="Register" component={RegisterScreen} /><Stack.Screen name="Forget" component={Forgetscreen} options={{ headerShown: false }} /><Stack.Screen name="Profile" component={ProfileScreen} /><Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /></>
              
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
