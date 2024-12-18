import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

interface AuthButtonProps {
  activeTab: "signin" | "signup";
  onClick: () => void;
}

export function AuthButton({ activeTab, onClick }: AuthButtonProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#000",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onClick}
    >
      <ThemedText
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {t(`auth.buttons.${activeTab}`)}
      </ThemedText>
    </TouchableOpacity>
  );
}
