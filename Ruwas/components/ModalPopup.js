import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import VectorIcon from "../components/VectorIcon";

const ModalPopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handlePress = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.pageX &&
      event.nativeEvent.pageY
    ) {
      const { pageX, pageY } = event.nativeEvent;
      if (modalVisible) {
        setModalVisible(false);
      } else {
        setModalPosition({ x: pageX, y: pageY }); // Adjust the y value to position below the icon
        setModalVisible(true);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: "#4d4791",
          width: "20%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handlePress}
      >
        <VectorIcon type="Entypo" name="location" size={24} color="#fff" />
      </TouchableOpacity>
      {/* {"easting": -282085.81124773814, "northing": 968652.7281403859, "zoneLetter": "Q", "zoneNum": 44} */}
      {modalVisible && (
        <Animatable.View
          animation="bounceIn"
          style={[styles.modalContainer, { top: -150, left: 10 }]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#4d4791" }}>Easting</Text>
            <Text style={{ width: "60%" }}>: -282085.81124773814</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#4d4791" }}>Northing</Text>
            <Text style={{ width: "60%" }}>: -282085.81124773814</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#4d4791" }}>Zone Letter</Text>
            <Text style={{ width: "60%" }}>: Q</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#4d4791" }}>Zone Number</Text>
            <Text style={{ width: "60%" }}>: 44</Text>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    elevation: 5,
    width: "80%",
  },
});

export default ModalPopup;
