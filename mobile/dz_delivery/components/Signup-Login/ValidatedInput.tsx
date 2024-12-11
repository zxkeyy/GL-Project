import { useState } from "react";
import { View, TextInput } from "react-native";
import { ThemedText } from "../ThemedText";

interface ValidatedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string | null;
}

export function ValidatedInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
}: ValidatedInputProps) {
  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  return (
    <View>
      <TextInput
        style={{
          height: 60,
          borderWidth: error ? 2 : 1,
          borderColor: error ? "red" : "#E0E0E0",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 26,
          fontSize: 15,
          fontFamily: "Sora",
        }}
        placeholder={placeholder}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && (
        <ThemedText style={{ color: "red", fontSize: 12 }}>{error}</ThemedText>
      )}
    </View>
  );
}
