import React from "react";
import MapView, { MapViewProps } from "react-native-maps";

const Map = (props: MapViewProps) => {
  return <MapView {...props}>{props.children}</MapView>;
};

export default Map;
