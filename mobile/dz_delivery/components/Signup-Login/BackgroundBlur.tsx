import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";

export function BackgroundBlur() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 150,
            left: "50%",
            transform: [{ translateX: "-50%" }],
            height: "40%",
            aspectRatio: 1,
            borderRadius: 300,
            backgroundColor: "rgba(254, 255, 159, 0.3)",
          }}
        />
      </View>
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        intensity={100}
      />
    </View>
  );
}
