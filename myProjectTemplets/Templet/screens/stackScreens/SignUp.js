// SignUp.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import ImageView from "../../components/imageView";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const handleSignUp = async () => {
    try {
      if (repassword == "" || password == "" || username == "") {
        return alert("All Input Should Require !");
      }
      if (repassword !== password) {
        return alert("Password Missmatch");
      }
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      navigation.navigate("LogIn");
    } catch (error) {
      alert("Error In Inserting Data To Async Stroge ");
    }
  };
  return (
    <ImageView imageSource={require("../../assets/signupimage.jpg")}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Register !</Text>
        <CustomTextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ebe1c5"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <CustomTextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <CustomTextInput
          style={styles.input}
          placeholder="Re-Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setRePassword(text)}
          value={repassword}
        />
        <CustomButton title="Sign Up" onPress={handleSignUp} />
      </View>
    </ImageView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
});

export default SignUp;
