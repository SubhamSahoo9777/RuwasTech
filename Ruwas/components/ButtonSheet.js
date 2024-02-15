import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import colors from "./colors";
import VectorIcon from "./VectorIcon";
import { useSelector } from "react-redux";

const ButtonSheet = ({ isVisible, onClose }) => {
  const totalinfo=useSelector(state=>state.TotalCalculationreducer)
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.sheetContainer}>
          <TouchableOpacity
            onPress={() => onClose(false)}
            style={styles.closeButton}
          >
            <VectorIcon type="AntDesign" name="downcircle" size={24} color="#7c76bc" />
          </TouchableOpacity>
          <View>
            <Text style={{color:"#4d4791",fontWeight:"600" }}>
              Total of Expenditure (Quarter)(Ugx)
            </Text>
            <View
              style={{
                minHeight: 45,
                borderWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 3,
                borderColor:"#9d98cd",
              }}
            >
              <Text style={{color:"#6c65b3"}}>{totalinfo.totalExpenditure}</Text>
            </View>
            <Text style={{ marginTop: 10,color:"#4d4791",fontWeight:"600" }}>Cumulative Expenditure(Ugx)</Text>
            <View
              style={{
                minHeight: 45,
                borderWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 3,
                borderColor:"#9d98cd",
              }}
            >
              <Text style={{color:"#6c65b3",}}>{totalinfo.totalCumulativeExpenditure}</Text>
            </View>
            <Text style={{ marginTop: 10,color:"#4d4791",fontWeight:"600" }}>Annual Budget(Ugx)</Text>
            <View
              style={{
                minHeight: 45,
                borderWidth: 0.5,
                justifyContent: "center",
                paddingLeft: 10,
                borderRadius: 10,
                marginTop: 3,
                borderColor:"#9d98cd",
              }}
            >
              <Text style={{color:"#6c65b3"}}>{totalinfo.totalAnuallBudget}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheetContainer: {
    backgroundColor: "#efeef7",
    width: "100%",
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "red",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ButtonSheet;
