import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./AppNavigator";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
