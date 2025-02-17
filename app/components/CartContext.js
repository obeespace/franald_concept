"use client";
import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // Original total before discount
  const [discount, setDiscount] = useState(0);

  // Load cart from localStorage once
  useEffect(() => {
    const storedCart = localStorage.getItem("myAppCart"); // Unique key
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage and calculate subtotal
  useEffect(() => {
    localStorage.setItem("myAppCart", JSON.stringify(cart));
    const newSubtotal = cart.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  // Add to Cart
  const addToCart = useCallback((item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  // Remove from Cart
  const removeFromCart = useCallback((name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  }, []);

  // Increase Quantity
  const increaseQuantity = useCallback((name) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  // Decrease Quantity
  const decreaseQuantity = useCallback((name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear Cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Apply Coupon
  const applyCoupon = useCallback((code) => {
    const validCoupons = {
      DISCOUNT10: 10,
      DISCOUNT20: 20,
    };

    if (validCoupons[code]) {
      const discountValue = (subtotal * validCoupons[code]) / 100;
      setDiscount(discountValue);
      alert(`Coupon applied! You saved ₦${discountValue}`);
    } else {
      alert("Invalid coupon code!");
      setDiscount(0);
    }
  }, [subtotal]);

  const total = subtotal - discount;

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      applyCoupon,
      total,
    }),
    [cart, total, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, applyCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};