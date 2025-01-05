import LanguageSwitcher from "@/components/LanguageSwitcher";
import { OTPInput } from "@/components/Phone/OTPInput";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { ValidatedInput } from "@/components/Signup-Login/ValidatedInput";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useTimer } from "@/hooks/useTimer";
import { validateInput } from "@/utils/validators";
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

export default function RegisterPhoneScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user, registerPhone, verifyPhone } = useAuth();
  const [codeSent, setCodeSent] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const updateErrors = (errorField: string, errorMessage: string | null) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[errorField] = [errorMessage];
      } else {
        delete newErrors[errorField];
      }
      return newErrors;
    });
  };
  const handleInputChange = (field: string, value: string) => {
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate the current field
    const error = validateInput(field, value);
    updateErrors(field, error);
  };

  async function handleRegisterPhone() {
    setLoading(true);

    if (!formData.phone) {
      updateErrors("phone", validateInput("phone", formData.phone));
      return;
    }

    if (errors.phone) {
      setLoading(false);
      return;
    }

    const response = await registerPhone(formData.phone);
    if (!response.success) {
      alert("failed: " + JSON.stringify(response.data ? response.data : ""));
      if (response.data.phone_number) {
        updateErrors("phone", response.data.email);
      }
    } else {
      alert("verification code sent");
      setCodeSent(true);
    }
    setLoading(false);
  }

  const handleVerifyPhone = async (otp: string) => {
    setLoading(true);

    const response = await verifyPhone(formData.phone, otp);
    if (!response.success) {
      alert("failed: " + JSON.stringify(response.data ? response.data : ""));
      updateErrors("code", "error");
    } else {
      alert("phone verified");
      router.replace("/");
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
        {!codeSent ? (
          <>
            <View style={{ gap: 12, marginBottom: 24 }}>
              <ThemedText
                style={{
                  fontSize: 28,
                  lineHeight: 30,
                  marginBottom: 40,
                  fontWeight: "bold",
                }}
              >
                Add your{" "}
                <ThemedText
                  style={{
                    color: "#4CAF50",
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  phone number
                </ThemedText>
              </ThemedText>
            </View>
            <View style={{ gap: 12, marginBottom: 24 }}>
              <ValidatedInput
                placeholder="Phone number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                keyboardType="phone-pad"
                autoCapitalize="none"
                phonePrefix="(+213)"
                error={errors.phone?.[0]}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{ gap: 12, marginBottom: 24 }}>
              <ThemedText
                style={{
                  fontSize: 28,
                  lineHeight: 30,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Verifying your{" "}
                <ThemedText
                  style={{
                    color: "#4CAF50",
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  phone number
                </ThemedText>
              </ThemedText>
              <ThemedText style={{ fontSize: 16 }}>
                Please enter the verification code you received on your phone
              </ThemedText>
            </View>

            <OTPInput
              length={6}
              onComplete={(otp) => {
                handleVerifyPhone(otp);
              }}
              error={errors.code ? true : false}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              <ThemedText style={{ color: "#666", fontSize: 14 }}>
                Didn't receive the code?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => setCodeSent(false)}>
                <ThemedText
                  style={{
                    color: "#4CAF50",
                    fontSize: 14,
                  }}
                >
                  send again
                </ThemedText>
              </TouchableOpacity>
            </View>
          </>
        )}
        {!codeSent && (
          <View style={{ marginTop: "auto" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                height: 48,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
                onPress={handleRegisterPhone}
              >
                Send verification code
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
