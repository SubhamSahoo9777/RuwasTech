import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  const [screenName, setScreenName] = useState("");

  const createProfile = async () => {
    try {
      await AsyncStorage.setItem('screenName', screenName);
      // Navigate to Profile screen
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving screen name:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [screenName, setScreenName] = useState("");

  const createProfile = async () => {
    try {
      await AsyncStorage.setItem('screenName', screenName);
      // Navigate to Profile screen
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving screen name:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder='Enter a Screen name which you want to create'
        onChangeText={(t) => setScreenName(t)}
        value={screenName}
      />
      <Pressable onPress={createProfile}>
        <Text>Create</Text>
      </Pressable>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [screenName, setScreenName] = useState("");

  React.useEffect(() => {
    const getScreenName = async () => {
      const storedScreenName = await AsyncStorage.getItem('screenName');
      if (storedScreenName) {
        setScreenName(storedScreenName);
      }
    };
    getScreenName();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Profile: {screenName}</Text>
      {/* Add a button to navigate back to Home */}
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Go back to Home</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
