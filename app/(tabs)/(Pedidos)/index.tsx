// app/(tabs)/(Pedidos)/index.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

type Pedido = {
  id: string;
  nombre: string;
  direccion?: string;
  estado: string;
  tiempoEstimado: number;
  distancia?: string;
  fecha: string;
};

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const cargarPedidos = async () => {
    try {
      const data = await AsyncStorage.getItem('pedidos');
      if (data) {
        setPedidos(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarPedidos();
    }, [])
  );

  const irADetalle = (pedido: Pedido) => {
    router.push({
      pathname: '/(tabs)/(Pedidos)/details',
      params: { ...pedido },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => irADetalle(item)}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text>Estado: {item.estado}</Text>
            <Text>Tiempo estimado: {item.tiempoEstimado} min</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay pedidos por el momento.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
