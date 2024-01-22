import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from './colors'

export const SubmitButton = ({title,onPress,buttonStyle}) => {
  return (
    <Pressable 
    onPress={onPress}
    style={[{minHeight:45,justifyContent:"center",alignItems:"center",backgroundColor:colors.submitBackColor,marginTop: 25,borderRadius:10},buttonStyle && buttonStyle]}>
        <Text style={[{color:colors.submitTitleColor,fontWeight:"500"}]}>{title || "Submit"}</Text>
    </Pressable>
  )
}



const styles = StyleSheet.create({})