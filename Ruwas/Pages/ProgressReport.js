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
  Text,
  Alert,
  BackHandler,
} from "react-native";
import ProgressReportTable from "../components/ProgressReportTable";
import LottieFileLoader from "../components/LottieFileLoader";
import { convertLatLonToEastingNorthing } from "../components/GeoUtils";
import {
  createTable,
  insertDataArray,
  retrieveData,
} from "../components/AllLocalDatabaseFunction";
import { SuccessModal } from "../components/AllModals";
import AutoSelectDrop from "../components/AutoSelectDrop";
import { useDispatch, useSelector } from "react-redux";
import { GpsSet } from "../CustomComponents/GpsCordinates";
import { useFocusEffect } from "@react-navigation/native";
const ProgressReport = memo(({ navigation, route }) => {
  const alltableData = useSelector((state) => state.ModalActivityReducer);
  const userifomation = useSelector((state) => state.UserdetailsReducer);
  const allDetails = route.params.data.allDetails;
  const reportType = route.params.data.reportType;
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
  const [place, setPlace] = useState("");
  const [addedFiles, setAddedFiles] = useState([
    {
      title: "",
      file: "",
      workplanid:
        reportType == "water" ? allDetails.workplanid : allDetails.sanitationid,
      userId: userifomation.userId,
    },
  ]);
  const Dispatch = useDispatch();
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
        if (reportType == "water") {
          workplanModalActivityDetails = await retrieveData(
            "workplanModalActivity"
          );
          let temp = workplanModalActivityDetails.filter(
            (item) => item.workplanid === allDetails.workplanid && item.approvedAnnualTarget!=="0"
          );
          setTableDetails(temp);
        } else {
          sanitationWorkPlanModalActivity = await retrieveData(
            "sanitationWorkPlanModalActivity"
          );

          let temp = sanitationWorkPlanModalActivity.filter(
            (item) => item.sanitationId === allDetails.sanitationid && item.approvedAnnualTarget!=="0"
          );

          setTableDetails(temp);
        }
        allmasterYear = await retrieveData("finantialYear");
        let yearName = allmasterYear.filter(
          (item) => allDetails.financialyearid === item.financialYearId
        );
        setApiYear(yearName[0].financialYearName);

        allmasterDistricts = await retrieveData("districts");
        let selectedDistricts = allmasterDistricts.filter((item) => {
          return item.LCId == allDetails.districtid;
        });
        let rwsrcId = selectedDistricts[0].rwsrcId;
        setApiDistricts(selectedDistricts[0].LCName);

        allmasterRwsrc = await retrieveData("rwsrc");
        const selectedRwsrc = allmasterRwsrc.filter(
          (item) => item.RWSRCId == rwsrcId
        );
        setApiRwsrc(selectedRwsrc[0].RWSRCName);

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
    if (quarter) {
      setLoading(true);
      setShowTable(true);
      setLoading(false);
    }
  }, [year, rwsrc, localGovt, quarter]);
  const recordReminder = async () => {
    let spmTemp = {
      tableName: "recordReminder",
      TEXT: ["mid","quarterComment","quarterAchieved","quarterExpenditure"],
    };
    let tableIds=alltableData.map((item)=>({mid:item.id,quarterComment:item.quarterComment,quarterAchieved:item.quarterAchieved,quarterExpenditure:item.quarterExpenditure}))
    let spmTemp2 = { ...spmTemp, table: tableIds };
    insertDataArray(spmTemp2);
  };

  const handleSubmit = () => {
    if (
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
      LocationCheak();

      // -------------------------------------------------------
    } else {
      if (!quarter) {
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
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const fetchLocation = async () => {
    const { latitude, longitude } = await GpsSet();
    const excatPlace = convertLatLonToEastingNorthing(latitude, longitude);
    setPlace(excatPlace);
    setLongitude(latitude);

    setLatitude(longitude);
  };
  const clearRedux = () => {
    Dispatch({ type: "clearModal" });
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  const LocationCheak = async () => {
    const allUserSavedData = await retrieveData("UserSavedData");
    const existedUser = allUserSavedData.filter(
      (item) =>
        JSON.parse(item.USERSAVEDATA).BasicDetails.workplanid ==
          allDetails.workplanid &&
        JSON.parse(item.USERSAVEDATA).BasicDetails.type == userifomation.type
    );
    try {
      const requestBody = {
        BasicDetails: {
          latitude: latitude,
          logitude: longitude,
          type: userifomation.type,
          userId: userifomation.userId,
          districtid: apiDistricts,
          workplanid:
            reportType == "water"
              ? allDetails.workplanid
              : allDetails.sanitationid,
          year: apiYear,
        },
        modalActivityData: alltableData,
        filesAttached: addedFiles.slice(1),
      };

      try {
        const resultUserSavedData = insertDataArray({
          tableName: "UserSavedData",
          TEXT: ["USERID", "SYNC", "USERSAVEDATA"],
          table: [
            {
              USERID: userifomation.userId,
              SYNC: JSON.stringify(false),
              USERSAVEDATA: JSON.stringify(requestBody),
            },
          ],
        });
        recordReminder();
        setLoading(false);
        setFinalSuccessModal(true);

        setTimeout(() => {
          clearRedux();
          navigation.navigate("Dashboard");
        }, 2000);
      } catch (error) {
        Alert.alert("Sorry something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Please Grand Location Permission.");
    }
    // } else {
    // }
  };
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [])
  );
  const handleBackPress = () => {
    clearRedux();
    // Dispatch({ type: "CLEAR_STATE" });
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
            }}
          >
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>Work Plan Id</Text>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                {" "}
                :{" "}
                {reportType == "water"
                  ? allDetails["workplanid"]
                  : allDetails["sanitationid"] || "0"}
              </Text>
            </View>
          </View>
          <Text
            style={{
              backgroundColor: colors.tableHeaderColor,
              color: "#fff",
              paddingVertical: 15,
              paddingLeft: 10,
              borderRadius: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {"Total Approved Budget :"}
            {"  "}
            {allDetails.totalapprovedbudget || "0"}
          </Text>
          <AutoSelectDrop label={apiYear} title={"financial Year"} />
          <AutoSelectDrop label={apiDistricts} title={"Local Government"} />
          <AutoSelectDrop label={apiRwsrc} title={"RWSRC"} />
          <CustomDropDown
            setSelect={setQuarter}
            title="Quarter"
            isWrong={isWrong.wrongQuarter}
            setIsWrong={setIsWrong}
            dropData={apiQuater}
            fieldName={"label"}
            valueFieldName={"value"}
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
            {"Funds Received (UGX) :"}
            {"  "}
            {quarter == "1"
              ? allDetails.quarteronefunds
              : quarter == "2"
              ? allDetails.quartertwofunds
              : quarter == "3"
              ? allDetails.quarterthreefunds
              : quarter == "4"
              ? allDetails.quarterfourfunds
              : null}
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
            {"Funds Received Cumulative : 0"}
          </Text>
          {showTable ? (
            <View>
              <ProgressReportTable
                tableDatas={tableDetails}
                setTableDatas={setTableDetails}
                quarter={quarter !== undefined && quarter}
                reportType={route.params.data}
              />
            </View>
          ) : null}

          {alltableData.length > 0 ? (
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
                title={(addedFiles.length > 1 && "Attach More") || "Attach"}
                buttonStyle={{ width: "30%", alignSelf: "center" }}
                onPress={() => {
                  if (file && title) {
                    setAddedFiles([
                      ...addedFiles,
                      {
                        title: title,
                        file: file.name,
                        workplanid:
                          reportType == "water"
                            ? allDetails.workplanid
                            : allDetails.sanitationid,
                        userId: userifomation.userId,
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
          {/* .......................................................save button */}
          <SubmitButton
            onPress={handleSubmit}
            // onPress={recordReminder}
            title={"Save"}
            textStyle={{ fontSize: 20 }}
          />
        </ScrollView>
        {/* ------------------------------------------------all modals here */}
        <SuccessModal
          show={show}
          setShow={setShow}
          type="info"
          title="Can't fetch data from your local dataBase"
          content="Need to reStart the app"
        />
        <SuccessModal
          show={addErrorModal}
          setShow={setAddErrorModal}
          type="warning"
          title="You have not selected any file"
          content="Please Select At least One File And File Description"
        />
        <SuccessModal
          show={addModal}
          setShow={setAddModal}
          type="warning"
          title="Please press on the Attach button"
          content="By pressing on attach button you can able to add selected files"
        />
        <SuccessModal
          show={finalSuccessModal}
          setShow={setFinalSuccessModal}
          type="success"
          title="You have successfully saved the data"
          content=""
        />
      </View>
      {loading && <LottieFileLoader />}
    </>
  );
});

export default ProgressReport;
