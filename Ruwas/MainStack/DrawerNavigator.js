import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import {
    View,
    Text,
    Image,
    SafeAreaView
} from "react-native";
import { Dashboard, CustomDrawerContent } from '../DrawerScreens';


const Drawer = createDrawerNavigator();


const LogoData = () => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 20, justifyContent: 'center' }}>
            <Image source={require('../assets/logo.png')} style={{ height: 30, width: 30 }} />
            <Text
                style={{
                    fontSize: 12,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#20187f"
                }}

            >
                Republic Of Uganda
            </Text>

            <Text
                style={{
                    marginVertical: 6,
                    fontWeight: "bold",
                    fontSize: 9,
                    color: "#20187f",
                    textAlign: 'center'
                }}
            >
                Ministry of Water & Environment
            </Text>

            <Text
                style={{
                    marginVertical: 6,
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#20187f"
                }}
            >
                RUWAS
                {/* UGANDA WATER SUPPLY DATABASE */}
            </Text>
        </View>
    )
}

const DrawerNavigator = ({ route }) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: "#f7ffff",
                    width: '44%',
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
                headerShown: false
            }}
            drawerType="slide"
            drawerContent={(props) => {
                return (
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <CustomDrawerContent {...props} />
                        </View>
                        <View style={{ flex: 0, paddingBottom: 20 }}>
                            {LogoData()}
                        </View>
                    </SafeAreaView>
                );
            }
            }
        >
            <Drawer.Screen
                name="Dashboard"
                options={{
                    drawerIcon: () => (
                        <MaterialIcons name="dashboard" size={20} color="#808080" />
                    ),
                }}
                component={Dashboard}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
