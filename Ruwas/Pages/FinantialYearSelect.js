import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  createTable,
  insertDataArray,
  retrieveData,
} from "../components/AllLocalDatabaseFunction";
import { CustomDropDown1 } from "../components/AllReusableComponets";
import VectorIcon from "../components/VectorIcon";
import { AlertModal } from "../components/AllModals";

const FinantialYearSelect = (props) => {
  let [allFinacialYear, setAllFinancialYear] = useState([]);
  let [selectedyear, setSelectedyear] = useState("");
  const [content, setContent] = useState({ show: false });
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let data = await retrieveData("finantialYear");
        setAllFinancialYear(data);
      } catch (error) {}
    };
    fetchDataFromApi();
  }, []);
  const DatabasecreatFunc = async () => {
    const waterWorkPlanuri = `http://182.18.181.115:8084/api/masterdata/getwaterworkplandtls?districtid=113&fyyear=${selectedyear}`;
    const sanitationWorkPlanuri = `http://182.18.181.115:8084/api/masterdata/getsanitationworkplandtls?districtid=113&fyyear=${selectedyear}`;

    try {
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
      // ----------------------------------------------------------------getting workplan idies
      const workplanModalActivityuri = `http://182.18.181.115:8084/api/masterdata/getworkplanmodelactivitydtls?workplanid=${waterWorkPlan[0].workplanid}`;
      const sanitationWorkPlanModalActivityuri = `http://182.18.181.115:8084/api/masterdata/getsanitizationworkplanmodelactivitydtls?workplanid=${sanitationWorkPlan[0].sanitationid}`;

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

      //workplanModalActivitywater

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

      props.navigation.navigate("PinGeneration");
    } catch (error) {
      setContent({
        show: true,
        msg: "Currently Data not available for this Financial year",
        vibration: true,
      });
      return undefined;
    }
  };
  const validation = async () => {
    if (selectedyear == "" || null || undefined) {
      return setContent({
        show: true,
        msg: "Please select Financial Year",
        vibration: true,
      });
    }
    DatabasecreatFunc();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#261879",
        padding: 16,
      }}
    >
      <StatusBar backgroundColor="#261879" />
      <Text
        style={{
          fontSize: 50,
          color: "#fff",
          marginBottom: 100,
          marginTop: 50,
        }}
      >
        Choose Financial Year
      </Text>
      <CustomDropDown1
        setSelect={setSelectedyear}
        title="Select Financial Year"
        dropData={allFinacialYear}
        fieldName={"financialYearName"}
        valueFieldName={"financialYearId"}
      />

      <Pressable
        onPress={validation}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "white",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          width: 110,
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <Text style={{ marginRight: 10, fontSize: 18 }}>Next</Text>
        <VectorIcon
          type="MaterialIcons"
          name="next-plan"
          size={25}
          color="#261879"
        />
      </Pressable>
      <AlertModal content={content} setContent={setContent} />
    </View>
  );
};

export default FinantialYearSelect;

const styles = StyleSheet.create({});
