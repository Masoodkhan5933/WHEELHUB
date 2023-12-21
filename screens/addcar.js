import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-picker'; // Import image picker
import Firestore from '../hooks/firestore';

const CarForm = () => {
  const [carData, setCarData] = useState({
    carName: '',
    registeredYear: '',
    modelYear: '',
    mileage: '',
    city: '',
    province: '',
    make: '',
    registeredCity: '',
    transmission: '',
    color: '',
    bodyType: '',
    seatingCapacity: '',
    engineCapacity: '',
    image: null, // Updated to store the image
  });

  const { addCar } = Firestore();

  const handleInputChange = (field, value) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error && !response.customButton) {
        setCarData((prevData) => ({
          ...prevData,
          image: response.uri,
        }));
      }
    });
  };

  const handleAddCar = async () => {
    try {
      await addCar(carData);
      console.log('Car added successfully');

      // TODO: Handle any additional logic or navigation after adding the car
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Car</Text>

      {/* Display selected image */}
      {carData.image && <Image source={{ uri: carData.image }} style={styles.imagePreview} />}

      {/* Input fields */}
      {Object.entries(carData).map(([field, value]) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
        />
      ))}

      {/* Image picker button */}
      <Button title="Select Image" onPress={handleImagePicker} />

      {/* Submit Button */}
      <Button title="Add Car" onPress={handleAddCar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default CarForm;
