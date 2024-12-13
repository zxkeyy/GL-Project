import { Image, StyleSheet, Platform, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { StackActions } from "@react-navigation/native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

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
        <Link href="/auth">
          <ThemedText type="link">login or signup</ThemedText>
        </Link>
      </ThemedView>
      <TouchableOpacity onPress={logout}>
        <ThemedText type="link">Logout</ThemedText>
      </TouchableOpacity>
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
