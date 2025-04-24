import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export type Pedido = {
  id: string;
  nombre: string;
  direccion?: string;
  estado: string;
  tiempoEstimado: number;
  distancia?: string;
  fecha: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
};

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { refreshed } = useLocalSearchParams();

  const cargarPedidos = async () => {
    const data = await AsyncStorage.getItem('pedidos');
    const lista = data ? JSON.parse(data) : [];

    // Normaliza cada pedido para garantizar items y total siempre definidos
    const normalizados: Pedido[] = (lista as any[]).map((p) => ({
      items: [],
      total: 0,
      ...p,
    }));

    setPedidos(normalizados);
  };

  useFocusEffect(
    React.useCallback(() => { cargarPedidos(); }, [refreshed])
  );

  const irADetalle = (id: string) => {
    router.push({ pathname: '/(tabs)/(Pedidos)/details', params: { id } });
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Tus pedidos</Text>

      <FlatList
        data={[...pedidos].sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => irADetalle(item.id)}>
            <Text style={s.name}>{item.nombre}</Text>
            {item.items?.length > 0
              ? <Text>{item.items.length} productos • ${item.total.toFixed(2)}</Text>
              : <Text style={s.noItems}>Sin productos registrados</Text>}
            <Text>Estado: {item.estado}</Text>
            <Text>Tiempo estimado: {item.tiempoEstimado} min</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay pedidos por el momento.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  noItems: { fontStyle: 'italic', color: '#888', marginBottom: 4 },
} as const);