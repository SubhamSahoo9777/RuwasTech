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
import { useToast } from "react-native-toast-notifications";
import { retrieveData, updateSyncStatus } from "../components/AllLocalDatabaseFunction";
import RotatingImage from "../components/RotatingImage";
import { LoaderModal } from "../components/AllModals";

const SyncData = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
const[show,setShow]=useState(false)
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

  const handlesubmit = async (formData, item) => {
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;
    if (!isConnected) {
     alert("No Network Connection. Please connect to a network and try again.")
    } else {
      setShow(true)

      setLoading(true); // Set loading to true when starting sync
      updateSyncStatus(item.USERID, "true", item.id);
alert("Data synced")
      fetchDataFromUserSavedData();
      setLoading(false);
      setShow(false)
    }
  };

  const handleItemSubmit = async (item) => {
    const userData = JSON.parse(item.USERSAVEDATA);
    const requestBody = {
      BasicDetails: {
        districtid: userData.districtid,
        latitude: userData.latitude,
        longitude: userData.longitude,
        type: userData.type,
        userId: userData.userId,
        workplanid: userData.workplanid
      },
      modalActivityData: userData.modalActivityData,
      filesAttached: userData.filesAttached,
    };

    const formData = new FormData();
    formData.append("BasicDetails", JSON.stringify(requestBody.BasicDetails));
    formData.append(
      "modalActivityData",
      JSON.stringify(requestBody.modalActivityData)
    );
    formData.append(
      "filesAttached",
      JSON.stringify(requestBody.filesAttached)
    );

    handlesubmit(formData, item);
  };

  const handlePreview = (item) => {
    setSelectedItem(item);
    setPreviewModalVisible(true);
  };

  const handleClosePreviewModal = () => {
    setPreviewModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
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
                    District Id: {item.USERSAVEDATA && JSON.parse(item.USERSAVEDATA).BasicDetails.districtid}
                  </Text>
                  <Text style={styles.cardText}>
                    Workplan Id: {item.USERSAVEDATA && JSON.parse(item.USERSAVEDATA).BasicDetails.workplanid}
                  </Text>
                  <Text style={styles.cardText}>
                    Type: {item.USERSAVEDATA && JSON.parse(item.USERSAVEDATA).BasicDetails.type}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: JSON.parse(item.SYNC) == true ? "#ccc" : "#3498db" }]}
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
                <Text style={styles.noDataText}>No data available for the user ID.</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    navigation.navigate("Forest Produce Movement Permit")
                  }
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
            <Text style={styles.modalText}>Preview Data:</Text>
            <FlatList
              data={[
                ...Object.entries(JSON.parse(selectedItem.USERSAVEDATA).BasicDetails),
                ["modalActivityData", JSON.parse(selectedItem.USERSAVEDATA).modalActivityData],
                ["filesAttached", JSON.parse(selectedItem.USERSAVEDATA).filesAttached],
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
            />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePreviewModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
