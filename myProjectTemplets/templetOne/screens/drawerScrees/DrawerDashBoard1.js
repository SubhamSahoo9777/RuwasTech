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
import ModalPopup from "../../components/ModalPopup";

const DrawerDashBoard1 = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancelled exit");
          },
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  };
const {colors}=useTheme()
// console.log(colors);
  return (
    <View style={{ flex: 1, padding: 16,backgroundColor:colors.screen.global }}>
      <StatusBar backgroundColor={colors.statusbar.dashBoardColor} barStyle="dark-content" />
      {/* <CustomDropDown /> */}
      <ModalPopup/>
    </View>
  );
};

export default DrawerDashBoard1;
