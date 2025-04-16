import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Plato = {
  Nombre: string;
  Precio: number;
  Calorias: number;
  Categoria: string;
  Ingredientes: string;
  Similitud?: number;
};

// Datos ampliados con ingredientes
const data: Plato[] = [
  { Nombre: "Margarita", Precio: 8, Calorias: 250, Categoria: "Pizza", Ingredientes: "Queso mozzarella, tomate cherry, albahaca" },
  { Nombre: "Napolitana", Precio: 10, Calorias: 280, Categoria: "Pizza", Ingredientes: "Queso mozzarella, tomate, anchoas" },
  { Nombre: "Vegetariana", Precio: 12, Calorias: 240, Categoria: "Pizza", Ingredientes: "Queso mozzarella, pimientos, champiñones, cebolla, aceitunas" },
  { Nombre: "Pepperoni", Precio: 9, Calorias: 300, Categoria: "Pizza", Ingredientes: "Queso mozzarella, pepperoni" },
  { Nombre: "Hawaiana", Precio: 11, Calorias: 320, Categoria: "Pizza", Ingredientes: "Queso mozzarella, jamón, piña" },
  { Nombre: "Veggie Lovers", Precio: 12, Calorias: 260, Categoria: "Pizza", Ingredientes: "Queso mozzarella, pimientos, champiñones, cebolla" },
  { Nombre: "Tradicional", Precio: 5, Calorias: 300, Categoria: "Sánduche", Ingredientes: "Jamón, queso, tomate, lechuga" },
  { Nombre: "Carne mechada", Precio: 5, Calorias: 350, Categoria: "Sánduche", Ingredientes: "Carne desmenuzada, queso, cebolla caramelizada" },
  { Nombre: "Veggie", Precio: 5, Calorias: 220, Categoria: "Sánduche", Ingredientes: "Queso, tomate, lechuga, pepino, palta" },
  { Nombre: "Nachos cheddar", Precio: 5, Calorias: 400, Categoria: "Picada", Ingredientes: "Nachos, queso cheddar, jalapeños" },
  { Nombre: "Limonada", Precio: 1.5, Calorias: 80, Categoria: "Bebida", Ingredientes: "Limón, agua, azúcar" },
  { Nombre: "Cerveza artesanal", Precio: 3, Calorias: 150, Categoria: "Bebida", Ingredientes: "Cebada, lúpulo, levadura" }
];

// Implementación simplificada de TF-IDF
function crearVectoresTFIDF(datos: Plato[]) {
  // Crear un conjunto de todos los términos
  const todosTerminos = new Set<string>();
  const documentosProcesados: string[][] = [];
  
  // Procesar ingredientes y recopilar términos únicos
  datos.forEach(plato => {
    const terminos = plato.Ingredientes.toLowerCase().split(/[\s,]+/).filter(Boolean);
    documentosProcesados.push(terminos);
    terminos.forEach(termino => todosTerminos.add(termino));
  });
  
  const terminos = Array.from(todosTerminos);
  const idf: {[key: string]: number} = {};
  
  // Calcular IDF (Inverse Document Frequency)
  terminos.forEach(termino => {
    const documentosConTermino = documentosProcesados.filter(doc => 
      doc.includes(termino)
    ).length;
    idf[termino] = Math.log(datos.length / (1 + documentosConTermino));
  });
  
  // Calcular vectores TF-IDF para cada plato
  const vectoresTFIDF: number[][] = [];
  
  documentosProcesados.forEach(doc => {
    const vector: number[] = [];
    const frecuencias: {[key: string]: number} = {};
    
    // Calcular frecuencias de términos
    doc.forEach(termino => {
      frecuencias[termino] = (frecuencias[termino] || 0) + 1;
    });
    
    // Calcular TF-IDF para cada término
    terminos.forEach(termino => {
      const tf = frecuencias[termino] || 0;
      vector.push(tf * idf[termino]);
    });
    
    vectoresTFIDF.push(vector);
  });
  
  return { vectoresTFIDF, terminos };
}

// Calcular similitud de coseno entre dos vectores
function similitudCoseno(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Los vectores deben tener la misma longitud");
  }
  
  let producto = 0;
  let normaA = 0;
  let normaB = 0;
  
  for (let i = 0; i < vectorA.length; i++) {
    producto += vectorA[i] * vectorB[i];
    normaA += vectorA[i] * vectorA[i];
    normaB += vectorB[i] * vectorB[i];
  }
  
  normaA = Math.sqrt(normaA);
  normaB = Math.sqrt(normaB);
  
  if (normaA === 0 || normaB === 0) {
    return 0;
  }
  
  return producto / (normaA * normaB);
}

export default function RecomendacionScreen() {
  const router = useRouter();
  
  const [categoria, setCategoria] = useState<string>("");
  const [presupuesto, setPresupuesto] = useState<number>(9);
  const [ingredientes, setIngredientes] = useState<string>("Sin Carne");
  const [recomendaciones, setRecomendaciones] = useState<Plato[]>([]);
  const [vectoresTFIDF, setVectoresTFIDF] = useState<{vectoresTFIDF: number[][], terminos: string[]}>({ vectoresTFIDF: [], terminos: [] });
  
  useEffect(() => {
    // Precalcular vectores TF-IDF al iniciar
    const tfidf = crearVectoresTFIDF(data);
    setVectoresTFIDF(tfidf);
  }, []);

  const handleCategoriaChange = (cat: string) => {
    setCategoria(cat === categoria ? "" : cat);
  };

  const obtenerRecomendaciones = () => {
    // Filtrado inicial por precio y categoría
    let filtrado = data.filter((item) => item.Precio <= presupuesto);
    if (categoria && categoria !== "Cualquiera") {
      filtrado = filtrado.filter((item) => item.Categoria === categoria);
    }
    
    // Si no hay ingredientes para procesar o no hay términos TF-IDF, devolver resultados filtrados
    if (!ingredientes || vectoresTFIDF.terminos.length === 0) {
      setRecomendaciones(filtrado);
      return;
    }
    
    try {
      // Filtrado por preferencia de carne
      if (ingredientes.toLowerCase().includes("sin carne")) {
        filtrado = filtrado.filter((item) => 
          !item.Ingredientes.toLowerCase().includes("carne") && 
          !item.Ingredientes.toLowerCase().includes("jamón") && 
          !item.Ingredientes.toLowerCase().includes("pepperoni")
        );
      } else if (ingredientes.toLowerCase().includes("con carne")) {
        filtrado = filtrado.filter((item) => 
          item.Ingredientes.toLowerCase().includes("carne") || 
          item.Ingredientes.toLowerCase().includes("jamón") || 
          item.Ingredientes.toLowerCase().includes("pepperoni")
        );
      } else {
        // Análisis de similitud basado en ingredientes
        const terminosConsulta = ingredientes.toLowerCase().split(/[\s,]+/).filter(Boolean);
        const vectorConsulta = new Array(vectoresTFIDF.terminos.length).fill(0);
        
        // Crear vector de consulta
        terminosConsulta.forEach(termino => {
          const indice = vectoresTFIDF.terminos.indexOf(termino);
          if (indice !== -1) {
            vectorConsulta[indice] = 1;
          }
        });
        
        // Calcular similitud para cada plato
        filtrado = filtrado.map(plato => {
          const indice = data.findIndex(item => item.Nombre === plato.Nombre);
          if (indice !== -1) {
            const similitud = similitudCoseno(vectorConsulta, vectoresTFIDF.vectoresTFIDF[indice]);
            return { ...plato, Similitud: similitud };
          }
          return { ...plato, Similitud: 0 };
        });
        
        // Ordenar por similitud
        filtrado = filtrado.sort((a, b) => (b.Similitud || 0) - (a.Similitud || 0));
      }
      
      if (filtrado.length === 0) {
        Alert.alert("Sin resultados", "No se encontraron platos que coincidan con tus preferencias.");
      }
      
      // Tomar los 5 mejores resultados
      setRecomendaciones(filtrado.slice(0, 5));
    } catch (error) {
      console.error("Error al calcular similitudes:", error);
      setRecomendaciones(filtrado);
    }
  };

  const limpiarFiltros = () => {
    setCategoria("");
    setPresupuesto(9);
    setIngredientes("");
    setRecomendaciones([]);
  };

  return (
    <View style={styles.container}>
      {/* This will hide the header */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Recomendación de menú con IA</Text>
        </View>
      
        <Text style={styles.subtitle}>
          Sistema inteligente que recomienda platos basados en tus preferencias.
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
            placeholder="Ej: Sin Carne, Con Carne, o ingredientes específicos"
            value={ingredientes}
            onChangeText={setIngredientes}
          />
          <Text style={styles.hint}>
            Puedes escribir "Sin Carne", "Con Carne", o ingredientes específicos como "queso, tomate"
          </Text>
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
            <Text style={styles.resultsTitle}>Recomendaciones Personalizadas</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Nombre</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Precio</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Calorías</Text>
            </View>
            
            {recomendaciones.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.tableRow,
                  index < recomendaciones.length - 1 && styles.tableBorder
                ]}
                onPress={() => Alert.alert(
                  item.Nombre,
                  `Ingredientes: ${item.Ingredientes}\nCategoría: ${item.Categoria}\nPrecio: $${item.Precio}\nCalorías: ${item.Calorias}`
                )}
              >
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.Nombre}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>${item.Precio.toFixed(1)}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.Calorias}</Text>
              </TouchableOpacity>
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
    paddingTop: 20, // Added extra padding at the top since we removed the header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backButton: {
    padding: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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
  hint: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
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
    marginBottom: 24,
    backgroundColor: '#FFF',
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    color: '#F2A900',
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