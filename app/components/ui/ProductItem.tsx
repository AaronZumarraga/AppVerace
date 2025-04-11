import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../../context/CartContext';

type ProductItemProps = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export function ProductItem({ id, name, price, image, description }: ProductItemProps) {
  const { addItem, removeItem, items } = useCart();
  
  // Find this product in the cart to determine its quantity
  const cartItem = items.find(item => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1
    });
  };

  const handleRemoveFromCart = () => {
    removeItem(id);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          {quantity > 0 ? (
            <>
              <TouchableOpacity 
                onPress={handleRemoveFromCart}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
            </>
          ) : null}
          
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});