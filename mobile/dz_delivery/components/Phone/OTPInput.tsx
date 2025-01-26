import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Keyboard } from "react-native";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  error: boolean;
}

export function OTPInput({ length, onComplete, error }: OTPInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const clearOtp = () => {
    setOtp(Array(length).fill(""));
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete(otp.join(""));
    }
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderColor: otp[index] ? "#4CAF50" : "#E0E0E0",
              borderRadius: 8,
              fontSize: 24,
              textAlign: "center",
              backgroundColor: !error ? "#1" : "#FC41255E",
            }}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={otp[index]}
          />
        ))}
    </View>
  );
}
