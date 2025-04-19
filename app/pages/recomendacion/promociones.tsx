import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter,Stack } from 'expo-router';

const bebidas = [
    { id: 1, nombre: 'Promo Pilas', precio: '$16', imagen: require('../../../assets/images/470140898_18004212455697669_2952221237043222814_n.jpg') },
    { id: 2, nombre: 'Promo Lovers', precio: '$20', imagen: require('../../../assets/images/promolovers.jpg') },
    { id: 3, nombre: 'Promo King', precio: '$24', imagen: require('../../../assets/images/promoking1.jpg') },
    { id: 4, nombre: 'Promo Sanduchera', precio: '$10', imagen: require('../../../assets/images/278953595_514677723447399_1453067101951070993_n.webp') },
    { id: 5, nombre: 'Promo Piqueo', precio: '$18', imagen: require('../../../assets/images/promopiqueo.avif') },
  ];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Promo Pilas') {
      router.push('/pages/recomendacion/promopilas'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Promo Lovers') {
      router.push('/pages/recomendacion/promolovers'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Promo King') {
      router.push('/pages/recomendacion/promoking'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Promo Sanduchera') {
      router.push('/pages/recomendacion/promosanduchera'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Promo Piqueo') {
      router.push('/pages/recomendacion/promopiqueo'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }

  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Promos',
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
  
