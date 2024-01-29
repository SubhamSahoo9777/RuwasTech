import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "./colors";
import VectorIcon from "./VectorIcon";

const NormalSearch = ({
  onPress,
  scrollToIndex,
  setScrollToIndex,
  dataList,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        justifyContent:"space-between",
      }}
    >

      <TextInput
        placeholder="Search by No."
        value={scrollToIndex}
        onChangeText={(text) => setScrollToIndex(text)}
        placeholderTextColor={"#b3b3ff"}
        style={{
          minHeight: 40,
          fontSize: 13,
          paddingLeft: 10,
          color: "#fff",
          width: "84%",
          paddingVertical: 5,
          backgroundColor: colors.tableHeaderColor,
          borderBottomLeftRadius:5,
          borderTopLeftRadius:5,
          borderWidth:2,
          borderColor:colors.tableHeaderColor,
        }}
      />
    <View style={{backgroundColor:colors.tableHeaderColor,minHeight:43,width:"15%",justifyContent:"center",alignItems:"center",borderWidth:3,borderColor:colors.tableHeaderColor,borderRadius:5,}}>
      <VectorIcon
        type="AntDesign"
        name="search1"
        size={25}
        color="#fff"
        onPress={() => {
          if (dataList.includes(scrollToIndex)) {
            onPress(dataList.indexOf(scrollToIndex));
          } else {
            onPress(dataList.length - 1);
          }
        }}
      />
      </View>
     
    </View>
  );
};

export default NormalSearch;

const styles = StyleSheet.create({});
