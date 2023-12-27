// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

const DetailScreen = ({ route, navigation }) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: car.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{car.carName}</Text>
        <Text style={styles.productPrice}>Price: ${car.price}</Text>
        <Text style={styles.productInfo}>Make: {car.make}</Text>
        <Text style={styles.productInfo}>Type: {car.bodyType}</Text>
        <Text style={styles.productInfo}>Model Year: {car.modelYear}</Text>
        <Text style={styles.productInfo}>Transmission: {car.transmission}</Text>
        <Text style={styles.productInfo}>Mileage: {car.mileage} miles</Text>
        <Text style={styles.productInfo}>Seating Capacity: {car.seatingCapacity}</Text>
        <Text style={styles.productInfo}>Engine Capacity: {car.engineCapacity}</Text>
        <Text style={styles.productInfo}>Registered Year: {car.registeredYear}</Text>
        <Text style={styles.productInfo}>Registered City: {car.registeredCity}</Text>
        <Text style={styles.productInfo}>City: {car.city}</Text>
        {/* Add more fields as needed */}
      </View>
    </View>
  );
};

// Set the navigationOptions for DetailScreen
DetailScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderBackButton onPress={() => navigation.navigate('Home')} tintColor="#000" />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // Light gray background
  },
  productImage: {
    width: '100%',
    height: '40%',
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff', // White background
    borderRadius: 8,
    marginTop: -20, // Adjust the margin as needed
  },
  productName: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: 'bold',
    color: '#2c3e50', // Dark gray text
    textAlign: 'center',
  },
  productInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 8,
    color: '#e74c3c', // Red color for price
    textAlign: 'center',
  },
});

export default DetailScreen;
