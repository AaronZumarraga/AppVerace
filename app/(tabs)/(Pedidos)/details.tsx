import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { Pedido } from '.';

export default function PedidoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('pedidos');
      if (data) {
        const arr = JSON.parse(data) as Pedido[];
        const raw = arr.find((p) => p.id === id) ?? null;
        if (raw) {
          // Normaliza el pedido para asegurar items y total
          const normalized: Pedido = {
            ...raw,
            items: raw.items ?? [],
            total: raw.total ?? 0,
          };
          setPedido(normalized);
        } else {
          setPedido(null);
        }
      }
    })();
  }, [id]);

  if (!pedido) return <Text>Cargando…</Text>;

  return (
    <View style={s.container}>
      <Text style={s.title}>{pedido.nombre}</Text>
      <FlatList
        data={pedido.items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={s.row}>
            <Text>{item.quantity} × {item.name}</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={s.total}>Total: ${pedido.total.toFixed(2)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  total: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
} as const);