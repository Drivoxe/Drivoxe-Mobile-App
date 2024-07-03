import {
  Alert,
  Button,
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
import fonts from "../config/fonts";
import { size } from "lodash";
import { login } from "../constants/api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      Alert.alert('Login Successful', `Access Token: ${data.accessToken}`);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Login Failed', errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigate("Welcome")} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>sign in to your account</Text>
        
     
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
        <TouchableOpacity onPress={() => navigate("Forget")}  style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={handleLogin} >
          <Text style={styles.registerButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Register")}  style={styles.title}>
        <Text style={styles.forgotPasswordText}>create an account</Text>
      </TouchableOpacity>
      <View style= {{
        marginVertical : Spacing * 3,
      }}>
<Text style= {
  {
    fontFamily: Font ["poppins-bold"],
    color: Colors.primary,
    textAlign: "center",
    fontSize: FontSize.small,
  }
}>   
Or continue with
</Text>
<View style ={{
marginTop: Spacing,
flexDirection: "row",
justifyContent: "center",
}}>
  <TouchableOpacity style= {{
    padding: Spacing ,
    backgroundColor: Colors.gray,
    borderRadius: Spacing /2,
    marginHorizontal: Spacing,

  }}>
<Ionicons name="logo-facebook" size={Spacing*3} />
</TouchableOpacity> 
 <TouchableOpacity style= {{
    padding: Spacing ,
    backgroundColor: Colors.gray,
    borderRadius: Spacing /2,
    marginHorizontal: Spacing,

  }}>
<Ionicons name="logo-google" size={Spacing*3}  />
</TouchableOpacity> 
 <TouchableOpacity style= {{
    padding: Spacing ,
    backgroundColor: Colors.gray,
    borderRadius: Spacing /2,
    marginHorizontal: Spacing,

  }}>
<Ionicons name="logo-apple" size={Spacing*3} />
</TouchableOpacity>
      
</View>
</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    paddingRight: Spacing * 8, 
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
    color: Colors.text,
    fontSize: FontSize.small,
    fontWeight: 'bold',
  },
});




