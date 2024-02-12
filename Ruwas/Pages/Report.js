import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { VectorIcon, colors, height } from "../components/AllPackages";

const Report = ({ navigation, route }) => {
  let allDetails = route.params.data.item;
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 16 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <VectorIcon
            type="FontAwesome5"
            name="hand-point-right"
            size={20}
            color="#000"
          />
          <Text style={{ marginLeft: 10 }}>See All Details</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.tableHeaderColor,
            minHeight: height * 0.2,
            marginTop: 10,
            borderRadius: 10,
            padding: 16,
          }}
        >
          {Object.keys(allDetails).map((item, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>{item}</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails[item] || "0"}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate("Progress Report", { data: allDetails });
          }}
          style={{
            height: "auto",
            width: 200,
            borderRadius: 200,
            backgroundColor: colors.tableHeaderColor,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
            alignSelf: "center",
            padding: 10,
            elevation: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>
            Go Progress Report
          </Text>
        </Pressable>
      </View>
      <View></View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});
