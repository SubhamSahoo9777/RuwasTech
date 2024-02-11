import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { Hoshi } from "react-native-textinput-effects";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { InsertData, selectData } from "../../DataBaseHandle";
import TableCreations from "../../DataBaseHandle/TableCreations";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createTable,
  insertDataArray,
  retrieveData,
} from "../../components/AllLocalDatabaseFunction";

const Login = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    TableCreations();
  }, []);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const checkItemExists = async () => {
    const value = await AsyncStorage.getItem("LocationDetails");
    return value;
  };

  const handleLogin = async () => {
    // const cheakingToken = await retrieveData("userDetais");
    // if (cheakingToken.length > 0) {
    //   cheakingToken[0];
    // }
    console.log("Username:", username);
    console.log("Password:", password);

    const authData = await authFunction(username, password);

    console.log(authData);
    const check = await checkItemExists();
    if (check !== null) {
      const pinCheck = await AsyncStorage.getItem("Pin");
      if (pinCheck !== null) {
        navigation.navigate("PinAccess");
      } else {
        navigation.navigate("PinGeneration");
      }
    } else {
      InsertLoc();
      allApiCall();
    }
  };
  const allApiCall = async () => {
    setLoading(true);
    const yearUri1 =
      "http://182.18.181.115:8084/api/masterdata/getfinancialyeardtls";
    const rwsrcUri = "http://182.18.181.115:8084/api/masterdata/getRWSRCdtls";
    const districtUri =
      "http://182.18.181.115:8084/api/masterdata/getRWSRCdistrictdtls";
    const waterWorkPlanuri =
      "http://182.18.181.115:8084/api/masterdata/getwaterworkplandtls?districtid=113";
    const sanitationWorkPlanuri =
      "http://182.18.181.115:8084/api/masterdata/getwaterworkplandtls?districtid=113";
    const workplanModalActivityuri =
      "http://182.18.181.115:8084/api/masterdata/getwaterworkplandtls?districtid=113";
    const sanitationWorkPlanModalActivityuri =
      "http://182.18.181.115:8084/api/masterdata/getsanitizationworkplanmodelactivitydtls?districtid=113";
    try {
      //sanitationWorkPlanModalActivity
      let sanitationWorkPlanModalActivity = JSON.parse(
        await (await fetch(sanitationWorkPlanModalActivityuri)).json()
      );
      let spmTemp = {
        tableName: "sanitationWorkPlanModalActivity",
        TEXT: Object.keys(sanitationWorkPlanModalActivity[0]),
      };
      await createTable(spmTemp);
      let spmTemp2 = { ...spmTemp, table: sanitationWorkPlanModalActivity };
      insertDataArray(spmTemp2);
      //workplanModalActivity
      let workplanModalActivity = JSON.parse(
        await (await fetch(workplanModalActivityuri)).json()
      );
      let wmTemp = {
        tableName: "workplanModalActivity",
        TEXT: Object.keys(workplanModalActivity[0]),
      };
      await createTable(wmTemp);
      let wmTemp2 = { ...wmTemp, table: workplanModalActivity };
      insertDataArray(wmTemp2);
      //sanitationWorkPlan
      let sanitationWorkPlan = JSON.parse(
        await (await fetch(sanitationWorkPlanuri)).json()
      );
      let swTemp = {
        tableName: "sanitationWorkPlan",
        TEXT: Object.keys(sanitationWorkPlan[0]),
      };
      await createTable(swTemp);
      let swTemp2 = { ...swTemp, table: sanitationWorkPlan };
      insertDataArray(swTemp2);
      //waterWorkPlan
      let waterWorkPlan = JSON.parse(
        await (await fetch(waterWorkPlanuri)).json()
      );
      let WorkTemp = {
        tableName: "waterWorkPlan",
        TEXT: Object.keys(waterWorkPlan[0]),
      };
      await createTable(WorkTemp);
      let WorkTemp2 = { ...WorkTemp, table: waterWorkPlan };
      insertDataArray(WorkTemp2);
      //year insert Data into loacal database
      let allmasterYear = JSON.parse(await (await fetch(yearUri1)).json());

      let temp1 = {
        tableName: "finantialYear",
        TEXT: Object.keys(allmasterYear[0]),
      };
      await createTable(temp1);
      let temp2 = { ...temp1, table: allmasterYear };
      insertDataArray(temp2);

      //   rwsrc insert Data into loacal database
      let masterRwsrc = JSON.parse(await (await fetch(rwsrcUri)).json());
      let temp3 = {
        tableName: "rwsrc",
        TEXT: Object.keys(masterRwsrc[0]),
      };
      await createTable(temp3);
      let temp4 = { ...temp3, table: masterRwsrc };
      insertDataArray(temp4);
      //   districts insert dataintolocal data base
      let masterDistricts = JSON.parse(await (await fetch(districtUri)).json());
      let temp5 = {
        tableName: "districts",
        TEXT: Object.keys(masterDistricts[0]),
      };
      await createTable(temp5);
      let temp6 = { ...temp5, table: masterDistricts };
      insertDataArray(temp6);
      setLoading(false);
    } catch (error) {
      alert("error fetching data");
    }
  };
  const authFunction = async (username, password) => {
    try {
      const response = await fetch(
        `http://182.18.181.115:8084/api/login/loginservice?username=${username}&password=${password}`
      );
      const authUriData = JSON.parse(await response.json());
      let temp1 = {
        tableName: "userDetais",
        TEXT: Object.keys(authUriData[0]),
      };
      await createTable(temp1);
      let temp2 = { ...temp1, table: authUriData };
      insertDataArray(temp2);
      return authUriData;
    } catch (error) {
      alert(
        "Authentication failed. Please check your credentials and try again."
      );
      return [];
    }
  };
  const InsertLoc = async () => {
    setLoading(true);
    fetch(
      "http://182.18.181.115:8084/api/Masterdata/Getadministrativeboundries"
    )
      .then((response) => response.json())
      .then((result) => JSON.parse(result))
      .then(async (result) => {
        await AsyncStorage.setItem("LocationDetails", JSON.stringify(result));
        setLoading(false);
        setTimeout(() => {
          navigation.navigate("PinGeneration");
        }, 1000);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/waterBackground.jpg")} // Replace with your background image
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={[
          "rgba(32, 24, 127, 1)",
          "rgba(32, 24, 127, 0.5)",
          "rgba(32, 24, 127, 0.3)",
          "rgba(32, 24, 127, 0.1)",
        ]}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>RUWAS</Text>
          </View>

          <View style={styles.logoContainer}>
            <Text style={styles.subLogoText}>
              {" "}
              Ministry of Water & Environment
            </Text>
          </View>

          <View style={[styles.inputContainer, styles.textInput]}>
            <Hoshi
              label={"Username"}
              borderColor={"#c3fbed"}
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={styles.input}
              color="#fff"
              labelStyle={customLabelStyle} // Apply custom label styles here
            />
            <Icon name="user" size={20} color="#c3fbed" style={styles.icon} />
          </View>

          <View style={[styles.inputContainer, styles.textInput]}>
            <Hoshi
              label={"Password"}
              borderColor={"#e2fac3"}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
              style={styles.input}
              color="#fff"
              labelStyle={customLabelStyle} // Apply custom label styles here
            />
            <Icon name="lock" size={20} color="#e2fac3" style={styles.icon} />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <AwesomeAlert
            show={true}
            showProgress={true}
            message="Loading ..."
            messageStyle={{ color: "blue", fontWeight: "bold" }}
          />
        )}
      </LinearGradient>
    </ImageBackground>
  );
};

const customLabelStyle = {
  color: "#c3dbfa", // Label text color
  fontSize: 16, // Label font size
  fontWeight: "bold", // Label font weight
};

export default Login;
