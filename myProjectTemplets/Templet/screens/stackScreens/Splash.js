import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageView from "../../components/imageView";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  setTimeout(() => {
    existingUserCheck();
  }, 2000);

  const existingUserCheck = async () => {
    // Corrected function name
    const storedUsername = await AsyncStorage.getItem("username");
    const storedPassword = await AsyncStorage.getItem("password");
    if (storedUsername !== null && storedPassword !== null) {
      return navigation.navigate("LogIn");
    }
    return navigation.navigate("SignUp");
  };

  return (
    <ImageView imageSource={require("../../assets/signupimage.jpg")}>
      <Text style={{ color: "#fff", fontSize: 50, alignSelf: "center" }}>
        Project Template
      </Text>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          alignSelf: "flex-end",
          marginRight: 20,
        }}
      >
        By Subham
      </Text>
    </ImageView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
