import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define el tipo de los items del carrito
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define el tipo del contexto
type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getItemCount: () => number;
  clearCart: () => void;
};

// Crea el contexto con valores por defecto
export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  getItemCount: () => 0,
  clearCart: () => {},
});

// Crea un componente proveedor para el contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Función para agregar un item al carrito
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        // Si el item ya existe, se actualiza la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Si el item no existe, se agrega uno nuevo
        return [...prevItems, item];
      }
    });
  };

  // Función para eliminar un item del carrito
  const removeItem = (itemId: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === itemId);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          // Disminuir cantidad si es mayor que 1
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          // Si la cantidad es 1, eliminar el item
          return prevItems.filter((item) => item.id !== itemId);
        }
      }
      return prevItems;
    });
  };

  // Función para actualizar la cantidad de un item
  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0) // Eliminar items con cantidad 0
    );
  };

  // Función para obtener la cantidad total de items en el carrito
  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto del carrito
export const useCart = () => useContext(CartContext);
