import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import colors from "./colors";
import VectorIcon from "./VectorIcon";

const SearchAnimation = () => {
  const animation = useSharedValue(0);
  const [value, setValue] = useState(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1
          ? withTiming("100%", { duration: 500 })
          : withTiming("20%", { duration: 500 }),
    };
  });

  return (
    <View style={{ flexDirection: "row-reverse" }}>
      <Animated.View
        style={[
          {
            height: 40,
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.1)",
            alignItems: "center",
            borderRadius: value !== 1 ? 100 : 100,
            flexDirection: "row",
            justifyContent: "center",
          },
          animatedStyle,
        ]}
      >
        {value == 1 ? (
          <TextInput
            placeholder={"Search Table Data..."}
            placeholderTextColor={"#fff"}
            style={{ width: "85%", color: "#fff", opacity: 0.5,paddingLeft:10 }}
          />
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (animation.value == 1) {
              animation.value = 0;
              setValue(0);
            } else {
              animation.value = 1;
              setValue(1);
            }
          }}
        >
          <VectorIcon
            type="AntDesign"
            name={"search1"}
            size={27}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchAnimation;

const styles = StyleSheet.create({});
