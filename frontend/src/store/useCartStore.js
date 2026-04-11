import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

export const useCartStore = create(
  persist(
    (set, get) => ({
      userCarts: {},
      getCurrentUserId: () => useAuthStore.getState().user?.id || 'guest',

      addToCart: (product, customization = null) => set((state) => {
        const userId = state.getCurrentUserId();
        const currentCart = state.userCarts?.[userId] || [];
        return {
          userCarts: {
            ...state.userCarts,
            [userId]: [...currentCart, { id: Date.now(), product, customization, quantity: 1 }]
          }
        };
      }),
      removeFromCart: (cartItemId) => set((state) => {
        const userId = state.getCurrentUserId();
        const currentCart = state.userCarts?.[userId] || [];
        return {
          userCarts: {
            ...state.userCarts,
            [userId]: currentCart.filter((item) => item.id !== cartItemId)
          }
        };
      }),
      clearCart: () => set((state) => {
        const userId = state.getCurrentUserId();
        return {
          userCarts: {
            ...state.userCarts,
            [userId]: []
          }
        };
      }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
