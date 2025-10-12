// context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type CartItem = {
  id: number;
  title: string;
  slug: string;
  price: number;
  durationMin: number;
  imageUrl?: string;
};

type Cart = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  total: () => number;
  totalMinutes: () => number;
};

const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('odont_cart');
      if (raw) setItems(JSON.parse(raw));
    } catch (e) { setItems([]); }
  }, []);

  useEffect(() => {
    localStorage.setItem('odont_cart', JSON.stringify(items));
  }, [items]);

  const add = (item: CartItem) => {
    setItems(prev => {
      if (prev.find(p => p.slug === item.slug)) return prev;
      return [...prev, item];
    });
  };

  const remove = (slug: string) => {
    setItems(prev => prev.filter(i => i.slug !== slug));
  };

  const clear = () => setItems([]);

  const total = () => items.reduce((s, i) => s + i.price, 0);
  const totalMinutes = () => items.reduce((s, i) => s + i.durationMin, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total, totalMinutes }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

