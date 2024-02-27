import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { width } from "../../allProjectComponents/allPackages";

export default function PinGeneration({ navigation }) {
  const [pin, setPin] = useState("");
  const [pinVisible, setPinVisible] = useState(false);

  const handlePinPress = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleDeletePress = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleOkPress = () => {
    pin.length == 4 ? navigation.navigate("ConformPin", { data: pin }) : null;
  };

  const togglePinVisibility = () => {
    setPinVisible(!pinVisible);
  };

  // Render PIN boxes dynamically based on the entered PIN digits
  const renderPinBoxes = () => {
    let boxes = [];
    for (let i = 0; i < 4; i++) {
      boxes.push(
        <View
          key={i}
          style={[
            styles.pinBox,
            { backgroundColor: pin.length > i ? "#fff" : "transparent" },
          ]}
        >
          <Text style={{ color: pinVisible ? "#000" : "transparent" }}>
            {pin.charAt(i)}
          </Text>
        </View>
      );
    }
    return boxes;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "#fff" }}>Create Your 4 Digit Pin</Text>
      <View style={styles.pinDisplay}>{renderPinBoxes()}</View>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={togglePinVisibility}>
        <Text style={{ color: "#fff" }}>See</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePinPress(item)}>
              <BlurView intensity={30} style={styles.blurContainer}>
                <Text style={styles.text}>{item}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          {[4, 5, 6].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePinPress(item)}>
              <BlurView intensity={30} style={styles.blurContainer}>
                <Text style={styles.text}>{item}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          {[7, 8, 9].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePinPress(item)}>
              <BlurView intensity={30} style={styles.blurContainer}>
                <Text style={styles.text}>{item}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleDeletePress}>
            <BlurView intensity={30} style={styles.blurContainer}>
              <Text style={styles.text}>DE</Text>
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePinPress(0)}>
            <BlurView intensity={30} style={styles.blurContainer}>
              <Text style={styles.text}>0</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOkPress}>
            <BlurView intensity={30} style={styles.blurContainer}>
              <Text style={styles.text}>OK</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b146e",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    padding: 5,
    overflow: "hidden",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  pinDisplay: {
    marginTop: 20,
    flexDirection: "row",
  },
  pinBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
