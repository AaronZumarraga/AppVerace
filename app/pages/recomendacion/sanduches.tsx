import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Tradicional', precio: '$5', imagen: require('../../../assets/images/sanduchesp1.jpg') },
  { id: 2, nombre: 'Carne Mechada', precio: '$5', imagen: require('../../../assets/images/sanduches.png') },
  { id: 3, nombre: 'Veggie', precio: '$5', imagen: require('../../../assets/images/veggie.webp') },
];

export default function SanduchesScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Tradicional') router.push('/pages/recomendacion/tradicional');
    if (nombre === 'Carne Mechada') router.push('/pages/recomendacion/carnemechada');
    if (nombre === 'Veggie') router.push('/pages/recomendacion/veggie');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*<TouchableOpacity onPress={() => router.push('/pages/recomendacion/menu')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>*/}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Sanduches</Text>
      </View>

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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'column',
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
