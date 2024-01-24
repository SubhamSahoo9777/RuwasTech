import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from './colors'

const NormalSearch = () => {
  return (
    <View>
     <TextInput
     placeholder='Search by No.'
     placeholderTextColor={"#fff"}
     style={{
        borderWidth:.5,
        borderRadius:5,
        minHeight:30,
        fontSize:13,
        marginTop:10,
        backgroundColor:colors.tableHeaderColor,
        paddingLeft:10,
        paddingVertical:5,
        color:"#fff"
     }}
     />
    </View>
  )
}

export default NormalSearch

const styles = StyleSheet.create({})