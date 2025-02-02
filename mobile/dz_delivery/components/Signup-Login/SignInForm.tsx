import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ValidatedInput } from "./ValidatedInput";
import { useTranslation } from "react-i18next";

interface SignInFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    signInEmail: string;
    signInPassword: string;
  };
  errors: { [key: string]: string[] };
  onInputChange: (field: string, value: string) => void;
}

export function SignInForm({
  formData,
  errors,
  onInputChange,
}: SignInFormProps) {
  const { t } = useTranslation();

  return (
    <>
      <Image
        source={require("../../assets/images/box-illustration.png")}
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
        }}
      />
      <ThemedText
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 40,
          paddingTop: 8,
          textAlign: "center",
        }}
      >
        {t("auth.welcomeBack")}{" "}
        <ThemedText
          style={{
            color: "#4CAF50",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {t("auth.appName")}
        </ThemedText>
      </ThemedText>
      <View style={{ gap: 12, marginBottom: 24 }}>
        <ValidatedInput
          placeholder={t("auth.placeholders.email")}
          value={formData.signInEmail}
          onChangeText={(value) => onInputChange("signInEmail", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.signInEmail?.[0]}
        />
        <ValidatedInput
          placeholder={t("auth.placeholders.password")}
          value={formData.signInPassword}
          onChangeText={(value) => onInputChange("signInPassword", value)}
          secureTextEntry
          error={errors.signInPassword?.[0]}
        />
        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
          <ThemedText style={{ color: "#4CAF50", fontSize: 14 }}>
            {t("auth.forgotPassword")}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}
