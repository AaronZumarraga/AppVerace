import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from 'firebaseConfig';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/(tabs)/(Cuenta)'); // Redirige a la pantalla de inicio de sesión
    } catch (error: any) {
      console.log(error);
      alert('Sign out failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Datos del usuario</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5C6BC0',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
