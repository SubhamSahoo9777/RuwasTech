import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const SignUp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={() => navigation.navigate("LogIn")}>
        <Text>login</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
