import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import useAuth from '../hooks/auth';
import { useNavigation } from '@react-navigation/native';

const Loginscreen = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const onPressLogin = async () => {
    try {
      // Check if email or password is empty
      if (!credentials.email || !credentials.password) {
        Alert.alert('Invalid Input', 'Please enter both email and password.');
        return;
      }
  
      await signIn(credentials.email, credentials.password);
      // Navigate to the home page upon successful login
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Login Failed', 'Invalid email or password. Please check your credentials and try again.');
      } else {
        Alert.alert('Login Failed', 'An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  
  

  const onPressForgotPassword = () => {
    // Implement your forgot password logic here
  };

  const onPressSignUp = () => {
    // Navigate to the sign-up page
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.inputText, styles.emailInput]}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.inputText, styles.passwordInput]}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
      </View>
      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#4FD3DA',
  alignItems: 'center',
  justifyContent: 'center',
  },
  title:{
  fontWeight: "bold",
  fontSize:50,
  color:"#fb5b5a",
  marginBottom: 40,
  },
  inputView:{
  width:"80%",
  backgroundColor:"#3AB4BA",
  borderRadius:25,
  height:50,
  marginBottom:20,
  justifyContent:"center",
  padding:20
  },
  inputText:{
  height:50,
  color:"white"
  },
  forgotAndSignUpText:{
  color:"white",
  fontSize:30,
  },
  loginBtn:{
  width:"80%",
  backgroundColor:"#fb5b5a",
  borderRadius:25,
  height:50,
  alignItems:"center",
  justifyContent:"center",
  marginTop:40,
  marginBottom:10
  },
  emailInput: {
      fontSize: 18, 
      },
  passwordInput: {
       fontSize: 18, 
    },
  });

export default Loginscreen;
