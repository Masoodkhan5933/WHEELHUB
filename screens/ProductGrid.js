// ProductGrid.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';  // Import StyleSheet

import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <View style={styles.productGridContainer}>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productGridContainer: {
    height: 220, // Adjust the height as needed
  },
});

export default ProductGrid;

