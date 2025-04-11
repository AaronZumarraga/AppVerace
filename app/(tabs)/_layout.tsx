import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CartIcon } from '../components/ui/CartIcon';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        // Add the CartIcon to all tab screens
        headerRight: () => <CartIcon />,
        // Add some padding to ensure the cart icon has space
        headerRightContainerStyle: { paddingRight: 16 }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cupones"
        options={{
          title: 'Cupones',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="tags" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recompensas"
        options={{
          title: 'Recompensas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cuenta"
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}