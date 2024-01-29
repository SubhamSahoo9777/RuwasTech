import masterData from "../DataBaseHandle/masterData";
import { React, useState, height, VectorIcon } from "../components/AllPackages";
import colors from "../components/colors";
import { CustomDropDown, AttachFile } from "../components/AllReusableComponets";
import CommonTextInput from "../components/CommonTextInput";
import { SubmitButton, SubmitButton2 } from "../components/AllButtons";
import LocalDb from "../DataBaseHandle/LocalDb";
import {
  TouchableOpacity,
  Vibration,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
} from "react-native";

import styles from "./style";
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
  const [addedFiles, setAddedFiles] = useState([
    {
      title: "",
      file: "",
    },
  ]);
  useEffect(() => {
    api()
  }, []);
  const api=async()=>{
    const uri="http://182.18.181.115:8084/api/masterdata/getdistricts"
   let apiData= await fetch(uri)
        apiData=await apiData.json()
        
  }
  const [isWrong, setIsWrong] = useState({
    wrongYear: false,
    wrongRwsrc: false,
    wrongGovt: false,
    wrongQuarter: false,
    wrongTitle: false,
    wrongFile: false,
    wrongAdd: false,
  });

  const scrollViewRef = useRef(null);
  const scrollUp = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  const scrollDown = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 400, animated: true });
  };
  useEffect(() => {
    if (year && rwsrc && localGovt && quarter) {
      setShowTable(true);
    }
  }, [year, rwsrc, localGovt, quarter]);
  
  const handleSubmit = () => {
    if(addedFiles.length<=1){
      setIsWrong({ ...isWrong, wrongTitle: true,wrongFile: true });
      Vibration.vibrate(500);
    }
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
      } else if (addedFiles.length<=1) {
        setIsWrong({ ...isWrong, wrongTitle: true,wrongFile: true });
        Vibration.vibrate(500);
      } else {
        
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
        {showTable ? <ProgressReportTable /> : null}

        <CommonTextInput
          setInput={setTitle}
          isWrong={isWrong.wrongTitle}
          setIsWrong={setIsWrong}
          lengthOfList={addedFiles.length}
          title={"Description of Attach"}
          input={title}
        />
        <Text
          style={{
            marginLeft: 4,
            marginTop: 10,
            marginBottom: 5,
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
          lengthOfList={addedFiles.length}
          file={file}
        />
        <SubmitButton
          title="Add File"
          buttonStyle={{ width: "30%", alignSelf: "center" }}
          onPress={() => {
            if (file && title) {
              setAddedFiles([
                ...addedFiles,
                {
                  title: title,
                  file: file.name,
                },
              ]);
            } else {
              alert("please add description and file");
            }

            setTitle("");
            setFiles("");
          }}
        />
        {/* ///---------------------------add delete document list------------------------------ */}
        {addedFiles.map((item, index) => {
          if (index !== 0) {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#e6e6ff",
                    height: (height * 0.2) / 3,
                    width: "85%",
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ width: "10%", color: colors.tableHeaderColor }}
                  >
                    {index}
                  </Text>
                  <Text
                    style={{
                      width: "90%",
                      color: colors.tableHeaderColor,
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    {item.file}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "red",
                    height: (height * 0.2) / 3,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <VectorIcon
                    type="AntDesign"
                    name="delete"
                    size={24}
                    color="#fff"
                    onPress={() => {
                      const temp = [...addedFiles];
                      const filteredTemp = temp.filter(
                        (item, ind) => index !== ind + 1
                      );
                      setAddedFiles([...filteredTemp]);
                    }}
                  />
                </View>
              </View>
            );
          }
        })}
        <SubmitButton onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default ProgressReport1;
