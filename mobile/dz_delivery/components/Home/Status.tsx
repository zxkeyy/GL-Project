import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedText } from "../ThemedText";

interface Props {
  name: string;
  description: string;
  completed: boolean;
}

const Status = ({ name, description, completed }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          width: 42,
          height: 42,
          backgroundColor: "#A0D68399",
          borderWidth: 2,
          borderColor: "#72BF78",
          borderRadius: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name="check-circle"
          size={22}
          color={completed ? "#396A3D" : "#396A3D8A"}
        />
      </View>
      <View style={{ width: "100%", marginLeft: 10 }}>
        <ThemedText
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#396A3D",
            marginBottom: -8,
          }}
        >
          {name}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "#00000099",
          }}
        >
          {description}
        </ThemedText>
      </View>
    </View>
  );
};

export default Status;
