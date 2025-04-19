import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Shot de tequila', precio: '$3', imagen: require('../../../assets/images/shottequila.jpg') },
  { id: 2, nombre: 'Shot de aguardiente', precio: '$3', imagen: require('../../../assets/images/shotardiente.jpg') },
  { id: 3, nombre: 'Shot de Jager', precio: '$6', imagen: require('../../../assets/images/jaggershot.jpg') },
  { id: 4, nombre: 'Jager Bomb', precio: '$10', imagen: require('../../../assets/images/jaggerbomb.jpg') },
];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Shot de tequila') router.push('/pages/recomendacion/shot-de-tequila');
    else if (nombre === 'Shot de aguardiente') router.push('/pages/recomendacion/shot-de-aguardiente');
    else if (nombre === 'Shot de Jager') router.push('/pages/recomendacion/shot-de-jager');
    else if (nombre === 'Jager Bomb') router.push('/pages/recomendacion/jager-bomb');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Shots',
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
  
