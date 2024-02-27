import { useTheme } from "react-native-paper";
import {
  React,
  useState,
  View,
  LinearGradient,
  Image,
  Text,
} from "../../allProjectComponents/allPackages";
import { TextInputOne } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyle } from "../../components/allStyles";
import { CommonModal } from "../../allProjectComponents/masterModals";
import ImageView from "../../allProjectComponents/imageView";
import { TextAnimation } from "../../allProjectComponents/AnimatedLogoImage";
const loginStyle = customStyle.login;
const LogIn = ({ navigation }) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNullPasswordMoadal, setShowNullPasswordMoadal] = useState(false);
  const [showWrongPasswordMoadl, setShowWrongPasswordMoadl] = useState(false);
  const [showErrorApiModal, SetShowErrorApiModal] = useState(false);
  const handleLogin = async () => {
    try {
      if (username == "" || password == "") {
        return setShowNullPasswordMoadal(true);
      }
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      if (username !== storedUsername && password !== storedPassword) {
        return setShowWrongPasswordMoadl(true);
      }
      navigation.navigate("NavigateDecider");
    } catch (error) {
      SetShowErrorApiModal(true);
    }
  };
  const checkAuthenticateUser = async () => {};
  return (
    <View
      style={[
        customStyle.container,
        { backgroundColor: theme.colors.screen.login },
      ]}
    >
      <ImageView imageSource={require("../../assets/waterBackground.jpg")}>
        <LinearGradient
          colors={[
            "rgba(32, 24, 127, 1)",
            "rgba(32, 24, 127, 0.5)",
            "rgba(32, 24, 127, 0.3)",
            "rgba(32, 24, 127, 0.1)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ height: 100, width: 100 }}
            />
            <TextAnimation />
            <Text style={{ color: "#fff" }}>
              {" "}
              Ministry of Water & Environment
            </Text>
          </View>
          <TextInputOne
            placeholder={"Email"}
            title="Enter Email"
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          />
          <TextInputOne
            placeholder={"Password"}
            title="Enter Password"
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          />
          <CustomButton
            title="LogIn"
            onPress={handleLogin}
            buttonStyle={{
              paddingVertical: 11,
              borderRadius: 5,
              marginTop: 10,
            }}
            textStyle={{ fontSize: 16 }}
          />
        </LinearGradient>
      </ImageView>

      <CommonModal
        show={showNullPasswordMoadal}
        setShow={setShowNullPasswordMoadal}
        title="All Input Should Fill"
        content="Fill All Inputs"
        type="info"
      />
      <CommonModal
        show={showWrongPasswordMoadl}
        setShow={setShowWrongPasswordMoadl}
        title="You Have Enter Wrong Inputs"
        content="Fill The Correct One"
        type="warning"
      />
      <CommonModal
        show={showErrorApiModal}
        setShow={SetShowErrorApiModal}
        title="Error in Fetching Apis"
        content="Need To Connect To The Network"
        type="info"
      />
    </View>
  );
};

export default LogIn;
