import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Inicio de sesion' }}/>
      <Stack.Screen name="registro" options={{ title: 'Registro' }}/>
      <Stack.Screen name="reset-password" options={{ title: 'Restablecer contraseña' }}/>
      <Stack.Screen name="usuario" options={{ title: 'Datos de usuario' }}/>
    </Stack>
  );
}
