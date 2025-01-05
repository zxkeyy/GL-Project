import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BackgroundBlur } from "@/components/Signup-Login/BackgroundBlur";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import useDocuments from "@/hooks/useDocuments";
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
  TextInput,
} from "react-native";
import DocumentUpload from "./DocumentUpload";

export default function DocumentSubmissionScreen() {
  const [loaDing, setLoading] = useState(false);
  const { t } = useTranslation();
  const { documents } = useDocuments();

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

        <View style={{ gap: 10 }}>
          {documents?.map((document) => (
            <DocumentUpload
              document={document}
              key={document.document_type.id}
            />
          ))}
        </View>

        <View style={{ marginTop: "auto" }}>
          <ThemedText style={{ textAlign: "center" }}>
            Please wait until all documents are verified.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
