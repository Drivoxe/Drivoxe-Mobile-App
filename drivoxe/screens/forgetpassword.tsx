import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import AppTextInput from "../components/AppTextInput";
  import { CheckBox, colors } from "react-native-elements";
  
  type Props = NativeStackScreenProps<RootStackParamList, "Forget">;
  
  const Forgetscreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity onPress={() => navigate("Login")} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>No Worries !</Text>
          <Text style={styles.subtitle}>Enter your email to recover your account </Text>
          
       
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.darkText}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
         
          <TouchableOpacity  onPress={() =>  Alert.alert('an email has been sent') } style={styles.registerButton}>
            <Text style={styles.registerButtonText}>recover account </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Forgetscreen;
  
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
      marginBottom: Spacing * 2,
    },
    passwordInput: {
      flex: 1,
      paddingRight: Spacing * 8, // Ensure space for eye icon
    },
    eyeIcon: {
      position: 'absolute',
      right: Spacing * 2 ,
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
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 0,
      marginBottom: 10,
    },
    forgotPasswordText: {
      color: Colors.primary,
    },
  });
  
  
  
  
  