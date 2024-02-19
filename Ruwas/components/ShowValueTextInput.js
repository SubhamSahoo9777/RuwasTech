import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "./colors";
import VectorIcon from "./VectorIcon";

const ShowValueTextInput = ({ label = "label", title = "title" }) => {
  return (
    <View
      style={{
        height: 50,
        borderWidth: 1.2,
        borderRadius: 10,
        borderColor: colors.commonTextBorderColor,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 15,
        backgroundColor: colors.commonTextLabelBackColor,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* <VectorIcon
          type="AntDesign"
          color={colors.dropFocusedIconColor}
          name="Safety"
          size={18}
        /> */}
        <Text style={{ color: colors.tableHeaderColor, marginLeft: 10 }}>
          {label}
        </Text>
      </View>
      {/* <VectorIcon
        type="Entypo"
        color={colors.dropFocusedIconColor}
        name="chevron-down"
        size={15}
      /> */}
      <Text
        style={{
          position: "absolute",
          top: -10,
          left: 12,
          backgroundColor: colors.dropLabelBackColor,
          fontSize: 13,
          paddingHorizontal: 10,
          fontWeight: "700",
          color: colors.dropLabelTextColor,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default ShowValueTextInput;

const styles = StyleSheet.create({});
