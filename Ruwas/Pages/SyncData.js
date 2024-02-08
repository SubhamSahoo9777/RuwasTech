import React from 'react';
import { View } from 'react-native';
import RotatingImage from '../components/RotatingImage';

const SyncData = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <RotatingImage
        source={require("../assets/synchronize.png")}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
}

export default SyncData;


