import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const RotatingImage = ({ source, style }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animatable.Image
        animation="rotate"
        iterationCount="infinite"
        easing="linear"
        duration={2000}
        source={source}
        style={style}
      />
    </View>
  );
}

export default RotatingImage;
