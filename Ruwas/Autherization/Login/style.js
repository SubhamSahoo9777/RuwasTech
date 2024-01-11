import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 20
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    logoText: {
        color: '#c3dbfa',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 10, // Adjust the margin as needed
    },
    subLogoText:
    {
        color: '#fadfc3',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 5
    },
    input: {
        flex: 1,
        borderBottomColor: 'transparent',
        color: '#fff'
    },
    icon: {
        marginRight: 10,
    },
    loginButton: {
        backgroundColor: '#44abe0',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'rgba(89, 122, 164,0.8)',
        borderRadius: 10,

    }
});


export default styles;