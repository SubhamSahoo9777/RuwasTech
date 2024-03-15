import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput, {
  CustomTextInput1,
  DisableTextIput1,
  LogInTextInput1,
} from "./CustomTextInputs/CustomTextInput";
import HorizontalScrollRow from "./components/HorizontalScrollRow";

const App = () => {
  const [text, setText] = useState();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <HorizontalScrollRow />
      <Text
        onPress={() => {
          console.log(text);
        }}
        style={{
          backgroundColor: "#f1f1f1",
          padding: 10,
          width: "50%",
          alignSelf: "center",
          textAlign: "center",
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        Submit
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
