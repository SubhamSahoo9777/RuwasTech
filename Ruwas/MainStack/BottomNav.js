import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import DrawerNavigator from './DrawerNavigator';
import Profile from './Profile';
import { DrawerActions } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BottomNav = ({ navigation }) => {

    const handleProfileTabPress = () => {
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('Profile');
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#20187f',
                tabBarInactiveBackgroundColor: '#f7fdfd',
                tabBarActiveBackgroundColor: '#f7fdfd'
            }}
        >
            <Tab.Screen
                name="Home"
                component={DrawerNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome name="home" size={focused ? 24 : 20} color={focused ? '#20187f' : '#ccc'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        handleProfileTabPress();
                    },
                })}
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome name="user" size={focused ? 24 : 20} color={focused ? '#20187f' : '#ccc'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNav;

