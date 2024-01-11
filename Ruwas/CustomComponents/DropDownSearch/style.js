import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container:
    {
        maxHeight: width * 0.9,
    },
    selectionDataContainer:
    {
        padding: 10,
        backgroundColor: '#dfedeb',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    selectionDataText:
    {
        fontWeight: '500',
        color: '#281d71',
        fontWeight:'bold',
    },
    NotFoundData:
    {
        color: '#281d71',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    selectedText:
    {
        backgroundColor: '#ccc5f4',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default styles;