import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native"; // Import StatusBar
import LogIn from "./screens/stackScreens/LogIn";
import SignUp from "./screens/stackScreens/SignUp";
import NavigateDecider from "./NavigateDecider";
import Splash from "./screens/stackScreens/Splash";
import Profile from "./screens/stackScreens/Profile";
import Settings from "./screens/stackScreens/Settings";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

export default function AppNavigator() {
  theme=useTheme()
  console.log('====================================');
  console.log(theme.colors.statusbar.global);
  console.log('====================================');
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.statusbar.global} barStyle="light-content" />
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
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
