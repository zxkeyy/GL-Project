import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  isDriverVerified: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string, userData: User) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      // Login action: set access token, refresh token, and user data
      login: (accessToken, refreshToken, userData) =>
        set(() => ({
          accessToken,
          refreshToken,
          user: userData,
        })),

      // Logout action: clear all authentication data
      logout: () =>
        set(() => ({
          accessToken: null,
          refreshToken: null,
          user: null,
        })),

      // Set access token separately if needed
      setAccessToken: (accessToken) => set(() => ({ accessToken })),

      // Set refresh token separately if needed
      setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
    }),
    {
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage), // use local storage for persistence
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }), // only persist access token, refresh token, and user
    }
  )
);

export default useAuthStore;
