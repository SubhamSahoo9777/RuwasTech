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



const styles = StyleSheet.create({})