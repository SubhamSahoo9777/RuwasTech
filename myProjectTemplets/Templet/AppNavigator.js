import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native"; // Import StatusBar
import LogIn from "./screens/stackScreens/LogIn";
import SignUp from "./screens/stackScreens/SignUp";
import NavigateDecider from "./NavigateDecider";
import Splash from "./screens/stackScreens/Splash";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#82785c" barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NavigateDecider"
          component={NavigateDecider}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
