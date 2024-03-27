import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native"; // Import StatusBar
import LogIn from "./screens/stackScreens/LogIn";
import SignUp from "./screens/stackScreens/SignUp";
import NavigateDecider from "./NavigateDecider";
import Splash from "./screens/stackScreens/Splash";
import Profile from "./screens/stackScreens/Profile";
import Settings from "./screens/stackScreens/Settings";
import { useTheme } from "react-native-paper";
import PinGeneration from "./screens/stackScreens/PinGeneration";
import ConformPin from "./screens/stackScreens/ConformPin";
import PinAccess from "./screens/stackScreens/PinAccess";
import CustomFooterButtomTab from "./screens/stackScreens/CustomFooterButtomTab";
import Notification from "./screens/stackScreens/Notification";
import Sync from "./screens/stackScreens/Sync";
const Stack = createStackNavigator();

export default function AppNavigator() {
  const theme = useTheme(); // Fix: Added const keyword
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.statusbar.global}
        barStyle="light-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.ModalFadeTransition,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinGeneration"
          component={PinGeneration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConformPin"
          component={ConformPin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinAccess"
          component={PinAccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
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
        <Stack.Screen
          name="CustomFooterButtomTab"
          component={CustomFooterButtomTab}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sync"
          component={Sync}
          options={{ headerShown: true }}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
