import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ModalWrapper: {
    backgroundColor: '#e5ecf2', padding: 20, borderRadius: 10
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
    fontStyle: 'italic', color: '#0b2a52'
  },
  ModalCloseBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    backgroundColor: '#520c0f'
  },
  RowData: {
    flexDirection: 'row'
  }

});

export default styles;