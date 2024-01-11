import React from 'react';
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import { InsertData, selectData } from '../../DataBaseHandle';
import TableCreations from '../../DataBaseHandle/TableCreations';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        TableCreations();
    }, [])

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    const checkItemExists = async () => {
        const value = await AsyncStorage.getItem('LocationDetails');
        return value;
    }

    const handleLogin = async () => {
        console.log('Username:', username);
        console.log('Password:', password);
        const check = await checkItemExists();
        if (check !== null) {
            const pinCheck = await AsyncStorage.getItem('Pin');
            if (pinCheck !== null) {
                navigation.navigate('PinAccess')
            }
            else {
                navigation.navigate('PinGeneration')
            }
        }
        else {
            InsertLoc()
        }
    };

    const InsertLoc = async () => {
        setLoading(true);
        fetch('http://182.18.181.115:8084/api/Masterdata/Getadministrativeboundries').
            then(response => response.json()).
            then(result => JSON.parse(result)).
            then(async result => {
                await AsyncStorage.setItem('LocationDetails', JSON.stringify(result));
                setLoading(false);
                setTimeout(() => {
                    navigation.navigate('PinGeneration')
                }, 1000)
            })
    }

    return (
        <ImageBackground
            source={require('../../assets/waterBackground.jpg')} // Replace with your background image
            style={styles.backgroundImage}
        >
            <LinearGradient
                colors={[
                    'rgba(32, 24, 127, 1)',
                    'rgba(32, 24, 127, 0.5)',
                    'rgba(32, 24, 127, 0.3)',
                    'rgba(32, 24, 127, 0.1)'
                ]}
                style={styles.container}
            >
                <View style={styles.overlay}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        <Text style={styles.logoText}>RUWAS</Text>
                    </View>

                    <View style={styles.logoContainer}>
                        <Text style={styles.subLogoText}> Ministry of Water & Environment</Text>
                    </View>

                    <View style={[styles.inputContainer, styles.textInput]}>
                        <Hoshi
                            label={'Username'}
                            borderColor={'#c3fbed'}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                            style={styles.input}
                            color="#fff"
                            labelStyle={customLabelStyle} // Apply custom label styles here
                        />
                        <Icon name="user" size={20} color="#c3fbed" style={styles.icon} />
                    </View>

                    <View style={[styles.inputContainer, styles.textInput]}>
                        <Hoshi
                            label={'Password'}
                            borderColor={'#e2fac3'}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                            style={styles.input}
                            color="#fff"
                            labelStyle={customLabelStyle} // Apply custom label styles here
                        />
                        <Icon name="lock" size={20} color="#e2fac3" style={styles.icon} />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                {loading &&
                    <AwesomeAlert
                        show={true}
                        showProgress={true}
                        message='Loading ...'
                        messageStyle={{ color: 'blue', fontWeight: 'bold' }}
                    />
                }
            </LinearGradient>
        </ImageBackground>
    );
};

const customLabelStyle = {
    color: '#c3dbfa',       // Label text color
    fontSize: 16,        // Label font size
    fontWeight: 'bold' // Label font weight
};


export default Login;
