import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AuthButton } from "@/components/Signup-Login/AuthButton";
import { AuthSegmentedControl } from "@/components/Signup-Login/AuthSegmentControl";
import { AuthSwitchText } from "@/components/Signup-Login/AuthSwitchText";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { SignInForm } from "@/components/Signup-Login/SignInForm";
import { SignUpForm } from "@/components/Signup-Login/SignUpForm";
import { useAuth } from "@/hooks/useAuth";
import { validateConfirmPassword, validateInput } from "@/utils/validators";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    signInEmail: "",
    signInPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const { login, signup } = useAuth();

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

    // Validate confirmPassword only when necessary
    if (
      (field === "password" && formData.confirmPassword != "") ||
      field === "confirmPassword"
    ) {
      const confirmPasswordError = validateConfirmPassword(
        field === "password" ? value : formData.password,
        field === "confirmPassword" ? value : formData.confirmPassword
      );
      updateErrors("confirmPassword", confirmPasswordError);
    }
  };

  async function handleLogin() {
    setLoading(true);
    if (errors.signInEmail || errors.signInPassword) {
      setLoading(false);
      return;
    }
    const response = await login(formData.signInEmail, formData.signInPassword);
    if (!response.success) {
      alert(
        "Login failed: " + JSON.stringify(response.data ? response.data : "")
      );
      if (response.data.email) {
        updateErrors("signInEmail", response.data.email);
      }
      if (response.data.password) {
        updateErrors("signInPassword", response.data.password);
      }
    } else {
      alert("Login successful");
      router.replace("/");
    }
    setLoading(false);
  }

  async function handleSignUp() {
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      updateErrors("confirmPassword", "Passwords do not match");
      setLoading(false);
      return;
    }

    if (errors.password || errors.email || errors.fullName) {
      setLoading(false);
      return;
    }

    const response = await signup(
      formData.email,
      formData.fullName,
      formData.password
    );
    if (!response.success) {
      alert(
        "Signup failed: " + JSON.stringify(response.data ? response.data : "")
      );
      if (response.data.email) {
        updateErrors("email", response.data.email);
      }
      if (response.data.full_name) {
        updateErrors("fullName", response.data.full_name);
      }
      if (response.data.password) {
        updateErrors("password", response.data.password);
      }
    } else {
      alert("Signup successful");
      router.replace("/");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackgroundBlur />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 80 }}
      >
        <AuthSegmentedControl
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <LanguageSwitcher />

        {activeTab === "signin" ? (
          <SignInForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        ) : (
          <SignUpForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        )}

        <View style={{ marginTop: "auto" }}>
          <AuthButton
            activeTab={activeTab}
            onClick={activeTab == "signin" ? handleLogin : handleSignUp}
          />
          <AuthSwitchText activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
