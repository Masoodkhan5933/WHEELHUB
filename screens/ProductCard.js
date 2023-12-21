// ProductCard.js
import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to the cart`);
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: product.image }} style={styles.cardImage} />
      <Card.Content>
        <Title style={styles.cardTitle}>{product.name}</Title>
        <Paragraph style={styles.cardPrice}>${product.price}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleAddToCart}>Add to Cart</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default ProductCard;
