import React from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { NavigationProp } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

type Props = {
  navigation: NavigationProp<any>;
};

const carouselImages = [
  require('../../assets/images/promos1.png'),
  require('../../assets/images/promos2.png'),
];

export default function Tab({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Opciones de navegación */}
        <View style={styles.navOptions}>


          <TouchableOpacity
            onPress={() => router.push('/pages/recomendacion/menu')}
            style={styles.option}
          >
          <MaterialCommunityIcons name="food" size={24} color="black" />
          <Text style={styles.label}>Menú</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/pages/recomendacion/promociones')}
            style={styles.option}
          >
          <Entypo name="price-tag" size={24} color="black" />            
          <Text style={styles.label}>Promociones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/pages/recomendacion/combos')}
            style={styles.option}
          >
          <Ionicons name="fast-food-sharp" size={24} color="black" />            
          <Text style={styles.label}>Combos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/pages/recomendacion/recomendacion')}
            style={styles.option}
          >
          <FontAwesome6 name="clipboard-list" size={24} color="black" />           
          <Text style={styles.label}>Recomendación</Text>
          </TouchableOpacity>
        </View>

        {/* Carrusel centrado */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={350}
            height={200}
            autoPlay
            data={carouselImages}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image source={item} style={styles.carouselImage} />
            )}
          />
        </View>

        {/* Lista de promociones */}
        <Text style={styles.sectionTitle}>Promociones</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => alert('Pizza seleccionada')}>
            <Image source={require('../../assets/images/promos.png')} style={styles.promoItem} />
            <Text style={styles.price}>$10</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Hamburguesa seleccionada')}>
            <Image source={require('../../assets/images/sanduchesp1.jpg')} style={styles.promoItem} />
            <Text style={styles.price}>$9</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Bebida seleccionada')}>
            <Image source={require('../../assets/images/bebidasp.jpg')} style={styles.promoItem} />
            <Text style={styles.price}>$9</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  navOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  carouselContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  carouselImage: {
    width: 350,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  promoItem: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  option: {
    alignItems: 'center',
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
