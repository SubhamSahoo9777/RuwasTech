import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import { colors, height } from "../../components/AllPackages";
const Dashboard = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [tap, setTap] = useState(false);
  const data = [
    {
      workPlanId: 1,
      rwsrc: "rwsrc1",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "120000",
    },
    {
      workPlanId: 2,
      rwsrc: "rwsrc4",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "1130000",
    },
    {
      workPlanId: 3,
      rwsrc: "rwsrc3",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "450000",
    },
    {
      workPlanId: 4,
      rwsrc: "rwsrc2",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "1780000",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:tap? colors.tableHeaderColor:"gray",
            paddingVertical: 10,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Sanitation</Text>
        </View>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            paddingVertical: 10,
            borderBottomRightRadius:5,
            borderTopRightRadius:5
          }}
        >
          <Text>Water</Text>
        </View>
      </View>
      {/* <View style={{flex:1,padding:16}}>
{
    data.map((item,index)=>{
        return(
            <Pressable 
            onPress={()=>navigation.navigate("Report",{data:{item}})}
            key={index} style={{backgroundColor:"#99c2ff",marginTop:10,height:height*0.1,justifyContent:"center",alignItems:"center",borderRadius:10}}>
                <Text>{Object.keys(item)[0]}: {item.workPlanId}</Text>
            </Pressable>
        )
    })
}
            
        </View> */}
    </View>
  );
};

export default Dashboard;
