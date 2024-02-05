// SignUp.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import ImageView from "../../components/imageView";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  return (
    <ImageView imageSource={require("../../assets/signupimage.jpg")}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Register !</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ebe1c5"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-Password"
          placeholderTextColor="#ebe1c5"
          secureTextEntry
          onChangeText={(text) => setRePassword(text)}
          value={repassword}
        />

        <Pressable
          style={{
            backgroundColor: "#3498db",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 7,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("NavigateDecider")}
        >
          <Text>Login</Text>
        </Pressable>
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
