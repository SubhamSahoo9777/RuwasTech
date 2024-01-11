import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    DisableTxtInput: {
        borderWidth: 1.5,
        borderRadius: 10,
        height: 50,
        paddingLeft: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
        marginVertical: 10
    },
    Table: {
        borderWidth: 1,
        borderColor: 'darkblue',
        borderRadius: 10
    },
    head: {
        alignItems: 'center',
        marginHorizontal: 20
    },
    HeadTxt: {
        color: '#fff',
        fontWeight: 'bold'
    },
    TblCntr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'darkblue',
        borderTopEndRadius: 10
    },
    TblCellCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    TblCell: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    CellTxt: {
    },
    actionBtn: {
        padding: 5,
        backgroundColor: '#dbf3ff',
        borderRadius: 5
    },
    container: {
        flex: 1
    },
    ModalWrapper: {
        backgroundColor: '#e5ecf2',
        padding: 20,
        borderRadius: 10
    },
    ModalContent: {
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },
    ModalContentLabel: {
        width: '35%', fontWeight: 'bold', color: '#134484'
    },
    ModalContentData: {
        fontStyle: 'italic', color: '#0b2a52',
        width: '70%',
        paddingHorizontal: 10
    },
    ModalCloseBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    ModalSbmtBtn: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'darkblue',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    ModalSbmtBtnTxt: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 10
    },
    RowData: {
        flexDirection: 'row'
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: width * 0.1 / 5,
        borderBottomColor: '#134484',
        marginBottom: width * 0.1 / 7
    },
    HeadCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    InputField: {
        borderWidth: 1,
        padding: width * 0.1 / 5,
        borderColor: '#134484',
        marginBottom: width * 0.1 / 7
    }

});

export default styles;