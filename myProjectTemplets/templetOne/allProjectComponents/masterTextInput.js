import React from "react";
import { TextInput, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

export const CustomTextInput = ({
  placeholder = "Enter text",
  value = "",
  onChangeText = () => {},
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoFocus = false,
  maxLength = 255,
  multiline = false,
  numberOfLines = 1,
  onBlur = () => {},
  onFocus = () => {},
  placeholderTextColor = "gray",
  cursorColor = "red",
  style,
  ...restProps
}) => {
  const theme = useTheme().colors.textInput;
  console.log(theme.titleBackgroundColor, "song");
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      maxLength={maxLength}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholderTextColor={placeholderTextColor}
      cursorColor={cursorColor}
      style={[
        {
          borderWidth: 1,
          borderColor: theme.borderColor,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          color: theme.textColor,
        },
        style,
      ]}
      {...restProps}
    />
  );
};
export const TextInputOne = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: "#fff", marginLeft: 5 }}>Title</Text>
      <CustomTextInput style={{ marginTop: 5 }} />
    </View>
  );
};
export const TextInputTwo = () => {
  const theme = useTheme().colors.textInput;
  return (
    <View
      style={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
      }}
    >
      <CustomTextInput
        style={{ borderWidth: 0, padding: 10, marginBottom: 0 }}
      />
      <Text
        style={{
          color: theme.titleColor,
          position: "absolute",
          top: -10,
          left: 5,
          backgroundColor: theme.titleBackgroundColor,
          paddingHorizontal: 5,
        }}
      >
        Title
      </Text>
    </View>
  );
};
