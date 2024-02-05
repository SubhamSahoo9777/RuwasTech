import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { retrieveData } from '../../components/AllLocalDatabaseFunction';
const Dashboard = ({navigation}) => {
    const fetchTableData=async()=>{
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>fetchTableData()}>
            <Text>Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Dashboard;
