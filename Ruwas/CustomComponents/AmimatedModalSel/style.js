import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        paddingVertical: width * 0.1 / 5,
        borderBottomColor: '#134484',
        marginBottom: width * 0.1 / 7
    },
    lable: {
        padding: width * 0.1 / 4,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    overlay: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.1 / 5
    },
    lableText: {
        fontWeight: '400',
        color: '#293b87'
    },
    NoDataCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NoDataContText: {
        alignSelf: 'center',
        fontStyle: 'italic'
    },
    buttonsContainer:
    {
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:5
    },
    SearchBar:{
        width:width
    }

})

export default styles;