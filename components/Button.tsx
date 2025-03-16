import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void; // Prop para manejar el evento de presión
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}> {/* Usamos Pressable para detectar el toque */}
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
