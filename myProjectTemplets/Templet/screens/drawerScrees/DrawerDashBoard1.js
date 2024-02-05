import React from "react";
import { CustomTextInput } from "../../allProjectComponents/masterTextInput";
import {
  useState,
  StyleSheet,
  View,
} from "../../allProjectComponents/allPackages";

const DrawerDashBoard1 = () => {
  const [text, setText] = useState("");
  return (
    <View styles={{ flex: 1 }}>
      <CustomTextInput
        placeholder="enter your name"
        onChangeText={setText}
        value={text}
        style={{
          width: "90%",
          alignSelf: "center",
          fontSize: 20,
          borderColor: "green",
          marginTop: 10,
        }}
        cursorColor={"green"}
      />
      <CustomTextInput
        placeholder="enter your name"
        onChangeText={setText}
        value={text}
        style={{
          width: "90%",
          alignSelf: "center",
          fontSize: 20,
          borderColor: "green",
          marginTop: 10,
        }}
        cursorColor={"green"}
      />
    </View>
  );
};

export default DrawerDashBoard1;

const styles = StyleSheet.create({});
