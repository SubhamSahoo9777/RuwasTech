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
  updateRecord,
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
  const [selectedItem, setSelectedItem] = useState([]);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [sync, setSync] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [databaseId, setDatabaseId] = useState("");

  const [switches, setSwitches] = useState({});

  // const toggleSwitch = (index, id) => {
  //   const newSwitches = { ...switches };
  //   if (!newSwitches[id]) {
  //     newSwitches[id] = new Array(userData.length).fill(false);
  //   }
  //   newSwitches[id][index] = !newSwitches[id][index];
  //   setSwitches(newSwitches);
  // };

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
  // -------------------------------------------------------------------------------------------------------------------------handle sync
  const handleItemSubmit = async (item, selectedData) => {
    const userData = JSON.parse(item.USERSAVEDATA);
    const basicDetails = userData.BasicDetails;
    console.log(new Array({ ...selectedData, update: true }));
    const requestBody = {
      BasicDetails: {
        districtid: basicDetails.districtid,
        latitude: basicDetails.latitude,
        longitude: basicDetails.longitude,
        type: basicDetails.type,
        userId: basicDetails.userId,
        workplanid: basicDetails.workplanid,
      },
      modalActivityData:
        (selectedData && new Array(selectedData)) || userData.modalActivityData, // Accessing modalActivityData from userData
      filesAttached: userData.filesAttached, // Accessing filesAttached from userData
    };

    const formData = new FormData();
    formData.append("BasicDetails", JSON.stringify(requestBody.BasicDetails));
    formData.append(
      "modalActivityData",
      JSON.stringify(requestBody.modalActivityData)
    );
    formData.append("filesAttached", JSON.stringify(requestBody.filesAttached));

    handlesubmit(formData, item, selectedData);
  };
  const handlesubmit = async (formData, item, selectedData) => {
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;
    if (isConnected == false) {
      Alert.alert(
        "No Network Connection",
        "Please connect to a network and try again.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      const apiUrl =
        "http://182.18.181.115:8084/api/complaince/synchworkplanprogressdtls";
      try {
        setLoading(true);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        if (!response.ok) {
          setLoading(false);
          throw new Error("Sorry, something went wrong");
        }

        const data = await response.json();
        Alert.alert("Data", data);
        updateSyncStatus(item.USERID, "true", item.id);
        updateFunc(item.id, selectedData);
        setSync(true);
        fetchDataFromUserSavedData();
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log("Error in handle submit:", error);
      }
    }
  };
  const updateFunc = async (databaseId, selectedData) => {
    setLoading(true);
    let allUserDataFromDB = await retrieveData("UserSavedData");
    allUserDataFromDB = allUserDataFromDB.filter(
      (item) => item.id == databaseId
    );
    let modalDates = JSON.parse(
      allUserDataFromDB[0].USERSAVEDATA
    ).modalActivityData;
    let restData = allUserDataFromDB.find(
      (item) => item.id === databaseId
    )?.USERSAVEDATA;
    restData = JSON.parse(restData);

    modalDates = modalDates.map((item) => {
      if (item.id === selectedData.id) {
        return {
          ...selectedData,
          update: true,
        };
      }
      return item;
    });
    console.log(modalDates, "subham");
    const requestBody = {
      ...restData,
      modalActivityData: modalDates,
    };
    updateRecord(databaseId, JSON.stringify(requestBody));
    fetchDataFromUserSavedData();
  };
  // ------------------------------------------------------------------------------Delete functionality
  const deleteItem = async (id) => {
    console.log(id, "hi");
    // let allIds = JSON.parse(item.USERSAVEDATA).modalActivityData.map(
    //   (item) => item.id
    // );
    // allIds.forEach((ides) => {
    //   deleteRowOfRecordReminder("mid", ides);
    // });
    // try {
    //   await deleteRowById("UserSavedData", item?.id);
    //   fetchDataFromUserSavedData();
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    // }
  };
  // ......................................................................................................................
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
          {/* <Text
            style={{
              width: "15%",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "500",
              color: "#4d4791",
            }}
          >
            Select
          </Text> */}
          <Text
            style={{
              width: "14%",
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
              width: "50%",
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
              width: "36%",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "500",
              color: "#4d4791",
            }}
          >
            Status
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
                  <Text style={{ width: "14%", textAlign: "center" }}>
                    {items.Sno}
                  </Text>
                  <Text
                    style={{
                      width: "50%",
                      marginLeft: 10,
                      textAlign: "center",
                    }}
                  >
                    {items.modelActivity}
                  </Text>
                  <View
                    style={{
                      width: "36%",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    {
                      items.update?
                      <VectorIcon
                      type="Ionicons" name="eye-sharp" size={24} color="#8c8c8c" />:
                      <VectorIcon
                        type="FontAwesome5"
                        name="edit"
                        size={18}
                        color="#0080ff"
                        onPress={() => {
                          setDatabaseId(item?.id);
                          setItem(items);
                          setModalVisible(true);
                        }}
                      />


                    }
                    {items.update ? (
                      //<MaterialCommunityIcons name="database-check-outline" size={24} color="black" />
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="database-check-outline"
                        size={22}
                        color="#009900"
                      />
                    ) : (
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name={"database-sync"}
                        // name={JSON.parse(item.SYNC)?"check-decagram":"database-sync"}
                        size={22}
                        color="#006aff"
                        onPress={() => handleItemSubmit(item, items)}
                      />
                    )}
                    {
                      items.update ?
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="delete-forever"
                        size={22}
                        color="#8c8c8c"
                        onPress={() => deleteItem(items)}
                      />:
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name="delete-sweep"
                        size={22}
                        color="red"
                        onPress={() => deleteItem(items)}
                      />

                    }
                  </View>
                </View>
              );
            }
          )}
        </View>
        {/* ----------------------------------------------footer */}
        <View>
          <Text
            style={{
              fontWeight: "500",
              marginTop: 10,
              marginBottom: 5,
              color: "#4d4791",
            }}
          >
            Attached Files
          </Text>
          {JSON.parse(item.USERSAVEDATA).filesAttached.map(
            (file, fileIndex) => {
              return (
                <Text key={fileIndex}>
                  {`File ${fileIndex + 1}: `}
                  {file.file}
                </Text>
              );
            }
          )}
        </View>
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
        func={fetchDataFromUserSavedData}
      />
    </ImageBackground>
  );
};

export default SyncData;
