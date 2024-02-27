import { View } from "react-native";
import React from "react";
import { CustomButton } from "./AllButtons";
import VectorIcon from "./VectorIcon";
import { useTheme } from "react-native-paper";

const CustomDrawerContent = ({ navigation }) => {
  const navigateAndCloseDrawer = (screen) => {
    navigation.closeDrawer();
    navigation.navigate(screen);
  };
  const theme = useTheme().colors.drawer;
  console.log(theme.bodyColor);
  const defaultButton = {
    navigationName: "DrawerDashBoard",
    buttonTitle: "DashBoard",
    buttonStyle: { backgroundColor: "transparent" },
    textStyle: { width: "94%", paddingLeft: 10, color: "#fff" },
    icon: (
      <VectorIcon
        type="MaterialIcons"
        name="dashboard-customize"
        size={24}
        color="green"
      />
    ),
  };
  const buttonDetails = [
    {
      ...defaultButton,
      navigationName: "DrawerDashBoard",
      buttonTitle: "DashBoard",
      icon: (
        <VectorIcon
          type="MaterialIcons"
          name="dashboard-customize"
          size={24}
          color="#fff"
        />
      ),
    },
    {
      ...defaultButton,
      navigationName: "Settings",
      buttonTitle: "Settings",
      icon: (
        <VectorIcon
          type="Ionicons"
          name="settings-sharp"
          size={24}
          color="#fff"
        />
      ),
    },
  ];
  return (
    <View
      style={{
        backgroundColor: theme.bodyColor,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        {buttonDetails.map((item, index) => {
          return (
            <CustomButton
              key={index}
              onPress={() => navigateAndCloseDrawer(item.navigationName)}
              textStyle={item.textStyle}
              buttonStyle={item.buttonStyle}
              title={item.buttonTitle}
              icon={item.icon}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
        <CustomButton
          title="LogOut"
          buttonStyle={{ width: "100%", height: 50, borderRadius: 0 }}
          textStyle={{ marginLeft: 10 }}
          onPress={() => navigation.navigate("LogIn")}
          icon={
            <VectorIcon type="AntDesign" name="logout" size={24} color="#fff" />
          }
        />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
