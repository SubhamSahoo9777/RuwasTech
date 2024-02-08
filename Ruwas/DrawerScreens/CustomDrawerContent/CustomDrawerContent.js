import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons,Entypo,Octicons} from '@expo/vector-icons';
import styles from './style';
import { DrawerActions } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomDrawerContent = ({ navigation }) => {
    const data = ['Dashboard',"Sync Data"];
    const drawerStatus = useDrawerStatus();
    const [isExp, setExp] = React.useState(null)

    const icons = ['dashboard','graph']
   

    const handleNav = (v, m) => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate(v, { type: m })
    }

    React.useEffect(() => {
        drawerStatus == 'closed' && setExp(null);
    }, [drawerStatus])

    return (
        <View style={styles.container}>
            {data.map((v, index) => (
                <View
                    key={index}
                >
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => handleNav(v)}
                    >
                        {v == 'Dashboard' &&
                            <MaterialIcons name="dashboard" size={20} color="#808080" />
                        }
                        {v == 'Sync Data' &&
                            <MaterialIcons name="sync" size={24} color="black" />
                        }
                       

                        <Text style={styles.drawerText}>{v}</Text>

                    </TouchableOpacity >
                </View>
            ))
            }
        </View >
    );
};


export default CustomDrawerContent;
