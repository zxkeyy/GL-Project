import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthStore, { User } from "../store/authStore";
import apiClient from "@/services/apiClient";

// JWT claims interface
interface JWTClaims {
  user_id: string;
  fullname: string;
  email: string;
  is_active: boolean;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshToken, user, login, logout, setAccessToken } =
    useAuthStore();

  const decodeToken = (token: string) => {
    try {
      const data = jwtDecode<JWTClaims>(token);
      if (
        data &&
        data.user_id &&
        data.fullname &&
        data.email &&
        typeof data.is_active === "boolean"
      ) {
        return {
          id: data.user_id,
          fullName: data.fullname,
          email: data.email,
          isActive: data.is_active,
        };
      } else {
        console.error(`Invalid token structure: ${JSON.stringify(data)}`);
        return null;
      }
    } catch (error) {
      console.error(`Token decode error for token: ${token}`, error);
      return null;
    }
  };

  // Authenticate on login
  const authenticate = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/jwt/create", {
        email,
        password,
      });
      const { access, refresh } = response.data;

      const userData = decodeToken(access);

      if (!userData) {
        return {
          success: false,
          error: "Invalid token data: Unable to decode access token",
        };
      }

      login(access, refresh, userData);
      return { success: true };
    } catch (error) {
      console.error("Authentication error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
        data: (error as any).response?.data
          ? (error as any).response.data
          : null,
      };
    } finally {
      setLoading(false);
    }
  };

  // Token refresh mechanism
  const refreshAccessToken = async () => {
    if (!refreshToken) return null;

    try {
      const response = await apiClient.post("/auth/jwt/refresh", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
      return null;
    }
  };

  // Check token validity on mount
  useEffect(() => {
    if (refreshToken) {
      refreshAccessToken();
    }
    return () => {
      // Cleanup logic here
      setLoading(false);
    };
  }, [refreshToken]);

  return {
    login: authenticate,
    logout,
    user,
    accessToken,
    refreshToken,
    loading,
  };
};
