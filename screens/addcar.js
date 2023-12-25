import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Firestore from '../hooks/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ScrollView } from 'react-native';
import Storage from '../hooks/storage';

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
  const { uploadCarPictures } = Storage();

  const handleInputChange = (field, value) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImagePicker = async () => {
    try {
      // Ask for permission
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

      console.log(pickerResult.assets[0].uri);
      if (!pickerResult.canceled) {
        const newPath = FileSystem.documentDirectory + 'tempImage.jpg';
        await FileSystem.copyAsync({
          from: pickerResult.assets[0].uri,
          to: newPath,
        });

        setCarData((prevData) => ({
          ...prevData,
          image: newPath,
        }));
        console.log(newPath);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image');
    }
  };

  const handleAddCar = async () => {
    try {
      const ImageUrl = await uploadCarPictures(carData.image);
      const finalData = { ...carData, image: ImageUrl };
  
      await addCar(finalData);
      console.log('Car added successfully');
    } catch (error) {
      console.error('Error adding car:', error);
  
      console.log('Firebase Storage Error:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Car</Text>

      {/* Display selected image */}

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
      <Button title='Select Image' onPress={handleImagePicker} />

      {carData.image && (
        <Image source={{ uri: carData.image }} style={styles.imagePreview} />
      )}

      {carData.image && (
        <Button
          title='Remove Image'
          onPress={() => handleInputChange('image', null)}
        />
      )}

      {/* Submit Button */}
      <Button title='Add Car' onPress={handleAddCar} />
    </ScrollView>
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