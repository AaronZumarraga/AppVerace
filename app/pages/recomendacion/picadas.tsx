import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Nachos Cheddar', precio: '$5', imagen: require('../../../assets/images/cheddar.jpg') },
  { id: 2, nombre: 'Nachos Verace', precio: '$8', imagen: require('../../../assets/images/dbb444de-5ec0-41c1-bfc3-658c0ee76d06.avif') },
  { id: 3, nombre: 'Bread Sticks', precio: '$5', imagen: require('../../../assets/images/stciks.jpg') },
  { id: 4, nombre: 'Bread Sticks Verace', precio: '$8', imagen: require('../../../assets/images/sticks2.jpg') },

];

export default function SanduchesScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Nachos Cheddar') router.push('/pages/recomendacion/nachoscheddar');
    if (nombre === 'Nachos Verace') router.push('/pages/recomendacion/nachosverace');
    if (nombre === 'Bread Sticks') router.push('/pages/recomendacion/breadsticks');
    if (nombre === 'Bread Sticks Verace') router.push('/pages/recomendacion/breadstickverace');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Picadas',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.list}>
        {bebidas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => handleNavigation(item.nombre)}
          >
            <Image source={item.imagen} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.nombre}</Text>
              <Text style={styles.price}>{item.precio}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 0, // Remove top padding to accommodate the Stack.Screen header
  },
  backButton: {
    padding: 4,
    marginLeft: 8,
  },
  list: {
    flexDirection: 'column',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
});