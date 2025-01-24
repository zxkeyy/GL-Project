import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const profile = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fdfdfd" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="map-marker-outline" size={24} color="#000" />
          <ThemedText
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 4 }}
          >
            Medea, Algeria
          </ThemedText>
          <Icon name="chevron-down" size={24} color="#000" />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{ marginLeft: 0 }}
            onPress={() => router.replace("/")}
          >
            <Icon name="home-variant-outline" size={23} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => router.replace("/profile")}
          >
            <Icon name="account-outline" size={23} color="#22C55E" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => router.replace("/current-deliveries")}
          >
            <Icon name="package-variant-closed" size={23} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Icon name="bell-outline" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Profile Info */}
      {!user && (
        <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
          No user logged in
        </ThemedText>
      )}
      {user && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Icon name="account-outline" size={24} color="#000" />
            <ThemedText
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 4 }}
            >
              {user?.fullName}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Icon name="email" size={24} color="#000" />
            <ThemedText
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 4 }}
            >
              {user?.email}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Icon name="phone" size={24} color="#000" />
            <ThemedText
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 4 }}
            >
              {user?.phoneNumber
                ? user?.phoneNumber
                : "No phone number provided"}
            </ThemedText>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default profile;
