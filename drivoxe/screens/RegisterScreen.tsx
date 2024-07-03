import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CheckBox } from 'react-native-elements';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { signup } from "../constants/api";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    console.log('Attempting registration...');
  
    try {
      if (!termsAccepted) {
        console.log('Terms not accepted');
        throw new Error('You must accept the terms and conditions');
      }
  
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
        throw new Error('Passwords do not match');
      }
      console.log(firstName);
      console.log(email);
      console.log(password);
      const data = await signup(firstName, email, password);
      console.log('Registration successful:', data);
      Alert.alert('Registration Successful', `Welcome ${data.firstName} . please verify your account`);

    navigate("Login");
  } catch (error: any) {
    const errorMessage = (error as Error).message; // Explicitly cast error to Error type
    Alert.alert('Registration Failed', errorMessage || 'An error occurred');
    console.log(firstName);
    console.log(email);
    console.log(password);
    console.error('Registration Error:', error); 
  }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigate("Welcome")} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>It's a pleasure to meet you!</Text>
        <Text style={styles.subtitle}>Sign up and get started</Text>
        
        <TextInput
          placeholder="Name"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.darkText}
            style={[styles.input, styles.passwordInput]}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text>{isPasswordVisible ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={[styles.registerButton]}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <CheckBox
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={styles.termsText}>
            By clicking "Agree," you accept the{' '}
            <Text style={styles.termsLink}>terms and conditions</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: Spacing * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: Spacing * 2,
    marginBottom: Spacing,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: Spacing * 2,
  },
  input: {
    width: '100%',
    paddingVertical: Spacing * 2,
    paddingHorizontal: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginBottom: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    paddingRight: Spacing * 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: Spacing * 2,
    bottom: Spacing * 4,
  },
  registerButton: {
    width: '100%',
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    alignItems: 'center',
    marginBottom: Spacing * 2,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing * 2,
  },
  termsText: {
    marginLeft: Spacing,
    color: 'gray',
  },
  termsLink: {
    color: '#FF3D00',
  },
});

export default RegisterScreen;
