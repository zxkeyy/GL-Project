import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../Map";
import useLocation from "@/hooks/useLocation";
import { Marker } from "react-native-maps";

const MapModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { location } = useLocation({
    timeInterval: 10000,
    distanceInterval: 20,
    startWatching: true,
  });

  return (
    <>
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
        onPress={() => setIsOpen(true)}
      >
        <Icon name="map-outline" size={30} color="#000" />
      </TouchableOpacity>
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
              padding: 10,
              minWidth: 200,
              width: "95%",
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
            <Map
              style={{ width: "100%", height: 500 }}
              showsUserLocation={true}
              initialRegion={{
                latitude: location?.coords.latitude || 0,
                longitude: location?.coords.longitude || 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            ></Map>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MapModal;
