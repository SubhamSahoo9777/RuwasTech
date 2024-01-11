// CustomHeaderButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Ionicons name={props.iconName} size={23} color='#20187f'/>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
