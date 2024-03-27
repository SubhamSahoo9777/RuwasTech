import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';
import CustomFooterButtomTab from './CustomFooterButtomTab';

const Notification = () => {
    const { colors } = useTheme();
    // console.log(colors);
    return (
      <View
        style={{ flex: 1, backgroundColor: colors.screen.global }}
      >
        <StatusBar
          backgroundColor={colors.statusbar.dashBoardColor}
          barStyle="dark-content"
        />
        <View style={{flex:1,justifyContent:"space-between"}}>
          {/* ---------------------------------------------------------------------------------------------body  */}
  <View>
  
  </View>
  {/* ----------------------------------------------------------------------------------------------footer  */}
  <View>
  <CustomFooterButtomTab screenName="Notification" />
  </View>
        </View>
      </View>
    );
}

export default Notification

const styles = StyleSheet.create({})