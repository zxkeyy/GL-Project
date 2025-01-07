import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthLayout() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="welcome-1"
            options={{
              title: "Welcome",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="welcome-2"
            options={{
              title: "Welcome",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth"
            options={{
              title: "Log In or Sign Up",
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
