import React, { useState, useRef } from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
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
    id: "veggie Lovers",
    name: "Veggie lovers",
    price: 10,
    image: require('../../../assets/images/vege.jpg'),
    description: "Mozzarella, cebolla, pimiento, cherries y champiñones."
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
    <View style={styles.container}>
      {/* Configure the Stack.Screen to hide the default header */}
      <Stack.Screen 
        options={{ 
          headerShown: false
        }} 
      />

      <ScrollView>
        {/* Custom Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Pizzas</Text>
          </View>
          
        <TouchableOpacity style={styles.centerHeader} onPress={() => console.log("Realidad Aumentada tocado")}>
          <Image source={require('../../../assets/images/ra.png')} style={styles.icon} />
          <Text style={styles.raText}>Realidad{"\n"}Aumentada</Text>
        </TouchableOpacity>

          
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
            <View style={styles.infoContent}>
              <View style={styles.nutritionGrid}>
                <Text style={styles.gridItem}>517Kcal</Text>
                <Text style={styles.gridItem}>26g Grasas</Text>
                <Text style={styles.gridItem}>42g Carbohidratos</Text>
                <Text style={styles.gridItem}>28g Proteínas</Text>
                <Text style={styles.gridItem}>1020mg Sodio</Text>
              </View>

              <View style={styles.nutritionTable}>
                {[
                  ['Peso', '210g'],
                  ['Calorías (Kcal)', '517Kcal - 26%'],
                  ['Grasas', '26g - 33%'],
                  ['Carbohidratos Totales', '42g - 14%'],
                  ['Proteínas', '28g - 57%'],
                  ['Sodio', '1020mg - 42%'],
                  ['Grasas trans', '0.12g - 0%'],
                  ['Grasas Saturadas', '8.8g - 44%'],
                  ['Fibra', '0.8g - 0%'],
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
            <Text style={styles.infoText}>Información alérgenos</Text>
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

        <View style={styles.pricePointsContainer}>
          <Text style={styles.price}>${(product.price * quantity).toFixed(2)}</Text>
          <Text style={styles.points}>Ganas {product.price * quantity * 10} pts</Text>
        </View>

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
    </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  allergenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  allergenText: {
    fontSize: 14,
  },
  pricePointsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  points: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  
});

export default SanducheDetailScreen;