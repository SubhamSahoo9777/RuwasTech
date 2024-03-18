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

  const [isModalVisible, setModalVisible] = useState(false);
  const [preView, setPreView] = useState(false);
  const [item, setItem] = useState({});
  const [databaseId, setDatabaseId] = useState("");

  const toggleSwitch = (index, ids) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
  };

  // -----------------------------------------------------------------------fetch data from database
  const fetchDataFromUserSavedData = async () => {
    try {
      setLoading(true);
      const userdetails = await AsyncStorage.getItem("userdata");
      const userid = await JSON.parse(userdetails);
      const userId = userid.userid;
      if (!userId) {
        return;
      }
      const allUserDataFromDB = await retrieveData("UserSavedData");

      const filteredUserData = allUserDataFromDB.filter(
        (user) => user.USERID === userId
      );
      setUserData(filteredUserData);
    } catch (error) {
      setLoading(false);
      alert("Error", "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchDataFromUserSavedData();
    }, [])
  );
  // -----------------------------------------------------------------------------------------render Item
  const renderItem = React.useCallback(({ item, ind }) => {
    return (
      <View
        style={{
          backgroundColor: "#e1f9fa",
          padding: 10,
          elevation: 5,
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        {/* ------------------------------------header */}
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#4d4791", fontWeight: "700" }}>
            Workplan Id :{" "}
            {JSON.parse(item.USERSAVEDATA).modalActivityData[0].workplanid}
          </Text>
          <Text style={{ color: "#4d4791", fontWeight: "700" }}>
            Type : {JSON.parse(item.USERSAVEDATA).BasicDetails.type}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            borderBottomWidth: 0.9,
            paddingBottom: 5,
            borderColor: "#4d4791",
            backgroundColor: "#cce6ff",
          }}
        >
          <Text
            style={{
              width: "15%",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "500",
              color: "#4d4791",
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
              color: "#4d4791",
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
              color: "#4d4791",
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
              color: "#4d4791",
            }}
          >
            Edit
          </Text>
        </View>
        {/* ----------------------------------------------body */}
        <View style={{}}>
          {JSON.parse(item.USERSAVEDATA).modalActivityData.map(
            (items, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                    width: "100%",
                    borderBottomWidth: 0.3,
                    paddingBottom: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "15%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      toggleSwitch(index, item.id);
                    }}
                  >
                    {switches[index] ? (
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="checkbox-marked-circle"
                        size={24}
                        color="green"
                      />
                    ) : (
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="checkbox-blank-circle-outline"
                        size={24}
                        color="#4d4791"
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={{ width: "15%", textAlign: "center" }}>
                    {items.Sno}
                  </Text>
                  <Text
                    style={{
                      width: "55%",
                      marginLeft: 10,
                      textAlign: "center",
                    }}
                  >
                    {items.modelActivity}
                  </Text>
                  <VectorIcon
                    type="FontAwesome5"
                    name="edit"
                    size={18}
                    color="#0080ff"
                    onPress={() => {
                      setDatabaseId(items.id);
                      setItem(items);
                      setModalVisible(true);
                    }}
                    style={{
                      width: "15%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </View>
              );
            }
          )}
        </View>
        {/* ----------------------------------------------footer */}
        <View
          style={{
            padding: 20,
            borderRadius: 5,
            flexDirection: "row-reverse",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#ffe6e6",
              borderRadius: 100,
              marginLeft: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "red", marginRight: 5, fontWeight: "500" }}>
              Delete
            </Text>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="delete-sweep"
              size={18}
              color="red"
            />
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#cce1ff",
              borderRadius: 100,
              elevation: 5,
            }}
          >
            <Text
              style={{ color: "#006aff", marginRight: 5, fontWeight: "500" }}
            >
              Sync
            </Text>
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
    );
  });
  return (
    <ImageBackground
      source={require("../assets/blurUganda.jpeg")}
      style={{ flex: 1, padding: 16 }}
      resizeMode="cover"
    >
      <FlatList
        data={userData && userData}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <EditModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        item={item}
        databaseId={databaseId}
      />
    </ImageBackground>
  );
};

export default SyncData;
