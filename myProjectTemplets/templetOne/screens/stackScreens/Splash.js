import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageView from "../../allProjectComponents/imageView";
import { LinearGradient } from "expo-linear-gradient";
import { TextAnimation } from "../../allProjectComponents/AnimatedLogoImage";

const Splash = ({ navigation }) => {
  setTimeout(() => {
    existingUserCheck();
  }, 2000);

  const existingUserCheck = async () => {
    // Corrected function name
    const pin = await AsyncStorage.getItem("PIN");
    if (pin !== null) {
      return navigation.navigate("PinAccess");
    }
    return navigation.navigate("LogIn");
  };

  return (
    <ImageView imageSource={require("../../assets/waterBackground.jpg")}>
      <LinearGradient
        colors={[
          "rgba(32, 24, 127, 1)",
          "rgba(32, 24, 127, 0.5)",
          "rgba(32, 24, 127, 0.3)",
          "rgba(32, 24, 127, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
        }}
      ></LinearGradient>
    </ImageView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
