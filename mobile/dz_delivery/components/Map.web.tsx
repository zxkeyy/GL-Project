import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const Map = (props: any) => {
  return (
    <View
      style={{
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#72BF78",
      }}
    >
      <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
        Map Placeholder
      </ThemedText>
    </View>
  );
};

export default Map;
