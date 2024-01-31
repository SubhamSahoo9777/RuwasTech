import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieFileLoader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation - 1706678795239.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"rgba(0,0,0,0.3)",
    zIndex:0
  },
});

export default LottieFileLoader;
