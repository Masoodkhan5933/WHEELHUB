import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
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
    image:''
  });

  const {addCar} = Firestore();

  const handleInputChange = (field, value) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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

      {Object.entries(carData).map(([field, value]) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
        />
      ))}

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
});

export default CarForm;
