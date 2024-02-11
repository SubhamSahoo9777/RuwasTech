import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = () => (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    }}
  >
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

export default Loader;
