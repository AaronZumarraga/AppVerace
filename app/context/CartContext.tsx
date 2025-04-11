import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the CartItem type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the context type
type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getItemCount: () => number;
  clearCart: () => void;
};

// Create the context with default values
export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  getItemCount: () => 0,
  clearCart: () => {},
});

// Create a provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === itemId);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          // Remove item completely if quantity is 1
          return prevItems.filter((item) => item.id !== itemId);
        }
      }
      return prevItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      getItemCount,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);