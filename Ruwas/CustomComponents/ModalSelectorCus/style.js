import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  inputCell: {
    color: 'black',
    marginTop: 10,
    backgroundColor: '#fff'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    margin: 10,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center'
  },
  border:
  {
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderColor: '#888'
  },
  searchTextStyle:
  {
    fontWeight: 'bold'
  },
  text:
  {
    color: 'black'
  },
  dropdownContainer: {
    justifyContent: 'center',
    paddingBottom: 16

  },
  dropdownOptionText: {
    color: '#fff',
    textAlign: 'left'
  },
  dropdownCancel: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  dropdownSelectedOption: {
    backgroundColor: 'yellow'
  },
  dropdownCancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  optionContainerStyle:
  {
    backgroundColor: '#382dc0',
    height: 350
  },
  optionStyle:
  {
    borderBottomWidth: 0.5,
    borderBottomColor: '#888',
    margin: 3,
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: width * 0.1 / 5,
    borderBottomColor: '#134484',
    marginBottom: width * 0.1 / 5
  }

})

export default styles;