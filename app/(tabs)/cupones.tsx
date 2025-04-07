import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type CouponScreenProps = {
  navigation: NavigationProp<any>;
};

export default function CouponScreen({ navigation }: CouponScreenProps) {
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cupones"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Sección de promociones */}
        <View style={styles.promotionsGrid}>
          <View style={styles.promotionItem}>
            <Image
              style={styles.promotionImage}
              source={require('../../assets/images/promos1.png')}
            />
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>50%</Text>
            </View>
          </View>

          <View style={styles.promotionItem}>
            <Image
              style={styles.promotionImage}
              source={require('../../assets/images/promos2.png')}
            />
            <View style={styles.promotionOverlay}>
              <Text style={styles.promotionTitle}>STAR FILM</Text>
              <Text style={styles.promotionSubtitle}>TUS PIZZAS PERFECTAS</Text>
            </View>
          </View>
        </View>

        {/* Promoción de ancho completo */}
        <View style={styles.fullWidthPromotion}>
          <Image
            style={styles.fullWidthImage}
            source={require('../../assets/images/promos.png')}
          />
          <View style={styles.promotionOverlay}>
            <Text style={styles.promotionTitle}>CHAMPAÑA DE LA PIZZA</Text>
          </View>
        </View>

        {/* Sección de ofertas */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Pizzas para todos</Text>

          <View style={styles.dealsGrid}>
            <TouchableOpacity
              style={styles.dealItem}
              onPress={() => navigation.navigate('DealDetails', { dealId: 1 })}
            >
              <Image
                style={styles.dealImage}
                source={require('../../assets/images/pizzas.png')}
              />
              <Text style={styles.dealDescription}>3 pizzas + 2 bebidas</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$10</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dealItem}
              onPress={() => navigation.navigate('DealDetails', { dealId: 2 })}
            >
              <Image
                style={styles.dealImage}
                source={require('../../assets/images/picadas.png')}
              />
              <Text style={styles.dealDescription}>2 pizzas + 2 bebidas</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$9</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  searchContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  promotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  promotionItem: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  promotionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fullWidthPromotion: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  promotionOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 6,
  },
  promotionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  promotionSubtitle: {
    color: '#eee',
    fontSize: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dealsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealItem: {
    width: '48%',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    marginBottom: 20,
  },
  dealImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  dealDescription: {
    fontSize: 14,
    padding: 8,
  },
  priceContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
  },
});
