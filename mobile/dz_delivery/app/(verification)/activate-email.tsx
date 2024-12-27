import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useTimer } from "@/hooks/useTimer";
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

export default function ActivateEmailScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user, resendActivationEmail } = useAuth();
  const { time, startTimer } = useTimer(120); // in seconds

  const handleResendEmail = async () => {
    setLoading(true);
    if (!user?.email) {
      console.error("No user email found");
      setLoading(false);
      return;
    }
    try {
      await resendActivationEmail(user.email);
      startTimer();
    } catch (error) {
      console.error("Resend email error:", error);
    }
    setLoading(false);
  };

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

        <View style={{ gap: 12, marginBottom: 24 }}>
          <ThemedText
            style={{
              fontSize: 28,
              lineHeight: 30,
              marginBottom: 40,
              fontWeight: "bold",
            }}
          >
            Confirm your{" "}
            <ThemedText
              style={{
                color: "#4CAF50",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              email address
            </ThemedText>
          </ThemedText>
          <ThemedText style={{ textAlign: "center", fontSize: 20 }}>
            A confirmation email was sent to:
          </ThemedText>
          <ThemedText
            style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
          >
            {user?.email}
          </ThemedText>
          <ThemedText style={{ textAlign: "center", fontSize: 20 }}>
            Please check your inbox and click the link to verify your email
            address.
          </ThemedText>
        </View>
        <View style={{ marginTop: "auto" }}>
          <TouchableOpacity
            style={{
              backgroundColor: time > 0 ? "#aaa" : "#000",
              height: 48,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleResendEmail}
            disabled={time > 0}
          >
            <ThemedText
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {time > 0 ? `Resend email (${time}s)` : "Resend email"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
