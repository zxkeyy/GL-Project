import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDeliveries, { Delivery } from "@/hooks/useDeliveries";
import Status from "./Status";

interface Props {
  offer: Delivery;
}

const ActiveDeliveryCard = ({ offer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateStatus, verifyDelivery } = useDeliveries();
  const [code, setCode] = useState("");

  const handleCancelOffer = () => {
    updateStatus(offer.id, "CANCELED", null);
  };

  const handleStatusUpdate = () => {
    if (offer.status === "ASSIGNED") {
      updateStatus(offer.id, "PICKED_UP", null);
    } else if (offer.status === "PICKED_UP") {
      updateStatus(offer.id, "ARRIVED", null);
    } else if (offer.status === "IN_TRANSIT") {
      updateStatus(offer.id, "ARRIVED", null);
    }
  };

  const completeDelivery = () => {
    verifyDelivery(offer.id, code);
  };

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
            {offer.dropoff_address.street}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#72BF78",
              marginRight: 4,
            }}
          >
            {offer.total_amount}DA
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
            {offer.dropoff_address.street +
              ", " +
              offer.dropoff_address.city +
              ", " +
              offer.dropoff_address.state}
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
            onPress={() => setIsOpen(true)}
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
              backgroundColor: "#FC41255E",
              paddingHorizontal: 0,
              paddingVertical: 2,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#FF3B30",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={handleCancelOffer}
          >
            <ThemedText
              style={{ color: "#FF3B30", fontWeight: "600", fontSize: 12 }}
            >
              Cancel offer
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 0,
              minWidth: 200,
              width: "95%",
              maxHeight: "90%",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 10,
                marginBottom: 0,
              }}
            >
              <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
                Offer details
              </ThemedText>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={{
                  alignSelf: "flex-end",
                  marginRight: 0,
                }}
              >
                <Icon name="close" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View
                style={{
                  width: "100%",
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#72BF78",
                }}
              >
                <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
                  Map Placeholder
                </ThemedText>
              </View>
              <View
                style={{
                  borderRadius: 7,
                  boxShadow: "0px 4px 29px 0px rgba(0, 0, 0, 0.12)",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  flexDirection: "row",
                  padding: 6,
                  margin: 10,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    backgroundColor: "#72BF78",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="package-variant-closed"
                    size={22}
                    color="#FEFF9F"
                  />
                </View>
                <View style={{ marginLeft: 13 }}>
                  <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
                    {offer.package.recipient_name}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 11, color: "#00000073" }}>
                    {offer.package.recipient_phone}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  style={{
                    width: 42,
                    height: 42,
                    backgroundColor: "#A0D68399",
                    borderWidth: 2,
                    borderColor: "#72BF78",
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <Icon name="phone" size={24} color="#396A3D" />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 10, gap: 10 }}>
                <ThemedText
                  style={{ fontSize: 16, fontWeight: "600", color: "#72BF78" }}
                >
                  Offer Status {offer.status}
                </ThemedText>
                <Status
                  name="Picked up package"
                  description="Lorem ipsum dolor sit amet"
                  completed={[
                    "PICKED_UP",
                    "IN_TRANSIT",
                    "ARRIVED",
                    "DELIVERED",
                  ].includes(offer.status)}
                />
                <Status
                  name="Arrived at destination"
                  description="Lorem ipsum dolor sit amet"
                  completed={["ARRIVED", "DELIVERED"].includes(offer.status)}
                />
                <Status
                  name="Delivered"
                  description="Lorem ipsum dolor sit amet"
                  completed={["DELIVERED"].includes(offer.status)}
                />
              </View>
              {offer.status === "ARRIVED" && (
                <View style={{ paddingHorizontal: 10 }}>
                  <ThemedText
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      marginBottom: -8,
                    }}
                  >
                    Delivery code
                  </ThemedText>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 8,
                      marginVertical: 8,
                    }}
                    onChangeText={setCode}
                    value={code}
                  />
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={
                    offer.status === "ARRIVED"
                      ? completeDelivery
                      : handleStatusUpdate
                  }
                  style={{
                    width: "60%",
                    backgroundColor: "#191A10",
                    paddingHorizontal: 0,
                    paddingVertical: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#FFFFFF",
                    }}
                  >
                    {offer.status === "ASSIGNED"
                      ? "Confirm pickup"
                      : offer.status === "PICKED_UP"
                      ? "Confirm arrival"
                      : offer.status === "IN_TRANSIT"
                      ? "Confirm arrival"
                      : "Complete delivery"}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "35%",
                    backgroundColor: "#FC41255E",
                    paddingHorizontal: 0,
                    paddingVertical: 5,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#FF3B30",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  onPress={handleCancelOffer}
                >
                  <ThemedText
                    style={{
                      color: "#FF3B30",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    Cancel offer
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActiveDeliveryCard;
