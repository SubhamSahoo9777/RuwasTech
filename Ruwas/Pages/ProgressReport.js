import masterData from "../DataBaseHandle/masterData";
import {
  React,
  StyleSheet,
  colors,
  View,
  useState,
  ScrollView,
  TextInput,
  Text,
  height,
  VectorIcon,
  Image,
} from "../components/AllPackages";
import { CustomDropDown, AttachFile, ModifiedTextInput1, ModifiedTextInput2 } from "../components/AllReusableComponets";
import CommonTextInput from "../components/CommonTextInput";
import { SubmitButton, SubmitButton2 } from "../components/AllButtons";
import LocalData from "../Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Vibration } from "react-native";
import ProgressModal from "./ProgressModal";
import { Entypo, AntDesign } from "@expo/vector-icons";
import styles from "./style";
import SearchAnimation from "../components/SearchAnimation";
import ButtonSheet from "../components/ButtonSheet";
import { ReactNativeModal1 } from "../components/ReactNativeModal";
import { useEffect, useRef } from "react";
import ProgressReportTable from "../components/ProgressReportTable";

const ProgressReport1 = () => {


  const [year, setYear] = useState("");
  const [rwsrc, setRwsrc] = useState("");
  const [localGovt, setLocalGovt] = useState("");
  const [quarter, setQuarter] = useState("");
  const [file, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [showTable, setShowTable] = useState(false);

  const [isWrong, setIsWrong] = useState({
    wrongYear: false,
    wrongRwsrc: false,
    wrongGovt: false,
    wrongQuarter: false,
    wrongTitle: false,
    wrongFile: false,
  });

  const scrollViewRef = useRef(null);
  const scrollUp = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  const scrollDown = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 400, animated: true });
  };
  useEffect(()=>{
    if (year && rwsrc && localGovt && quarter) {
      setShowTable(true)
    }
  },[year,rwsrc,localGovt,quarter])
  const handleSubmit = () => {
    if (year && rwsrc && localGovt && quarter && title && file) {
    
    } else {
      if (!year) {
        setIsWrong({ ...isWrong, wrongYear: true });
        Vibration.vibrate(500);
        scrollUp();
      } else if (!rwsrc) {
        setIsWrong({ ...isWrong, wrongRwsrc: true });
        Vibration.vibrate(500);
        scrollUp();
      } else if (!localGovt) {
        setIsWrong({ ...isWrong, wrongGovt: true });
        Vibration.vibrate(500);
        scrollUp();
      } else if (!quarter) {
        setIsWrong({ ...isWrong, wrongQuarter: true });
        Vibration.vibrate(500);
        scrollUp();
        scrollDown();
      } else if (!title) {
        setIsWrong({ ...isWrong, wrongTitle: true });
        Vibration.vibrate(500);
        scrollDown();
      } else if (!file) {
        setIsWrong({ ...isWrong, wrongFile: true });
        Vibration.vibrate(500);
        scrollDown();
      } else {
        alert("Technical Issue...");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.progressReportBody,
        margin: 16,
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <CustomDropDown
          dropData={masterData.dshcg.finantialYear}
          setSelect={setYear}
          title="Financial Year"
          isWrong={isWrong.wrongYear}
          setIsWrong={setIsWrong}
        />
        <CustomDropDown
          dropData={masterData.dshcg.rwsrc}
          setSelect={setRwsrc}
          title="RWSRC"
          isWrong={isWrong.wrongRwsrc}
          setIsWrong={setIsWrong}
        />

        <CustomDropDown
          dropData={masterData.dshcg.localgovt}
          setSelect={setLocalGovt}
          title="Local Government"
          isWrong={isWrong.wrongGovt}
          setIsWrong={setIsWrong}
        />
        <CustomDropDown
          dropData={masterData.dshcg.quarter}
          setSelect={setQuarter}
          title="Quarter"
          isWrong={isWrong.wrongQuarter}
          setIsWrong={setIsWrong}
        />
        <TextInput
          placeholderTextColor={colors.commonTextPlaceHolderColor}
          placeholder="Funds Received (UGX)"
          editable={false}
          style={styles.DisableTxtInput}
        />
        <TextInput
          placeholderTextColor={colors.commonTextPlaceHolderColor}
          placeholder="Funds Received Cumulative"
          editable={false}
          style={styles.DisableTxtInput}
        />
    {
      // showTable?
      <ProgressReportTable/>
    // :null
    }
        <CommonTextInput 
        setInput={setTitle}
        isWrong={isWrong.wrongTitle}
        setIsWrong={setIsWrong}
        title={"Description of File"}
        />
        <Text
          style={{
            marginLeft: 4,
            marginTop: 10,
            marginBottom:5,
            color: colors.tableHeaderColor,
            fontWeight: "bold",
          }}
        >
          Attach a File <Text style={{ color: "red" }}>*</Text>
        </Text>
        <AttachFile 
        title={"File"} 
        setFile={setFiles} 
        isWrong={isWrong.wrongFile}
        setIsWrong={setIsWrong}
        />
      
        <SubmitButton onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default ProgressReport1;
