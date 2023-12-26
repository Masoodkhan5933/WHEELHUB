import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import useAuth from '../hooks/auth';

const SignUpView = () => {
  const navigation = useNavigation(); // Hook into the navigation system
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');

  // Use the useAuth hook
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    try {
      // Call the signUp function from useAuth hook
      await signUp(email, password, { fullName, age, gender, type });
      // Handle successful signup
      Alert.alert('Success', 'Account created successfully');
      // Redirect to the login screen
      navigation.navigate('LoginScreen');
    } catch (error) {
      // Handle specific errors
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Error', 'Invalid email address');
          break;
        case 'auth/weak-password':
          Alert.alert('Error', 'Password should be at least 6 characters');
          break;
        default:
          Alert.alert('Error', error.message);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign Up</Text>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user-male-circle.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="Full name"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setFullName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/calendar.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="Age"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setAge(text)}
        />
      </View>

      <View style={styles.pickerContainer}>
  <RNPickerSelect
    placeholder={{ label: 'Select Gender', value: null }}
    onValueChange={(value) => setGender(value)}
    items={[
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ]}
  />
</View>

<View style={styles.pickerContainer}>
  <RNPickerSelect
    placeholder={{ label: 'Select Type', value: null }}
    onValueChange={(value) => setType(value)}
    items={[
      { label: 'Buyer', value: 'Buyer' },
      { label: 'Seller', value: 'Seller' },
    ]}
  />
</View>


      <TouchableOpacity
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b5ec',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#FF4DFF',
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  pickerContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30,
  },
});



export default SignUpView;
