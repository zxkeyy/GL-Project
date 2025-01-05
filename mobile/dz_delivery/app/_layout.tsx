import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "@/i18n";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, accessToken } = useAuth();

    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Sora: require("../assets/fonts/Sora-VariableFont_wght.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    console.log("RootLayout", { user, accessToken });

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack screenOptions={{ headerShown: false }}>
                {!accessToken ? (
                    <Stack.Screen name="(welcome)/" />
                ) : !user?.isActive ? (
                    <Stack.Screen name="(verification)" />
                ) : (
                    <Stack.Screen name="(protected)" />
                )}
                <Stack.Screen
                    name="+not-found"
                    options={{ headerShown: true }}
                />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
