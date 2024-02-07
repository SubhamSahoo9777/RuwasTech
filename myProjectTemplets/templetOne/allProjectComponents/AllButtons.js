import React from "react";
import { Pressable, Text } from "react-native";

export const CustomButton = ({
  title = "Title",
  onPress,
  textStyle = {},
  buttonStyle = {},
}) => {
  return (
    <Pressable
      style={[
        {
          backgroundColor: "#3498db",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 7,
          borderRadius: 10,
        },
        buttonStyle,
      ]}
      onPress={onPress}
    >
      <Text style={[{ color: "#fff" }, textStyle]}>{title}</Text>
    </Pressable>
  );
};
