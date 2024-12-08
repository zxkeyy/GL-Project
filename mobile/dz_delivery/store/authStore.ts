import { create } from "zustand";

interface User {
  id: string;
  fullName: string;
  email: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Login action: Accepts a JWT token
  login: (token: string) => {
    set({ token, isAuthenticated: true });
    get().fetchUser(); // Fetch user info based on the token
  },

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  fetchUser: async () => {},
}));

const fetchUser = async (token: string | null) => {
  if (!token) return;

  try {
    // Replace with your API endpoint
    const response = await fetch("https://your-api.com/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData: User = await response.json();
      set({ user: userData });
    } else {
      // Token may have expired or is invalid
      get().logout();
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    get().logout();
  }
};

export default useAuthStore;
