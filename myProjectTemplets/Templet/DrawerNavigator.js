import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDashBoard1 from "./screens/drawerScrees/DrawerDashBoard1";
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DrawerDashBoard" component={DrawerDashBoard1} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
