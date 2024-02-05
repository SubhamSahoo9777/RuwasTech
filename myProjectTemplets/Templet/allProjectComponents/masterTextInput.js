import React from "react";
import { TextInput, StyleSheet } from "react-native";

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
      style={[styles.input, style]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
