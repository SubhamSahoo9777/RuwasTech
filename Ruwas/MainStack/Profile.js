import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import MyCameraApp from "../CustomComponents/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";

const Profile = () => {
  const [file, setFile] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    getUserInfo();
    GetFile();
  }, []);

  const getUserInfo = async () => {
    const info = await AsyncStorage.getItem("userdata");
    setUserInfo(JSON.parse(info));
  };

  const GetFile = async () => {
    const myFile = await AsyncStorage.getItem("file");
    if (myFile !== null) {
      setFile(JSON.parse(myFile));
    }
  };

  const onFileChange = async (e) => {
    await AsyncStorage.setItem("file", JSON.stringify(e));
    setFile(e);
  };

  const renderUserInfo = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfoContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              justifyContent: "center",
            }}
          >
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>: {userInfo.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>: {userInfo.emailid}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Mobile Number</Text>
            <Text style={styles.value}>: {userInfo.mobileno}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>: {userInfo.department}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <MyCameraApp value={file} onDocumentChange={onFileChange} />
      {renderUserInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7fdfd",
    paddingVertical: 50,
  },
  userInfoContainer: {
    marginTop: 30,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: "40%",
    color: colors.tableHeaderColor,
  },
  value: {
    fontSize: 16,
    width: "60%",
    color: "#001a66",
  },
});

export default Profile;
