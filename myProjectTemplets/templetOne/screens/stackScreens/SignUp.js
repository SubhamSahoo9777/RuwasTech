// SignUp.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyle } from "../../components/allStyles";
const signupStyle = customStyle.login;
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
    <View style={{ backgroundColor: "#4a5ac7", flex: 1 }}>
      <View style={signupStyle.container}>
        <Text style={signupStyle.title}>Register !</Text>
        <CustomTextInput
          style={signupStyle.input}
          placeholder="Username"
          placeholderTextColor="#ebe1c5"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <CustomTextInput
          style={signupStyle.input}
          placeholder="Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <CustomTextInput
          style={signupStyle.input}
          placeholder="Re-Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setRePassword(text)}
          value={repassword}
        />
        <CustomButton title="Sign Up" onPress={handleSignUp} />
        <Text style={{ color: "#fff", marginTop: 15 }}>
          Already have an account?{"   "}
          <Text
            style={{ color: "yellow" }}
            onPress={() => navigation.navigate("LogIn")}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
