import React, { useRef, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const HorizontalScrollRow = () => {
  const x = [...Array(200).keys()];
  const flatListRef = useRef(null);
  const [contentPositions, setContentPositions] = useState([]);
  const handleLayout = useCallback((index, layout) => {
    const { y } = layout;
    setContentPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = y;
      return newPositions;
    });
  }, []);

  const scrollToContent = useCallback((index) => {
    const newY = contentPositions[index];
    flatListRef.current?.scrollToOffset({ offset: newY, animated: true });
  }, [contentPositions]);

  return (
    <View style={{}}>
      <FlatList
        horizontal
        ref={flatListRef}
        data={x}
        renderItem={({ item, index }) => (
          <View style={{backgroundColor:"green",marginRight:10}}
            onLayout={(event) => handleLayout(index, event.nativeEvent.layout)}
          >
            <Text style={styles.text}>Content {item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => scrollToContent(49)}
      >
        <Text style={styles.button}>Scroll to Content 1</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: 5,
  },
});

export default HorizontalScrollRow;
