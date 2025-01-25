import { Redirect, router, Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, accessToken, loading, refreshAccessToken } = useAuth();

  useEffect(() => {
    refreshAccessToken;
  }, [accessToken]);
  if (!loading && !accessToken) {
    return <Redirect href="/(auth)/welcome-1" />;
  }
  if (!user?.isActive) {
    return <Redirect href="/(email-verification)/activate-email" />;
  }
  if (!user?.phoneNumber) {
    return <Redirect href="/(phone-verification)/register-phone" />;
  }
  if (!user?.isDriverVerified) {
    return <Redirect href="/(document-verification)/document-submission" />;
  }

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="current-deliveries"
          options={{
            title: "Current Deliveries",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 10,
    backgroundColor: "#F5FCFF",
  },
});
