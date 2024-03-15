import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import VectorIcon from "../components/VectorIcon";

export const CustomTextInput = ({
  title,
  onChangeText,
  value,
  BoxStyle,
  InputStyle,
  TitleStyle,
}) => {
  return (
    <View style={BoxStyle}>
      <Animatable.Text
        animation={"flipInX"}
        duration={2000}
        style={[
          { marginBottom: 5, marginLeft: 5, color: "#000", fontSize: 16 },
          TitleStyle,
        ]}
      >
        {title || "This is the Title"}
      </Animatable.Text>
      <TextInput
      placeholder={placeholder}
        style={[
          { borderWidth: 1, padding: 8, borderRadius: 5, fontSize: 16 },
          InputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export const CustomTextInput1 = ({
  title,
  onChangeText,
  value,
  placeholder,
  BoxStyle,
  InputStyle,
  TitleStyle,
}) => {
  return (
    <View style={BoxStyle}>
      <View
        style={[{ borderWidth: 1, padding: 8, borderRadius: 5 }, InputStyle]}
      >
        <TextInput
          style={{ fontSize: 16 }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        <Animatable.Text
          // animation={"flipInX"}
          // duration={2000}
          style={[
            { marginBottom: 5, marginLeft: 5, color: "#000", fontSize: 16 ,position:"absolute",top:-14,left:10,backgroundColor:"#fff",paddingHorizontal:10},
            TitleStyle,
          ]}
        >
          {title || "This is the Title"}
        </Animatable.Text>
      </View>
    </View>
  );
};
export const LogInTextInput1 = ({
  title,
  onChangeText,
  value,
  BoxStyle,
  InputStyle,
  TitleStyle,
}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={BoxStyle}>
      <Animatable.Text
        animation={"flipInX"}
        duration={2000}
        style={[
          { marginBottom: 5, marginLeft: 5, color: "#000", fontSize: 16 },
          TitleStyle,
        ]}
      >
        {title || "This is the Title"}
      </Animatable.Text>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 5,
          padding: 8,
        }}
      >
        <TextInput
        placeholder={placeholder}
          style={[{ fontSize: 16, width: "90%" }, InputStyle]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={show ? true : false}
        />
        <VectorIcon
          onPress={() => {
            setShow(!show);
          }}
          type="Ionicons"
          name={show ? "eye" : "eye-off"}
          size={24}
          color="black"
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
};
export const DisableTextIput1 = ({ title, value, BoxStyle, TitleStyle }) => {
  return (
    <View style={BoxStyle}>
      <Animatable.Text
        animation={"flipInX"}
        duration={2000}
        style={[
          { marginBottom: 5, marginLeft: 5, color: "#000", fontSize: 16 },
          TitleStyle,
        ]}
      >
        {title || "This is the Title"}
      </Animatable.Text>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 5,
          padding: 8,
          backgroundColor: "#f1f1f1",
        }}
      >
        <Text>
          {value ||
            "any thisng that happening in our day  today life is mysterious, if you want to fly in the sky then you have to give of those thing which let you down"}
        </Text>
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
