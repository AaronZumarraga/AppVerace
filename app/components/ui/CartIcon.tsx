// app/components/ui/CartIcon.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { router } from 'expo-router';

type CartIconProps = {
  size?: number;
  color?: string;
}

export function CartIcon({ size = 24, color = 'black' }: CartIconProps) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const navigateToCart = () => {
    router.push('/pages/recomendacion/carrito');
  };

  return (
    <TouchableOpacity onPress={navigateToCart} style={styles.container}>
      <Ionicons name="cart-outline" size={size} color={color} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});