import { useTheme } from "react-native-paper";
import {
  React,
  useState,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "../../allProjectComponents/allPackages";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={{backgroundColor:theme.colors.screenBackGround.logIn,flex:1}}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: "rgba(0,0,0,0.5)" }]}
      >
        <Text style={styles.title}>Login !</Text>
        <CustomTextInput
          placeholderTextColor="#ebe1c5"
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <CustomTextInput
          placeholderTextColor="#ebe1c5"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <CustomButton title="LogIn" onPress={handleLogin} />
      </SafeAreaView>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    marginBottom: 16,
    padding: 8,
    width: "100%",
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
