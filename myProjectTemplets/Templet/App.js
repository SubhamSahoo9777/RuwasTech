import { useColorScheme } from "react-native";
import AppNavigator from "./AppNavigator";
import { MD3LightTheme, PaperProvider, MD3DarkTheme } from "react-native-paper";
import { LightScheme as CustomLightScheme } from "./colors/lightScheme";
import { DarkScheme as CustomDarkScheme } from "./colors/darkScheme";
import { Provider } from "react-redux";
import Store from "./redux/Store";

const LightTheme = {
  ...MD3LightTheme,
  colors: CustomLightScheme,
};
const DarkTheme = {
  ...MD3DarkTheme,
  colors: CustomDarkScheme,
};

export default function App() {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = colorScheme == "dark" ? DarkTheme : LightTheme;
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}
