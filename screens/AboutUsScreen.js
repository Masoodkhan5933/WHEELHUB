import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Navbar from './NavBar';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Navbar />
        <Text style={styles.title}>About Us</Text>
      </View>
      <Image
        source={require('../assets/carLandingImage.jpg')} // Replace with the actual path to your image
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Welcome to our Car Marketplace, where you can explore a diverse range of used cars
            from various cities. Our mission is to provide a seamless and enjoyable experience
            for users looking to buy or sell their vehicles.
          </Text>
          <Text style={styles.description}>
            At Car Marketplace, we are passionate about connecting buyers and sellers,
            making the car trading process simple and transparent. Whether you are a first-time
            car buyer or a seasoned car enthusiast, our platform is designed to cater to your needs.
          </Text>
          <Text style={styles.description}>
            Our team is dedicated to creating a user-friendly environment, and we continually
            strive to enhance and improve your experience. If you have any feedback or suggestions,
            please feel free to reach out to us.
          </Text>
          <Text style={styles.signature}>
            The Car Marketplace Team
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 400, // Adjust the height as needed
    borderRadius: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
    textAlign: 'justify',
  },
  signature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
});

export default AboutUsScreen;
