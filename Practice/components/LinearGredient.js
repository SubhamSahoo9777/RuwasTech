import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable'; 

const LinearGredient = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#99ccff', '#0000FF']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1, padding: 16, justifyContent: 'center' }}
      >
        <Animatable.View
          animation={{
            from: { rotateY: "0deg" },
            to: { rotateY: "360deg" },
          }}
          easing="ease-out"
          iterationCount={1}
          duration={1500}
          style={{ }} // Added style prop to center the Animatable.View
        >
          <BlurView
            style={{ height: 500, margin: 20, elevation: 10 }}
            intensity={70}
          >
            <Text style={{ color: "#fff" }}>subham kumar sahoo</Text>
          </BlurView>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};


export default LinearGredient

const styles = StyleSheet.create({})