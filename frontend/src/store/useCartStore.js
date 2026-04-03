import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, customization = null) => set((state) => ({
        cart: [...state.cart, { id: Date.now(), product, customization, quantity: 1 }]
      })),
      removeFromCart: (cartItemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== cartItemId)
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // nom clé dans localStorage
    }
  )
);
