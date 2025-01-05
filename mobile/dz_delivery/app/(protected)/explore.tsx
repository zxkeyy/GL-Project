import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  TextInput,
  View,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function TabTwoScreen() {
  const [url, setUrl] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ backgroundColor: "#FFF", marginTop: 50 }}
        onChange={(e) => setUrl(e.nativeEvent.text)}
      />
      <TouchableOpacity
        onPress={() => {
          router.replace(url as any);
        }}
      >
        <ThemedText style={{ backgroundColor: "#fff" }}>Route</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
