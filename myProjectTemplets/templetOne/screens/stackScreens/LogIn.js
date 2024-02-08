import { useTheme } from "react-native-paper";
import {
  React,
  useState,
  View,
  Text,
  SafeAreaView,
} from "../../allProjectComponents/allPackages";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyle } from "../../components/allStyles";
import { CommonModal } from "../../allProjectComponents/masterModals";
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
  return (
    <View
      style={[
        customStyle.container,
        { backgroundColor: theme.colors.screen.login },
      ]}
    >
      <SafeAreaView style={[loginStyle.container]}>
        <Text style={loginStyle.title}>Login !</Text>
        <CustomTextInput
          placeholderTextColor="#ebe1c5"
          style={loginStyle.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <CustomTextInput
          placeholderTextColor="#ebe1c5"
          style={loginStyle.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <CustomButton title="LogIn" onPress={handleLogin} />
        <Text style={{ color: "#fff", marginTop: 15 }}>
          New User ?{"   "}
          <Text
            style={{ color: "yellow" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            SignUp
          </Text>
        </Text>
      </SafeAreaView>
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
