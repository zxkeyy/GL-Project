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
import MapView, { Marker } from "react-native-maps";

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
      updateStatus(offer.id, "IN_TRANSIT", null);
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
          <ScrollView
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              minWidth: 200,
              maxWidth: "95%",
              maxHeight: "90%",
            }}
          >
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={{
                alignSelf: "flex-end",
                marginBottom: 5,
                marginRight: 5,
              }}
            >
              <Icon name="close" size={20} color="#000" />
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 8 }}>
              {JSON.stringify(offer)}
            </ThemedText>
            <MapView
              style={{ height: 300 }}
              showsUserLocation={true}
              initialRegion={{
                latitude: offer.pickup_address.latitude || 0,
                longitude: offer.pickup_address.longitude || 0,
                latitudeDelta: 0.05,
                longitudeDelta: 0.0,
              }}
            >
              <Marker
                coordinate={{
                  latitude: offer.pickup_address.latitude || 0,
                  longitude: offer.pickup_address.longitude || 0,
                }}
                title="PickUp Location"
              />
              <Marker
                coordinate={{
                  latitude: offer.dropoff_address.latitude || 0,
                  longitude: offer.dropoff_address.longitude || 0,
                }}
                title="DropOff Location"
              />
            </MapView>
            <TouchableOpacity
              onPress={handleStatusUpdate}
              style={{
                backgroundColor: "#FC41255E",
                paddingHorizontal: 0,
                paddingVertical: 2,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#FF3B30",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
                Update status
              </ThemedText>
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
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
            <TouchableOpacity
              onPress={completeDelivery}
              style={{
                backgroundColor: "#72BF78",
                paddingHorizontal: 0,
                paddingVertical: 2,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#72BF78",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <ThemedText style={{ fontSize: 13, fontWeight: "600" }}>
                Complete delivery {code}
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ActiveDeliveryCard;
