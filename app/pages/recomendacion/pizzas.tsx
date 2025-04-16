import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter,Stack } from 'expo-router';

const bebidas = [
    { id: 1, nombre: 'Pepperoni', precio: '$8', imagen: require('../../../assets/images/pexels-muffin-1653877.jpg') },
    { id: 2, nombre: 'Mi Champ', precio: '$8', imagen: require('../../../assets/images/champ.jpg') },
    { id: 3, nombre: 'Hawaiana', precio: '$8', imagen: require('../../../assets/images/pexels-brettjordan-842519.jpg') },
    { id: 4, nombre: 'Margarita', precio: '$8', imagen: require('../../../assets/images/marga.jpg') },
    { id: 5, nombre: 'Cheddar', precio: '$10', imagen: require('../../../assets/images/champi.jpg') },
    { id: 6, nombre: 'Diavola', precio: '$10', imagen: require('../../../assets/images/diablo.jpg') },
    { id: 7, nombre: 'Meat Lovers', precio: '$10', imagen: require('../../../assets/images/meat.jpg') },
    { id: 8, nombre: 'Veggie Lovers', precio: '$10', imagen: require('../../../assets/images/vege.jpg') },
    { id: 9, nombre: 'Say Cheese', precio: '$12', imagen: require('../../../assets/images/pexels-vince-2471171.jpg') },
    { id: 10, nombre: 'Verace', precio: '$12', imagen: require('../../../assets/images/pexels-ahmedbhutta11-7350139.jpg') },
  ];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Pepperoni') {
      router.push('/pages/recomendacion/pepperoni'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Mi Champ') {
      router.push('/pages/recomendacion/michamp'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Hawaiana') {
      router.push('/pages/recomendacion/hawaiana'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Margarita') {
      router.push('/pages/recomendacion/margarita'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Cheddar') {
      router.push('/pages/recomendacion/cheddar'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Diavola') {
      router.push('/pages/recomendacion/diavola'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Meat Lovers') {
      router.push('/pages/recomendacion/meatlovers'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Veggie Lovers') {
      router.push('/pages/recomendacion/veggielovers'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Say Cheese') {
      router.push('/pages/recomendacion/saycheese'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }
    if (nombre === 'Verace') {
      router.push('/pages/recomendacion/verace'); // Asegúrate que este archivo esté en /app/aguasingas.tsx
    }

  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Pizzas',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
    marginRight: 10,
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
