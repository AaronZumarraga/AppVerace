import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const bebidas = [
  { id: 1, nombre: 'Copa de vino tinto', precio: '$5', imagen: require('../../../assets/images/vinotinto.jpg') },
  { id: 2, nombre: 'Copa de calimotcho', precio: '$6', imagen: require('../../../assets/images/calimocho.jpg') },
  { id: 3, nombre: 'Copa de tinto de verano', precio: '$6', imagen: require('../../../assets/images/tintodeverano.jpg') },
  { id: 4, nombre: 'Botella de vino tinto', precio: '$20', imagen: require('../../../assets/images/botellavinotinto.jpg') },
  { id: 5, nombre: 'Jarra de calimotcho', precio: '$18', imagen: require('../../../assets/images/jarrajalimocho.jpg') },
  { id: 6, nombre: 'Jarra de tinto de verano', precio: '$18', imagen: require('../../../assets/images/jarratintoverano.jpg') },
  { id: 7, nombre: 'Manaba mule', precio: '$6', imagen: require('../../../assets/images/manamule.jpg') },
  { id: 8, nombre: 'Caipirinha manaba', precio: '$6', imagen: require('../../../assets/images/caipimanaba.jpg') },
  { id: 9, nombre: 'Botella de caña manabita', precio: '$25', imagen: require('../../../assets/images/cañamanaba.jpg') },
  { id: 10, nombre: 'Botella de Antioqueño', precio: '$45', imagen: require('../../../assets/images/botellaantioqueño.jpg') },
  { id: 11, nombre: 'Paloma', precio: '$8', imagen: require('../../../assets/images/paloma.jpg') },
  { id: 12, nombre: 'Margarita clásica', precio: '$6', imagen: require('../../../assets/images/margarira.jpg') },
  { id: 13, nombre: 'Margarita maracuyá', precio: '$6', imagen: require('../../../assets/images/maracuya.jpg') },
  { id: 14, nombre: 'Margarita frutos rojos', precio: '$6', imagen: require('../../../assets/images/frutosrojos.jpg') },
  { id: 15, nombre: 'Botella de tequila', precio: '$45', imagen: require('../../../assets/images/josecuervo.jpg') },
  { id: 16, nombre: 'Cuba libre', precio: '$6', imagen: require('../../../assets/images/cubalibre.jpg') },
  { id: 17, nombre: 'Mojito', precio: '$6', imagen: require('../../../assets/images/mojito.jpg') },
  { id: 18, nombre: 'Mojito maracuyá', precio: '$7', imagen: require('../../../assets/images/mojitomaracuya.jpg') },
  { id: 19, nombre: 'Mojito frutos rojos', precio: '$7', imagen: require('../../../assets/images/mojitofrutosrojos.jpg') },
  { id: 20, nombre: 'Botella de Ron Abuelo', precio: '$45', imagen: require('../../../assets/images/ronabuelo.jpg') },
  { id: 21, nombre: 'Gin Tonic', precio: '$6', imagen: require('../../../assets/images/gintonic.jpg') },
  { id: 22, nombre: 'Gin Tonic Maracuyá', precio: '$7', imagen: require('../../../assets/images/gintonicmaracuya.jpg') },
  { id: 23, nombre: 'Gin Tonic Frutos rojos', precio: '$7', imagen: require('../../../assets/images/gintonicfrutosrojos.jpg') },
  { id: 24, nombre: 'Moscow Mule', precio: '$8', imagen: require('../../../assets/images/moscowmule.jpg') },
  { id: 25, nombre: 'Jager Sour', precio: '$12', imagen: require('../../../assets/images/jagersour.jpg') },
  { id: 26, nombre: 'Jagerito', precio: '$12', imagen: require('../../../assets/images/jagerito.jpg') },
  { id: 27, nombre: 'Whisky Sour', precio: '$12', imagen: require('../../../assets/images/whiskysour.jpg') },
  { id: 28, nombre: 'New York Sour', precio: '$12', imagen: require('../../../assets/images/newyork.jpg') },
  { id: 29, nombre: 'Whisky on the rocks', precio: '$12', imagen: require('../../../assets/images/whiskyrocks.jpg') },
];

export default function BebidasScreen() {
  const router = useRouter();

  const handleNavigation = (nombre: string) => {
    if (nombre === 'Copa de vino tinto') router.push('/pages/recomendacion/copadevinotinto');
    else if (nombre === 'Copa de calimotcho') router.push('/pages/recomendacion/copadecalimotcho');
    else if (nombre === 'Copa de tinto de verano') router.push('/pages/recomendacion/copadetintodeverano');
    else if (nombre === 'Botella de vino tinto') router.push('/pages/recomendacion/botelladevinotinto');
    else if (nombre === 'Jarra de calimotcho') router.push('/pages/recomendacion/jarradecalimotcho');
    else if (nombre === 'Jarra de tinto de verano') router.push('/pages/recomendacion/jarradetintodeverano');
    else if (nombre === 'Manaba mule') router.push('/pages/recomendacion/manabamule');
    else if (nombre === 'Caipirinha manaba') router.push('/pages/recomendacion/caipirinhamanaba');
    else if (nombre === 'Botella de caña manabita') router.push('/pages/recomendacion/botelladecañamanabita');
    else if (nombre === 'Botella de Antioqueño') router.push('/pages/recomendacion/botelladeantioqueño');
    else if (nombre === 'Paloma') router.push('/pages/recomendacion/paloma');
    else if (nombre === 'Margarita clásica') router.push('/pages/recomendacion/margaritaclásica');
    else if (nombre === 'Margarita maracuyá') router.push('/pages/recomendacion/margaritamaracuya');
    else if (nombre === 'Margarita frutos rojos') router.push('/pages/recomendacion/margaritafrutosrojos');
    else if (nombre === 'Botella de tequila') router.push('/pages/recomendacion/botelladetequila');
    else if (nombre === 'Cuba libre') router.push('/pages/recomendacion/cubalibre');
    else if (nombre === 'Mojito') router.push('/pages/recomendacion/mojito');
    else if (nombre === 'Mojito maracuyá') router.push('/pages/recomendacion/mojitomaracuya');
    else if (nombre === 'Mojito frutos rojos') router.push('/pages/recomendacion/mojitofrutosrojos');
    else if (nombre === 'Botella de Ron Abuelo') router.push('/pages/recomendacion/botelladeronabuelo');
    else if (nombre === 'Gin Tonic') router.push('/pages/recomendacion/gintonic');
    else if (nombre === 'Gin Tonic Maracuyá') router.push('/pages/recomendacion/gintonicmaracuya');
    else if (nombre === 'Gin Tonic Frutos rojos') router.push('/pages/recomendacion/gintonicfrutosrojos');
    else if (nombre === 'Moscow Mule') router.push('/pages/recomendacion/moscowmule');
    else if (nombre === 'Jager Sour') router.push('/pages/recomendacion/jagersour');
    else if (nombre === 'Jagerito') router.push('/pages/recomendacion/jagerito');
    else if (nombre === 'Whisky Sour') router.push('/pages/recomendacion/whiskysour');
    else if (nombre === 'New York Sour') router.push('/pages/recomendacion/newyorksour');
    else if (nombre === 'Whisky on the rocks') router.push('/pages/recomendacion/whiskyontherocks');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cocteles',
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
    paddingTop: 0,
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
    width: 100,  // Asegura que todas las imágenes tengan el mismo tamaño
    height: 100,
    borderRadius: 15,  // Esquinas redondeadas
    marginRight: 15,
    resizeMode: 'cover',  // Ajusta la imagen sin perder la proporción
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
