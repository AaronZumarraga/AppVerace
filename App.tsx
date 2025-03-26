import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/auth/LoginScreen";
import HomeScreen from "./app/home/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Inicio" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
