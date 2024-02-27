import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import VectorIcon from "../components/VectorIcon";
import { height, width } from "./AllPackages";
import { GpsSet } from "../CustomComponents/GpsCordinates";
import { convertLatLonToEastingNorthing } from "./GeoUtils";
const ModalPopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [place, setPlace] = useState();
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
        setModalPosition({ x: pageX, y: pageY });
        setModalVisible(true);
      }
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  const fetchLocation = async () => {
    const { latitude, longitude } = await GpsSet();
    const excatPlace = convertLatLonToEastingNorthing(latitude, longitude);
    setPlace(excatPlace);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          minHeight: 45,
          backgroundColor: "#4d4791",
          width: "100%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
        }}
        onPress={handlePress}
      >
        <VectorIcon type="Entypo" name="location" size={24} color="#fff" />
      </TouchableOpacity>
      {/* {"easting": -282085.81124773814, "northing": 968652.7281403859, "zoneLetter": "Q", "zoneNum": 44} */}
      {modalVisible && (
        <Animatable.View
          animation="bounceIn"
          style={[styles.modalContainer, { top: -130, left: 5 }]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#fff", fontWeight: "500" }}>
              Easting
            </Text>
            <Text style={{ width: "60%", color: "#f1f1f1" }}>
              : {place.easting}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#fff", fontWeight: "500" }}>
              Northing
            </Text>
            <Text style={{ width: "60%", color: "#f1f1f1" }}>
              : {place.northing}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#fff", fontWeight: "500" }}>
              Zone Letter
            </Text>
            <Text style={{ width: "60%", color: "#f1f1f1" }}>
              : {place.zoneLetter}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "40%", color: "#fff", fontWeight: "500" }}>
              Zone Number
            </Text>
            <Text style={{ width: "60%", color: "#f1f1f1" }}>
              : {place.zoneNum}
            </Text>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#4d4791",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    elevation: 10,
    width: width * 0.8,
  },
});

export default ModalPopup;
