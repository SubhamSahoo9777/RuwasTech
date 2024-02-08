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

  return (
    <View style={{ flex: 1, backgroundColor: "#d0e0fb" }}>
      <StatusBar backgroundColor="#0D47a4" barStyle="dark-content" />
    </View>
  );
};

export default DrawerDashBoard1;
