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

const offers = [
  {
    id: 1,
    offerName: "Offer Name",
    offerDescription: "Lorem ipsum dolor sit amet",
    price: 100,
    pickupLocation: "Pickup Location",
    dropoffLocation: "Dropoff Location",
  },
  {
    id: 2,
    offerName: "Offer Name",
    offerDescription: "Lorem ipsum dolor sit amet",
    price: 100,
    pickupLocation: "Pickup Location",
    dropoffLocation: "Dropoff Location",
  },
];

export default function DeliveryScreen() {
  const { deliveries } = useDeliveries();

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

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            height: 45,
            paddingHorizontal: 10,
            marginRight: 17,
            boxShadow: "0px 4px 26px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 13,
              fontFamily: "Sora",
            }}
            placeholder="Search what to deliver"
            placeholderTextColor={"#00000073"}
          />
          <Icon name="magnify" size={20} color="#8C8C8C" />
        </View>
        <TouchableOpacity
          style={{
            width: 48,
            height: 45,
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

      {/* Instant Offers */}
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            paddingHorizontal: 16,
          }}
        >
          <ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
            Instant offers
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: "#666" }}>See more</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={{ overflow: "visible" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingLeft: 16,
              paddingBottom: 40,
              marginBottom: -20,
              paddingTop: 24,
              marginTop: -24,
            }}
          >
            {offers.map((item) => (
              <InstantOfferCard offer={item} key={item.id} />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Offers You May Like */}
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
            Offers you may like
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: "#666" }}>See more</ThemedText>
          </TouchableOpacity>
        </View>
        {deliveries.map((item) => (
          <OfferCard offer={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
}
