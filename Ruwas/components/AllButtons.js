import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from './colors'

export const SubmitButton = ({ title, onPress, Icon }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'darkgreen',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
      }}
    >
      <Text style={{
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 10
      }}>{title || "SUBMIT"}</Text>
      {Icon && Icon}
    </TouchableOpacity>
  )
}
export const SubmitButton2 = ({title,onPress,buttonStyle}) => {
  return (
    <Pressable 
    onPress={onPress}
    style={[{minHeight:45,justifyContent:"center",alignItems:"center",backgroundColor:colors.submitBackColor,marginTop: 25,borderRadius:10},buttonStyle && buttonStyle]}>
        <Text style={[{color:colors.submitTitleColor,fontWeight:"500"}]}>{title || "Submit"}</Text>
    </Pressable>
  )
}



const styles = StyleSheet.create({})