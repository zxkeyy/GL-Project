import ActiveDeliveryCard from "@/components/Home/ActiveDeliveryCard";
import InstantOfferCard from "@/components/Home/InstantOfferCard";
import OfferCard from "@/components/Home/OfferCard";
import { ThemedText } from "@/components/ThemedText";
import useDeliveries from "@/hooks/useDeliveries";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CurrentDeliveriesScreen() {
  const { currentDeliveries } = useDeliveries();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fdfdfd" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
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
          <TouchableOpacity style={{ marginLeft: 0 }}>
            <Icon name="home-variant-outline" size={23} color="#22C55E" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Icon name="account-outline" size={23} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Icon name="package-variant-closed" size={23} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Icon name="bell-outline" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Optimized Route */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{
            width: "70%",
            height: 50,
            backgroundColor: "#A0D68399",
            paddingHorizontal: 0,
            paddingVertical: 2,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: "#72BF78",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ color: "#396A3D", fontWeight: "600", fontSize: 17 }}
          >
            See optimized route
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: 50,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 26px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <Icon name="map-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Your current offers */}
      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            paddingHorizontal: 16,
          }}
        >
          <ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
            Your current offers
          </ThemedText>
        </View>
        {currentDeliveries.map((item) => (
          <ActiveDeliveryCard offer={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
}
