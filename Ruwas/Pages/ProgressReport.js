import masterData from "../DataBaseHandle/masterData";
import { height } from "../components/AllPackages";
import React, { memo, useState, useEffect, useRef } from "react";
import VectorIcon from "../components/VectorIcon";
import colors from "../components/colors";
import { CustomDropDown, AttachFile } from "../components/AllReusableComponets";
import CommonTextInput from "../components/CommonTextInput";
import { SubmitButton } from "../components/AllButtons";
import {
  Vibration,
  View,
  ScrollView,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import ProgressReportTable from "../components/ProgressReportTable";
import LottieFileLoader from "../components/LottieFileLoader";
import { retrieveData } from "../components/AllLocalDatabaseFunction";
import { SuccessModal } from "../components/AllModals";
const ProgressReport = memo(({ navigation, route }) => {
  const allDetails = route.params.data;
  const [show, setShow] = useState(false);
  const [addErrorModal, setAddErrorModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [finalSuccessModal, setFinalSuccessModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("");
  const [rwsrc, setRwsrc] = useState("");
  const [localGovt, setLocalGovt] = useState("");
  const [quarter, setQuarter] = useState("");
  const [file, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [apiYear, setApiYear] = useState([]);
  const [apiRwsrc, setApiRwsrc] = useState([]);
  const [apiDistricts, setApiDistricts] = useState([]);
  const [apiQuater, setApiQuater] = useState([]);
  const [addedFiles, setAddedFiles] = useState([
    {
      title: "",
      file: "",
    },
  ]);
  const [isWrong, setIsWrong] = useState({
    wrongYear: false,
    wrongRwsrc: false,
    wrongGovt: false,
    wrongQuarter: false,
    wrongTitle: false,
    wrongFile: false,
    wrongAdd: false,
  });
  const [tableDetails, setTableDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const quaterUri = masterData.dshcg.quarter;
      try {
        workplanModalActivityDetails = await retrieveData(
          "workplanModalActivity"
        );
        let temp = workplanModalActivityDetails.filter(
          (item) => item.workplanid === allDetails.workplanid
        );
        setTableDetails(temp);
        allmasterYear = await retrieveData("finantialYear");
        setApiYear(allmasterYear);
        allmasterRwsrc = await retrieveData("rwsrc");
        setApiRwsrc(allmasterRwsrc);
        allmasterDistricts = await retrieveData("districts");
        let selectedDistricts = allmasterDistricts.filter((item) => {
          return item.rwsrcId == rwsrc;
        });
        setApiDistricts(selectedDistricts);
        setApiQuater(quaterUri);
      } catch (error) {
        setShow(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rwsrc, allDetails]);
  const scrollViewRef = useRef(null);
  const scrollUp = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  useEffect(() => {
    if (year && rwsrc && localGovt && quarter) {
      setLoading(true);
      setShowTable(true);
      setLoading(false);
    }
  }, [year, rwsrc, localGovt, quarter]);

  const handleSubmit = () => {
    if (
      year &&
      rwsrc &&
      localGovt &&
      quarter &&
      (addedFiles.length > 1 || title) &&
      (addedFiles.length > 1 || file)
    ) {
      if (addedFiles.length <= 1) {
        setAddModal(true);
        return Vibration.vibrate(500);
      }
      // -----------------------------------final result submit--------------------
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFinalSuccessModal(true);
      }, 2000);
      // -------------------------------------------------------
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
        setIsWrong({ ...isWrong, wrongFile: true });
        Vibration.vibrate(500);
      } else {
      }
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.progressReportBody,
          margin: 16,
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.tableHeaderColor,
              padding: 16,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>Work Plan Id</Text>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                {" "}
                : {allDetails["workplanid"] || "0"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: "60%" }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>Planed Budget</Text>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                {" "}
                : {allDetails.totalapprovedbudget || "0"}
              </Text>
            </View>
          </View>

          <CustomDropDown
            dropData={apiYear}
            setSelect={setYear}
            title="financial Year"
            isWrong={isWrong.wrongYear}
            setIsWrong={setIsWrong}
            fieldName={"financialYearName"}
            valueFieldName={"financialYearId"}
          />
          <CustomDropDown
            dropData={apiRwsrc}
            fieldName={"RWSRCName"}
            setSelect={setRwsrc}
            title="RWSRC"
            isWrong={isWrong.wrongRwsrc}
            setIsWrong={setIsWrong}
            valueFieldName={"RWSRCId"}
          />

          <CustomDropDown
            setSelect={setLocalGovt}
            title="Local Government"
            isWrong={isWrong.wrongGovt}
            setIsWrong={setIsWrong}
            dropData={apiDistricts}
            fieldName={"LCName"}
            valueFieldName={"rwsrcId"}
          />
          <CustomDropDown
            dropData={apiQuater}
            fieldName={"label"}
            setSelect={setQuarter}
            title="Quarter"
            isWrong={isWrong.wrongQuarter}
            setIsWrong={setIsWrong}
          />
          <Text
            style={{
              backgroundColor: colors.tableHeaderColor,
              color: "#fff",
              paddingVertical: 15,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {"Funds Received (UGX)"}
          </Text>
          <Text
            style={{
              backgroundColor: colors.tableHeaderColor,
              color: "#fff",
              paddingVertical: 15,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {"Funds Received (UGX)"}
          </Text>
          {showTable ? (
            <View>
              <ProgressReportTable
                tableDatas={tableDetails}
                setTableDatas={setTableDetails}
              />
            </View>
          ) : null}

          {addedFiles.length < 3 ? (
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
                title={(addedFiles.length > 1 && "Add More") || "Add"}
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
                    setAddErrorModal(true);
                  }

                  setTitle("");
                  setFiles("");
                }}
              />
            </>
          ) : null}

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
          <SubmitButton
            onPress={handleSubmit}
            title={"Save"}
            textStyle={{ fontSize: 20 }}
          />
        </ScrollView>
        {/* ------------------------------------------------all modals here */}
        <SuccessModal
          show={show}
          setShow={setShow}
          type="info"
          title="Can't Fetch Data From Your Local DataBase"
          content="Need To ReStart The App"
        />
        <SuccessModal
          show={addErrorModal}
          setShow={setAddErrorModal}
          type="warning"
          title="You Have Not Selected Any File"
          content="Please Select At least One File And File Description"
        />
        <SuccessModal
          show={addModal}
          setShow={setAddModal}
          type="warning"
          title="Please Press On The Add Button"
          content="By Pressing On Add Button You Can Able To Add Selected Files"
        />
        <SuccessModal
          show={finalSuccessModal}
          setShow={setFinalSuccessModal}
          type="success"
          title="You Have Successfully Filled The Data"
          content="Thanks For Your Cooperate "
        />
      </View>
      {loading && <LottieFileLoader />}
    </>
  );
});

export default ProgressReport;
