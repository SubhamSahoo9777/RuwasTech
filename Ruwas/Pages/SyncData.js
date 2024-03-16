import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  deleteRowById,
  deleteRowById1,
  retrieveData,
  updateSyncStatus,
} from "../components/AllLocalDatabaseFunction";
import RotatingImage from "../components/RotatingImage";
import { LoaderModal } from "../components/AllModals";
import { GpsSet } from "../CustomComponents/GpsCordinates";
import colors from "../components/colors";
import VectorIcon from "../components/VectorIcon";
import Divider from "../components/Divider";
import { EditModal } from "../components/EditModal";

const SyncData = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [sync, setSync] = useState(false);
  const [switches, setSwitches] = useState([false, false, false]);
  // isModalVisible={isModalVisible}
  //     setModalVisible={setModalVisible}
  //     item={item}
  const [isModalVisible, setModalVisible] = useState(false);
  const [preView, setPreView] = useState(false);
  const [item, setItem] = useState(false);

  const toggleSwitch = (index) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
  };
  return (
    <ImageBackground
      source={require("../assets/blurUganda.jpeg")}
      style={{ flex: 1, padding: 16 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{paddingBottom:20}}>
        <View
          style={{ backgroundColor: "#e1f9fa", padding: 10,elevation:10 }}
        >
          {/* ------------------------------------header */}
          <View style={{}}>
            <Text>Workplan Id : 2.1</Text>
            <Text>Type : Water</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              borderBottomWidth: 0.5,
            }}
          >
            <Text
              style={{
                width: "15%",
                textAlign: "center",
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Select
            </Text>
            <Text
              style={{
                width: "15%",
                textAlign: "center",
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Modal No.
            </Text>
            <Text
              style={{
                width: "55%",
                fontSize: 13,
                fontWeight: "500",
                marginLeft: 10,
                textAlign: "center",
              }}
            >
              Modal Activity
            </Text>
            <Text
              style={{
                width: "15%",
                textAlign: "center",
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Edit
            </Text>
          </View>
          {/* ----------------------------------------------body */}
          <View style={{}}>
            {[1, 1, 1].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                    width: "100%",
                    borderBottomWidth: 0.5,
                    paddingBottom: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "15%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => toggleSwitch(index)}
                  >
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderWidth: 2,
                        backgroundColor: switches[index] ? "green" : null,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={{ width: "15%", textAlign: "center" }}>2.3</Text>
                  <Text
                    style={{
                      width: "55%",
                      marginLeft: 10,
                      textAlign: "center",
                    }}
                  >
                    subham kumars sahoo gdfgo fsfdsofsjo foisjofjsoj sjjfosj
                    fjsoj
                  </Text>
                  <VectorIcon
                    type="FontAwesome5"
                    name="edit"
                    size={18}
                    color="black"
                    style={{
                      width: "15%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </View>
              );
            })}
          </View>
          {/* ----------------------------------------------footer */}
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              flexDirection: "row-reverse",
            }}
          >
            <Pressable style={{flexDirection:"row",alignItems:"center",padding:10,backgroundColor:"#ffe6e6",borderRadius:100,marginLeft:10,elevation:10}}>
            <Text style={{color:"red"}}>Delete</Text>
            <VectorIcon type="MaterialCommunityIcons" name="delete-sweep" size={18} color="red" />
            </Pressable>
            
            <Pressable style={{flexDirection:"row",alignItems:"center",padding:10,backgroundColor:"#cce1ff",borderRadius:100,elevation:10}}>
            <Text style={{color:"#006aff"}}>Sync</Text>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="database-sync"
              size={15}
              color="#006aff"
            />
            </Pressable>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SyncData;
