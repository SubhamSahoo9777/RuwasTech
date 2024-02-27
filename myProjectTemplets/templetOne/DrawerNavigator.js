import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDashBoard1 from "./screens/drawerScrees/DrawerDashBoard1";
import CustomDrawerContent from "./allProjectComponents/CustomDrawerContent";
import { useTheme, Provider as PaperProvider } from "react-native-paper";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const theme = useTheme();
  console.log(theme.colors);

  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f7ffff",
            width: "55%",
            marginTop: 0,
          },
          headerStyle: {
            backgroundColor: theme.colors.screenHeader.global,
          },
          headerTintColor: theme.colors.screenHeader.headerTitleColor,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "#111",
          },
          headerShown: true,
        }}
        drawerType="slide"
        drawerContent={(props) => {
          return <CustomDrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="DrawerDashBoard" component={DrawerDashBoard1} />
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default DrawerNavigator;
