import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

interface AuthSwitchTextProps {
  activeTab: "signin" | "signup";
  onTabChange: (tab: "signin" | "signup") => void;
}

export function AuthSwitchText({
  activeTab,
  onTabChange,
}: AuthSwitchTextProps) {
  const { t } = useTranslation();

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
          ? t("auth.switchText.notSignedUp")
          : t("auth.switchText.haveAccount")}
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
          {activeTab === "signin"
            ? t("auth.switchText.signUp")
            : t("auth.switchText.logIn")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
