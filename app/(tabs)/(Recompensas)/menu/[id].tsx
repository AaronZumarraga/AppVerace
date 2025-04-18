import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function MenuScreen() {
  const { id } = useLocalSearchParams();

  // Asegurarse de que id sea un string
  const menuId = Array.isArray(id) ? id[0] : id;

  // Simulando datos de menús con imágenes y descripciones
  const menus = {
    '1': { name: 'Menú 1', image: require('assets/images/react-logo.png'), description: 'Descripción del Menú 1' },
    '2': { name: 'Menú 2', image: require('assets/images/react-logo.png'), description: 'Descripción del Menú 2' },
    '3': { name: 'Menú 3', image: require('assets/images/react-logo.png'), description: 'Descripción del Menú 3' },
  };

  const menu = menus[menuId as keyof typeof menus];

  return (
    <View style={styles.container}>
      <Text>{menu?.name}</Text>
      <Image source={menu?.image} style={styles.image} />
      <Text>{menu?.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});