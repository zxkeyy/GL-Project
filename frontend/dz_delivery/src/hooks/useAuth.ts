import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../store/authStore";
import axios from "axios";

interface JWTClaims {
    user_id: string;
    fullname: string;
    email: string;
    phone_number: string;
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
                    phoneNumber: data.phone_number,
                    isActive: data.is_active,
                    isDriverVerified: data.is_driver_verified,
                };
            } else {
                console.error(
                    `Invalid token structure: ${JSON.stringify(data)}`
                );
                return null;
            }
        } catch (error) {
            console.error(`Token decode error for token: ${token}`, error);
            return null;
        }
    };

    const axiosAPI = async (url: string, options: any): Promise<any> => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
                headers: {
                    "Content-Type": "application/json",
                },
                ...options,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw new Error(
                    error.response.data.detail ||
                        error.response.data.email ||
                        "Request failed"
                );
            }
            throw error;
        }
    };

    const authenticate = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axiosAPI("/auth/jwt/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { email, password },
            });

            const { access, refresh } = response;
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
            return {
                success: false,
                error: error instanceof Error ? error.message : "Login failed",
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
        console.log("createAccount");
        console.log(`url: ${import.meta.env.VITE_BACKEND_URL}/auth/users/`);
        try {
            await axiosAPI("/auth/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { email, full_name: fullName, password },
            });

            return await authenticate(email, password);
        } catch (error) {
            return {
                success: false,
                error: error,
            };
        } finally {
            setLoading(false);
        }
    };

    const resendActivationEmail = async (email: string) => {
        setLoading(true);
        try {
            await axiosAPI(
                "/auth/users/resend_activation/?redirect_id=mobile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: { email },
                }
            );
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Resend activation failed",
            };
        } finally {
            setLoading(false);
        }
    };

    const registerPhone = async (phone: string) => {
        setLoading(true);
        try {
            await axiosAPI("/auth/phone/register/?redirect_id=mobile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { phone_number: phone },
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Phone registration failed",
            };
        } finally {
            setLoading(false);
        }
    };

    const verifyPhone = async (phone: string, code: string) => {
        setLoading(true);
        try {
            await axiosAPI("/auth/phone/verify/?redirect_id=mobile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { phone_number: phone, code },
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Phone verification failed",
            };
        } finally {
            setLoading(false);
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) return null;

        try {
            const response = await axiosAPI("/auth/jwt/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { refresh: refreshToken },
            });

            const newAccessToken = response.access;
            setAccessToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Token refresh error:", error);
            logout();
            return null;
        }
    };

    useEffect(() => {
        if (refreshToken) {
            refreshAccessToken();
        }
        return () => setLoading(false);
    }, [refreshToken]);

    return {
        login: authenticate,
        logout,
        signup: createAccount,
        resendActivationEmail,
        registerPhone,
        verifyPhone,
        user,
        accessToken,
        refreshToken,
        loading,
    };
};
