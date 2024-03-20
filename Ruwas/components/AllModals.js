import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

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
  Vibration,
} from "react-native";
import { colors, height, width, scale } from "./AllPackages";
import VectorIcon from "../components/VectorIcon";
import { SubmitButton } from "./AllButtons";
export const AlertModal = ({ content, setContent }) => {
  const { title, msg, show, ok, color, vibration } = content;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setContent({ ...content, show: false });
      }}
      onShow={() => {
        if (vibration && vibration==true) {

          Vibration.vibrate(500);
        }
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 50,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Animatable.View
          animation={{
            from: { rotateY: "0deg" },
            to: { rotateY: "360deg" },
          }}
          easing="ease-out"
          iterationCount={1}
          duration={500}
          style={{
            minHeight: height * 0.15,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>{msg}</Text>
          <SubmitButton
            title={"Ok"}
            onPress={() => {
              if (typeof ok === "function") {
                ok();
              }
              setContent({ ...content, show: false });
            }}
            textStyle={{}}
            buttonStyle={{
              minHeight: 30,
              width: "40%",
              alignSelf: "center",
              backgroundColor: color || "#cc3300",
              borderRadius: 5,
            }}
          />
        </Animatable.View>
      </View>
    </Modal>
  );
};
export const DeleteModal = ({ content, setContent }) => {
  const { title, msg, show, ok,onCancle, color1, vibration,color2 } = content;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setContent({ ...content, show: false });
      }}
      onShow={() => {
        if (vibration && vibration==true) {

          Vibration.vibrate(500);
        }
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 50,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Animatable.View
          animation={{
            from: { rotateY: "0deg" },
            to: { rotateY: "360deg" },
          }}
          easing="ease-out"
          iterationCount={1}
          duration={500}
          style={{
            minHeight: height * 0.15,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>{msg}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-around"}}>
          <SubmitButton
            title={"Cancle"}
            onPress={() => {
              if (typeof onCancle === "function") {
                onCancle();
              }
              setContent({ ...content, show: false });
            }}
            textStyle={{}}
            buttonStyle={{
              minHeight: 30,
              width: "40%",
              alignSelf: "center",
              backgroundColor: color1 || "#cc3300",
              borderRadius: 5,
            }}
          />
          <SubmitButton
            title={"Ok"}
            onPress={() => {
              if (typeof ok === "function") {
                ok();
              }
              setContent({ ...content, show: false });
            }}
            textStyle={{}}
            buttonStyle={{
              minHeight: 30,
              width: "40%",
              alignSelf: "center",
              backgroundColor: color2 || "#cc3300",
              borderRadius: 5,
            }}
          />
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export const SuccessModal = ({
  show = false,
  setShow,
  title = "Account Created Successfully",
  content = "Anything hat happening in our day to dat life is mysterious",
  type = "delete",
  onOk,
  onCancel,
  containerStyle,
  contentTextStyle,
  buttonTitle,
}) => {
  const [delay, setDelay] = useState(false);

  return (
    <Modal
      onShow={() =>
        setTimeout(() => {
          setDelay(true);
        }, 700)
      }
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShow(!show);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "60%",
          flexDirection: "column",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Animatable.View
          animation={{
            from: { rotateY: "0deg" },
            to: { rotateY: "360deg" },
          }}
          easing="ease-out"
          iterationCount={1}
          duration={500}
          style={[
            {
              width: width * 0.8,
              maxHeight: height * 0.5,
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingTop: 35,
              paddingBottom: 15,
              alignItems: "center",
              shadowColor: "#000",
            },
            containerStyle,
          ]}
        >
          <Text
            style={{
              marginBottom: 15,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            {title}
          </Text>
          <ScrollView>
            <Text
              style={[
                { fontSize: 13.5, width: "auto", textAlign: "center" },
                contentTextStyle,
              ]}
            >
              {content}
            </Text>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                marginTop: 25,
                borderRadius: 5,
                width: "50%",
                elevation: 10,
                backgroundColor: colors.success,
                paddingVertical: 5,
              }}
              onPress={() => {
                setDelay(false), setShow(!show);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {type == "delete" ? "Cancel" : buttonTitle || "Ok"}
              </Text>
            </Pressable>
            {type == "delete" ? (
              <Pressable
                style={{
                  marginTop: 25,
                  borderRadius: 5,
                  width: "50%",
                  elevation: 10,
                  backgroundColor: "#ff471a",
                  paddingVertical: 5,
                  marginLeft: 10,
                }}
                onPress={() => {
                  setDelay(false), setShow(!show);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            ) : null}
          </View>

          {delay ? (
            <View
              style={{
                height: 46,
                width: 46,
                position: "absolute",
                top: -25,
                backgroundColor:
                  type === "delete"
                    ? "#ff1a1a"
                    : type === "success"
                    ? "#33cc33"
                    : type === "warning"
                    ? "#fff"
                    : type === "info"
                    ? "#ffff00"
                    : "#00b300",

                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {type == "delete" ? (
                <VectorIcon
                  type="AntDesign"
                  name="delete"
                  size={30}
                  color="#fff"
                />
              ) : type == "warning" ? (
                <VectorIcon
                  type="AntDesign"
                  name="warning"
                  size={30}
                  color="red"
                />
              ) : type == "info" ? (
                <VectorIcon
                  type="Ionicons"
                  name="information-circle-outline"
                  size={30}
                  color="black"
                />
              ) : type == "success" ? (
                <VectorIcon
                  type="Ionicons"
                  name="checkmark-sharp"
                  size={30}
                  color="black"
                />
              ) : null}
            </View>
          ) : (
            <View
              style={{
                height: 46,
                width: 46,
                position: "absolute",
                top: -25,
                backgroundColor:
                  type === "delete"
                    ? "#ff1a1a"
                    : type === "success"
                    ? "#33cc33"
                    : type === "warning"
                    ? "#fff"
                    : type === "info"
                    ? "#ffff00"
                    : "#00b300",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          )}
        </Animatable.View>
      </View>
    </Modal>
  );
};
export const LoaderModal = ({ show, setShow, icon, title }) => {
  return (
    <Modal
      onShow={() => {}}
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(!show);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {icon && icon}
          <Text style={{ marginTop: 20 }}>{title && title}</Text>
        </View>
      </View>
    </Modal>
  );
};
export const IntructModal = ({ show, setShow, info, btnTitle }) => {
  const [delay, setDelay] = useState(false);

  return (
    <Modal
      onShow={() =>
        setTimeout(() => {
          setDelay(true);
        }, 500)
      }
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShow(!show);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10%",
          flexDirection: "column",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: width * 0.8,
            height: height * 0.18,
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",

            elevation: 5,
          }}
        >
          <Text style={[styles.modalText, { color: "#F34235" }]}>
            {info || "Do You Want To Delete ?"}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Pressable
              style={[
                {
                  backgroundColor: "red",
                  marginRight: 10,
                  width: "45%",
                  borderRadius: scale(20),
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                },
              ]}
              onPress={() => {
                setDelay(false), setShow(!show);
              }}
            >
              <Text style={styles.textStyle}>{btnTitle || "Cancel"}</Text>
            </Pressable>
          </View>
          {delay ? (
            <Image
              source={require("../assets/exclamation.png")}
              style={{
                height: scale(45),
                width: scale(45),
                position: "absolute",
                top: -25,
              }}
            />
          ) : (
            <Image
              source={require("../assets/bin2.png")}
              style={{
                height: scale(45),
                width: scale(45),
                position: "absolute",
                top: -25,
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
export const DataRenderModal = ({ show, setShow }) => {
  const [delay, setDelay] = useState(false);

  return (
    <Modal
      onShow={() =>
        setTimeout(() => {
          setDelay(true);
        }, 500)
      }
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShow(!show);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, { color: "#F34235" }]}>
            Do You Want To Delete ?
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Pressable
              style={[
                {
                  backgroundColor: "#F34235",
                  marginRight: 10,
                  width: "45%",
                  borderRadius: scale(20),
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                },
              ]}
              onPress={() => {
                setDelay(false), setShow(!show);
              }}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor: "green",
                  marginRight: 10,
                  width: "45%",
                  borderRadius: scale(20),
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                },
              ]}
              onPress={() => {
                setDelay(false), setShow(!show);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
          {delay ? (
            <View
              style={{
                height: "50%",
                width: "80%",
                position: "absolute",
                top: -25,
                backgroundColor: "#FFF",
                elevation: 4,
              }}
            ></View>
          ) : (
            <View
              style={{
                height: scale(45),
                width: scale(45),
                position: "absolute",
                top: -25,
                backgroundColor: "#b0bed6",
                elevation: 4,
              }}
            ></View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export const ModalInput = ({ show, setShow }) => {
  const [delay, setDelay] = useState(false);

  return (
    <Modal
      onShow={() =>
        setTimeout(() => {
          setDelay(true);
        }, 500)
      }
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShow(!show);
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView2}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: scale(12),
              fontWeight: "500",
              backgroundColor: "#6bb9ed",
              paddingVertical: 7,
              color: "#fff",
            }}
          >
            Please Fill Some Data
          </Text>
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
                  textAlignVertical: "top",
                }}
              />
            </View>
          </ScrollView>

          <Pressable
            style={{
              minHeight: 40,
              backgroundColor: "#6bb9ed",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setDelay(false), setShow(!show);
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "900", textAlign: "center" }}
            >
              Enter
            </Text>
          </Pressable>
          {delay ? (
            <Pressable
              onPress={() => setShow(false)}
              style={{ position: "absolute", top: -25, right: 0 }}
            >
              <Image
                source={require("../assets/remove.png")}
                style={{ height: scale(45), width: scale(45) }}
              />
            </Pressable>
          ) : (
            <Image
              source={require("../assets/bin2.png")}
              style={{
                height: scale(45),
                width: scale(45),
                position: "absolute",
                top: -25,
                right: 0,
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "60%",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView1: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: width * 0.8,
    height: height * 0.2,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    width: "80%",
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors.success,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: scale(12),
    fontWeight: "500",
  },
  modalView1: {
    width: width * 0.9,
    height: height * 0.8,
    margin: 20,
    backgroundColor: "#e9f7f6",
    borderRadius: 20,
    paddingTop: 35,
    // paddingHorizontal:10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
