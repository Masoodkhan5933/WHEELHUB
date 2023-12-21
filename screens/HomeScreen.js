import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Picker, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './NavBar';
import Firestore from '../hooks/firestore';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [cars, setCars] = useState([]);

  const { getCars} = Firestore();

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
    <View style={styles.container}>
      {/* Your existing code here */}

      {/* Display Product Cards */}
      <View style={styles.productContainer}>
        {cars.slice(0, visibleProducts).map((car) => (
          <TouchableOpacity key={car.id} onPress={() => navigateToDetail(car)} style={styles.productCard}>
            {/* Adjust the properties based on your car data structure */}
            <Image source={{ uri: car.image }} style={styles.productImage} />
            <Text style={styles.productName}>{car.carName}</Text>
            <Text style={styles.productPrice}>Price: ${car.price}</Text>
            <Text style={styles.productCity}>City: {car.city}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {visibleProducts < cars.length && (
        <TouchableOpacity onPress={showMoreProducts} style={styles.showMoreButton}>
          <Text style={styles.showMoreButtonText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)', // Use rgba for transparent background
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  landingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  searchContainer: {
    marginTop: 16,
    width: '80%', // Adjust the width as needed
    alignSelf: 'center', // Center the search container
  
    borderRadius: 8,
    padding: 16,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },

  showMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  showMoreButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  productCard: {
    width: '45%',
    height: 250, // Adjust the height as needed
    marginVertical: 8,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '70%', // Adjust the height as needed
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
    textAlign: 'center',
  },
  productCity: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default HomeScreen;
