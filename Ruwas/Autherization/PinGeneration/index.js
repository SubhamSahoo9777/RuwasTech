import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './style';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import Alerts from '../../CustomComponents/Alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const { height, width } = Dimensions.get('screen');

const _gap = width * 0.1 / 1.5;
const number_Size = width * 0.2 / 1.5;

const backgroundColor = (item) => item == '' ? { backgroundColor: 'transparent' } : { backgroundColor: '#c9fffe' };


const PinGeneration = ({ navigation }) => {
    const numbers = [...Array(12).keys()].map((_, i) => i + 1)
    const numericPad = numbers.map((v) => v == 10 ? 'close' : v == 11 ? '0' : v == 12 ? '' : v);
    const [code, setCode] = React.useState([]);
    const [confirmCode, setConfirmCode] = React.useState([]);
    const [codeView, setCodeView] = React.useState([...Array(4).keys()])
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [show, setShow] = React.useState(false);

    const onAlertPress = () => {
        setCode([]);
        setConfirmCode([]);
    }

    const onPress = (item) => {
        if (code.length == 4) {
            onPressNew(item, confirmCode, setConfirmCode);
        }
        else {
            onPressNew(item, code, setCode)
        }
    }

    const onPressNew = (item, code, setCode) => {
        if (item == 'close') {
            const updated = [...code];
            setCode(updated.slice(0, code.length - 1))
        }
        else {
            if (code.length !== 4) {
                setCode([...code, item])
            }
        }
    }

    const setMyPin = async (pin) => {
        await AsyncStorage.setItem('Pin', pin);
        setTimeout(() => {
            setSuccess('');
            setCode([]);
            setConfirmCode([]);
            navigation.navigate('PinAccess')
        }, 2000)
    }

    const CheckPins = () => {
        if (code.length == 4) {
            if (code.length == confirmCode.length) {
                const check = code.every((v, index) => parseInt(v) == parseInt(confirmCode[index]));
                if (check) {
                    setSuccess('Pin Generated !');
                    const pin = code.join("");
                    setMyPin(pin);
                }
                else {
                    setError('Pins Do not Match !');
                }
            }
        }
        else {
            code.length == 0 ? setShow(false) : null;
            code.length == 4 && confirmCode.length == 0 ? setShow(false) : null;
        }
    }

    const renderViewCode = (index, check) => {
        return <MotiView
            from={{ translateY: -20,scale:1.5, scaleX: -1 }}
            transition={{ type: 'spring' }}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            animate={{
                translateY: 0,
                scale:1,
                scaleX: 1,
                height: number_Size * 0.5,
                width: number_Size * 0.5,
                scale: check ? 1 : 0.5,
                opacity: check ? 1 : 0.5,
                borderRadius: number_Size,
                backgroundColor: 'transparent',
                marginBottom: check ? 20 : 10
            }}
        >

            {check && show ?
                <Text style={styles.showPassText}>{check}</Text> :
                <Ionicons name="md-star-half" size={24} color={check ? 'skyblue' : '#ccc'} />
            }
        </MotiView>
    }


    const showPin = () => {
        return <TouchableOpacity
            onPress={() => { setShow(!show) }}
            style={{ flexGrow: 0.2 }}
        >
            {code.length > 0 &&
                code.length == 4 ? confirmCode.length > 0 &&
            <MotiView
                from={{ scale: 0, translateX: 20 }}
                animate={{ scale: 1, translateX: 0 }}
            >
                <Entypo name={show ? "eye-with-line" : 'eye'} size={24} color="#fff" />
            </MotiView>
                :
                code.length > 0 &&
                <MotiView
                    from={{ scale: 0, translateX: 20 }}
                    animate={{ scale: 1, translateX: 0 }}
                >
                    <Entypo name={show ? "eye-with-line" : 'eye'} size={24} color="#fff" />
                </MotiView>
            }
        </TouchableOpacity>
    }

    const renderItem = ({ item, index }) => {
        return (
            <MotiView
                from={{ scale: 0, translateY: 100 }}
                animate={{ scale: 1, translateY: 0 }}
                transition={{ type: 'timing', delay: index * 100 }}
            >
                <TouchableOpacity style={[styles.padContainer]}
                    onPress={() => {
                        if (item == '') {
                            if (code.length == 4 && confirmCode.length == 4) {
                                CheckPins();
                            }
                            else {
                                return;
                            }
                        }
                        onPress(item)
                    }}
                >

                    {item !== 'close' ?
                        item == '' ?
                            <Entypo name="check" size={number_Size * 0.5} color="#182a61" />
                            :
                            <Text style={[styles.padItemText, { fontSize: number_Size * 0.5 }]}>{item}</Text>
                        :
                        <Ionicons name="ios-backspace" size={number_Size * 0.5} color="#182a61" />
                    }
                </TouchableOpacity>
            </MotiView>
        )
    }

    const renderHeading = () => {
        return <MotiView style={[styles.successContainer, { flexDirection: 'row' }]}
            from={{ translateY: 20, scaleX: 0 }}
            animate={{ translateY: 0, scaleX: 1 }}
        >
            <Text style={styles.headingText}>{code.length == 4 ? 'Confirm Your 4 Digits Pin' : 'Create Your 4 Digits Pin'}</Text>
        </MotiView>
    }

    const renderTick = () => <><MotiView style={styles.successContainer}
        from={{ translateY: 20, scaleX: 0 }}
        animate={{ translateY: 0, scaleX: 1 }}
    >
        <AntDesign name="checkcircle" size={44} color="lightgreen" />
        <MotiView style={[styles.successContainer, { flex: 0 }]}
            from={{ translateX: 20, scaleX: 0 }}
            animate={{ translateX: 0, scaleX: 1 }}
        >
            <Text style={styles.successText}>{success}</Text>
        </MotiView>
    </MotiView>
    </>

    const renderCodeView = () => {
        return <FlatList
            data={codeView}
            keyExtractor={(_, i) => `key${i}`}
            horizontal
            style={{ flexGrow: 0, marginBottom: 50 }}
            contentContainerStyle={{ gap: _gap * 0.3, alignItems: 'flex-end', height: number_Size }}
            renderItem={({ item, index }) => {
                const check = code.length == 4 ? confirmCode[index] : code[index]
                return <MotiView
                    from={{ translateY: 30, scaleX: 0 }}
                    transition={{ type: 'timing', delay: index * 100 }}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    animate={{
                        translateY: 0,
                        scaleX: 1,
                        height: number_Size * 0.5,
                        width: number_Size * 0.5,
                        borderRadius: number_Size,
                        backgroundColor: 'transparent'
                    }}
                >
                    {check && renderViewCode(index, check)}
                    {!check && renderViewCode(index, check)}
                </MotiView>
            }}
        />
    }

    return (
        <View style={styles.container}>
            <View
                style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(6, 3, 40,0.2)' }]}
            />
            <TouchableOpacity
                onPress={() => { setCode([]); setConfirmCode([]) }}
                style={{ flexGrow: 0.2, width: width * 0.9, justifyContent: 'center' }}
            >
                {code.length == 4 &&
                    <MotiView
                        from={{ scaleY: 0, translateX: 20 }}
                        animate={{ scaleY: 1, translateX: 0 }}
                    >
                        <Ionicons name="caret-back" size={24} color="black" style={styles.headingText} />
                    </MotiView>
                }
            </TouchableOpacity>
            {error && <Alerts showAlert={error} setShowAlert={setError} onPress={onAlertPress} />}
            {
                success &&
                renderTick()
            }
            {
                code.length == 4 && !success &&
                <>
                    {renderHeading()}
                    {renderCodeView()}
                </>
            }
            {
                code.length !== 4 && !success &&
                <>
                    {renderHeading()}
                    {renderCodeView()}
                </>
            }

            {/* {showPin()} */}

            <FlatList
                data={numericPad}
                columnWrapperStyle={{ gap: _gap }}
                contentContainerStyle={{ justifyContent: 'center', gap: _gap }}
                numColumns={3}
                keyExtractor={(_, i) => `key${i}`}
                renderItem={renderItem}
            />
        </View >
    )
}

export default PinGeneration;