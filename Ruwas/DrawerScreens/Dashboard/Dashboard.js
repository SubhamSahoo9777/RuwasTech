import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { retrieveData } from '../../components/AllLocalDatabaseFunction';
import { SuccessModal } from '../../components/AllModals';
const Dashboard = ({navigation}) => {
    const [show,setShow]=useState(false)
    const fetchTableData=async()=>{
        const data=await retrieveData("rwsrc")
        console.log(data);
    }
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={()=>fetchTableData()}>
            <Text>Dashboard</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>setShow(!show)}>
            <Text>Modal</Text>
            </TouchableOpacity>
            <SuccessModal show={show} setShow={setShow}/>
        </View>
    );
};


export default Dashboard;
