import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AuthButtonProps {
  activeTab: "signin" | "signup";
}

export function AuthButton({ activeTab }: AuthButtonProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#000",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {activeTab === "signin" ? "Sign in" : "Sign up"}
      </ThemedText>
    </TouchableOpacity>
  );
}
