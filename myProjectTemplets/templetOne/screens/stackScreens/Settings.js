import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import CustomFooterButtomTab from "./CustomFooterButtomTab";

const Settings = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen.global }}>
      <StatusBar
        backgroundColor={colors.statusbar.dashBoardColor}
        barStyle="dark-content"
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {/* ---------------------------------------------------------------------------------------------body  */}
        <View style={{ flex: 1, padding: 16 }}>
          {/* ----------------Themes settings------------------------ */}
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: "500", fontSize: 18 }}
            >
              Themes
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  width: "30%",
                  textAlign: "center",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                Dark Mode
              </Text>
              <Text
                style={{
                  width: "30%",
                  textAlign: "center",
                  backgroundColor: "#e6fff2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                Light Mode
              </Text>
              <Text
                style={{
                  width: "30%",
                  textAlign: "center",
                  backgroundColor: "#e6fff2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                Auto
              </Text>
            </View>
          </View>
          {/* ----------------Top Tab screen settings------------------------ */}
          {/* ----------------Bottom Tab screen settings------------------------ */}
          {/* ----------------Drawer screen settings------------------------ */}
          {/* ----------------Login Screen Types------------------------ */}
          {/* ----------------SignUp Screen Types------------------------ */}
          {/* ----------------SignUp Screen Types------------------------ */}
          {/* ----------------welcome Screen Types------------------------ */}
          {/* ----------------Setting screen------------------------ */}
        </View>
        {/* ----------------------------------------------------------------------------------------------footer  */}
        <View>
          <CustomFooterButtomTab screenName="Settings" />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
