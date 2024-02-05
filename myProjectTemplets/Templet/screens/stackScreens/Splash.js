import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, width } from "../../allProjectComponents/allPackages";
import ImageView from "../../components/imageView";
const Splash = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate("LogIn");
  }, 2000);
  return (
    <ImageView imageSource={require("../../assets/signupimage.jpg")}>
      <Text style={{ color: "#fff", fontSize: 50, alignSelf: "center" }}>
        Project Templet
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
