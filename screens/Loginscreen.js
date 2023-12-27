import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import useAuth from '../hooks/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { signIn, loading } = useAuth();
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const onPressLogin = async () => {
    try {
      if (!credentials.email || !credentials.password) {
        Alert.alert('Invalid Input', 'Please enter both email and password.');
        return;
      }

      await signIn(credentials.email, credentials.password);
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
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yT2sLJU6tTGHhWzCmWu-7ZJQxXTjj3_QdYG-U_AO68xEb9_VoO0Ey_Nmzm2ECrAtdEc&usqp=CAU' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login Screen</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setCredentials({ ...credentials, email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
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
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginText}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSignUp}>
            <Text style={styles.forgotAndSignUpText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#3AB4BA',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
    fontSize: 18,
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginScreen;
