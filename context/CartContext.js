'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i._id === action.product._id);
      if (existing) {
        return state.map(i =>
          i._id === action.product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i._id !== action.id);
    case 'UPDATE_QTY':
      return state.map(i =>
        i._id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case 'CLEAR':
      return [];
    case 'LOAD':
      return action.items;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bazzan-cart');
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('bazzan-cart', JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
