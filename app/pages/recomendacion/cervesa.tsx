import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Jarro', precio: '$4', imagen: require('../../../assets/images/jarro.jpg') },
  { id: 2, nombre: 'Pinta', precio: '$6', imagen: require('../../../assets/images/pinta.jpg') },
  { id: 3, nombre: 'Litro', precio: '$12', imagen: require('../../../assets/images/cervegrande.jpg') },
  { id: 4, nombre: 'Growler', precio: '$15', imagen: require('../../../assets/images/growler.jpg') },
  { id: 5, nombre: 'Stella Artois', precio: '$5', imagen: require('../../../assets/images/stella.jpg') },
  { id: 6, nombre: 'Corona', precio: '$5', imagen: require('../../../assets/images/corona.jpg') },
  { id: 7, nombre: 'Pilsener ', precio: '$4', imagen: require('../../../assets/images/pilsener1.jpg') },
  { id: 8, nombre: 'Club', precio: '$4.5', imagen: require('../../../assets/images/club.jpg') },
  { id: 9, nombre: 'Clásico', precio: '$1.5', imagen: require('../../../assets/images/miche.jpg') },
  { id: 10, nombre: 'Maracuyá', precio: '$1.5', imagen: require('../../../assets/images/maracuya.jpg') },
  { id: 11, nombre: '3 jarros cerveza artesanal', precio: '$10', imagen: require('../../../assets/images/jarro1.jpg') },
  { id: 12, nombre: '3 pintas cualquier estilo', precio: '$15', imagen: require('../../../assets/images/jarra3.jpg') },
  { id: 13, nombre: '3 Stella Artois / Corona', precio: '$20', imagen: require('../../../assets/images/stella3.jpg') },
  { id: 14, nombre: 'Combo 3 Pilsener', precio: '$10', imagen: require('../../../assets/images/pilsener.jpg') },
  { id: 15, nombre: 'Combo 3 Club', precio: '$12', imagen: require('../../../assets/images/club3.jpg') },

];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Jarro') router.push('/pages/recomendacion/jarro');
    else if (nombre === 'Pinta') router.push('/pages/recomendacion/pinta');
    else if (nombre === 'Litro') router.push('/pages/recomendacion/litro');
    else if (nombre === 'Growler') router.push('/pages/recomendacion/growler');
    else if (nombre === 'Stella Artois') router.push('/pages/recomendacion/stella-artois');
    else if (nombre === 'Corona') router.push('/pages/recomendacion/corona');
    else if (nombre === 'Pilsener') router.push('/pages/recomendacion/pilsener');
    else if (nombre === 'Club') router.push('/pages/recomendacion/club');
    else if (nombre === 'Clásico') router.push('/pages/recomendacion/clasico');
    else if (nombre === 'Maracuyá') router.push('/pages/recomendacion/micheladamaracuya');
    else if (nombre === '3 jarros cerveza artesanal') router.push('/pages/recomendacion/3-jarros-cerveza-artesanal');
    else if (nombre === '3 pintas cualquier estilo') router.push('/pages/recomendacion/3-pintas-cualquier-estilo');
    else if (nombre === '3 Stella Artois / Corona') router.push('/pages/recomendacion/3-stella-artois-corona');
    else if (nombre === 'Combo 3 Pilsener') router.push('/pages/recomendacion/combo-3-pilsener');
    else if (nombre === 'Combo 3 Club') router.push('/pages/recomendacion/combo-3-club');

  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cerveza',
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
  
