import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import {
  ScrollView,
  Pressable,
  View,
  Text,
  Alert,
  Modal,
} from "react-native";
import { height, width } from "./allPackages";
export const SuccessModal = (
    { 
      show=false,
      setShow,
      title="Account Created Successfully",
      content="Anything hat happening in our day to dat life is mysterious",
      type="delete",
      onOk,
      onCancel,
      containerStyle,
      contentTextStyle,
      buttonTitle,
    }
    ) => {
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
            style={[{
              width: width * 0.8,
              maxHeight: height * 0.5,
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingTop:35,
              paddingBottom:15,
              alignItems: "center",
              shadowColor: "#000",
            },containerStyle]}
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
            <Text style={[{ fontSize: 13.5, width:"auto", textAlign: "center" },contentTextStyle]}>
               {content}
              </Text>
            </ScrollView>
            <View style={{
              flexDirection:"row",
              justifyContent:"center",
              alignItems:"center"
            }}>
            <Pressable
              style={{
                marginTop: 25,
                borderRadius: 5,
                width: "50%",
                elevation: 10,
                backgroundColor: "#3BB54A",
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
               {type=="delete"?"Cancel": buttonTitle || "Ok"}
              </Text>
            </Pressable>
           {type=="delete"? <Pressable
              style={{
                marginTop: 25,
                borderRadius: 5,
                width: "50%",
                elevation: 10,
                backgroundColor:"#ff471a",
                paddingVertical: 5,
                marginLeft:10
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
            </Pressable>:null}
            
            </View>
            
            {delay ? 
            (
              <View
              style={{
                    height: 46,
                    width: 46,
                    position: "absolute",
                    top: -25,
                    backgroundColor:type === "delete" ? "#ff1a1a" : 
                    type === "success" ? "#33cc33" :
                    type === "warning" ? "#ffcc00" :
                    type === "info" ? "#ffff00" :
                    "#00b300",
                    
                    borderRadius:100,
                    justifyContent:"center",
                    alignItems:"center"
                  }}>{
                      type =="delete"?<VectorIcon type="AntDesign" name="delete" size={30} color="#fff" />:
                      type =="warning"?<VectorIcon type="AntDesign" name="warning" size={30} color="#fff" />:
                      type =="info"?<VectorIcon type="Ionicons" name="information-circle-outline" size={30} color="black" />:
                      type =="success"?<VectorIcon type="Ionicons" name="checkmark-sharp" size={30} color="black" />:null
                      
                      }
              </View>
            ) 
            :
             (
              <View
              style={{
                    height: 46,
                    width: 46,
                    position: "absolute",
                    top: -25,
                    backgroundColor:type === "delete" ? "#ff1a1a" : 
                    type === "success" ? "#33cc33" :
                    type === "warning" ? "#ffcc00" :
                    type === "info" ? "#ffff00" :
                    "#00b300",
                    borderRadius:100,
                    justifyContent:"center",
                    alignItems:"center"
                  }}>
              </View>
            )
            }
          </Animatable.View>
        </View>
      </Modal>
    );
  };