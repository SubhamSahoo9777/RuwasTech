import React, { useState, useEffect } from "react";
import { View, Text, Alert, FlatList, ImageBackground } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  deleteRowById1,
  retrieveData,
  updateRecord,
  updateSyncStatus,
} from "../components/AllLocalDatabaseFunction";
import RotatingImage from "../components/RotatingImage";
import { AlertModal, DeleteModal, LoaderModal } from "../components/AllModals";
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
  const [disable, setDisable] = useState(false);
  const [content, setContent] = useState({ show: false });
  const [content1, setContent1] = useState({ show: false });

  const [switches, setSwitches] = useState({});

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
  // -------------------------------------------------------------------------handle sync
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
        // Alert.alert("Data", data);
        console.log(data);
        setContent1({
          show: true,
          msg:
            data == '"Synched"'
              ? "Data successfully Synced"
              : "Sorry ! Something went wrong",
          vibration: false,
          color: "green",
        });
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
    const requestBody = {
      ...restData,
      modalActivityData: modalDates,
    };
    updateRecord(databaseId, JSON.stringify(requestBody));
    fetchDataFromUserSavedData();
  };
  // ------------------------------------------------------------------------------Delete functionality
  const deleteItem = async (item, mid) => {
    let requirdedModal = JSON.parse(item.USERSAVEDATA).modalActivityData.filter(
      (item) => item.id !== mid
    );

    let targateData = {
      ...JSON.parse(item.USERSAVEDATA),
      modalActivityData: requirdedModal,
    };
    updateRecord(item.id, JSON.stringify(targateData));

    deleteRowOfRecordReminder("mid", mid);

    console.log("data successfully upadated");
    fetchDataFromUserSavedData();
  };
  const deleteRowOfRecordReminder = async (idName, id) => {
    await deleteRowById1("recordReminder", idName, id);
  };
  const databaseTesting = async () => {
    console.log(await retrieveData("recordReminder"));
  };
  // ......................................................................................................................
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchDataFromUserSavedData();
    }, [])
  );
  // ------------------------------------------------------------------------sync data alert validation w.r.t month
  const postDataDuration = (item) => {
    let deleteTime = JSON.parse(item.USERSAVEDATA).timeStamp.slice(0, 10);
    let todayDate=new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' }).slice(0, 10)
    let yesterday = new Date(new Date());
yesterday.setDate(new Date().getDate() - 1)
yesterday=yesterday.toLocaleString('en-UG', { timeZone: 'Africa/Kampala' }).slice(0, 10)
console.log(yesterday,"yesterday");
console.log(deleteTime,"post date")
console.log(todayDate,"todayDate")
let dateTypeFunc=()=>{
  if(deleteTime==todayDate){
return "Today"
  }else if(deleteTime==yesterday){
    return "Yesterday"
  }else{
    return deleteTime
  }
}
    return (
      <Text
        style={{
          position: "absolute",
          top: -40,
          left: "45%",
          backgroundColor: "#bef2f4",
          padding: 5,
          borderRadius: 5,
        }}
      >
        {dateTypeFunc()}
      </Text>
    );
  };

  const messageAllocation = (item) => {
    const currentTime = new Date();
    const currentYear = Number(
      currentTime.toLocaleString("en-IN", {
        timeZone: "Africa/Kampala",
        year: "numeric",
      })
    );
    

    const messageAlertTimeForQ1Data = new Date(
      currentYear,
      9,
      1,
    );
    const messageAlertTimeForQ2Data = new Date(
      currentYear,
      12,
      1,
    );
    const messageAlertTimeForQ3Data = new Date(
      currentYear,
      3,
      1,
    );
    const messageAlertTimeForQ4Data = new Date(
      currentYear,
      6,
      1,
    );
    const messageDeleteTimeForQ1Data = new Date(
      currentYear,
      10,
      1,
    );
    const messageDeleteTimeForQ2Data = new Date(
      currentYear,
      1,
      1,
    );
    const messageDeleteTimeForQ3Data = new Date(
      currentYear,
      4,
      1,
    );
    const messageDeleteTimeForQ4Data = new Date(
      currentYear,
      7,
      1,
    );
    const q1Status=currentTime >= messageAlertTimeForQ1Data && currentTime <= messageDeleteTimeForQ1Data
    const q2Status=currentTime >= messageAlertTimeForQ2Data && currentTime <= messageDeleteTimeForQ2Data
    const q3Status=currentTime >= messageAlertTimeForQ3Data && currentTime <= messageDeleteTimeForQ3Data
    const q4Status=currentTime >= messageAlertTimeForQ4Data && currentTime <= messageDeleteTimeForQ4Data
    return (
     
        <>
       {
         JSON.parse(item.USERSAVEDATA).modalActivityData[0].id.endsWith("a") &&q1Status?
         <Text style={{ color: "red" }}>{"You have to sync this Data before"} {messageDeleteTimeForQ1Data.toLocaleString("en-IN", {
          timeZone: "Africa/Kampala",
        }).split(",")[0]}</Text>:
         JSON.parse(item.USERSAVEDATA).modalActivityData[0].id.endsWith("b") &&q2Status?
         <Text style={{ color: "red" }}>{"You have to sync this Data before"} {messageDeleteTimeForQ2Data.toLocaleString("en-IN", {
          timeZone: "Africa/Kampala",
        }).split(",")[0]}</Text>:
         JSON.parse(item.USERSAVEDATA).modalActivityData[0].id.endsWith("c") &&q3Status?
         <Text style={{ color: "red" }}>{"You have to sync this Data before"} {messageDeleteTimeForQ3Data.toLocaleString("en-IN", {
          timeZone: "Africa/Kampala",
        }).split(",")[0]}</Text>:
         JSON.parse(item.USERSAVEDATA).modalActivityData[0].id.endsWith("d") &&q4Status?
         <Text style={{ color: "red" }}>{"You have to sync this Data before"} {messageDeleteTimeForQ4Data.toLocaleString("en-IN", {
          timeZone: "Africa/Kampala",
        }).split(",")[0]}</Text>:null
       }
        </>
        
    );
  };
  // -----------------------------------------------------------------------------------------render Item
  const renderItem = React.useCallback(({ item, ind }) => {
    return (
      <>
        {JSON.parse(item.USERSAVEDATA).modalActivityData.length > 0 ? (
          <View
            style={{
              backgroundColor: "#e1f9fa",
              padding: 10,
              elevation: 5,
              borderRadius: 10,
              marginTop: 40,
              marginBottom: 10,
            }}
          >
            {postDataDuration(item)}
            {messageAllocation(item)}
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
                onPress={databaseTesting}
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
                        {/* ----------------------------------------------------------------------------update  */}
                        {items.update ? (
                          <VectorIcon
                            type="FontAwesome5"
                            name="edit"
                            size={18}
                            color="#8c8c8c"
                            onPress={() => {
                              setDatabaseId(item?.id);
                              setItem(items);
                              setDisable(true);
                              setModalVisible(true);
                            }}
                          />
                        ) : (
                          <VectorIcon
                            type="FontAwesome5"
                            name="edit"
                            size={18}
                            color="#0080ff"
                            onPress={() => {
                              setDatabaseId(item?.id);
                              setItem(items);
                              setDisable(false);
                              setModalVisible(true);
                            }}
                          />
                        )}
                        {/* --------------------------------------------------------------------------- sync  */}
                        {items.update ? (
                          //<MaterialCommunityIcons name="database-check-outline" size={24} color="black" />
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name="database-check-outline"
                            size={22}
                            color="#009900"
                            onPress={() =>
                              setContent1({
                                show: true,
                                msg: "Data already Synced !",
                                vibration: false,
                              })
                            }
                          />
                        ) : (
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name={"database-sync"}
                            // name={JSON.parse(item.SYNC)?"check-decagram":"database-sync"}
                            size={22}
                            color="#006aff"
                            // onPress={() => handleItemSubmit(item, items)}
                            onPress={() =>
                              setContent({
                                show: true,
                                msg: "Do you want to Sync ?",
                                ok: () => handleItemSubmit(item, items),
                                color1: "#8080ff",
                                color2: "green",
                                vibration: true,
                              })
                            }
                          />
                        )}
                        {/* ---------------------------------------------------------------------------------delete  */}
                        {items.update ? (
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name="delete-forever"
                            size={22}
                            color="#8c8c8c"
                            onPress={() =>
                              setContent1({
                                show: true,
                                msg: "Already Synced ! This data Can't delete",
                                vibration: true,
                              })
                            }
                          />
                        ) : (
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name="delete-sweep"
                            size={22}
                            color="red"
                            // onPress={() => deleteItem(item,items.id)}
                            onPress={() =>
                              setContent({
                                show: true,
                                msg: "Do you wants to delete ?",
                                ok: () => deleteItem(item, items.id),
                                color1: "#8080ff",
                                vibration: true,
                              })
                            }
                          />
                        )}
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
        ) : null}
      </>
    );
  });
  return (
    <ImageBackground
      source={require("../assets/blurUganda.jpeg")}
      style={{ flex: 1, padding: 16 }}
      resizeMode="cover"
    >
      <FlatList
        data={userData && userData.sort((a,b)=>b.id-a.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <EditModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        item={item}
        databaseId={databaseId}
        func={fetchDataFromUserSavedData}
        disable={disable}
      />
      <DeleteModal content={content} setContent={setContent} />
      <AlertModal content={content1} setContent={setContent1} />
    </ImageBackground>
  );
};

export default SyncData;
