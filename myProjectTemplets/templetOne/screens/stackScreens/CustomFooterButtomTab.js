import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import VectorIcon from "../../allProjectComponents/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
const CustomFooterButtomTab = ({ screenName }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("Profile");
        }}
        style={styles.tabItem}
      >
        <Animatable.View
          animation="swing"
          iterationCount={2}
          direction="alternate"
          style={styles.icon}
        >
          <VectorIcon
            type="FontAwesome"
            name="user"
            size={38}
            color={screenName == "Profile" ? "#b32d00" : "#008000"}
          />
        </Animatable.View>
        <Text style={styles.tabText}>Profile</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Sync");
        }}
        style={styles.tabItem}
      >
        <Animatable.View
          animation="swing"
          iterationCount={2}
          direction="alternate"
          style={styles.icon}
        >
          <VectorIcon
            type="MaterialCommunityIcons"
            name="web-sync"
            size={40}
            color={screenName == "Sync" ? "#b38600" : "#008000"}
          />
        </Animatable.View>
        <Text style={styles.tabText}>Sync</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("DrawerDashBoard");
        }}
        style={styles.tabItem}
      >
        <Animatable.View
          animation="swing"
          iterationCount={2}
          direction="alternate"
          style={styles.icon}
        >
          <VectorIcon
            type="MaterialCommunityIcons"
            name="shield-home"
            size={40}
            color={screenName == "Home" ? "#b32d00" : "#008000"}
          />
        </Animatable.View>
        <Text style={styles.tabText}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Notification");
        }}
        style={styles.tabItem}
      >
        <Animatable.View
          animation="swing"
          iterationCount={2}
          direction="alternate"
          style={styles.icon}
        >
          <VectorIcon
            type="MaterialIcons"
            name="notifications-on"
            size={40}
            color={screenName == "Notification" ? "#b32d00" : "#008000"}
          />
        </Animatable.View>
        <Text style={styles.tabText}>Notification</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Settings");
        }}
        style={styles.tabItem}
      >
        <Animatable.View
          animation="swing"
          iterationCount={2}
          direction="alternate"
          style={styles.icon}
        >
          <VectorIcon
            type="Ionicons"
            name="settings-sharp"
            size={40}
            color={screenName == "Settings" ? "#ff9900" : "#008000"}
          />
        </Animatable.View>
        <Text style={styles.tabText}>Setting</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccffcc",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: -45,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 3,
  },
  tabText: {
    marginTop: 5,
  },
});

export default CustomFooterButtomTab;
