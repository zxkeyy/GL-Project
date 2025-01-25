import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useTranslation } from "react-i18next";
import useLanguageStore from "@/store/languageStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const changeLanguage = (languageCode: string) => {
    setLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  return (
    <View
      style={{
        position: "absolute",
        top: 30,
        right: 10,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(0, 0, 0, 1)",
          height: 30,
          width: 30,
          borderRadius: "100%",
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setIsOpen(true)}
        accessibilityLabel="Change language"
        accessibilityHint="Opens language selection menu"
      >
        <ThemedText
          style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}
        >
          {i18n.language.toUpperCase()}
        </ThemedText>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              minWidth: 200,
            }}
          >
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor:
                    language.code === i18n.language ? "#f0f0f0" : "transparent",
                }}
                onPress={() => changeLanguage(language.code)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: language.code === i18n.language ? "#4CAF50" : "#333",
                    fontWeight:
                      language.code === i18n.language ? "bold" : "normal",
                  }}
                >
                  {language.label}
                </Text>
                {language.code === i18n.language && (
                  <Icon name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
