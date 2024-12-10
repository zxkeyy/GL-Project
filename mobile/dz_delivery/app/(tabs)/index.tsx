import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Redirect } from "expo-router";
import { useStore } from "zustand";
import useAuthStore from "@/store/authStore";

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText>
        Welcome to DZ Delivery!{" "}
        {user ? `User: ${user.fullName}, ${user.email}` : ""}
      </ThemedText>
      <ThemedView style={styles.titleContainer}>
        <Link href="/signup">
          <ThemedText type="link">Signup</ThemedText>
        </Link>
        <Link href="/login">
          <ThemedText type="link">Login</ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
