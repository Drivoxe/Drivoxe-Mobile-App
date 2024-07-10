// ProfileScreen.tsx

import { logout } from '../services/api';
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const OtherScreen = () => {
  const handleLogout = async () => {
    try {
      const data = await logout();
      Alert.alert('Logout Successful', );
     
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Logout Failed', errorMessage);
      console.log(errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is another screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default OtherScreen;
