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
  ActivityIndicator,
} from "react-native";

import styles from "./style";
import { useEffect, useRef } from "react";
import ProgressReportTable from "../components/ProgressReportTable";

const ProgressReport1 = () => {
  const [loading, setLoading] = useState(true);
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
  const [apiData,setApiData]=useState([])
  const [isWrong, setIsWrong] = useState({
    wrongYear: false,
    wrongRwsrc: false,
    wrongGovt: false,
    wrongQuarter: false,
    wrongTitle: false,
    wrongFile: false,
    wrongAdd: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      const uri = "http://182.18.181.115:8084/api/masterdata/getdistricts";
      try {
        let response = await fetch(uri);
        let data = await response.json();
        let parseData=JSON.parse(data)
        setApiData(parseData);
      } catch (error) {
        alert("Can't Fetch Data")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const scrollViewRef = useRef(null);
  const scrollUp = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  useEffect(() => {
    if (year && rwsrc && localGovt && quarter) {
      setShowTable(true);
    }
  }, [year, rwsrc, localGovt, quarter]);
  
  const handleSubmit = () => {
    if (year && rwsrc && localGovt && quarter && (addedFiles.length>1 || title) && (addedFiles.length>1 || file)) {
      if (addedFiles.length<=1) {
        alert("Please Press On Save Button")
        Vibration.vibrate(500);
      }
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
      } else if (!title) {
        setIsWrong({ ...isWrong, wrongTitle: true });
        Vibration.vibrate(500);
      } else if (!file) {
        setIsWrong({ ...isWrong,wrongFile: true });
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
      {loading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color={colors.activityIndicatorColor} />
          </View>
        ):
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
          setSelect={setLocalGovt}
          title="Local Government"
          isWrong={isWrong.wrongGovt}
          setIsWrong={setIsWrong}
          dropData={apiData}
          fieldName={"districtname"}
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

       
        {
          addedFiles.length<3 ?
          <>
           <CommonTextInput
          setInput={setTitle}
          isWrong={isWrong.wrongTitle}
          setIsWrong={setIsWrong}
          lengthOfList={addedFiles.length}
          title={"Description of Attachment"}
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
          title="Save "
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
          </>
          :null
        }
       
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
        
        }
     
    </View>
  );
};

export default ProgressReport1;
