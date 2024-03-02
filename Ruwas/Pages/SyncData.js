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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  deleteRowById,
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
  // isModalVisible={isModalVisible}
  //     setModalVisible={setModalVisible}
  //     item={item}
  const [isModalVisible, setModalVisible] = useState(false);
  const [preView, setPreView] = useState(false);
  const [item, setItem] = useState(false);
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
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const fetchLocation = async () => {
    const { latitude, longitude } = await GpsSet();
    setLongitude(latitude);

    setLatitude(longitude);
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  const handlesubmit = async (formData, item) => {
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
        fetchDataFromUserSavedData();
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log("Error:", error);
      }
    }
  };
  const handleItemSubmit = async (item) => {
    const userData = JSON.parse(item.USERSAVEDATA);
    const basicDetails = userData.BasicDetails;
    const requestBody = {
      BasicDetails: {
        districtid: basicDetails.districtid,
        latitude: basicDetails.latitude,
        longitude: basicDetails.longitude,
        type: basicDetails.type,
        userId: basicDetails.userId,
        workplanid: basicDetails.workplanid,
      },
      modalActivityData: userData.modalActivityData, // Accessing modalActivityData from userData
      filesAttached: userData.filesAttached, // Accessing filesAttached from userData
    };

    const formData = new FormData();
    formData.append("BasicDetails", JSON.stringify(requestBody.BasicDetails));
    formData.append(
      "modalActivityData",
      JSON.stringify(requestBody.modalActivityData)
    );
    formData.append("filesAttached", JSON.stringify(requestBody.filesAttached));

    handlesubmit(formData, item);
  };

  //   handlesubmit(formData, item);
  // };
  const handledeletebyid = async (item) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteItem(item),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteItem = async (item) => {
    try {
      await deleteRowById("UserSavedData", item?.id);
      fetchDataFromUserSavedData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handlePreview = (item) => {
    setSelectedItem(item);
    setPreviewModalVisible(true);
  };

  const handleClosePreviewModal = () => {
    setPreviewModalVisible(false);
    setSelectedItem(null);
  };
  const userInformation = selectedItem
    ? JSON.parse(selectedItem.USERSAVEDATA).BasicDetails
    : null;
  const fileInformation = selectedItem
    ? JSON.parse(selectedItem.USERSAVEDATA).filesAttached
    : null;
  const modalactivityInformation = selectedItem
    ? JSON.parse(selectedItem.USERSAVEDATA).modalActivityData
    : null;
  const databaseId=selectedItem?.id
    // {console.log(databaseId,"subham")}


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3498db"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={{ marginTop: 20, width: "100%" }}>
            {userData && userData.length > 0 ? (
              userData.reverse().map((item, index) => (
               
                <View
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 15,
                    marginBottom: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                
                  <Text style={styles.cardText}>
                    District:{" "}
                    {item.USERSAVEDATA &&
                      JSON.parse(item.USERSAVEDATA).BasicDetails.districtid}
                  </Text>
                  <Text style={styles.cardText}>
                    Workplan Id:{" "}
                    {item.USERSAVEDATA &&
                      JSON.parse(item.USERSAVEDATA).BasicDetails.workplanid}
                  </Text>
                  <Text style={styles.cardText}>
                    Type:{" "}
                    {item.USERSAVEDATA &&
                      JSON.parse(item.USERSAVEDATA).BasicDetails.type}
                  </Text>
                  <Text style={styles.cardText}>
                    Financial Year:{" "}
                    {item.USERSAVEDATA &&
                      JSON.parse(item.USERSAVEDATA).BasicDetails.year}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <View
                      style={[
                        styles.button,
                        // {
                        //   backgroundColor:
                        //     JSON.parse(item.SYNC) == true ? "#ccc" : "#3498db",
                        // },
                      ]}
                      // onPress={() => handleItemSubmit(item)}
                      // disabled={JSON.parse(item.SYNC) == true}
                    >
                      {JSON.parse(item.SYNC) == true ? (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={{ color: "green", marginRight: 10 }}>
                            Synced
                          </Text>
                          <VectorIcon
                            type="AntDesign"
                            name="checkcircle"
                            size={20}
                            color="green"
                          />
                        </View>
                      ) : (
                        <Pressable onPress={() => handleItemSubmit(item)}>
                          {/* jello */}
                          <Animatable.View
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            style={{ textAlign: "center" }}
                          >
                            <VectorIcon
                              type="MaterialCommunityIcons"
                              name="database-sync"
                              size={30}
                              color={colors.tableHeaderColor}
                            />
                          </Animatable.View>
                        </Pressable>
                      )}
                      {/* <Text style={styles.buttonText}>
                      {JSON.parse(item.SYNC) == true ? "Synced" : "Sync Now"}
                    </Text> */}
                    </View>
                    {JSON.parse(item.SYNC) == false ? (
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => handledeletebyid(item)}
                      >
                        <Animatable.View
                          animation="jello"
                          easing="ease-out"
                          iterationCount={2}
                          style={{ textAlign: "center" }}
                        >
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name="delete-sweep"
                            size={35}
                            color="#ff4d4d"
                          />
                        </Animatable.View>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <Pressable
                    onPress={() => handlePreview(item)}
                    style={{ position: "absolute", top: 15, right: 20 }}
                  >
                    <VectorIcon
                      type="Entypo"
                      name="info-with-circle"
                      size={30}
                      color={colors.tableHeaderColor}
                    />
                  </Pressable>
                </View>
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>
                  No data available for the user ID.
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("Dashboard")}
                >
                  <Text style={styles.addButtonLabel}>Add Data</Text>
                </TouchableOpacity>
                <LoaderModal
                  show={show}
                  setShow={setShow}
                  title="Data synced"
                  icon={
                    <RotatingImage
                      source={require("../assets/synchronize.png")}
                      style={{ height: 50, width: 50 }}
                    />
                  }
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Preview Modal */}
      {selectedItem && (
        <Modal
          isVisible={isPreviewModalVisible}
          onRequestClose={() => selectedItem && handleClosePreviewModal()}
        >
          <View style={styles.modalContainer}>
            <View style={{ flex: 1 }}>
              {/* header */}
              <View
                style={{
                  backgroundColor: colors.tableHeaderColor,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  flexDirection: "row",
                }}
              >
                <VectorIcon
                  type="FontAwesome"
                  name="hand-o-right"
                  size={20}
                  color="#fff"
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "90%",
                    paddingLeft: 10,
                  }}
                >
                  Preview Data
                </Text>
              </View>
              {/* body */}
              <View
                style={{
                  backgroundColor: "#e1f9fa",
                  marginTop: 10,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <VectorIcon
                    type="AntDesign"
                    name="user"
                    size={24}
                    color={colors.tableHeaderColor}
                  />
                  <Text
                    style={{
                      color: colors.tableHeaderColor,
                      fontWeight: "700",
                      marginLeft: 5,
                    }}
                  >
                    User Information
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", width: "45%" }}
                  >
                    Latitude
                  </Text>
                  <Text>: {latitude}</Text>
                  {/* <Text>: {userInformation["latitude"]}</Text> */}
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", width: "45%" }}
                  >
                    Longitude
                  </Text>
                  <Text>: {longitude}</Text>
                  {/* <Text>: {userInformation["logitude"]}</Text> */}
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", width: "45%" }}
                  >
                    Type
                  </Text>
                  <Text>: {userInformation["type"]}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", width: "45%" }}
                  >
                    Work Plan Id
                  </Text>
                  <Text>: {userInformation["workplanid"]}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", width: "45%" }}
                  >
                    User Id
                  </Text>
                  <Text>: {userInformation["userId"]}</Text>
                </View>
              </View>
              {/* moadlActivity details */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: colors.tableHeaderColor,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <VectorIcon
                    type="FontAwesome"
                    name="hand-o-right"
                    size={24}
                    color="#fff"
                  />
                  <Text style={{ color: "#fff", marginLeft: 10, fontSize: 16 }}>
                    Activities
                  </Text>
                </View>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <VectorIcon
                      type="AntDesign"
                      name="piechart"
                      size={20}
                      color={colors.tableHeaderColor}
                    />
                    <Text
                      style={{
                        color: colors.tableHeaderColor,
                        fontWeight: "500",
                        marginLeft: 10,
                      }}
                    >
                      Modal Activity
                    </Text>
                  </View>
                  {modalactivityInformation.map((activity, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#e1f9fa",
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>SL.No.</Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["Sno"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>Modal Active</Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["modelActivity"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>Quarter</Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["quarteSelected"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>
                          Performance In A Quarter Archieved
                        </Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["quarterAchieved"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>Work Plan Id</Text>
                        <Text style={{ width: "70%" }}>
                          {activity["workplanid"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>
                          Expenditure In Quarter
                        </Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["quarterExpenditure"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "30%" }}>Comments</Text>
                        <Text style={{ width: "70%" }}>
                          : {activity["quarterComment"]}
                        </Text>
                      </View>
                      {/* -----------------------------------------------------------------------------edit button */}
                      <Pressable
                        onPress={() => {
                          setItem(activity), setModalVisible(true);
                        }}
                        style={{ position: "absolute", top: 5, right: 10 }}
                      >
                        <VectorIcon
                          type="FontAwesome5"
                          name="edit"
                          size={24}
                          color={colors.tableHeaderColor}
                        />
                      </Pressable>
                    </View>
                  ))}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <VectorIcon
                      type="AntDesign"
                      name="tag"
                      size={20}
                      color={colors.tableHeaderColor}
                    />
                    <Text
                      style={{
                        color: colors.tableHeaderColor,
                        fontWeight: "500",
                        marginLeft: 10,
                      }}
                    >
                      Files Attached
                    </Text>
                  </View>
                  {fileInformation.map((activity, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#e1f9fa",
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "50%" }}>File {index + 1} </Text>
                        <Text style={{ width: "50%" }}>
                          : {activity["file"]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: "50%" }}>File Description</Text>
                        <Text style={{ width: "50%" }}>
                          : {activity["title"]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePreviewModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <EditModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        item={item}
        databaseId={databaseId}
        func={fetchDataFromUserSavedData}
        preView={handleClosePreviewModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.tableHeaderColor,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    // backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
  },
  keyText: {
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    marginBottom: 8,
  },
  subItemContainer: {
    marginBottom: 20,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: colors.tableHeaderColor,
  },
  subKey: {
    fontWeight: "bold",
    marginRight: 4,
  },
  subValue: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    margin: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SyncData;
