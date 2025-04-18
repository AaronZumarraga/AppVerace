import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  // Simulando una lista de menús con imágenes
  const menus = [
    { id: '1', name: 'Menú 1', image: require('assets/images/react-logo.png') },
    { id: '2', name: 'Menú 2', image: require('assets/images/react-logo.png') },
    { id: '3', name: 'Menú 3', image: require('assets/images/react-logo.png') },
  ];

  return (
    <View style={styles.container}>
      <Text>Search</Text>
      {menus.map((menu) => (
        <Link key={menu.id} href={`/menu/${menu.id}`} style={styles.menuItem}>
          <Image source={menu.image} style={styles.image} />
          <Text>{menu.name}</Text>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});
