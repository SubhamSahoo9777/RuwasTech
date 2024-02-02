import {
  Pressable,
  StyleSheet,
  Text,
  View,
  React,
} from "../../allProjectComponents/allPackages";
import ImageView from "../../components/imageView";
const SignUp = ({ navigation }) => {
  return (
    <ImageView
      backgroundImageSource={require("../../assets/signupimage.jpg")}
      contentText="Dynamic Content 1"
    ></ImageView>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Pressable onPress={() => navigation.navigate("NavigateDecider")}>
    //     <Text>login</Text>
    //   </Pressable>
    // </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
