import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from './colors'

export const SubmitButton = ({title,onPress,buttonStyle}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[{minHeight:45,justifyContent:"center",alignItems:"center",backgroundColor:colors.submitBackColor,marginTop: 25,borderRadius:10},buttonStyle && buttonStyle]}>
        <Text style={[{color:colors.submitTitleColor,fontWeight:"500",fontSize:13}]}>{title || "Submit"}</Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({})