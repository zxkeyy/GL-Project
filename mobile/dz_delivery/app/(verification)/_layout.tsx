import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
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
          name="activate-email"
          options={{
            title: "Verify Email",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="activate-email-success"
          options={{
            title: "Email Verified",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="document-submission"
          options={{
            title: "Verify your account",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register-phone"
          options={{
            title: "Verify your account",
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
    backgroundColor: "#F5FCFF",
  },
});
