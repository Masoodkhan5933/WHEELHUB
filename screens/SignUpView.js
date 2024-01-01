import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/auth';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import useStorage from '../hooks/storage';

const SignUpView = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [profileImage, setProfileImage] = useState(null); 

  const { user,signUp } = useAuth();
  const { uploadProfilePicture } = useStorage();

  
  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user, navigation]);
  const handleImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        const newPath = FileSystem.documentDirectory + 'tempImage.jpg';
        await FileSystem.copyAsync({
          from: pickerResult.assets[0].uri,
          to: newPath,
        });

        setProfileImage(newPath); // Corrected this line
        console.log(newPath);
      }
    } catch (error) {
      alert('Failed to pick image');
    }
  };

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    try {
      let profileImageUrl = null;

      if (profileImage) {
        profileImageUrl = await uploadProfilePicture(profileImage);
        console.log(profileImageUrl)
        setProfileImage(profileImageUrl)
      } else {
        profileImageUrl = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png';
      }
      await signUp(email, password, { fullName, age, gender, type, profileImageUrl });

      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error) {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOzWtWVq7v6MOi6Rr1y2lMyBH_27PkTForA&usqp=CAU' }} // Replace with your background image URL
      />
      <Text style={styles.title}>Sign Up</Text>
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

      {/* Add Image Button */}
      <TouchableOpacity style={[styles.buttonContainer, styles.addImageButton]} onPress={handleImagePicker}>
        <Text style={styles.addImageText}>Add Image</Text>
      </TouchableOpacity>

      {/* Display selected image */}
      {profileImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: profileImage }} style={styles.imagePreview} />
        </View>
      )}

     

      {/* Your existing code... */}
      
      <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
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
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
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
  addImageButton: {
    backgroundColor: '#4CAF50',
  },
  addImageText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SignUpView;
