import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { getDistanceFromLatLonInKm } from '../../../utils/distance';

export default function PickupScreen() {
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const localLat = -0.1809;  // Latitud aproximada de Av. de los Shyris N35-52
  const localLon = -78.4815; // Longitud

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede obtener la ubicación.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      const dist = getDistanceFromLatLonInKm(userLat, userLon, localLat, localLon);
      setDistance(dist);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Calculando distancia...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuentra tu punto de recolección</Text>

      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>Verace Pizza</Text>
          <Text style={styles.address}>Av. de los Shyris N35-52</Text>
        </View>
        <View style={styles.actions}>
          <Text style={styles.distance}>{distance?.toFixed(2)} km</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => router.push({
              pathname: '/pages/recomendacion/confirmation',
              params: { distance: distance?.toFixed(2) },
            })}
          >
            <Text style={styles.selectButtonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  info: {
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distance: {
    fontSize: 16,
    color: '#4CAF50',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
