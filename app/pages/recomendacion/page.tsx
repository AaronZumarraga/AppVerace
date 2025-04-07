import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type MenuScreenProps = {
  navigation: NavigationProp<any>;
};

const menuItems = [
    { id: 1, name: 'Pizzas', image: require('../../../assets/images/pizzas.png'), link: 'PizzasScreen' },
    { id: 2, name: 'Sanduches', image: require('../../../assets/images/sanduches.png'), link: 'SanduchesScreen' },
  { id: 3, name: 'Picadas', image: require('../../../assets/images/picadas.png'), link: 'PicadasScreen' },
  { id: 4, name: 'Bebidas', image: require('../../../assets/images/bebidas.png'), link: 'BebidasScreen' },
  { id: 5, name: 'Promos', image: require('../../../assets/images/promos.png'), link: 'PromosScreen' },
];


export default function MenuScreen({ navigation }: MenuScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate(item.link)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '45%',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});