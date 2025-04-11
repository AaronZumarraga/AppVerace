import React, { useState, useRef } from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '../../context/CartContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CartIcon } from '../../components/ui/CartIcon';

const SanducheDetailScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const { addItem } = useCart();

  const scale = useSharedValue(1);

  const product = {
    id: "cafeamericano",
    name: "Café americano",
    price: 1.5,
    image: require('../../../assets/images/americano.jpg'),
    description: "Refresca tu diversión. Preparate y enfrenta la sed con una bebida y disfruta al máximo."
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    });

    // Trigger animation
    scale.value = 1.5;
    scale.value = withSpring(1, { damping: 4 });
  };

  const navigateToCart = () => {
    router.push('/pages/recomendacion/carrito');
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Bebidas</Text>
          </View>
          
          <View style={styles.centerHeader}>
            <Image source={require('../../../assets/images/ra.png')} style={styles.icon} />
            <Text style={styles.raText}>Realidad{"\n"}Aumentada</Text>
          </View>
          
          <TouchableOpacity onPress={navigateToCart} style={styles.cartIconContainer}>
            <Animated.View style={animatedStyle}>
              <CartIcon />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Imagen */}
        <Image source={product.image} style={styles.image} />

        {/* Información */}
        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <Text>{product.description}</Text>
        </View>

        {/* Más Información */}
        <View style={styles.infoSection}>
          <Text style={styles.moreInfoTitle}>Más información</Text>

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => setShowNutrition(!showNutrition)}
          >
            <Text style={styles.infoText}>Información nutricional</Text>
            <Ionicons name={showNutrition ? "chevron-down" : "chevron-forward"} size={20} color="black" />
          </TouchableOpacity>

          {showNutrition && (
            <View style={styles.infoSection}>
              <View style={styles.nutritionGrid}>
                <Text style={styles.gridItem}>0 Kcal</Text>
                <Text style={styles.gridItem}>0g Grasas</Text>
                <Text style={styles.gridItem}>0g Carbohidratos</Text>
                <Text style={styles.gridItem}>0g Proteínas</Text>
                <Text style={styles.gridItem}>0mg Sodio</Text>
              </View>

              <View style={styles.nutritionTable}>
                {[
                  ['Peso', '7g'],
                  ['Calorías (Kcal)', '0Kcal - 0%'],
                  ['Grasas', '0g - 0%'],
                  ['Carbohidratos Totales', '0g - 0%'],
                  ['Proteínas', '0g - 0%'],
                  ['Sodio', '0mg - 0%'],
                  ['Grasas trans', '0g - 0%'],
                  ['Grasas Saturadas', '0g - 0%'],
                  ['Fibra', '0g - 0%'],                  
                ].map(([key, value], idx) => (
                  <View key={idx} style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>{key}</Text>
                    <Text style={styles.nutritionValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => setShowAllergens(!showAllergens)}
          >
            <Text style={styles.infoText}>Información alergenos</Text>
            <Ionicons name={showAllergens ? "chevron-down" : "chevron-forward"} size={20} color="black" />
          </TouchableOpacity>

          {showAllergens && (
            <View style={styles.infoContent}>
              <Text>Este producto no contiene alérgenos</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove-circle-outline" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add-circle-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>${(product.price * quantity).toFixed(2)}</Text>

        <TouchableOpacity style={styles.payNowButton}>
          <Text style={styles.payNowText}>Pagar ahora</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={handleAddToCart}
        >
          <Text style={styles.cartText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cartIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  raText: {
    fontSize: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  details: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoSection: {
    padding: 16,
  },
  moreInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontSize: 14,
  },
  infoContent: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  nutritionTable: { marginBottom: 20 },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  nutritionLabel: { fontSize: 14, color: '#333' },
  nutritionValue: { fontSize: 14, fontWeight: '600' },
  allergensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payNowButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  payNowText: {
    color: '#fff',
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: '#f0c14b',
    padding: 10,
    borderRadius: 5,
  },
  cartText: {
    fontSize: 14,
  },
});

export default SanducheDetailScreen;