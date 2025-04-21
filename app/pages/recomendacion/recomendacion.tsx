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

// Datos ampliados con ingredientes y categorías
const data: Plato[] = [
  // Pizzas
  { Nombre: "Margarita", Precio: 8, Calorias: 250, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, tomate cherry, albahaca" },
  { Nombre: "Napolitana", Precio: 10, Calorias: 280, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, tomate, anchoas" },
  { Nombre: "Vegetariana", Precio: 12, Calorias: 240, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, pimientos, champiñones, cebolla, aceitunas" },
  { Nombre: "Pepperoni", Precio: 9, Calorias: 300, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, pepperoni" },
  { Nombre: "Hawaiana", Precio: 11, Calorias: 320, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, jamón, piña" },
  { Nombre: "Veggie Lovers", Precio: 12, Calorias: 260, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, pimientos, champiñones, cebolla" },
  { Nombre: "Mi Champ", Precio: 8, Calorias: 270, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, champiñones" },
  { Nombre: "Cheddar", Precio: 10, Calorias: 330, Categoria: "Pizzas", Ingredientes: "Queso cheddar, queso mozzarella" },
  { Nombre: "Diavola", Precio: 10, Calorias: 310, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, salami picante, aceite de chile" },
  { Nombre: "Meat Lovers", Precio: 10, Calorias: 350, Categoria: "Pizzas", Ingredientes: "Queso mozzarella, pepperoni, jamón, carne molida, tocino" },
  { Nombre: "Say Cheese", Precio: 12, Calorias: 360, Categoria: "Pizzas", Ingredientes: "Mezcla de quesos: mozzarella, cheddar, parmesano, gorgonzola" },
  { Nombre: "Verace", Precio: 12, Calorias: 290, Categoria: "Pizzas", Ingredientes: "Queso mozzarella de búfala, tomate cherry, albahaca, aceite de oliva extra virgen" },
  
  // Sánduches
  { Nombre: "Tradicional", Precio: 5, Calorias: 300, Categoria: "Sanduches", Ingredientes: "Jamón, queso, tomate, lechuga" },
  { Nombre: "Carne Mechada", Precio: 5, Calorias: 350, Categoria: "Sanduches", Ingredientes: "Carne desmenuzada, queso, cebolla caramelizada" },
  { Nombre: "Veggie", Precio: 5, Calorias: 220, Categoria: "Sanduches", Ingredientes: "Queso, tomate, lechuga, pepino, palta" },
  
  // Picadas
  { Nombre: "Nachos Cheddar", Precio: 5, Calorias: 400, Categoria: "Picadas", Ingredientes: "Nachos, queso cheddar, jalapeños" },
  { Nombre: "Nachos Verace", Precio: 8, Calorias: 450, Categoria: "Picadas", Ingredientes: "Nachos, queso cheddar, guacamole, pico de gallo, crema agria" },
  { Nombre: "Bread Sticks", Precio: 5, Calorias: 280, Categoria: "Picadas", Ingredientes: "Masa de pizza, ajo, parmesano" },
  { Nombre: "Bread Sticks Verace", Precio: 8, Calorias: 310, Categoria: "Picadas", Ingredientes: "Masa de pizza artesanal, ajo asado, parmesano reggiano, salsa marinara" },
  
  // Bebidas
  { Nombre: "Agua sin gas", Precio: 1, Calorias: 0, Categoria: "Bebidas", Ingredientes: "Agua purificada" },
  { Nombre: "Agua mineral", Precio: 1.5, Calorias: 0, Categoria: "Bebidas", Ingredientes: "Agua mineral con gas natural" },
  { Nombre: "Limonada", Precio: 3.5, Calorias: 80, Categoria: "Bebidas", Ingredientes: "Limón, agua, azúcar" },
  { Nombre: "Limonada Rosa", Precio: 3.5, Calorias: 90, Categoria: "Bebidas", Ingredientes: "Limón, agua, azúcar, frutos rojos" },
  { Nombre: "Té caliente", Precio: 1.5, Calorias: 5, Categoria: "Bebidas", Ingredientes: "Té, agua caliente" },
  { Nombre: "Coca-Cola", Precio: 1.5, Calorias: 140, Categoria: "Bebidas", Ingredientes: "Refresco carbonatado" },
  { Nombre: "Fanta", Precio: 1.5, Calorias: 160, Categoria: "Bebidas", Ingredientes: "Refresco carbonatado sabor naranja" },
  { Nombre: "Fioravanti", Precio: 1.5, Calorias: 150, Categoria: "Bebidas", Ingredientes: "Refresco carbonatado sabor fresa" },
  { Nombre: "Sprite", Precio: 1.5, Calorias: 140, Categoria: "Bebidas", Ingredientes: "Refresco carbonatado sabor lima limón" },
  { Nombre: "Café americano", Precio: 1.5, Calorias: 5, Categoria: "Bebidas", Ingredientes: "Café, agua caliente" },
  { Nombre: "Capuccino", Precio: 2.5, Calorias: 120, Categoria: "Bebidas", Ingredientes: "Café espresso, leche espumada" },
  { Nombre: "Iced Coffee", Precio: 3.5, Calorias: 90, Categoria: "Bebidas", Ingredientes: "Café, hielo, leche, azúcar" },
  
  // Promos
  { Nombre: "Promo Pilas", Precio: 16, Calorias: 750, Categoria: "Promos", Ingredientes: "Pizza mediana, 2 bebidas, postre" },
  { Nombre: "Promo Lovers", Precio: 20, Calorias: 1000, Categoria: "Promos", Ingredientes: "Pizza grande, 2 bebidas, postre, pan de ajo" },
  { Nombre: "Promo King", Precio: 24, Calorias: 1500, Categoria: "Promos", Ingredientes: "Pizza familiar, 4 bebidas, 2 postres, 2 panes de ajo" },
  { Nombre: "Promo Sanduchera", Precio: 10, Calorias: 650, Categoria: "Promos", Ingredientes: "2 sánduches a elección, 2 bebidas" },
  { Nombre: "Promo Piqueo", Precio: 18, Calorias: 1200, Categoria: "Promos", Ingredientes: "Nachos cheddar, bread sticks, 4 bebidas" },
  
  // Cerveza
  { Nombre: "Jarro Cerveza", Precio: 4, Calorias: 150, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "Pinta Cerveza", Precio: 6, Calorias: 200, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "Litro Cerveza", Precio: 12, Calorias: 400, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "Growler", Precio: 15, Calorias: 1200, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "Stella Artois", Precio: 5, Calorias: 150, Categoria: "Cerveza", Ingredientes: "Cerveza lager premium" },
  { Nombre: "Corona", Precio: 5, Calorias: 140, Categoria: "Cerveza", Ingredientes: "Cerveza lager mexicana" },
  { Nombre: "Pilsener", Precio: 4, Calorias: 150, Categoria: "Cerveza", Ingredientes: "Cerveza lager nacional" },
  { Nombre: "Club", Precio: 4.5, Calorias: 150, Categoria: "Cerveza", Ingredientes: "Cerveza lager premium nacional" },
  { Nombre: "Michelada Clásica", Precio: 1.5, Calorias: 180, Categoria: "Cerveza", Ingredientes: "Cerveza, limón, sal, salsa" },
  { Nombre: "Michelada Maracuyá", Precio: 1.5, Calorias: 190, Categoria: "Cerveza", Ingredientes: "Cerveza, limón, sal, salsa, jugo de maracuyá" },
  { Nombre: "3 jarros cerveza artesanal", Precio: 10, Calorias: 450, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "3 pintas cualquier estilo", Precio: 15, Calorias: 600, Categoria: "Cerveza", Ingredientes: "Cerveza artesanal" },
  { Nombre: "3 Stella Artois / Corona", Precio: 20, Calorias: 450, Categoria: "Cerveza", Ingredientes: "Cerveza premium" },
  { Nombre: "Combo 3 Pilsener", Precio: 10, Calorias: 450, Categoria: "Cerveza", Ingredientes: "Cerveza lager nacional" },
  { Nombre: "Combo 3 Club", Precio: 12, Calorias: 450, Categoria: "Cerveza", Ingredientes: "Cerveza lager premium nacional" },
  
  // Cocteles
  { Nombre: "Copa de vino tinto", Precio: 5, Calorias: 120, Categoria: "Cocteles", Ingredientes: "Vino tinto" },
  { Nombre: "Copa de calimotcho", Precio: 6, Calorias: 150, Categoria: "Cocteles", Ingredientes: "Vino tinto, coca-cola" },
  { Nombre: "Copa de tinto de verano", Precio: 6, Calorias: 130, Categoria: "Cocteles", Ingredientes: "Vino tinto, limón, gaseosa" },
  { Nombre: "Botella de vino tinto", Precio: 20, Calorias: 600, Categoria: "Cocteles", Ingredientes: "Vino tinto" },
  { Nombre: "Jarra de calimotcho", Precio: 18, Calorias: 600, Categoria: "Cocteles", Ingredientes: "Vino tinto, coca-cola" },
  { Nombre: "Jarra de tinto de verano", Precio: 18, Calorias: 520, Categoria: "Cocteles", Ingredientes: "Vino tinto, limón, gaseosa" },
  { Nombre: "Manaba mule", Precio: 6, Calorias: 180, Categoria: "Cocteles", Ingredientes: "Caña manabita, limón, ginger beer" },
  { Nombre: "Caipirinha manaba", Precio: 6, Calorias: 200, Categoria: "Cocteles", Ingredientes: "Caña manabita, lima, azúcar" },
  { Nombre: "Botella de caña manabita", Precio: 25, Calorias: 1400, Categoria: "Cocteles", Ingredientes: "Caña manabita" },
  { Nombre: "Botella de Antioqueño", Precio: 45, Calorias: 1500, Categoria: "Cocteles", Ingredientes: "Aguardiente antioqueño" },
  { Nombre: "Paloma", Precio: 8, Calorias: 200, Categoria: "Cocteles", Ingredientes: "Tequila, toronja, lima, soda" },
  { Nombre: "Margarita clásica", Precio: 6, Calorias: 220, Categoria: "Cocteles", Ingredientes: "Tequila, triple sec, lima" },
  { Nombre: "Margarita maracuyá", Precio: 6, Calorias: 240, Categoria: "Cocteles", Ingredientes: "Tequila, triple sec, lima, maracuyá" },
  { Nombre: "Margarita frutos rojos", Precio: 6, Calorias: 230, Categoria: "Cocteles", Ingredientes: "Tequila, triple sec, lima, frutos rojos" },
  { Nombre: "Botella de tequila", Precio: 45, Calorias: 1650, Categoria: "Cocteles", Ingredientes: "Tequila" },
  { Nombre: "Cuba libre", Precio: 6, Calorias: 220, Categoria: "Cocteles", Ingredientes: "Ron, coca-cola, lima" },
  { Nombre: "Mojito", Precio: 6, Calorias: 210, Categoria: "Cocteles", Ingredientes: "Ron, lima, azúcar, hierbabuena, soda" },
  { Nombre: "Mojito maracuyá", Precio: 7, Calorias: 230, Categoria: "Cocteles", Ingredientes: "Ron, lima, azúcar, hierbabuena, soda, maracuyá" },
  { Nombre: "Mojito frutos rojos", Precio: 7, Calorias: 220, Categoria: "Cocteles", Ingredientes: "Ron, lima, azúcar, hierbabuena, soda, frutos rojos" },
  { Nombre: "Botella de Ron Abuelo", Precio: 45, Calorias: 1700, Categoria: "Cocteles", Ingredientes: "Ron añejo" },
  { Nombre: "Gin Tonic", Precio: 6, Calorias: 180, Categoria: "Cocteles", Ingredientes: "Gin, agua tónica, limón" },
  { Nombre: "Gin Tonic Maracuyá", Precio: 7, Calorias: 200, Categoria: "Cocteles", Ingredientes: "Gin, agua tónica, maracuyá" },
  { Nombre: "Gin Tonic Frutos rojos", Precio: 7, Calorias: 200, Categoria: "Cocteles", Ingredientes: "Gin, agua tónica, frutos rojos" },
  { Nombre: "Moscow Mule", Precio: 8, Calorias: 190, Categoria: "Cocteles", Ingredientes: "Vodka, limón, ginger beer" },
  { Nombre: "Jager Sour", Precio: 12, Calorias: 230, Categoria: "Cocteles", Ingredientes: "Jagermeister, limón, azúcar, clara de huevo" },
  { Nombre: "Jagerito", Precio: 12, Calorias: 240, Categoria: "Cocteles", Ingredientes: "Jagermeister, hierbabuena, lima, azúcar, soda" },
  { Nombre: "Whisky Sour", Precio: 12, Calorias: 220, Categoria: "Cocteles", Ingredientes: "Whisky, limón, azúcar, clara de huevo" },
  { Nombre: "New York Sour", Precio: 12, Calorias: 240, Categoria: "Cocteles", Ingredientes: "Whisky, limón, azúcar, clara de huevo, vino tinto" },
  { Nombre: "Whisky on the rocks", Precio: 12, Calorias: 210, Categoria: "Cocteles", Ingredientes: "Whisky, hielo" },
  
  // Shots
  { Nombre: "Shot de tequila", Precio: 3, Calorias: 100, Categoria: "Shots", Ingredientes: "Tequila" },
  { Nombre: "Shot de aguardiente", Precio: 3, Calorias: 110, Categoria: "Shots", Ingredientes: "Aguardiente" },
  { Nombre: "Shot de Jager", Precio: 6, Calorias: 110, Categoria: "Shots", Ingredientes: "Jagermeister" },
  { Nombre: "Jager Bomb", Precio: 10, Calorias: 240, Categoria: "Shots", Ingredientes: "Jagermeister, bebida energética" },
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
            {["Pizzas", "Sanduches", "Picadas", "Bebidas", "Promos", "Cerveza", "Cocteles", "Shots", "Cualquiera"].map((cat) => (
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
              maximumValue={45}
              step={1}
              value={presupuesto}
              onValueChange={setPresupuesto}
              minimumTrackTintColor="#F2A900"
              maximumTrackTintColor="#D1D1D1"
              thumbTintColor="#F2A900"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1</Text>
              <Text style={styles.sliderLabel}>45</Text>
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
                <Text style={[styles.tableCell, { flex: 1 }]}>${item.Precio}</Text>
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
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#F2A900',
  },
  categoryText: {
    fontSize: 14,
  },
  radioButton: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioButtonSelected: {
    borderColor: '#000',
  },
  radioButtonInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  presupuestoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  presupuestoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  presupuestoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  presupuestoArrow: {
  },
  sliderContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  buttonClear: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonClearText: {
    color: '#666',
    fontWeight: '500',
  },
  buttonRecommend: {
    backgroundColor: '#F2A900',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 2,
    alignItems: 'center',
  },
  buttonRecommendText: {
    color: '#FFF',
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    marginBottom: 30,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  tableBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableCell: {
    fontSize: 14,
  },
});