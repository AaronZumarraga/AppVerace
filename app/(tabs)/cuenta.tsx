import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importar el hook para la navegación
import Button from '@/components/Button';
import CustomTextInput from '@/components/CustomTextInput';

export default function Tab() {
  const [message, setMessage] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const router = useRouter(); // Hook para la navegación

  // Función para manejar el botón de registro
  const handleRegisterPress = () => {
    router.push('/registro'); // Navega a la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <Text>Inicio de sesión</Text>

      <CustomTextInput
        placeholder="Ingrese algo en el primer campo"
        value={input1}
        onChangeText={setInput1}
      />

      <CustomTextInput
        placeholder="Ingrese algo en el segundo campo"
        value={input2}
        onChangeText={setInput2}
      />

      <Button label="Iniciar sesión" onPress={() => setMessage(`Aplastaste el botón, Input 1: ${input1}, Input 2: ${input2}`)} />

      {message && <Text>{message}</Text>}

      <Button label="Registrarse" onPress={handleRegisterPress} /> {/* Ahora redirige a registro.tsx */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
