import React from "react";
import { View, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ValidatedInput } from "./ValidatedInput";

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
  return (
    <>
      <ThemedText
        style={{
          fontSize: 40,
          lineHeight: 48,
          fontWeight: "bold",
          marginTop: 60,
          marginBottom: 20,
        }}
      >
        Join{" "}
        <ThemedText
          style={{
            color: "#4CAF50",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Blitz
        </ThemedText>{" "}
        family now! 🎉
      </ThemedText>

      <View style={{ gap: 12, marginBottom: 24 }}>
        <ValidatedInput
          placeholder="Full name"
          value={formData.fullName}
          onChangeText={(value) => onInputChange("fullName", value)}
          autoCapitalize="words"
          error={errors.fullName?.[0]}
        />
        <ValidatedInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => onInputChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email?.[0]}
        />
        <ValidatedInput
          placeholder="(+213)"
          value={formData.phone}
          onChangeText={(value) => onInputChange("phone", value)}
          keyboardType="phone-pad"
          error={errors.phone?.[0]}
        />
        <ValidatedInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => onInputChange("password", value)}
          secureTextEntry
          error={errors.password?.[0]}
        />
        <ValidatedInput
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => onInputChange("confirmPassword", value)}
          secureTextEntry
          error={errors.confirmPassword?.[0]}
        />
      </View>
    </>
  );
}
