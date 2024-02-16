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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  retrieveData,
  updateSyncStatus,
} from "../components/AllLocalDatabaseFunction";
import RotatingImage from "../components/RotatingImage";
import { LoaderModal } from "../components/AllModals";
import { GpsSet } from "../CustomComponents/GpsCordinates";
import colors from "../components/colors";
import VectorIcon from "../components/VectorIcon";
// [
//   ...Object.entries(
//
//   ),
//   [
//     "modalActivityData",
//     ,
//   ],
//   [
//     "filesAttached",
//     JSON.parse(selectedItem.USERSAVEDATA).filesAttached,
//   ],
// ]

const SyncData = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const [show, setShow] = useState(false);
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
    console.log(item);
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

        console.error("Error:", error);
      }
    }
  };
  const handleItemSubmit = async (item) => {
    const userData = JSON.parse(item.USERSAVEDATA);
    const basicDetails = userData.BasicDetails; // Accessing BasicDetails object
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

  //rajesh // const handleItemSubmit = async (item) => {
  //   const userData = JSON.parse(item.USERSAVEDATA);
  //   console.log(userData);
  //   setLoading(true);
  //   const requestBody = {
  //     BasicDetails: {
  //       logitude: userData.BasicDetails.logitude,
  //       latitude: userData.BasicDetails.latitude,
  //       type: userData.BasicDetails.type,
  //       userId: userData.BasicDetails.userId,
  //       districtid: userData.BasicDetails.districtId,
  //       workplanid: userData.BasicDetails.workplanid,
  //     },
  //     modalActivityData: userData.alltableData,
  //     filesAttached: userData.addedFiles,
  //   };
  //   console.log(requestBody);
  //   const formData = new FormData();

  //   formData.append("BasicDetails", JSON.stringify(requestBody.BasicDetails));
  //   formData.append(
  //     "modalActivityData",
  //     JSON.stringify(requestBody.modalActivityData)
  //   );
  //   formData.append("filesAttached", JSON.stringify(requestBody.filesAttached));

  //   handlesubmit(formData, item);
  // };
  //hi//   const handlesubmit = async (formData, item) => {
  //     const netInfo = await NetInfo.fetch();
  //     const isConnected = netInfo.isConnected;
  //     if (!isConnected) {
  //      alert("No Network Connection. Please connect to a network and try again.")
  //     } else {
  //       setShow(true)

  //       setLoading(true); // Set loading to true when starting sync
  //       updateSyncStatus(item.USERID, "true", item.id);
  // alert("Data synced")
  //       fetchDataFromUserSavedData();
  //       setLoading(false);
  //       setShow(false)
  //     }
  //   };

  // const handleItemSubmit = async (item) => {
  //   const userData = JSON.parse(item.USERSAVEDATA);
  //   const requestBody = {
  //     BasicDetails: {
  //       districtid: userData.districtid,
  //       latitude: userData.latitude,
  //       longitude: userData.longitude,
  //       type: userData.type,
  //       userId: userData.userId,
  //       workplanid: userData.workplanid,
  //     },
  //     modalActivityData: userData.modalActivityData,
  //     filesAttached: userData.filesAttached,
  //   };

  //   const formData = new FormData();
  //   formData.append("BasicDetails", JSON.stringify(requestBody.BasicDetails));
  //   formData.append(
  //     "modalActivityData",
  //     JSON.stringify(requestBody.modalActivityData)
  //   );
  //   formData.append("filesAttached", JSON.stringify(requestBody.filesAttached));

  //   handlesubmit(formData, item);
  // };

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
    ? JSON.parse(selectedItem.USERSAVEDATA).modalActivityData
    : null;
  const modalactivityInformation = selectedItem
    ? JSON.parse(selectedItem.USERSAVEDATA).modalActivityData
    : null;

  console.log(modalactivityInformation);
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
              userData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => handlePreview(item)}
                >
                  <Text style={styles.cardText}>
                    District Id:{" "}
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
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            JSON.parse(item.SYNC) == true ? "#ccc" : "#3498db",
                        },
                      ]}
                      onPress={() => handleItemSubmit(item)}
                      disabled={JSON.parse(item.SYNC) == true}
                    >
                      <Text style={styles.buttonText}>
                        {JSON.parse(item.SYNC) == true ? "Synced" : "Sync Now"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
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
              <View style={{ backgroundColor: "#e1f9fa" }}>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>Latitude</Text>
                  <Text>1233</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>Longitude</Text>
                  <Text>1233</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>Type</Text>
                  <Text>water</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>Work Plan Id</Text>
                  <Text>33</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>District</Text>
                  <Text>Odisha</Text>
                </View>
                <View
                  style={{ flexDirection: "row", backgroundColor: "#e1f9fa" }}
                >
                  <Text>User Id</Text>
                  <Text>331</Text>
                </View>
              </View>
              {/* moadlActivity details */}
              <ScrollView>
                {modalactivityInformation.map((activity, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>SL.No.</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Modal Active</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Quarter</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Performance In A Quarter Archieved</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Expenditure In Quarter</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Comments</Text>
                      <Text style={{}}>{activity["Sno"]}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* <FlatList
              data={[
                ...Object.entries(
                  JSON.parse(selectedItem.USERSAVEDATA).BasicDetails
                ),
                [
                  "modalActivityData",
                  JSON.parse(selectedItem.USERSAVEDATA).modalActivityData,
                ],
                [
                  "filesAttached",
                  JSON.parse(selectedItem.USERSAVEDATA).filesAttached,
                ],
              ]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.keyText}>{item[0]}:</Text>
                  {Array.isArray(item[1]) ? (
                    <FlatList
                      data={item[1]}
                      keyExtractor={(subItem, subIndex) => subIndex.toString()}
                      renderItem={({ item: subItem }) => (
                        <View style={styles.subItemContainer}>
                          {Object.entries(subItem).map(([key, value]) => (
                            <View key={key} style={styles.subItem}>
                              <Text style={styles.subKey}>{key}:</Text>
                              <Text style={styles.subValue}>{value}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    />
                  ) : (
                    <Text style={styles.value}>{item[1]}</Text>
                  )}
                </View>
              )}
            /> */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePreviewModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
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
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SyncData;
