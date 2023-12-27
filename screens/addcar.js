import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RNPickerSelect from 'react-native-picker-select';
import Firestore from '../hooks/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

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
    price: '', // Added price field
    image: null,
  });

  const { addCar } = Firestore();

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
      let ImageUrl;

      if (carData.image) {
        // If there is an image, upload it
        ImageUrl = await uploadCarPictures(carData.image);
      } else {
        // If no image is selected, use a dummy image URL
        ImageUrl = 'https://example.com/dummy-image.jpg';
      }

      // Optionally, reset the form after submission
      setCarData({
        carName: '',
        price: '',
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
        image: null,
      });

      // Add car with the updated data
      await addCar({ ...carData, image: ImageUrl });

      Alert.alert('Success', 'Car added successfully');

    } catch (error) {
      console.error('Error adding car:', error);

      Alert.alert('Error', 'Failed to add car. Please try again later.');
    }
  };

  const transmissionOptions = [
    { label: 'Automatic', value: 'Automatic' },
    { label: 'Manual', value: 'Manual' },
  ];

  const bodyTypeOptions = [
    { label: 'Sedan', value: 'Sedan' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Hatchback', value: 'Hatchback' },
    { label: 'Crossover', value: 'Crossover' },
  ];

  const provinceOptions = [
    { label: 'KPK', value: 'KPK' },
    { label: 'SINDH', value: 'SINDH' },
    { label: 'PUNJAB', value: 'PUNJAB' },
    { label: 'BALOCHISTAN', value: 'BALOCHISTAN' },
    { label: 'AZAD KASHMIR', value: 'AZAD KASHMIR' },
  ];

  const makeOptions = [
    { label: 'Toyota', value: 'Toyota' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Suzuki', value: 'Suzuki' },
    { label: 'Daihatsu', value: 'Daihatsu' },
    { label: 'Kia', value: 'Kia' },
    { label: 'MG', value: 'MG' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Car</Text>

      {/* Input fields */}
      {Object.entries(carData).map(([field, value]) => {
        if (field === 'transmission' || field === 'bodyType' || field === 'province' || field === 'make') {
          return (
            <View key={field} style={styles.pickerContainer}>
              <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: `Select ${field.charAt(0).toUpperCase() + field.slice(1)}`, value: null }}
                onValueChange={(value) => handleInputChange(field, value)}
                items={
                  field === 'transmission' ? transmissionOptions :
                    (field === 'bodyType' ? bodyTypeOptions :
                      (field === 'province' ? provinceOptions : makeOptions))
                }
              />
            </View>
          );
        }

        if (field === 'seatingCapacity' || field === 'engineCapacity' || field === 'price') {
          return (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={value}
              keyboardType={(field === 'engineCapacity' || field === 'price') ? 'numeric' : 'default'}
              onChangeText={(text) => handleInputChange(field, text)}
            />
          );
        }

        return (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={value}
            onChangeText={(text) => handleInputChange(field, text)}
          />
        );
      })}

      {/* Image picker button */}
      <View style={styles.buttonContainer}>
        <Button title='Select Image' onPress={handleImagePicker} />
      </View>

      {carData.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: carData.image }} style={styles.imagePreview} />
          <Button
            title='Remove Image'
            onPress={() => handleInputChange('image', null)}
          />
        </View>
      )}

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title='Add Car' onPress={handleAddCar} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    color: '#333333',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    marginVertical: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
});

export default CarForm;
