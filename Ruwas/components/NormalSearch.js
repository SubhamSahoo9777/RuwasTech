import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "./colors";
import VectorIcon from "./VectorIcon";

const NormalSearch = ({
  searchValue,
  setSearchValue
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        justifyContent:"space-between",
        // backgroundColor:colors.tableHeaderColor,
        backgroundColor:"#bebbdd",
        borderRadius:18,
        paddingVertical:5,
      }}
    >

      <TextInput
        placeholder="Search..."
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        placeholderTextColor={"#7c76bc"}
        // placeholderTextColor={"#b3b3ff"}
        style={{
          minHeight: 40,
          fontSize: 14,
          paddingLeft: 10,
          color: "#fff",
          width: "85%",
          paddingVertical: 5,
         
        }}
      />
    <View style={{minHeight:43,width:"15%",justifyContent:"center",alignItems:"center"}}>
      <VectorIcon
        type="AntDesign"
        name="search1"
        size={25}
        color="#7c76bc"
      />
      </View>
     
    </View>
  );
};

export default NormalSearch;

const styles = StyleSheet.create({});
