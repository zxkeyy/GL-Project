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
  is_driver_verified: boolean;
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
        typeof data.is_active === "boolean" &&
        typeof data.is_driver_verified === "boolean"
      ) {
        return {
          id: data.user_id,
          fullName: data.fullname,
          email: data.email,
          isActive: data.is_active,
          isDriverVerified: data.is_driver_verified,
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

  const createAccount = async (
    email: string,
    fullName: string,
    password: string
  ) => {
    setLoading(true);
    try {
      // First, create the account
      const response = await apiClient.post("/auth/users/?redirect_id=mobile", {
        email,
        full_name: fullName,
        password,
      });

      // Then attempt to authenticate
      try {
        const authResult = await authenticate(email, password);

        // Check if authentication was successful
        if (!authResult.success) {
          console.error(
            "Authentication failed after account creation:",
            authResult.error
          );
          return {
            success: false,
            error: "Authentication failed after account creation",
          };
        }

        return { success: true };
      } catch (authError) {
        console.error("Authentication error:", authError);
        return {
          success: false,
          error: "Could not authenticate after account creation",
        };
      }
    } catch (error) {
      console.error("Account creation error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Account creation failed",
        data: (error as any).response?.data
          ? (error as any).response.data
          : null,
      };
    } finally {
      setLoading(false);
    }
  };

  const resendActivationEmail = async (email: string) => {
    setLoading(true);
    try {
      await apiClient.post(
        "/auth/users/resend_activation/?redirect_id=mobile",
        { email }
      );
      return { success: true };
    } catch (error) {
      console.error("Resend activation email error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Resend activation email failed",
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
    signup: createAccount,
    resendActivationEmail,
    user,
    accessToken,
    refreshToken,
    loading,
  };
};
