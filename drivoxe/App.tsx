import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import { useEffect, useState, useCallback, useLayoutEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { AuthContext, LoginProvider } from './context/LoginProvider';
import drawernavigator from "./navigation/navigationin";
import NavigationOut from "./navigation/navigationout";
import Navigationin from "./navigation/navigationin";
import AuthNavigator from "./navigation/authnavigator";

const App = () => {

  return (
    <LoginProvider>

        
<AuthNavigator />

  
      <StatusBar />
    </LoginProvider>
    
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default App;
