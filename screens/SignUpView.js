import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import useAuth from '../hooks/auth';

const SignUpView = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [cnic, setCNIC] = useState('');
  const [district, setDistrict] = useState('');

  // Use the useAuth hook
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      // Call the signUp function from useAuth hook
      await signUp(email, password, { fullName, age, gender, cnic, district });
      // Handle successful signup, navigate to the home screen, or show a success message
      Alert.alert('Success', 'Account created successfully');
    } catch (error) {
      // Handle signup error, show an error message to the user
      Alert.alert('Error', error.message);
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

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/gender.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="Gender"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setGender(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://icons8.com/icon/80052/numbers-input-form' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="CNIC"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setCNIC(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/map-marker.png' }}
        />
        <TextInput
          style={[styles.inputs, { fontSize: 18 }]}
          placeholder="District"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setDistrict(text)}
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

  title:{
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 40,
    },
});

export default SignUpView;
