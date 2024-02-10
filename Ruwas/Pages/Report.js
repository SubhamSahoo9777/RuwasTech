import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { height } from "../components/AllPackages";

const Report = ({ navigation, route }) => {
  let allDetails = route.params.data.item;
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 16 }}>
      <View style={{ flex: 1 }}>
        <Pressable
        onPress={()=>{navigation.navigate("Progress Report",{data:allDetails})}}
          style={{
            backgroundColor: "#99c2ff",
            minHeight: height * 0.2,
            marginTop: 10,
            borderRadius: 10,
            padding:16
          }}
        >
          {Object.keys(allDetails).map((item, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text style={{width:"55%"}}>{item}</Text>
              <Text style={{width:"45%"}}>: {allDetails[item]}</Text>
            </View>
          ))}
        </Pressable>
      </View>
      <View>
      
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});
