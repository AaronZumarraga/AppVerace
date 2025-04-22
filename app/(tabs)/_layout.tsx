import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

// No necesitamos el CartIcon por ahora ya que no existe
// import { CartIcon } from '../components/ui/CartIcon';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        // Comentamos esto hasta que tengas el CartIcon implementado
        // headerRight: () => <CartIcon />,
        // headerRightContainerStyle: { paddingRight: 16 }
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
        name="(Pedidos)"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(Recompensas)"
        options={{
          title: 'Recompensas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(Cuenta)"
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}