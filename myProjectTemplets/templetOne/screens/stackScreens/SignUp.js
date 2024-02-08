// SignUp.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyle } from "../../components/allStyles";
import { CommonModal } from "../../allProjectComponents/masterModals";
const signupStyle = customStyle.login;
const SignUp = ({ navigation }) => {
  const [showNullPasswordMoadal, setShowNullPasswordMoadal] = useState(false);
  const [showWrongPasswordMoadl, setShowWrongPasswordMoadl] = useState(false);
  const [showErrorApiModal, SetShowErrorApiModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const handleSignUp = async () => {
    try {
      if (repassword == "" || password == "" || username == "") {
        return setShowNullPasswordMoadal(true);
      }
      if (repassword !== password) {
        return setShowWrongPasswordMoadl(true);
      }
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      navigation.navigate("LogIn");
    } catch (error) {
      SetShowErrorApiModal(true);
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
        title="Password Mismatch"
        content="Conformed Password Not Match"
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

export default SignUp;
