import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SanducheDetailScreen: React.FC = () => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const [quantity, setQuantity] = useState(1); // Establece la cantidad inicial a 1
  const pricePerUnit = 5;
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity); // Añade la cantidad al carrito
    router.back(); // Redirige a la página anterior al añadir al carrito
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setQuantity(1); // Evita que la cantidad sea 0
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header con botón de regreso y título */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sanduches</Text>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={() => router.push('/pages/recomendacion/carrito')} style={styles.cartIconButton}>
              <Ionicons name="cart" size={24} color="black" />
              {cartCount > 0 && (
                <View style={styles.cartCountContainer}>
                  <Text style={styles.cartCountText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Imagen */}
        <Image
          source={require('../../../assets/images/sanduchesp1.jpg')}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Información del producto */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Sanduche Tradicional</Text>
          <Text style={styles.productDescription}>
            Quesos mozarela, jamón, tomate cherry, rúcula y salsa de la casa.
          </Text>
        </View>

        {/* Información nutricional */}
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoButton} onPress={() => setShowNutrition(!showNutrition)}>
            <Text style={styles.infoButtonText}>Información nutricional</Text>
            <Ionicons name={showNutrition ? "chevron-down" : "chevron-forward"} size={20} color="black" />
          </TouchableOpacity>
          {showNutrition && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Información nutricional</Text>
              <View style={styles.nutritionGrid}>
                <Text style={styles.gridItem}>517Kcal</Text>
                <Text style={styles.gridItem}>26g Grasas</Text>
                <Text style={styles.gridItem}>42g Carbohidratos</Text>
                <Text style={styles.gridItem}>28g Proteínas</Text>
                <Text style={styles.gridItem}>1020mg Sodio</Text>
              </View>
            </View>
          )}

          {/* Alérgenos */}
          <TouchableOpacity style={styles.infoButton} onPress={() => setShowAllergens(!showAllergens)}>
            <Text style={styles.infoButtonText}>Información alérgenos</Text>
            <Ionicons name={showAllergens ? "chevron-down" : "chevron-forward"} size={20} color="black" />
          </TouchableOpacity>
          {showAllergens && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Información sobre alérgenos</Text>
              <View style={styles.allergensContainer}>
                {['Leche', 'Lactosa', 'Pimienta', 'Gluten', 'Sésamo'].map((item, idx) => (
                  <View key={idx} style={styles.allergenItem}>
                    <Ionicons name="alert-circle-outline" size={18} color="#333" style={{ marginRight: 6 }} />
                    <Text style={styles.allergenText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Selector de cantidad y total */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>${quantity * pricePerUnit}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pagar ahora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: -320 },
  cartContainer: { flexDirection: 'row', alignItems: 'center' },
  cartIconButton: { position: 'relative' },
  cartCountContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: { color: 'white', fontSize: 12 },
  productImage: {
    width: '90%',
    height: 220,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  productInfo: { paddingHorizontal: 16, paddingTop: 16 },
  productTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  productDescription: { fontSize: 14, color: '#333', marginBottom: 8 },
  infoContainer: { marginTop: 16, paddingHorizontal: 16 },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoButtonText: { fontSize: 16, color: '#333' },
  infoSection: { paddingVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    margin: 4,
    borderRadius: 8,
    fontSize: 14,
    width: '47%',
    textAlign: 'center',
  },
  allergensContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  allergenItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  allergenText: { fontSize: 14, color: '#333' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 6,
    marginHorizontal: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: { fontSize: 18, fontWeight: 'bold' },
  quantityValue: { fontSize: 16, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  totalPrice: { marginLeft: 20, fontSize: 16, fontWeight: 'bold' },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  payButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  payButtonText: { fontSize: 16, fontWeight: '600', color: '#000' },
  cartButton: {
    flex: 1,
    backgroundColor: '#FFB800',
    paddingVertical: 12,
    borderRadius: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: { fontSize: 16, fontWeight: '600', color: '#000' },
});

export default SanducheDetailScreen;
