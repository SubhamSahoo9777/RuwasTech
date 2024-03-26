import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { createTable, insertDataArray, retrieveData } from "../components/AllLocalDatabaseFunction";
import {
  CustomDropDown,
  CustomDropDown1,
} from "../components/AllReusableComponets";

const FinantialYearSelect = (props) => {
  let [allFinacialYear, setAllFinancialYear] = useState([]);
  let [selectedyear, setSelectedyear] = useState("");
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let data = await retrieveData("finantialYear");
        setAllFinancialYear(data);
        console.log(data);
      } catch (error) {}
    };
    fetchDataFromApi();
  }, []);
  const DatabasecreatFunc = async () => {
    const waterWorkPlanuri =
      `http://182.18.181.115:8084/api/masterdata/getwaterworkplandtls?districtid=113&fyyear=${selectedyear}`;
    const sanitationWorkPlanuri =
      `http://182.18.181.115:8084/api/masterdata/getsanitationworkplandtls?districtid=113&fyyear=${selectedyear}`;
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
      props.navigation.navigate("PinGeneration")
    } catch (error) {
        alert("Currently Data not available for this Financial year ")
        return undefined;
    }
  };
  const validation=async()=>{
    if(selectedyear== "" || null || undefined){
        return alert("Please select Financial Year")
    }
    DatabasecreatFunc()
   
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#261879",
        padding: 16,
      }}
    >
      <StatusBar backgroundColor="#261879" />
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
          width: 100,
          borderRadius: 10,
        }}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};

export default FinantialYearSelect;

const styles = StyleSheet.create({});
