// import { StyleSheet, View } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// // Import the dummy data
// import routeData from "../../data/routeData.json";

// const RouteMap = () => {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={StyleSheet.absoluteFillObject}
//         initialRegion={{
//           latitude: routeData[0].latitude,
//           longitude: routeData[0].longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}>
//         {/* Markers at each route point */}
//         {routeData.map((point, index) => (
//           <Marker
//             key={index}
//             coordinate={point}
//             title={`Point ${index + 1}`}
//             description={`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}
//           />
//         ))}

//         {/* Polyline connecting the route points */}
//         <Polyline
//           coordinates={routeData}
//           strokeColor="blue" // Polyline color
//           strokeWidth={4} // Polyline thickness
//         />
//       </MapView>
//     </View>
//   );
// };

// export default RouteMap;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
