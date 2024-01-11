import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

const Dashboard = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
            <Text>Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Dashboard;
