import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Firestore from '../hooks/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [cars, setCars] = useState([]);

  const { getCars } = Firestore();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

  const navigateToDetail = (car) => {
    navigation.navigate('Detail', { car });
  };  

  return (
    <ScrollView style={styles.container}>
      {/* Display Product Cards */}
      <View style={styles.productContainer}>
        {cars.slice(0, visibleProducts).map((car) => (
          <TouchableOpacity key={car.id} onPress={() => navigateToDetail(car)} style={styles.productCard}>
            <Image source={{ uri: car.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{car.carName}</Text>
              <Text style={styles.productPrice}>Price: ${car.price}</Text>
              <Text style={styles.productInfo}>Make: {car.make}</Text>
              <Text style={styles.productInfo}>Type: {car.bodyType}</Text>
              <Text style={styles.productInfo}>Model Year: {car.modelYear}</Text>
              <Text style={styles.productInfo}>Transmission: {car.transmission}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {visibleProducts < cars.length && (
        <TouchableOpacity onPress={showMoreProducts} style={styles.showMoreButton}>
          <Text style={styles.showMoreButtonText}>Show More</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  showMoreButton: {
    backgroundColor: '#3498db', // Blue color
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  showMoreButtonText: {
    color: '#fff', // White color
    fontWeight: 'bold',
  },
  productContainer: {
    marginTop: 16,
    width: '100%',
  },
  productCard: {
    width: 'auto',
    height: 170,
    marginVertical: 8,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#ecf0f1', // Light gray background
    elevation: 3, // Add elevation for shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  productImage: {
    width: '50%',
    height: '90%',
    marginTop: 5,
    marginLeft: 4,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginLeft: 4,
  },
  productName: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: 'bold',
    color: '#2c3e50', // Dark gray text
  },
  productInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 4,
    color: '#e74c3c', // Red color for price
  },
  productCity: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;