import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import Icon from "react-native-vector-icons/Ionicons";

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
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: error ? 2 : 1,
          borderColor: error ? "red" : "#E0E0E0",
          borderRadius: 12,
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 48,
            paddingVertical: 16,
            fontSize: 15,
            fontFamily: "Sora",
          }}
          placeholder={placeholder}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Icon
              name={isSecure ? "eye-off" : "eye"}
              size={20}
              color="gray"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText style={{ color: "red", fontSize: 12, marginBottom: -8 }}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}
