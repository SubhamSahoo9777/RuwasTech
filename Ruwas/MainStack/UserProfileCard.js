import React from "react";
import { View, Animated } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deletetable } from "../components/AllLocalDatabaseFunction";
const UserProfileCard = () => {
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = React.useState(false);
  const optionsScale = React.useRef(new Animated.Value(0)).current;

  const toggleOptions = () => {
    if (showOptions) {
      Animated.timing(optionsScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setShowOptions(false);
      });
    } else {
      setShowOptions(true);
      Animated.timing(optionsScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlecleartoken = async () => {
    // await AsyncStorage.setItem("token", JSON.stringify(null));
    // deletetabledata();
    navigation.navigate("PinAccess");
    
  };
  // const deletetabledata = async () => {
  //   deletetable("finantialYear");
  //   deletetable("rwsrc");
  //   deletetable("districts");
  //   deletetable("userDetais");
    
  // };
  return (
    <View>
      <IconButton
        icon={() => (
          <Ionicons name="ellipsis-vertical" size={24} color="#20187f" />
        )}
        onPress={toggleOptions}
      />
      {showOptions && (
        <Animated.View
          style={{
            transform: [{ scale: optionsScale }],
            flexDirection: "row",
            position: "absolute",
            top: 50,
            right: 10,
            backgroundColor: "#fff",
            elevation: 4,
            borderRadius: 10,
            height: 50,
            width: 100,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={() => (
              <EvilIcons
                name="user"
                size={30}
                color="black"
                onPress={() => navigation.navigate("Profile")}
              />
            )}
          />
          <IconButton
            icon={() => <EvilIcons name="lock" size={30} color="black" />}
            onPress={handlecleartoken}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default UserProfileCard;