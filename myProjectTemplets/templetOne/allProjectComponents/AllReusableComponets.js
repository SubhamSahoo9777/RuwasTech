import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from "react-native";

import VectorIcon from "./VectorIcon";
import { Dropdown } from "react-native-element-dropdown";
import colors from "./colors";
import { useTheme } from "react-native-paper";

export const CustomDropDown = ({
  dropData,
  setSelect,
  title,
  isWrong,
  icon,
  fieldName,
  valueFieldName,
}) => {
  const theme = useTheme();
  console.log(theme.colors.dropDown.focusLabelTextColor, "hi");
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const data1 = [{ label: "--No Result--", value: "1" }];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            {
              borderRadius: 10,
              position: "absolute",
              backgroundColor: theme.colors.dropDown.focusLabelLabelBackground,
              fontWeight: "700",
              color: theme.colors.dropDown.focusLabelTextColor,
              left: 22,
              top: 3,
              zIndex: 999,
              paddingHorizontal: 8,
              fontSize: 13,
            },
            isFocus && { color: theme.colors.dropDown.focusLabelTextColor },
          ]}
        >
          {title || "choose title"} <Text style={{ color: "red" }}>*</Text>
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          {
            height: 50,
            borderColor:colors.dropBorderColor,
            borderWidth: 1.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: theme.colors.dropDown.focusBodyBackgroundColor,
          },
          isFocus && { borderColor: theme.colors.dropDown.focusBorderColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor={colors.dropArrowColor}
        data={dropData ? dropData : data1}
        search
        maxHeight={300}
        labelField={fieldName || "label"}
        valueField={fieldName || "label"}
        placeholder={!isFocus ? `Select ${title}` : "..."}
        searchPlaceholder="Search..."
        value={value}
        itemContainerStyle={{ backgroundColor: colors.dropItemContainerStyle }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item[fieldName] || item.label);
          setSelect(`${item[valueFieldName]}` || item[fieldName] || item.label);
          setIsFocus(false);
        }}
        renderLeftIcon={() =>
          (icon && icon) || (
            <VectorIcon
              type="AntDesign"
              style={styles.icon}
              color={
                isFocus
                  ? colors.dropFocusedIconColor
                  : (isWrong && "red") || colors.dropIconColor
              }
              name="Safety"
              size={18}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  dropdown: {
    minHeight: 50,
    borderColor: colors.dropBorderColor,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.dropBackColor,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    borderRadius: 10,
    position: "absolute",
    backgroundColor: colors.dropLabelBackColor,
    fontWeight: "700",
    color: colors.dropLabelTextColor,
    left: 22,
    top: 3,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 12,
    color: colors.dropPlaceHolderTextColor,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: colors.dropBodySelectedTextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  attach: {
    backgroundColor: colors.documentBodyBackColor,
    height: 50,
    width: "30%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
