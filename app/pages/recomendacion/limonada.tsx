import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';


type SanducheDetailProps = {
  navigation: any;
};

const SanducheDetailScreen: React.FC<SanducheDetailProps> = ({ navigation }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header con botón de regreso y título */}
        <View style={styles.header}>
        {/*<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>*/}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Limonada</Text>
          <View style={styles.realidadContainer}>
            <Image source={require('../../../assets/images/ra.png')} style={styles.arIcon} />
            <View>
              <Text style={styles.realidadText}>Realidad</Text>
              <Text style={styles.aumentadaText}>Aumentada</Text>
            </View>
          </View>
        </View>

        {/* Imagen del producto */}
        <Image
          source={require('../../../assets/images/imperial.jpg')}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Información del producto */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Limonada</Text>
          <Text style={styles.productDescription}>
            Agua.
          </Text>
        </View>

        {/* Botones de info con toggle */}
        <View style={styles.infoContainer}>
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => setShowNutrition(!showNutrition)}
          >
            <Text style={styles.infoButtonText}>Información nutricional</Text>
            <Ionicons 
              name={showNutrition ? "chevron-down" : "chevron-forward"} 
              size={20} 
              color="black" 
            />
          </TouchableOpacity>
          
          {showNutrition && (
            <View style={styles.infoSection}>
              <View style={styles.nutritionGrid}>
                <Text style={styles.gridItem}>90 Kcal</Text>
                <Text style={styles.gridItem}>0g Grasas</Text>
                <Text style={styles.gridItem}>23g Carbohidratos</Text>
                <Text style={styles.gridItem}>0g Proteínas</Text>
                <Text style={styles.gridItem}>2mg Sodio</Text>
              </View>

              <View style={styles.nutritionTable}>
                {[
                    ['Peso', '500ml'],
                    ['Calorías (Kcal)', '90Kcal - 4.5%'],
                    ['Grasas', '0g - 0%'],
                    ['Carbohidratos Totales', '23g - 8%'],
                    ['Azúcares', '23g - *'],
                    ['Proteínas', '0g - 0%'],
                    ['Sodio', '2mg - 0%'],
                    ['Grasas trans', '0g - 0%'],
                    ['Grasas Saturadas', '0g - 0%'],
                    ['Fibra', '0g - 0%'],
                ]
                .map(([key, value], idx) => (
                  <View key={idx} style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>{key}</Text>
                    <Text style={styles.nutritionValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => setShowAllergens(!showAllergens)}
          >
            <Text style={styles.infoButtonText}>Información alérgenos</Text>
            <Ionicons 
              name={showAllergens ? "chevron-down" : "chevron-forward"} 
              size={20} 
              color="black" 
            />
          </TouchableOpacity>
          
          {showAllergens && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Este producto no contiene alérgenos</Text>
              <View style={styles.allergensContainer}>
             
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botones de acción fijos */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pagar ahora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
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
  realidadContainer: { flexDirection: 'row', alignItems: 'center' },
  arIcon: { width: 24, height: 24, marginRight: 6, marginLeft: -50 },
  realidadText: { fontSize: 12, fontWeight: '600', textAlign: 'center', marginLeft: -120 },
  aumentadaText: { fontSize: 10, textAlign: 'center', marginLeft: -120 },
  productImage: {
    width: '30%',
    height: 400,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  productInfo: { paddingHorizontal: 16, paddingTop: 16 },
  productTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  productDescription: { fontSize: 14, color: '#333', marginBottom: 8 },
  moreInfoText: { fontSize: 16, fontWeight: '600', color: '#000', marginVertical: 8 },
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
  allergenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  allergenText: { fontSize: 13, color: '#333' },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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