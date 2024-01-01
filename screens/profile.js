import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/auth';
import Firestore from '../hooks/firestore'; // Import Firestore
import { AuthContext } from '../contexts/authcontext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this library

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user, signOutUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserProfile } = Firestore(); // Initialize Firestore and get the function

  const getUserId = async () => {
    return await user?.uid;
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      Alert.alert('Sign Out', 'You have been signed out successfully.');
      navigation.navigate('Login');
    } catch (error) {
      // console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again later.');
    }
  };

  const fetchUserId = async () => {
    setLoading(true);
    const userId = await getUserId();
    setUserId(userId);
    setLoading(false);
    fetchUserProfile(userId); // Fetch user profile after setting user ID
  };

  const fetchUserProfile = async (userId) => {
    try {
      const user = await getUserProfile(userId);
      setUserProfile(user);
    } catch (error) {
      console.log('Error fetching user profile:', error);
      // Alert.alert('Error', 'Failed to fetch user profile. Please try again later.');
    }
  };
  

  useEffect(() => {
    // Fetch and set the user ID when the component mounts
    fetchUserId();
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={{ uri: 'https://example.com/background.jpg' }} />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <View style={styles.profilePictureContainer}>
          <Image style={styles.profilePicture} source={{ uri: userProfile?.profileImageUrl?.indexOf !== undefined ? userProfile.profileImageUrl : 'https://example.com/default-profile.jpg' }} />
  </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="user" style={styles.detailIcon} />
              <Text style={styles.detailText}>{userProfile?.fullName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="birthday-cake" style={styles.detailIcon} />
              <Text style={styles.detailText}>{userProfile?.age}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="transgender" style={styles.detailIcon} />
              <Text style={styles.detailText}>{userProfile?.gender}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="user-md" style={styles.detailIcon} />
              <Text style={styles.detailText}>{userProfile?.type}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={fetchUserId}>
            <Text style={styles.signOutButtonText}>Show Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  profilePictureContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  profilePicture: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#fff',
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    padding: 30,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailIcon: {
    fontSize: 25,
    marginRight: 15,
    color: '#333',
  },
  detailText: {
    fontSize: 18,
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#fb5b5a',
    padding: 13,
    borderRadius: 15,
    marginTop: 10,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default ProfilePage;
