import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type BebidasScreenProps = {
  navigation: NavigationProp<any>;
};

const bebidas = [
  { id: 1, nombre: 'Agua sin gas', precio: '$1', imagen: require('../../../assets/images/aguasingas.jpg') },
  { id: 2, nombre: 'Agua mineral', precio: '$1.5', imagen: require('../../../assets/images/download (8).jpeg') },
  { id: 3, nombre: 'Limonada', precio: '$3', imagen: require('../../../assets/images/imperial.jpg') },
  { id: 4, nombre: 'Limonada Rosa', precio: '$3.5', imagen: require('../../../assets/images/rosa.jpg') },
  { id: 5, nombre: 'Té caliente', precio: '$1.5', imagen: require('../../../assets/images/tecaliente.jpg') },
  { id: 6, nombre: 'Gaseosa personal poner mas si es el caso ', precio: '$1.5', imagen: require('../../../assets/images/coca.jpg') },
  { id: 7, nombre: 'Gaseosa 1.35L', precio: '$4.5', imagen: require('../../../assets/images/grande.webp') },
  { id: 8, nombre: 'Café americano', precio: '$1.5', imagen: require('../../../assets/images/americano.jpg') },
  { id: 9, nombre: 'Capuccino', precio: '$2.5', imagen: require('../../../assets/images/capuccino.jpg') },
  { id: 10, nombre: 'Iced Coffee', precio: '$3.5', imagen: require('../../../assets/images/cafefrio.jpg') },
];

export default function BebidasScreen({ navigation }: BebidasScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Bebidas</Text>
      </View>

      <ScrollView>
        <View style={styles.list}>
          {bebidas.map((item) => (
            <TouchableOpacity key={item.id} style={styles.item}>
              <Image source={item.imagen} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.nombre}</Text>
                <Text style={styles.price}>{item.precio}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
