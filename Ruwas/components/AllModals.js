
import masterData from "../DataBaseHandle/masterData";
import {
  React,
  StyleSheet,
  Text,
  colors,
  View,
  Dimensions,
  LinearGradient,
  height,
  width,
  TouchableOpacity,
  FlatList,
  useState,
  Modal, Pressable, Image, Alert, scale, ScrollView, useEffect, VectorIcon, TextInput
} from "./AllPackages";
import ProgressReportCell from "./ProgressReportCell";

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
      <View style={styles.centeredView}>
        <View style={{
          width: width * 0.9,
          height: height * 0.16,
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
              style={[{ backgroundColor: "green", marginRight: 10, width: "45%", borderRadius: scale(20), justifyContent: "center", alignItems: "center", padding: 5 }]}
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
export const ProgressReportModalTable = ({ show, setShow, setDependentModal, dependentModal }) => {
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
        // flex:1,
        height: height,
        width: width,
        alignItems: 'center',
        paddingTop: "10%",
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,0.9)"
      }}>
        <View style={{
          width: width * 0.9,
          height: height * 0.8,
          margin: 20,
          // backgroundColor: '#e9f7f6',
          backgroundColor: colors.progressReportBody,
          borderRadius: 20,
          paddingTop: 20,
          // paddingHorizontal:10,
          justifyContent: "space-between",
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,

        }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={masterData.dshcg.table}
            renderItem={({ item, index }) => <ProgressReportCell item={item} id={index} />}
          />
          <View style={{ backgroundColor: colors.tableHeaderColor, elevation: 5, borderTopWidth: 0.1, minHeight: 100, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: "colomn", paddingVertical: 5, justifyContent: 'center', alignItems: "center", paddingHorizontal: 5, borderBottomLeftRadiusRadius: 20, borderBottomRightRadiusRadius: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 10, paddingLeft: 5, }}>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "73%", opacity: 0.5 }}>Total Expenditure (Quarter)(Ugx)</Text>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "27%", opacity: 0.7 }}>: <Text>12312334</Text></Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 10, paddingLeft: 5, }}>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "73%", opacity: 0.5 }}>Total Cumulative Expenditure(Ugx)</Text>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "27%", opacity: 0.7 }}>: 12312334</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 10, paddingLeft: 5, }}>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "73%", opacity: 0.5 }}>Total Annual Budget(Ugx)</Text>
              <Text style={{ color: "#fff", fontSize: scale(11), fontWeight: "500", width: "27%", opacity: 0.7 }}>: 12312334</Text>
            </View>

          </View>

          {delay ?
            <View style={{ alignSelf: "center", height: width * 0.1, width: '85%', position: "absolute", top: -25, backgroundColor: colors.blacklite2, elevation: 5, borderRadius: 10, flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignSelf: "center", height: width * 0.1, width: '100%', backgroundColor: colors.tableRowsBackColors, borderRadius: 10, flexDirection: "row", alignItems: "center", paddingLeft: 15 }}>
                <VectorIcon type="Feather" name="search" size={24} color={colors.deepBlue} />
                <TextInput
                  placeholder="Search.."
                  cursorColor={"blue"}
                  style={{ width: "80%", alignSelf: "center", paddingLeft: 20 }}
                />
              </View>
            </View>
            :
            <View style={{ alignSelf: "center", height: width * 0.1, width: "80%", position: "absolute", top: -25, backgroundColor: colors.blacklite2, elevation: 5, borderRadius: 10, flexDirection: "row" }}>

            </View>
          }
        </View>
        <Pressable
          onPress={() => setShow(!show)}
          style={{ position: 'absolute', backgroundColor: colors.tableHeaderColor, height: height * 0.05, bottom: 20, width: width * 0.9, marginBottom: 20, justifyContent: "center", alignItems: "center", borderRadius: 10, }}>
          <Text style={{ color: "#fff", fontWeight: "500" }}>Cancel</Text>
        </Pressable>
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
