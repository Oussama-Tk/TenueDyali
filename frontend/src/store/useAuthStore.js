import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
      },
      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // Applique le token à Axios lors du rafraîchissement de la page
        if (state?.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
      }
    }
  )
);
