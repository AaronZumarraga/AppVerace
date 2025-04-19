import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Agua sin gas', precio: '$1', imagen: require('../../../assets/images/aguasingas.jpg') },
  { id: 2, nombre: 'Agua mineral', precio: '$1.5', imagen: require('../../../assets/images/download (8).jpeg') },
  { id: 3, nombre: 'Limonada', precio: '$3.5', imagen: require('../../../assets/images/imperial.jpg') },
  { id: 4, nombre: 'Limonada Rosa', precio: '$3.5', imagen: require('../../../assets/images/rosa.jpg') },
  { id: 5, nombre: 'Té caliente', precio: '$1.5', imagen: require('../../../assets/images/tecaliente.jpg') },
  { id: 6, nombre: 'Coca-Cola', precio: '$1.5', imagen: require('../../../assets/images/coca.jpg') },
  { id: 7, nombre: 'Fanta', precio: '$1.5', imagen: require('../../../assets/images/fanta.jpg') },
  { id: 8, nombre: 'Fioravanti', precio: '$1.5', imagen: require('../../../assets/images/fiora.jpg') },
  { id: 9, nombre: 'Sprite', precio: '$1.5', imagen: require('../../../assets/images/sprite.jpg') },
  { id: 10, nombre: 'Café americano', precio: '$1.5', imagen: require('../../../assets/images/americano.jpg') },
  { id: 11, nombre: 'Capuccino', precio: '$2.5', imagen: require('../../../assets/images/capuccino.jpg') },
  { id: 12, nombre: 'Iced Coffee', precio: '$3.5', imagen: require('../../../assets/images/cafefrio.jpg') },
];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Agua sin gas') router.push('/pages/recomendacion/aguasingas');
    else if (nombre === 'Agua mineral') router.push('/pages/recomendacion/aguamineral');
    else if (nombre === 'Limonada') router.push('/pages/recomendacion/limonada');
    else if (nombre === 'Limonada Rosa') router.push('/pages/recomendacion/limonadarosa');
    else if (nombre === 'Té caliente') router.push('/pages/recomendacion/tecaliente');
    else if (nombre === 'Coca-Cola') router.push('/pages/recomendacion/cocacola');
    else if (nombre === 'Fanta') router.push('/pages/recomendacion/fanta');
    else if (nombre === 'Fioravanti') router.push('/pages/recomendacion/fioravanti');
    else if (nombre === 'Sprite') router.push('/pages/recomendacion/sprite');
    else if (nombre === 'Café americano') router.push('/pages/recomendacion/cafeamericano');
    else if (nombre === 'Capuccino') router.push('/pages/recomendacion/capuccino');
    else if (nombre === 'Iced Coffee') router.push('/pages/recomendacion/icedcoffe');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Bebidas',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.list}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    padding: 4,
    marginLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 80, // Tamaño fijo
    height: 80, // Tamaño fijo
    borderRadius: 15, // Esquinas redondeadas
    marginRight: 15,
    resizeMode: 'cover', // Para ajustar la imagen sin distorsionar
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
