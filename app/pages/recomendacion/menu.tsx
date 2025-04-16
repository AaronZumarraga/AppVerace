import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type MenuScreenProps = {
  navigation: NavigationProp<any>;
};

export default function MenuScreen({ navigation }: MenuScreenProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Menú',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.grid}>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/pizzas')}>
      <Image source={require('../../../assets/images/pizzas.png')} style={styles.image} />
          <Text style={styles.text}>Pizzas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/sanduches')}>
          <Image source={require('../../../assets/images/sanduches.png')} style={styles.image} />
          <Text style={styles.text}>Sanduches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/picadas')}>
          <Image source={require('../../../assets/images/picadas.png')} style={styles.image} />
          <Text style={styles.text}>Picadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/bebidas')}>
          <Image source={require('../../../assets/images/bebidas.png')} style={styles.image} />
          <Text style={styles.text}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/pages/recomendacion/promociones')}>
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
    paddingTop: 0, // Remove top padding to accommodate the Stack.Screen header
  },
  backButton: {
    padding: 4,
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
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