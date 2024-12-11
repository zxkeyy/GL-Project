import { AuthButton } from "@/components/Signup-Login/AuthButton";
import { AuthSegmentedControl } from "@/components/Signup-Login/AuthSegmentControl";
import { AuthSwitchText } from "@/components/Signup-Login/AuthSwitchText";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { SignInForm } from "@/components/Signup-Login/SignInForm";
import { SignUpForm } from "@/components/Signup-Login/SignUpForm";
import { ValidatedInput } from "@/components/Signup-Login/ValidatedInput";
import { useAuth } from "@/hooks/useAuth";
import { validateConfirmPassword, validateInput } from "@/utils/validators";
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
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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

    // Validate the current field
    const error = validateInput(field, value);
    updateErrors(field, error);

    // Validate confirmPassword only when necessary
    if (field === "password" || field === "confirmPassword") {
      const confirmPasswordError = validateConfirmPassword(
        field === "password" ? value : formData.password,
        field === "confirmPassword" ? value : formData.confirmPassword
      );
      updateErrors("confirmPassword", confirmPasswordError);
    }
  };

  async function handleLogin() {
    setLoading(true);
    login(formData.email, formData.password);
    setLoading(false);
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
          <AuthButton activeTab={activeTab} />
          <AuthSwitchText activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
