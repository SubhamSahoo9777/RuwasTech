import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import VectorIcon from "./VectorIcon";

export const AnimatedLogoImage = ({
  Textstyle,
  imageLogostyle,
  textAnimate = false,
  imageLogoAnimate = false,
  animation = "rotate",
  easing = "linear",
  iterationCount = "infinite",
  duration = 2000,
  content = "My Name Is  Subham",
  source = (
    <VectorIcon type="AntDesign" name="rightcircle" size={24} color="#fff" />
  ),
}) => {
  return (
    <Animatable.View>
      {textAnimate && (
        <Animatable.Text
          style={[{ color: "#fff" }, Textstyle]}
          animation={animation}
          iterationCount={iterationCount}
          duration={duration}
          easing={easing}
        >
          {content}
        </Animatable.Text>
      )}
      {imageLogoAnimate && (
        <Animatable.View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            },
            imageLogostyle,
          ]}
          animation={animation}
          iterationCount={iterationCount}
          duration={duration}
          easing={easing}
        >
          <Animatable.View
            animation={animation}
            iterationCount={iterationCount}
            duration={duration}
            easing={easing}
          >
            {source}
          </Animatable.View>
        </Animatable.View>
      )}
    </Animatable.View>
  );
};

export const RotationAnimation = ({
  imageLogoStyle,
  source = (
    <VectorIcon type="AntDesign" name="rightcircle" size={24} color="#fff" />
  ),
}) => {
  const [rotation, setRotation] = useState(0);
  const [show, setShow] = useState(false);

  const handlePress = () => {
    setShow(!show);
    setRotation(show ? rotation - 90 : rotation + 90);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Animatable.View
          style={[
            {
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            },

            { transform: [{ rotate: `${rotation}deg` }] },
            imageLogoStyle,
          ]}
        >
          {source}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};
export const TextAnimation = ({ text = "RUWAS", imageLogoStyle }) => {
  return (
    <View style={{}}>
      <Animatable.View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          },
          imageLogoStyle,
        ]}
      >
        {[...text].map((letter, index) => (
          <Animatable.Text
            key={index}
            animation={index == 0 ? "slideInLeft" : "slideInRight"}
            iterationCount={1}
            duration={2000 + index * 300}
            easing={"ease"}
            style={{ color: "#fff", fontSize: 25 }}
          >
            {letter}
          </Animatable.Text>
        ))}
      </Animatable.View>
    </View>
  );
};
