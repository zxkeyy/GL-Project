import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Delivery } from "@/hooks/useDeliveries";

interface Props {
  offer: Delivery;
}

const InstantOfferCard = ({ offer }: Props) => {
  return (
    <View
      key={offer.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 6,
        borderRadius: 7,
        marginRight: 12,
        width: 220,
        boxShadow: "0px 4px 29px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          backgroundColor: "#72BF78",
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="package-variant-closed" size={22} color="#FEFF9F" />
      </View>
      <View style={{ marginLeft: 5, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="map-marker-outline" size={12} color="#72BF78" />
            <ThemedText style={{ fontSize: 13 }}>
              {offer.dropoff_address.street}
            </ThemedText>
          </View>

          <ThemedText
            style={{
              color: "#72BF78",
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            XDA
          </ThemedText>
        </View>
        <ThemedText style={{ fontSize: 11, color: "#00000073" }}>
          Lorem ipsum dolor sit amet
        </ThemedText>
      </View>
    </View>
  );
};

export default InstantOfferCard;
