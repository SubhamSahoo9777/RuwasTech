import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Divider = (style1) => {
  return (
    <View style={[styles.container, style1]}>
      <LinearGradient
        colors={["rgba(0,0,0,0)", "black", "rgba(0,0,0,1)"]}
        locations={[0, 0.5, 1]}
        style={styles.gradient1}
      />
      <Text style={styles.text}>« ⋆⋆⋆ »</Text>
      <LinearGradient
        colors={["rgba(0,0,0,0)", "black", "rgba(0,0,0,1)"]}
        locations={[0, 0.5, 1]}
        style={[styles.gradient2]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  gradient2: {
    flex: 1,
    height: 1.012,
    borderLeftWidth: 100,
    width: "40%",
  },
  gradient1: {
    flex: 1,
    height: 1.015,
    borderRightWidth: 100,
  },
  text: {
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default Divider;
