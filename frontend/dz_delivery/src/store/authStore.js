import { create } from "zustand";

// zustand store for authentication, not actually implemented yet
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
