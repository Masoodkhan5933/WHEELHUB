import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

const DetailScreen = ({ route, navigation }) => {
  const { car } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: car.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{car.carName}</Text>
        <View style={styles.separator} />
        <Text style={styles.productPrice}>${car.price}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Make:</Text> {car.make}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Type:</Text> {car.bodyType}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Model Year:</Text> {car.modelYear}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Transmission:</Text> {car.transmission}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Mileage:</Text> {car.mileage} miles
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Seating Capacity:</Text> {car.seatingCapacity}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Engine Capacity:</Text> {car.engineCapacity} cc
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Registered Year:</Text> {car.registeredYear}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>Registered City:</Text> {car.registeredCity}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.infoLabel}>City:</Text> {car.city}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 16,
  },
  separator: {
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 2,
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2596be',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    marginTop: 16,
  },
  productInfo: {
    fontSize: 16,
    color: '#2c3e50', // Darker text color for better visibility
    marginBottom: 8,
    lineHeight: 24,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#3498db', // Highlight label in a different color
  },
});

export default DetailScreen;
