import { useTheme } from "react-native-paper";
import { CustomDropDown } from "../../allProjectComponents/AllReusableComponets";
import {
  BackHandler,
  View,
  StyleSheet,
  Alert,
  useState,
  useEffect,
  React,
  StatusBar,
} from "../../allProjectComponents/allPackages";
import { useFocusEffect } from "@react-navigation/native";
const DrawerDashBoard1 = () => {

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  const handleBackPress = () => {
    // Custom logic for handling the back button press
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("subham");
          },
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => {
            // Perform any cleanup or additional logic here
            // (e.g., save data, clear states, etc.)
            BackHandler.exitApp(); // Exit the app
          },
        },
      ],
      { cancelable: true }
    );

    return true;
  };
  const { colors } = useTheme();
  // console.log(colors);
  return (
    <View
      style={{ flex: 1, padding: 16, backgroundColor: colors.screen.global }}
    >
      <StatusBar
        backgroundColor={colors.statusbar.dashBoardColor}
        barStyle="dark-content"
      />
    


    </View>
  );
};

export default DrawerDashBoard1;
