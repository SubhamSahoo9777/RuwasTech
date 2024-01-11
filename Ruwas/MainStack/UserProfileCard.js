import React from "react";
import { View, Animated } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "react-native-paper";


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


  return (
    <View>
      <IconButton
        icon={() => <Ionicons name="ellipsis-vertical" size={24} color="#20187f" />}
        onPress={toggleOptions}
      />
      {showOptions && (
        <Animated.View
          style={{
            transform: [{ scale: optionsScale }],
            flexDirection: 'row',
            position: 'absolute',
            top: 50,
            right: 10,
            backgroundColor: '#fff',
            elevation: 4,
            borderRadius: 10,
            height: 50,
            width: 100,
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <IconButton
            icon={() => <EvilIcons name="user" size={30} color="black"
              onPress={() => navigation.navigate('Profile')}
            />}

          />
          <IconButton
            icon={() => <EvilIcons name="lock" size={30} color="black" />}
            onPress={() => navigation.navigate('Login')}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default UserProfileCard;