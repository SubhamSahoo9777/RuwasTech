import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ImageView = ({ imageSource, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <ImageBackground
        source={imageSource}
        style={styles.backgroundImage}
        onLoad={handleImageLoad}
      >
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageView;
