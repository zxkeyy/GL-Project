import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import * as Linking from "expo-linking";

import "@/i18n";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Platform } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch when app comes back to foreground
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: Platform.OS === "web",
    },
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user, accessToken, loading } = useAuth();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Sora: require("../assets/fonts/Sora-VariableFont_wght.ttf"),
  });

  const handleDeepLink = useCallback(async () => {
    if (loaded && !loading) {
      const url = await Linking.getInitialURL();
      if (url) {
        const { path } = Linking.parse(url);

        switch (path) {
          case "activate-email-success":
            router.push("/(email-verification)/activate-email-success");
            break;
        }
      }
    }
  }, [loaded, loading]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    handleDeepLink();
  }, [loaded, loading, handleDeepLink, accessToken, user]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(email-verification)" />
          <Stack.Screen name="(phone-verification)" />
          <Stack.Screen name="(document-verification)" />
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="+not-found" options={{ headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
