// ProfileScreen.tsx

import { logout } from '../services/api';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { AuthContext } from '../context/LoginProvider';
import Font from '../constants/Font';

const OtherScreen = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const data = await authContext?.logout();
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
      <TouchableOpacity  onPress={handleLogout} >
          <Text >Login</Text>
        </TouchableOpacity>
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
    fontFamily: Font["poppins-regular"],

  },
});

export default OtherScreen;
