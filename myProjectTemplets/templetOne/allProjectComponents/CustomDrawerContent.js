import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomDrawerContent = ({ navigation }) => {
  const navigateAndCloseDrawer = (screen) => {
    navigation.closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <View style={{ backgroundColor:"#e7f0fd", flex:1 }}>
      <Pressable 
        style={{ backgroundColor:"red", marginTop: 20 }} 
        onPress={() => navigateAndCloseDrawer("DrawerDashBoard")}>
        <Text>DashBoard</Text>
      </Pressable>
      <Pressable 
        style={{ backgroundColor:"red", marginTop: 20 }} 
        onPress={() => navigateAndCloseDrawer("Profile")}>
        <Text>Profile</Text>
      </Pressable>
      <Pressable 
        style={{ backgroundColor:"red", marginTop: 20 }} 
        onPress={() => navigateAndCloseDrawer("Settings")}>
        <Text>Settings</Text>
      </Pressable>
    </View>
  );
}

export default CustomDrawerContent;
