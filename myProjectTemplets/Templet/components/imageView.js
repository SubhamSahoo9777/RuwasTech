import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";

const imageView = ({ backgroundImageSource, contentText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <ImageBackground
        source={backgroundImageSource} // Use a prop for the background image source
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome!</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"#ebe1c5"}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#ebe1c5"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Re-Password"
            placeholderTextColor={"#ebe1c5"}
            secureTextEntry
            onChangeText={(text) => setrePassword(text)}
            value={repassword}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#f5b911",
    fontSize: 16,
  },
});

export default imageView;
