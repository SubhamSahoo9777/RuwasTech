import { useTheme } from "react-native-paper";
import {
  React,
  useState,
  View,
  LinearGradient,
  Image,
  Text,
  Alert,
} from "../../allProjectComponents/allPackages";
import { TextInputOne } from "../../allProjectComponents/masterTextInput";
import { CustomButton } from "../../allProjectComponents/AllButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyle } from "../../components/allStyles";
import { CommonModal } from "../../allProjectComponents/masterModals";
import ImageView from "../../allProjectComponents/imageView";
import { TextAnimation } from "../../allProjectComponents/AnimatedLogoImage";
import {
  createTable,
  insertDataArray,
} from "../../allProjectComponents/AllLocalDatabaseFunction";
const loginStyle = customStyle.login;
const LogIn = ({ navigation }) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNullPasswordMoadal, setShowNullPasswordMoadal] = useState(false);
  const [showWrongPasswordMoadl, setShowWrongPasswordMoadl] = useState(false);
  const [showErrorApiModal, SetShowErrorApiModal] = useState(false);
//........................................................................................handle login
  const handleLogin = async () => {
    try {
      if (username == "" || password == "") {
        return setShowNullPasswordMoadal(true);
      }
      if (!isValidEmail(username)) {
        return Alert.alert("Please enter a valid email address");
      }

      checkAuthenticateUser();
    } catch (error) {
      SetShowErrorApiModal(true);
    }
  };
  //.....................................................................all api.....
  const allApiCall = async () => {
    const yearUri1 =
      "http://182.18.181.115:8084/api/masterdata/getfinancialyeardtls";
    const rwsrcUri = "http://182.18.181.115:8084/api/masterdata/getRWSRCdtls";
    const districtUri =
      "http://182.18.181.115:8084/api/masterdata/getRWSRCdistrictdtls";
    try {
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
    } catch (error) {
      alert("error fetching data");
    }
  };
  //........................................................email validation................................
  const isValidEmail = (username) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(username);
  };
  // ....................................................................is authenticate user
  const checkAuthenticateUser = async () => {
    const apiUrl = `http://182.18.181.115:8084/api/login/loginservice?username=${username}&password=${password}`;
    try {
      const apiResponse = await fetch(apiUrl);
      const responseData = await apiResponse.json();
      let response = await JSON.parse(responseData);
      if (response[0]?.token && response[0]?.token !== "") {
        // setLoading(false);
        let token1 = await response[0]?.token;
        await AsyncStorage.setItem("token", JSON.stringify(token1));
        await AsyncStorage.setItem("userdata", JSON.stringify(response[0]));

        let token2 = await AsyncStorage.getItem("token");
        if (token2 !== "") {
          allApiCall();
          let temp1 = {
            tableName: "userDetais",
            TEXT: Object.keys(response[0]),
          };
          await createTable(temp1);
          let temp2 = { ...temp1, table: response };
          insertDataArray(temp2);
          Alert.alert("User Logged In Successfully");

          navigation.navigate("PinGeneration");
        }
      } else {
        // setLoading(false);
        return Alert.alert(
          "Error",
          "You have entered an invalid username or password",
          [
            {
              text: "OK",
            },
          ]
        );
      }
    } catch (error) {
      return alert("You have entered an invalid username or password");
    }
  };



  //.......................................................................ui......
  return (
    <View
      style={[
        customStyle.container,
        { backgroundColor: theme.colors.screen.login },
      ]}
    >
      <ImageView imageSource={require("../../assets/waterBackground.jpg")}>
        <LinearGradient
          colors={[
            "rgba(32, 24, 127, 1)",
            "rgba(32, 24, 127, 0.5)",
            "rgba(32, 24, 127, 0.3)",
            "rgba(32, 24, 127, 0.1)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ height: 100, width: 100 }}
            />
            <TextAnimation />
            <Text style={{ color: "#fff" }}>
              {" "}
              Ministry of Water & Environment
            </Text>
          </View>
          <TextInputOne
            placeholder={"Email"}
            title="Enter Email"
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          />
          <TextInputOne
            placeholder={"Password"}
            title="Enter Password"
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          />
          <CustomButton
            title="LogIn"
            onPress={handleLogin}
            buttonStyle={{
              paddingVertical: 11,
              borderRadius: 5,
              marginTop: 10,
            }}
            textStyle={{ fontSize: 16 }}
          />
        </LinearGradient>
      </ImageView>

      <CommonModal
        show={showNullPasswordMoadal}
        setShow={setShowNullPasswordMoadal}
        title="All Input Should Fill"
        content="Fill All Inputs"
        type="info"
      />
      <CommonModal
        show={showWrongPasswordMoadl}
        setShow={setShowWrongPasswordMoadl}
        title="You Have Enter Wrong Inputs"
        content="Fill The Correct One"
        type="warning"
      />
      <CommonModal
        show={showErrorApiModal}
        setShow={SetShowErrorApiModal}
        title="Error in Fetching Apis"
        content="Need To Connect To The Network"
        type="info"
      />
    </View>
  );
};

export default LogIn;
