import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: unknown) {
        const errMsg = (error as Error).message;
        Alert.alert("Error", errMsg);
      }      
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Correo electrónico:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <Text>Contraseña:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 10,
    },
  });

export default LoginScreen;
