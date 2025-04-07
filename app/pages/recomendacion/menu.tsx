import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type MenuScreenProps = {
  navigation: NavigationProp<any>;
};

export default function MenuScreen({ navigation }: MenuScreenProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Menú</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PizzasScreen')}>
          <Image source={require('../../../assets/images/pizzas.png')} style={styles.image} />
          <Text style={styles.text}>Pizzas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/sanduches')}>
          <Image source={require('../../../assets/images/sanduches.png')} style={styles.image} />
          <Text style={styles.text}>Sanduches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PicadasScreen')}>
          <Image source={require('../../../assets/images/picadas.png')} style={styles.image} />
          <Text style={styles.text}>Picadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/bebidas')}>
          <Image source={require('../../../assets/images/bebidas.png')} style={styles.image} />
          <Text style={styles.text}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PromosScreen')}>
          <Image source={require('../../../assets/images/promos.png')} style={styles.image} />
          <Text style={styles.text}>Promos</Text>
        </TouchableOpacity>
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
    //marginLeft: 20
  },
  backButton: {
    padding: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
