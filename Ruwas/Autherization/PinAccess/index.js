import { Animated, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Alerts from '../../CustomComponents/Alerts';

import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;


const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const PinAccess = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    // function handleBackButtonClick() {
    //     // BackHandler.exitApp();
    //     return true;
    // }

    // React.useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    //     return () => {
    //         BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    //     };
    // }, []);

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };


        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    const validatePin = async () => {
        const pin = await AsyncStorage.getItem('Pin');
        if (!value) {
            setError('Please Enter Pin !')
            return;
        }
        if (parseInt(value) !== parseInt(pin)) {
            console.log(typeof value)
            setError('Please Enter Valid Pin !');
            setValue('');
            return;
        }
        setValue('');
        navigation.navigate('WSDB');
        console.log(value)
    }

    React.useEffect(() => {
        if (value.length == 4) {
            validatePin();
        }
    }, [value])

    return (
        <SafeAreaView style={styles.root}>
            <View
                style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(90, 23, 60,0.1)' }]}
            />
            {error && <Alerts showAlert={error} setShowAlert={setError} />}
            <Text style={styles.title}>Verification</Text>
            <Image style={styles.icon} source={require('../../assets/lock.png')} />
            <Text style={styles.subTitle}>
                Please Enter Your Pin
            </Text>
            <View style={{ margin: 20 }}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />

                {/* <TouchableOpacity
                    onPress={validatePin}
                    style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Verify</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

export default PinAccess;