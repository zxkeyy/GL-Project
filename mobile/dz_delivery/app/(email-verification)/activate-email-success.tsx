import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useTimer } from "@/hooks/useTimer";
import { router } from "expo-router";
import { use } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function ActivateEmailSuccessScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackgroundBlur />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 50 }}
      >
        <LanguageSwitcher />

        <ThemedText
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          <ThemedText
            style={{
              color: "#4CAF50",
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Verify{" "}
          </ThemedText>
          your account
        </ThemedText>
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
            fontSize: 18,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Email successfuly verified!
        </ThemedText>
        <View style={{ marginTop: "auto" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              height: 48,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              router.replace("/");
            }}
          >
            <ThemedText
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
              onPress={() => {
                router.replace("/");
              }}
            >
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
