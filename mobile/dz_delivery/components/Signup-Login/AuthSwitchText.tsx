import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AuthSwitchTextProps {
  activeTab: "signin" | "signup";
  onTabChange: (tab: "signin" | "signup") => void;
}

export function AuthSwitchText({
  activeTab,
  onTabChange,
}: AuthSwitchTextProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      <ThemedText style={{ color: "#666", fontSize: 14 }}>
        {activeTab === "signin"
          ? "Haven't signed up yet? "
          : "Already have an account? "}
      </ThemedText>
      <TouchableOpacity
        onPress={() =>
          onTabChange(activeTab === "signin" ? "signup" : "signin")
        }
      >
        <ThemedText
          style={{
            color: "#4CAF50",
            fontSize: 14,
            textDecorationLine: activeTab === "signup" ? "underline" : "none",
          }}
        >
          {activeTab === "signin" ? "Sign up" : "Log in"}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
