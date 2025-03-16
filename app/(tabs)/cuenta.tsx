import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '@/components/Button'; // Importación del botón

export default function Tab() {
  const [message, setMessage] = useState(''); // Estado para manejar el mensaje
  const [input1, setInput1] = useState(''); // Estado para el primer input
  const [input2, setInput2] = useState(''); // Estado para el segundo input

  // Función para manejar la acción del botón
  const handleButtonPress = () => {
    setMessage(`Aplastaste el botón, Input 1: ${input1}, Input 2: ${input2}`);
  };

  return (
    <View style={styles.container}>
      <Text>Tab [Cuenta]</Text>
      
      {/* Primer campo de entrada de texto */}
      <TextInput
        style={styles.input}
        placeholder="Ingrese algo en el primer campo"
        value={input1}
        onChangeText={setInput1} // Actualiza el estado del primer input
      />

      {/* Segundo campo de entrada de texto */}
      <TextInput
        style={styles.input}
        placeholder="Ingrese algo en el segundo campo"
        value={input2}
        onChangeText={setInput2} // Actualiza el estado del segundo input
      />

      <Button label="Aplástame" onPress={handleButtonPress} /> {/* Botón para mostrar el mensaje */}
      
      {message && <Text>{message}</Text>} {/* Mostrar el mensaje si existe */}
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
