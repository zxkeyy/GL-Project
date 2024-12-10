import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Blurred Background */}
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
          //makes the blur effect stronger
          intensity={100}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 80 }}
      >
        {/* Segmented Control */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            borderRadius: 100,
            marginBottom: 10,
            marginHorizontal: 40,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 15,
              marginRight: -10,
              alignItems: "center",
              borderRadius: 100,
              backgroundColor: activeTab === "signin" ? "#000" : "transparent",
            }}
            onPress={() => setActiveTab("signin")}
          >
            <ThemedText
              style={{
                fontFamily: "Sora",
                fontSize: 18,
                fontWeight: "600",
                color: activeTab === "signin" ? "#fff" : "#000",
              }}
            >
              Sign in
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 15,
              marginLeft: -10,
              alignItems: "center",
              borderRadius: 100,
              backgroundColor: activeTab === "signup" ? "#000" : "transparent",
            }}
            onPress={() => setActiveTab("signup")}
          >
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: activeTab === "signup" ? "#fff" : "#000",
              }}
            >
              Sign up
            </ThemedText>
          </TouchableOpacity>
        </View>

        {activeTab === "signin" ? (
          <>
            {/* Illustration */}
            <Image
              source={require("../../assets/images/box-illustration.png")}
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
              }}
            />

            {/* Welcome Text */}
            <ThemedText
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Welcome back to{" "}
              <ThemedText
                style={{
                  color: "#4CAF50",
                  fontSize: 28,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Blitz
              </ThemedText>
            </ThemedText>

            {/* Sign In Form */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                  fontFamily: "Sora",
                }}
                placeholder="Email"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                  fontFamily: "Sora",
                }}
                placeholder="Password"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry
              />
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <ThemedText style={{ color: "#4CAF50", fontSize: 14 }}>
                  Forgot password?
                </ThemedText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <ThemedText
              style={{
                fontSize: 40,
                lineHeight: 48,
                fontWeight: "bold",
                marginTop: 60,
                marginBottom: 20,
              }}
            >
              Join{" "}
              <ThemedText
                style={{
                  color: "#4CAF50",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Blitz
              </ThemedText>{" "}
              family now! 🎉
            </ThemedText>

            {/* Sign Up Form */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                }}
                placeholder="Full name"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange("fullName", value)}
                autoCapitalize="words"
              />
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                }}
                placeholder="Email"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                }}
                placeholder="(+213)"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                }}
                placeholder="Password"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry
              />
              <TextInput
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 26,
                  fontSize: 15,
                }}
                placeholder="Confirm Password"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                secureTextEntry
              />
            </View>
          </>
        )}

        {/* Auth Button and Switch Auth Container */}
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
            >
              {activeTab === "signin" ? "Sign in" : "Sign up"}
            </ThemedText>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <ThemedText style={{ color: "#666", fontSize: 14 }}>
              {activeTab === "signin"
                ? "Haven't signed up yet? "
                : "Already have an account? "}
            </ThemedText>
            <TouchableOpacity
              onPress={() =>
                setActiveTab(activeTab === "signin" ? "signup" : "signin")
              }
            >
              <ThemedText
                style={{
                  color: "#4CAF50",
                  fontSize: 14,
                  textDecorationLine:
                    activeTab === "signup" ? "underline" : "none",
                }}
              >
                {activeTab === "signin" ? "Sign up" : "Log in"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
