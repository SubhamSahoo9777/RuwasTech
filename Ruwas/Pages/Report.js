import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VectorIcon, colors, height } from "../components/AllPackages";
import { retrieveData } from "../components/AllLocalDatabaseFunction";
import { useDispatch } from "react-redux";
const Report = ({ navigation, route }) => {
  const Dispatch=useDispatch()
  let allDetails = route.params.data.item;
  let reportType=route.params.data.type

  let userinfo=reportType=="water"?{workplanid:allDetails.workplanid}:{sanitationid:allDetails.sanitationid}
  const[getDistrictName,setGetDistrictName]=useState("")
  useEffect(()=>{
    conformDistrict(allDetails.districtid)
  },[allDetails])
 const conformDistrict=async(districtid)=>{
 let allmasterDistricts = await retrieveData("districts");
   let selectedDistricts = allmasterDistricts.filter((item) => {
    return item.LCId == districtid;
   })
setGetDistrictName(selectedDistricts[0].LCName)
 }
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 16 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <VectorIcon
            type="FontAwesome5"
            name="hand-point-right"
            size={20}
            color="#000"
          />
          <Text style={{ marginLeft: 10 }}>See All Details</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.tableHeaderColor,
            minHeight: height * 0.2,
            marginTop: 10,
            borderRadius: 10,
            padding: 16,
          }}
        >

         
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>WorkPlan Id</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {reportType=="water"?allDetails["workplanid"]:reportType=="sanitation"?allDetails["sanitationid"] : "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>District</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {getDistrictName || "0"}
              </Text>
            </View>

            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>QuaterOne Funds</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["quarteronefunds"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>QuaterTwo Funds</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["quartertwofunds"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>QuaterThree Funds</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["quarterthreefunds"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>QuaterFour Funds</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["quarterfourfunds"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>Total Approved Budget</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["totalapprovedbudget"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>Title</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["tittle"] || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>Date</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["date"].slice(0,9) || "0"}
              </Text>
            </View>
            <View  style={{ flexDirection: "row" }}>
              <Text style={{ width: "55%", color: "#fff" }}>Status</Text>
              <Text style={{ width: "45%", color: "#fff" }}>
                : {allDetails["status"] || "0"}
              </Text>
            </View>
    
        </View>

        <Pressable
          onPress={() => {
            Dispatch({type:"userId",userId:userinfo})
            Dispatch({type:"types",typeof:{type:reportType}})
            navigation.navigate("Progress Report", { data: {allDetails,reportType} });
          }}
          style={{
            height: "auto",
            width: "70%",
            borderRadius: 200,
            backgroundColor: colors.tableHeaderColor,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
            alignSelf: "center",
            padding: 10,
            elevation: 10,
            flexDirection:"row"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16,marginRight: 10, }}>
            Go Progress Report
          </Text>
          <VectorIcon type="Ionicons" name="paper-plane" size={20} color="#fff" />
        </Pressable>
      </View>
      <View></View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});
