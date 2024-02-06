import {
  BackHandler,
  View,
  StyleSheet,
  Alert,
  useState,
  useEffect,
  React,
} from "../../allProjectComponents/allPackages";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";

const DrawerDashBoard1 = () => {
  const [text, setText] = useState("");

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

    // Return true to prevent the default behavior (closing the app)
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomTextInput
        placeholder="enter your name"
        onChangeText={(t) => setText(t)}
        value={text}
        style={{
          width: "90%",
          alignSelf: "center",
          fontSize: 20,
          borderColor: "green",
          marginTop: 10,
        }}
        cursorColor={"green"}
      />
      <CustomTextInput
        placeholder="enter your name"
        onChangeText={setText}
        value={text}
        style={{
          width: "90%",
          alignSelf: "center",
          fontSize: 20,
          borderColor: "green",
          marginTop: 10,
        }}
        cursorColor={"green"}
      />
    </View>
  );
};

export default DrawerDashBoard1;

const styles = StyleSheet.create({});
