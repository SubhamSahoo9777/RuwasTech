import React, { useState,} from "react";
import {
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import {
  colors,
  height,
  width, scale,
} from "./AllPackages"

export const SuccessModal = ({ show, setShow }) => {
  const [delay, setDelay] = useState(false)

  return (
    <Modal
      onShow={() => setTimeout(() => {
        setDelay(true)
      }, 500)}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShow(!show)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Account Created Successfully</Text>
          <ScrollView>
            <Text style={{ fontSize: scale(11), width: "50%", textAlign: "center" }}>Please Enjoy The Applicatintion  ! Subham have a nice day ! </Text>
          </ScrollView>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => { setDelay(false), setShow(!show) }}>
            <Text style={styles.textStyle}>OK</Text>
          </Pressable>
          {delay ?
            <Image source={require("../assets/check.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25 }} />
            :
            <Image source={require("../assets/check2.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25 }} />

          }
        </View>
      </View>
    </Modal>
  )
}
export const DeleteModal = ({ show, setShow }) => {
  const [delay, setDelay] = useState(false)

  return (
    <Modal
      onShow={() => setTimeout(() => {
        setDelay(true)
      }, 500)}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShow(!show)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, { color: "#F34235" }]}>Do You Want To Delete ?</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Pressable
              style={[{ backgroundColor: "#F34235", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
              onPress={() => { setDelay(false), setShow(!show) }}>
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[{ backgroundColor: "green", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
              onPress={() => { setDelay(false), setShow(!show) }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
          {delay ?
            <Image source={require("../assets/bin.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25 }} />
            :
            <Image source={require("../assets/bin2.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25 }} />

          }
        </View>
      </View>
    </Modal>
  )
}
export const IntructModal = ({ show, setShow, info, btnTitle }) => {
  const [delay, setDelay] = useState(false)

  return (
    <Modal
      onShow={() => setTimeout(() => {
        setDelay(true)
      }, 500)}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShow(!show)
      }}>
      <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "10%",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)"
  }}>
        <View style={{
          width: width * 0.8,
          height: height * 0.18,
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',

          elevation: 5,

        }}>
          <Text style={[styles.modalText, { color: "#F34235" }]}>{info || "Do You Want To Delete ?"}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

            <Pressable
              style={[{ backgroundColor: "red", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
              onPress={() => { setDelay(false), setShow(!show) }}>
              <Text style={styles.textStyle}>{btnTitle || "Cancel"}</Text>
            </Pressable>
          </View>
          {delay ?
            <Image source={require("../assets/exclamation.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25, }} />
            :
            <Image source={require("../assets/bin2.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25 }} />

          }
        </View>
      </View>
    </Modal>
  )
}
export const DataRenderModal = ({ show, setShow }) => {
  const [delay, setDelay] = useState(false)

  return (
    <Modal
      onShow={() => setTimeout(() => {
        setDelay(true)
      }, 500)}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShow(!show)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, { color: "#F34235" }]}>Do You Want To Delete ?</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Pressable
              style={[{ backgroundColor: "#F34235", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
              onPress={() => { setDelay(false), setShow(!show) }}>
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[{ backgroundColor: "green", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
              onPress={() => { setDelay(false), setShow(!show) }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
          {delay ?
            <View style={{ height: "50%", width: '80%', position: "absolute", top: -25, backgroundColor: "#FFF", elevation: 4 }}>

            </View>
            :
            <View style={{ height: scale(45), width: scale(45), position: "absolute", top: -25, backgroundColor: "#b0bed6", elevation: 4 }}>

            </View>
          }
        </View>
      </View>
    </Modal>
  )
}
export const ModalInput = ({ show, setShow, }) => {
  const [delay, setDelay] = useState(false)

  return (
    <Modal
      onShow={() => setTimeout(() => {
        setDelay(true)
      }, 500)}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShow(!show)
      }}>
      <View style={styles.centeredView2}>
        <View style={styles.modalView2}>
          <Text style={{
            paddingLeft: 10,
            fontSize: scale(12),
            fontWeight: "500",
            backgroundColor: "#6bb9ed",
            paddingVertical: 7,
            color: "#fff"
          }}>Please Fill Some Data</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            <View>
              <TextInput
                placeholder="Performance in Quarter Achieved"
                keyboardType="numeric"
                style={{
                  borderWidth: 0.5,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  paddingVertical: 2,
                }}
              />
              <TextInput
                placeholder="Cumulative to Date Achieved"
                keyboardType="numeric"
                style={{
                  borderWidth: 0.5,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  paddingVertical: 2,
                }}
              />
              <TextInput
                placeholder="%  Workplan"
                keyboardType="numeric"
                style={{
                  borderWidth: 0.5,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  paddingVertical: 2,
                }}
              />
              <TextInput
                placeholder="Cumulative Expenditure(Ugx)"
                keyboardType="numeric"
                style={{
                  borderWidth: 0.5,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  paddingVertical: 2,
                }}
              />
              <TextInput
                placeholder="Comments..."
                keyboardType="default"
                numberOfLines={3}

                style={{
                  borderWidth: 0.5,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  paddingVertical: 2,
                  textAlignVertical: 'top'
                }}
              />
            </View>
          </ScrollView>

          <Pressable
            style={{ minHeight: 40, backgroundColor: "#6bb9ed", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: "center" }}
            onPress={() => { setDelay(false), setShow(!show) }}>
            <Text style={{ color: 'white', fontWeight: '900', textAlign: 'center', }}>Enter</Text>
          </Pressable>
          {delay ?
            <Pressable onPress={() => setShow(false)}
              style={{ position: "absolute", top: -25, right: 0 }}>
              <Image source={require("../assets/remove.png")} style={{ height: scale(45), width: scale(45) }} />
            </Pressable>
            :
            <Image source={require("../assets/bin2.png")} style={{ height: scale(45), width: scale(45), position: "absolute", top: -25, right: 0 }} />

          }
        </View>
      </View>
    </Modal>
  )
}










const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: "10%",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  centeredView1: {
    flex: 1,
    alignItems: 'center',
    paddingTop: "10%",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  modalView2: {
    width: width * 0.9,
    height: height * 0.45,
    margin: 20,
    backgroundColor: colors.blacklite2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: scale(20),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.success,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: scale(12),
    fontWeight: "500",
  },
  modalView1: {
    width: width * 0.9,
    height: height * 0.8,
    margin: 20,
    backgroundColor: '#e9f7f6',
    borderRadius: 20,
    paddingTop: 35,
    // paddingHorizontal:10,
    justifyContent: "space-between",
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  }
});
