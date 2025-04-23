import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useCart } from '../../context/CartContext'; // Asegúrate del path correcto

export default function ConfirmationScreen() {
  const { direccion, nombre, distance } = useLocalSearchParams();
  const { clearCart } = useCart(); // 🔥 usar el contexto para limpiar

  const handleConfirm = async () => {
    const pedido = {
      id: uuid.v4(),
      nombre: nombre ?? 'Verace Pizza',
      direccion: direccion ?? 'Av. de los Shyris N35-52',
      estado: 'En preparación',
      tiempoEstimado: 15,
      distancia: distance ?? 'N/A',
      fecha: new Date().toISOString(),
    };

    const pedidosGuardados = await AsyncStorage.getItem('pedidos');
    const pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    pedidos.push(pedido);
    await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos));

    clearCart(); // 🔥 limpia el carrito aquí

    Alert.alert('Pedido confirmado', 'Gracias por tu compra');
    router.push('/(tabs)/(Pedidos)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dirígete a:</Text>
      <Text style={styles.address}>{nombre ?? 'Verace Pizza'}</Text>
      <Text style={styles.subtitle}>{direccion ?? 'Av. de los Shyris N35-52'}</Text>
      <Text style={styles.subtitle}>Distancia: {distance} km</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  address: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  confirmButton: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
