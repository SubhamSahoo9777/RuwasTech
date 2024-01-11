import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen');

const number_Size = width * 0.2 / 1.3;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20187f',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    padContainer: {
        height: number_Size,
        width: number_Size,
        borderRadius: number_Size * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    padItemText: {
        fontWeight: 'bold',
        color: '#182a61'
    },
    PinContainer: {
        height: number_Size * 0.8,
        width: number_Size * 0.8,
        borderRadius: number_Size
    },
    headingText: {
        fontWeight: 'bold',
        color: 'skyblue',
        textTransform: 'capitalize'
    },
    successContainer: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    successText: {
        fontWeight: 'bold',
        color: 'lightgreen',
        margin: 10
    },
    showPassText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default styles;