import ActiveDeliveryCard from "@/components/Home/ActiveDeliveryCard";
import InstantOfferCard from "@/components/Home/InstantOfferCard";
import MapModal from "@/components/Home/MapModal";
import OfferCard from "@/components/Home/OfferCard";
import { ThemedText } from "@/components/ThemedText";
import useDeliveries from "@/hooks/useDeliveriesQuery";
import useLocation from "@/hooks/useLocation";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const offers = [
  {
    id: 1,
    package: {
      id: 1,
      recipient_name: "dd",
      recipient_phone: "1234567890",
      weight: 2.0,
      dimensions: {
        width: 1,
        height: 1,
        length: 1,
      },
      is_fragile: true,
      requires_signature: true,
      notes: "fast",
    },
    driver: 1,
    status: "IN_TRANSIT",
    base_fee: 1.0,
    distance_fee: 1.0,
    additional_fees: {},
    total_amount: 2.0,
    pickup_address: {
      unit: null,
      building_type: null,
      street: "estin",
      city: "amizour",
      state: "bejaia",
      postal_code: "69",
      latitude: 36.6123,
      longitude: 4.3523,
    },
    dropoff_address: {
      unit: null,
      building_type: null,
      street: "estin",
      city: "amizour",
      state: "bejaia",
      postal_code: "69",
      latitude: 36.7123,
      longitude: 4.7523,
    },
    route_info: {},
    distance: 3.0,
    service_area: 1,
  },
];

export default function CurrentDeliveriesScreen() {
  const { currentDeliveries, completedDeliveries } = useDeliveries();

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
            <Icon name="account-outline" size={23} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => router.replace("/current-deliveries")}
          >
            <Icon name="package-variant-closed" size={23} color="#22C55E" />
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
            width: "80%",
            height: 45,
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
        <MapModal />
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
        <ActiveDeliveryCard offer={offers[0]} />
      </View>
      {/* Delivery history */}
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
            Delivery history
          </ThemedText>
        </View>
        {completedDeliveries.map((item) => (
          <ActiveDeliveryCard offer={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
}
