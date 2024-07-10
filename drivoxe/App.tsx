import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

import drawernavigator from "./navigation/navigationin";
import NavigationOut from "./navigation/navigationout";
import Navigationin from "./navigation/navigationin";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontsLoaded] = useFonts(fonts);
  const [refreshing, setRefreshing] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setLoading(false);
    console.log(token);
  };

  useEffect(() => {
    checkToken();
  
  }, []);
  useLayoutEffect(()=>{
    checkToken();
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await checkToken();
    setRefreshing(false);
  }, []);

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
 
        
<Navigationin />

      
      <StatusBar />
    </SafeAreaProvider>
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
