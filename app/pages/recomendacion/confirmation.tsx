import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useCart } from '../../context/CartContext';

export default function ConfirmationScreen() {
  const { direccion, nombre, distance } = useLocalSearchParams();
  const { items, clearCart } = useCart();

  const handleConfirm = async () => {
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

    const pedido = {
      id: uuid.v4() as string,
      nombre: (nombre as string) ?? 'Verace Pizza',
      direccion: (direccion as string) ?? 'Av. de los Shyris N35-52',
      estado: 'En preparación',
      tiempoEstimado: 15,
      distancia: distance ?? 'N/A',
      fecha: new Date().toISOString(),
      items,
      total,
    };

    const guardados = await AsyncStorage.getItem('pedidos');
    const pedidos = guardados ? JSON.parse(guardados) : [];
    await AsyncStorage.setItem('pedidos', JSON.stringify([...pedidos, pedido]));

    clearCart();

    Alert.alert('Pedido confirmado', 'Gracias por tu compra');
    router.push({ pathname: '/(tabs)/(Pedidos)', params: { refreshed: '1' } });
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Dirígete a:</Text>
      <Text style={s.address}>{nombre ?? 'Verace Pizza'}</Text>
      <Text style={s.subtitle}>{direccion ?? 'Av. de los Shyris N35-52'}</Text>
      <Text style={s.subtitle}>Distancia: {distance ?? 'N/A'} km</Text>

      <TouchableOpacity style={s.confirmButton} onPress={handleConfirm}>
        <Text style={s.confirmButtonText}>Confirmar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  address: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  confirmButton: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
} as const);