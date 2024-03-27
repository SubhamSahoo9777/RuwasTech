import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomFooterButtomTab from './CustomFooterButtomTab';
import { useTheme } from 'react-native-paper';

const Profile = () => {
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
<CustomFooterButtomTab screenName="Profile" />
</View>
      </View>
    </View>
  );
}

export default Profile

const styles = StyleSheet.create({})