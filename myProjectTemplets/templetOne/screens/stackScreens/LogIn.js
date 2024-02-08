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
const loginStyle = customStyle.login;
const LogIn = ({ navigation }) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      if (username == "" || password == "") {
        return alert("Need to Enter All Field");
      }
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      console.log(storedUsername, storedPassword);
      if (username !== storedUsername && password !== storedPassword) {
        return alert("Wrong User Name Or Password You Have Enterd");
      }
      navigation.navigate("NavigateDecider");
    } catch (error) {
      alert("Error In Fetching Data From Async Stroge ");
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
    </View>
  );
};

export default LogIn;
