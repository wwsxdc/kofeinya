import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          JSON.stringify(cartItem.addons) === JSON.stringify(item.addons)
      );

      if (existingIndex >= 0) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += item.quantity;
        return newItems;
      }

      return [...prev, item];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
