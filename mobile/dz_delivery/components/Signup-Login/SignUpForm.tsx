import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ValidatedInput } from "./ValidatedInput";
import { useTranslation } from "react-i18next";

interface SignUpFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  errors: { [key: string]: string[] };
  onInputChange: (field: string, value: string) => void;
}

export function SignUpForm({
  formData,
  errors,
  onInputChange,
}: SignUpFormProps) {
  const { t } = useTranslation();

  return (
    <>
      <ThemedText
        style={{
          fontSize: 40,
          lineHeight: 48,
          fontWeight: "bold",
          marginTop: 60,
          paddingTop: 8,
          marginBottom: 20,
          paddingLeft: 20,
        }}
      >
        {t("auth.joinFamily.prefix")}{" "}
        <ThemedText
          style={{
            color: "#4CAF50",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {t("auth.appName")}
        </ThemedText>{" "}
        {t("auth.joinFamily.suffix")}
      </ThemedText>
      <View style={{ gap: 12, marginBottom: 24 }}>
        <ValidatedInput
          placeholder={t("auth.placeholders.fullName")}
          value={formData.fullName}
          onChangeText={(value) => onInputChange("fullName", value)}
          autoCapitalize="words"
          error={errors.fullName?.[0]}
        />
        <ValidatedInput
          placeholder={t("auth.placeholders.email")}
          value={formData.email}
          onChangeText={(value) => onInputChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email?.[0]}
        />
        <ValidatedInput
          placeholder={t("auth.placeholders.phone")}
          value={formData.phone}
          onChangeText={(value) => onInputChange("phone", value)}
          keyboardType="phone-pad"
          error={errors.phone?.[0]}
        />
        <ValidatedInput
          placeholder={t("auth.placeholders.password")}
          value={formData.password}
          onChangeText={(value) => onInputChange("password", value)}
          secureTextEntry
          error={errors.password?.[0]}
        />
        <ValidatedInput
          placeholder={t("auth.placeholders.confirmPassword")}
          value={formData.confirmPassword}
          onChangeText={(value) => onInputChange("confirmPassword", value)}
          secureTextEntry
          error={errors.confirmPassword?.[0]}
        />
      </View>
    </>
  );
}
