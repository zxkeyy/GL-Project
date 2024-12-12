import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ValidatedInput } from "./ValidatedInput";

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
          textAlign: "center",
        }}
      >
        Welcome back to{" "}
        <ThemedText
          style={{
            color: "#4CAF50",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Blitz
        </ThemedText>
      </ThemedText>

      <View style={{ gap: 12, marginBottom: 24 }}>
        <ValidatedInput
          placeholder="Email"
          value={formData.signInEmail}
          onChangeText={(value) => onInputChange("signInEmail", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.signInEmail?.[0]}
        />
        <ValidatedInput
          placeholder="Password"
          value={formData.signInPassword}
          onChangeText={(value) => onInputChange("signInPassword", value)}
          secureTextEntry
          error={errors.signInPassword?.[0]}
        />
        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
          <ThemedText style={{ color: "#4CAF50", fontSize: 14 }}>
            Forgot password?
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}
