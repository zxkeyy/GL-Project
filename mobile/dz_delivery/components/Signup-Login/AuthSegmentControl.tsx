import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AuthSegmentedControlProps {
  activeTab: "signin" | "signup";
  onTabChange: (tab: "signin" | "signup") => void;
}

export function AuthSegmentedControl({
  activeTab,
  onTabChange,
}: AuthSegmentedControlProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "transparent",
        borderRadius: 100,
        marginBottom: 10,
        marginHorizontal: 40,
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          paddingVertical: 15,
          marginRight: -10,
          alignItems: "center",
          borderRadius: 100,
          backgroundColor: activeTab === "signin" ? "#000" : "transparent",
        }}
        onPress={() => onTabChange("signin")}
      >
        <ThemedText
          style={{
            fontFamily: "Sora",
            fontSize: 18,
            fontWeight: "600",
            color: activeTab === "signin" ? "#fff" : "#000",
          }}
        >
          Sign in
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          paddingVertical: 15,
          marginLeft: -10,
          alignItems: "center",
          borderRadius: 100,
          backgroundColor: activeTab === "signup" ? "#000" : "transparent",
        }}
        onPress={() => onTabChange("signup")}
      >
        <ThemedText
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: activeTab === "signup" ? "#fff" : "#000",
          }}
        >
          Sign up
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
