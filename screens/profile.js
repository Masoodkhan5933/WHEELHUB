import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import from your navigation library
import useAuth from '../hooks/auth';
import { firestore } from '../database/dbconfig';
import Firestore from '../hooks/firestore';

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user,signOutUser } = useAuth();
  
  const { getUserProfile }= Firestore();
  
  
  // const cuser=getUserProfile(user.auth.currentUser.uid);
  
  const handleSignOut = async () => {
    try {
      await signOutUser();
      Alert.alert('Sign Out', 'You have been signed out successfully.');
      navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again later.');
    }
  };


  return (
    <View style={styles.container}>
      <Image style={styles.background} source={{ uri: 'https://example.com/background.jpg' }} />

      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: 'https://example.com/background.jpg' }} />
      </View>

      <View style={styles.detailsContainer}>
        {/* <Text style={styles.detailText}>Name: {cuser.fullName}</Text>
        <Text style={styles.detailText}>Address: {cuser.address}</Text>
        <Text style={styles.detailText}>Gender: {cuser.gender}</Text> */}
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  notSignedInText: {
    fontSize: 18,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover', // Ensure the background image covers the entire screen
  },
  profilePictureContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff', // Add a border color
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333', // Change the text color
  },
  signOutButton: {
    backgroundColor: '#fb5b5a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfilePage;
