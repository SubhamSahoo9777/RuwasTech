import { CustomDropDown } from "../../allProjectComponents/AllReusableComponets";
import {
  BackHandler,
  View,
  StyleSheet,
  Alert,
  useState,
  useEffect,
  React,
} from "../../allProjectComponents/allPackages";

const DrawerDashBoard1 = () => {
  const [dropData, setDropData] = useState([]);

useEffect(()=>{
fetchDeta()

},[])
const fetchDeta=async()=>{
  const uri="http://182.18.181.115:8066/Api/Wfp/Fetch_Basin"
  console.log("fetch starting..");
  try {
    let response = await fetch(uri);
    let data = await response.json();
        data=JSON.parse(data)
    setDropData(data)
    console.log(data);

  } catch (error) {
    alert("data not fetch")
  }
 
}
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancelled exit");
          },
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: true }
    );

    // Return true to prevent the default behavior (closing the app)
    return true;
  };

  return (
    <View style={{ flex: 1,backgroundColor:"#d0e0fb" }}>
  <CustomDropDown
  dropData={dropData}
  fieldName={"txt_basin"}
  valueFieldName={"txt_basin"}
  />
    </View>
  );
};

export default DrawerDashBoard1;

const styles = StyleSheet.create({});
