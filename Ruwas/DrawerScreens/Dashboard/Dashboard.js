import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import {height} from "../../components/AllPackages"
const Dashboard = ({navigation}) => {
    const [show,setShow]=useState(false)
const data=[
    {
    workPlanId:1,
    rwsrc:"rwsrc1",
    localGovt:"Adjumani",
    budgetType:"water",
    dateOfApprovedByCouncil:"12/7/2022",
    planedBudget:"120000",


    },
    {
    workPlanId:2,
    rwsrc:"rwsrc4",
    localGovt:"Adjumani",
    budgetType:"water",
    dateOfApprovedByCouncil:"12/7/2022",
    planedBudget:"1130000",

    },
    {
        workPlanId:3,
        rwsrc:"rwsrc3",
        localGovt:"Adjumani",
        budgetType:"water",
        dateOfApprovedByCouncil:"12/7/2022",
        planedBudget:"450000",
    
    },
    {
        workPlanId:4,
        rwsrc:"rwsrc2",
        localGovt:"Adjumani",
        budgetType:"water",
        dateOfApprovedByCouncil:"12/7/2022",
        planedBudget:"1780000",
    
    },
]
    return (
        <View style={{flex:1,padding:16}}>
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
            
        </View>
    );
};


export default Dashboard;
