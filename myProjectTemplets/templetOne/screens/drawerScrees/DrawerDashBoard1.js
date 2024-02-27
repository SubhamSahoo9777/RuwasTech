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
import { CustomButton } from "../../allProjectComponents/AllButtons";
import { CommonModal } from "../../allProjectComponents/masterModals";
import {
  CustomTextInput,
  TextInputOne,
  TextInputTwo,
} from "../../allProjectComponents/masterTextInput";
import { useFocusEffect } from "@react-navigation/native";
import {
  AnimatedLogoImage,
  RotationAnimation,
} from "../../allProjectComponents/AnimatedLogoImage";
import VectorIcon from "../../allProjectComponents/VectorIcon";
const DrawerDashBoard1 = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

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
      {/* <CustomDropDown /> */}
      <CustomTextInput value={text} onChangeText={(t) => setText(t)} />
      <CustomButton onPress={() => console.log(text)} />
      <TextInputOne />
      <TextInputTwo />
      {/* <AnimatedLogoImage
        imageLogoAnimate
        source={
          <VectorIcon
            type="MaterialCommunityIcons"
            name="sync"
            size={24}
            color="#fff"
          />
        }
      /> */}
      <AnimatedLogoImage
        imageLogoAnimate
        animation="wobble"
        iterationCount={1}
        duration={500}
        source={<CustomButton onPress={() => console.log(text)} />}
        imageLogostyle={{ justifyContent: "", alignItems: "" }}
      />
    </View>
  );
};

export default DrawerDashBoard1;
