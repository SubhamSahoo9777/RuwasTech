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
  Text,
} from "../../allProjectComponents/allPackages";
import { useFocusEffect } from "@react-navigation/native";
import CustomFooterButtomTab from "../stackScreens/CustomFooterButtomTab";
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
      style={{ flex: 1, backgroundColor: colors.screen.global }}
    >
      <StatusBar
        backgroundColor={colors.statusbar.dashBoardColor}
        barStyle="dark-content"
      />
      <View style={{flex:1,justifyContent:"space-between"}}>
        {/* ---------------------------------------------------------------------------------------------body  */}
<View>

</View>
{/* ----------------------------------------------------------------------------------------------footer  */}
<View>
<CustomFooterButtomTab screenName="Home" />
</View>
      </View>
    </View>
  );
};

export default DrawerDashBoard1;
