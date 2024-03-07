import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar } from "react-native-elements";
import MyCameraApp from "../CustomComponents/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import VectorIcon from "../components/VectorIcon";
import * as Animatable from 'react-native-animatable';
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
        <Animatable.View 
        animation="slideInUp"
        easing="ease-out" iterationCount={1}
        direction="alternate"
        duration={1500}
        style={styles.userInfoContainer}>
          <Text style={styles.label}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <VectorIcon type="Zocial" name="email" size={24} color="#4d4791" />
            <Text style={styles.value}>{userInfo.emailid}</Text>
          </View>

          <Text style={styles.label}>Mobile Number</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <VectorIcon type="Ionicons" name="call" size={24} color="#4d4791" />
            <Text style={styles.value}>{userInfo.mobileno}</Text>
          </View>
          <Text style={styles.label}>Department</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Image
              source={require("../assets/employees.png")}
              style={{ height: 24, width: 24 }}
            />
            <Text style={styles.value}>{userInfo.department}</Text>
          </View>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
      animation="slideInDown"
      easing="ease-out" iterationCount={1}
      direction="alternate"
      duration={2000}
        style={{
          backgroundColor: "#f7fdfd",
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          elevation:5
        }}
      >
        <MyCameraApp value={file} onDocumentChange={onFileChange} />
        <View>
          <Text style={{ fontSize: 20, marginTop: 15, color: "#4d4791" }}>
            {userInfo && userInfo["name"]}
          </Text>
        </View>
      </Animatable.View>
      {renderUserInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#ebfafa",
  },
  userInfoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: "40%",
    color: colors.tableHeaderColor,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    width: "60%",
    color: "#001a66",
    marginLeft: 10,
  },
});

export default Profile;
