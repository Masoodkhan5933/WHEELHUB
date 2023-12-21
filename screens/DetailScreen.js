// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text style={styles.productCity}>City: {product.city}</Text>
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
  },
  productImage: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
  },
  productName: {
    fontSize: 20,
    marginVertical: 8,
    color: '#000',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center',
  },
  productCity: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default DetailScreen;
