import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

type RecomendacionScreenProps = {
  navigation: NavigationProp<any>;
};

type Plato = {
  Nombre: string;
  Precio: number;
  Calorias: number;
  Categoria: string;
};

const data: Plato[] = [
  { Nombre: "Margarita", Precio: 8, Calorias: 250, Categoria: "Pizza" },
  { Nombre: "Napolitana", Precio: 10, Calorias: 280, Categoria: "Pizza" },
  { Nombre: "Vegetariana", Precio: 12, Calorias: 240, Categoria: "Pizza" },
  { Nombre: "Pepperoni", Precio: 9, Calorias: 300, Categoria: "Pizza" },
  { Nombre: "Hawaiana", Precio: 11, Calorias: 320, Categoria: "Pizza" },
  { Nombre: "Veggie Lovers", Precio: 12, Calorias: 260, Categoria: "Pizza" },
  { Nombre: "Tradicional", Precio: 5, Calorias: 300, Categoria: "Sánduche" },
  { Nombre: "Carne mechada", Precio: 5, Calorias: 350, Categoria: "Sánduche" },
  { Nombre: "Veggie", Precio: 5, Calorias: 220, Categoria: "Sánduche" },
  { Nombre: "Nachos cheddar", Precio: 5, Calorias: 400, Categoria: "Picada" },
  { Nombre: "Limonada", Precio: 1.5, Calorias: 80, Categoria: "Bebida" },
  { Nombre: "Cerveza artesanal", Precio: 3, Calorias: 150, Categoria: "Bebida" }
];

export default function RecomendacionScreen({ navigation }: RecomendacionScreenProps) {
  const [categoria, setCategoria] = useState<string>("");
  const [presupuesto, setPresupuesto] = useState<number>(9);
  const [ingredientes, setIngredientes] = useState<string>("Sin Carne");
  const [recomendaciones, setRecomendaciones] = useState<Plato[]>([
    { Nombre: "Margarita", Precio: 8, Calorias: 250, Categoria: "Pizza" },
    { Nombre: "Napolitana", Precio: 10, Calorias: 280, Categoria: "Pizza" },
    { Nombre: "Vegetariana", Precio: 12, Calorias: 240, Categoria: "Pizza" }
  ]);

  const handleCategoriaChange = (cat: string) => {
    setCategoria(cat === categoria ? "" : cat);
  };

  const obtenerRecomendaciones = () => {
    let filtrado = data.filter((item) => item.Precio <= presupuesto);
    if (categoria && categoria !== "Cualquiera") {
      filtrado = filtrado.filter((item) => item.Categoria === categoria);
    }
    setRecomendaciones(filtrado);
  };

  const limpiarFiltros = () => {
    setCategoria("");
    setPresupuesto(9);
    setIngredientes("");
    setRecomendaciones([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Recomendación de menu</Text>
        <Text style={styles.subtitle}>
          Selecciona categoría, presupuesto e ingredientes opcionales para recomendaciones.
        </Text>

        {/* Categoría */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoría:</Text>
          
          <View style={styles.categoriesContainer}>
            {["Pizza", "Sánduche", "Picada", "Bebida", "Cualquiera"].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  categoria === cat && styles.categoryButtonSelected
                ]}
                onPress={() => handleCategoriaChange(cat)}
              >
                <View style={[
                  styles.radioButton,
                  categoria === cat && styles.radioButtonSelected
                ]}>
                  {categoria === cat && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Presupuesto */}
        <View style={styles.section}>
          <View style={styles.presupuestoHeader}>
            <Text style={styles.sectionTitle}>Presupuesto ($)</Text>
            <View style={styles.presupuestoValueContainer}>
              <Text style={styles.presupuestoValue}>{presupuesto}</Text>
              <TouchableOpacity style={styles.presupuestoArrow}>
                <Text>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={20}
              step={1}
              value={presupuesto}
              onValueChange={setPresupuesto}
              minimumTrackTintColor="#F2A900"
              maximumTrackTintColor="#D1D1D1"
              thumbTintColor="#F2A900"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1</Text>
              <Text style={styles.sliderLabel}>20</Text>
            </View>
          </View>
        </View>

        {/* Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes preferidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Sin Carne"
            value={ingredientes}
            onChangeText={setIngredientes}
          />
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonClear}
            onPress={limpiarFiltros}
          >
            <Text style={styles.buttonClearText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRecommend}
            onPress={obtenerRecomendaciones}
          >
            <Text style={styles.buttonRecommendText}>Recomendar</Text>
          </TouchableOpacity>
        </View>

        {/* Resultados */}
        {recomendaciones.length > 0 && (
          <View style={styles.resultsContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Nombre</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Precio</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Calorías</Text>
            </View>
            
            {recomendaciones.map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  index < recomendaciones.length - 1 && styles.tableBorder
                ]}
              >
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.Nombre}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.Precio.toFixed(1)}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.Calorias}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    borderColor: '#F2A900',
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#F2A900',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F2A900',
  },
  categoryText: {
    fontSize: 12,
  },
  presupuestoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  presupuestoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
  },
  presupuestoValue: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  presupuestoArrow: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderLeftWidth: 1,
    borderLeftColor: '#DDD',
  },
  sliderContainer: {
    marginVertical: 8,
  },
  slider: {
    width: '100%',
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  buttonClear: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonClearText: {
    color: '#333',
    fontWeight: '500',
  },
  buttonRecommend: {
    backgroundColor: '#F2A900',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonRecommendText: {
    color: 'white',
    fontWeight: '500',
  },
  resultsContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#FFF',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  tableHeaderCell: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tableCell: {
    fontSize: 13,
  },
});