// app/(tabs)/(Pedidos)/details.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PedidoDetails() {
  const { nombre, direccion, estado, tiempoEstimado, distancia, fecha } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nombre ?? 'Pedido'}</Text>
      <Text>Dirección: {direccion ?? 'No disponible'}</Text>
      <Text>Distancia: {distancia ?? 'N/A'} km</Text>
      <Text>Estado actual: {estado ?? 'Desconocido'}</Text>
      <Text>Tiempo estimado: {tiempoEstimado} min</Text>
      <Text>
        Fecha: {Array.isArray(fecha)
          ? new Date(fecha[0]).toLocaleString()
          : new Date(fecha as string).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
