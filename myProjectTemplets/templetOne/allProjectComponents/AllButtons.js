import React from "react";
import { Pressable, Text } from "react-native";

export const CustomButton = ({
  title = "Title",
  onPress,
  textStyle = {},
  buttonStyle = {},
  icon,
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
          flexDirection: "row",
          paddingHorizontal: 20,
        },
        buttonStyle,
      ]}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={[{ color: "#fff" }, textStyle]}>{title}</Text>
    </Pressable>
  );
};
