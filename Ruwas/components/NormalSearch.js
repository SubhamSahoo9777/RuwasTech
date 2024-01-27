import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "./colors";
import VectorIcon from "./VectorIcon";

const NormalSearch = ({ onPress,scrollToIndex,setScrollToIndex,dataList }) => {

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: colors.tableHeaderColor,
        borderWidth: 0.5,
      }}
    >
      <TextInput
        placeholder="Search by No."
        value={scrollToIndex}
        onChangeText={(text)=>setScrollToIndex(text)}
        placeholderTextColor={"#fff"}
        style={{
          minHeight: 40,
          fontSize: 13,
          paddingLeft: 10,
          color: "#fff",
          width: "90%",
          paddingVertical: 5,
        }}
      />
      <VectorIcon
        type="AntDesign"
        name="search1"
        size={24}
        color="#fff"
        onPress={() => {
          if (dataList.includes(scrollToIndex)) {
            onPress(scrollToIndex)
          } else {
            onPress(dataList[dataList.length-1])
          }
        }}
      />
    </View>
  );
};

export default NormalSearch;

const styles = StyleSheet.create({});
