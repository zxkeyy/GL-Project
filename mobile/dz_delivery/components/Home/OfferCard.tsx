import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface OfferTemp {
  id: number;
  offerName: string;
  offerDescription: string;
  price: number;
  pickupLocation: string;
  dropoffLocation: string;
}

interface Props {
  offer: OfferTemp;
}

const OfferCard = ({ offer }: Props) => {
  return (
    <View
      key={offer.id}
      style={{
        padding: 5,
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        boxShadow: "0px 4px 29px 0px rgba(0, 0, 0, 0.12)",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 88,
          backgroundColor: "#72BF78",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="package-variant-closed" size={47} color="#FEFF9F" />
      </View>
      <View style={{ marginLeft: 9, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={{ fontSize: 13, fontWeight: "500" }}>
            {offer.offerName}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#72BF78",
              marginRight: 4,
            }}
          >
            {offer.price}DA
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            marginTop: -5,
          }}
        >
          <Icon name="truck-outline" size={18} color="#72BF78" />
          <ThemedText
            style={{ marginLeft: 2, fontSize: 11, color: "#00000073" }}
          >
            {offer.offerDescription}
          </ThemedText>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              marginRight: "5%",
              width: "45%",
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#72BF78",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Icon name="map-outline" size={12} color="#666" />
            <ThemedText
              style={{
                color: "#616161",
                fontWeight: 400,
                marginLeft: 4,
                fontSize: 10,
              }}
            >
              View destination
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "45%",
              backgroundColor: "#A0D68399",
              paddingHorizontal: 0,
              paddingVertical: 2,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#72BF78",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ThemedText
              style={{ color: "#396A3D", fontWeight: "600", fontSize: 12 }}
            >
              Accept offer
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OfferCard;
