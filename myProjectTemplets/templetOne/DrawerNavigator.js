import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDashBoard1 from "./screens/drawerScrees/DrawerDashBoard1";
import CustomDrawerContent from "./allProjectComponents/CustomDrawerContent";
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
          backgroundColor: "#f7ffff",
          width: '55%',
          marginTop: 55,
      },
      headerStyle: {
          backgroundColor: "#0D47a4",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
          fontWeight: "bold",
      },
      drawerLabelStyle: {
          color: "#111",
      },
      headerShown: true
  }}
  drawerType="slide"
  drawerContent={(props) => {
      return (
      
                  <CustomDrawerContent {...props} />
          
      );
  }
  }
    >
      <Drawer.Screen name="DrawerDashBoard" component={DrawerDashBoard1} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
