import  React ,{useState} from "react";
import { TouchableOpacity, View ,StyleSheet} from "react-native";
import { TextInput , Text,useTheme } from "react-native-paper";
import VectorIcon from "./VectorIcon";
import { scale } from "react-native-size-matters";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from "./colors";
import * as DocumentPicker from 'expo-document-picker';
import {IntructModal} from "./AllModals"
export const CustomDropDown=({dropData,setSelect,title})=>{
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const data = dropData || [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.dropFocusLabelTextColor }]}>
         {title || "choose title"}
        </Text>
      );
    }
    return null;
  };
  return(
    <View style={styles.container}>
    {renderLabel()}
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: colors.dropFocusedBorderColor }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      iconColor={colors.dropArrowColor}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? `Select ${title} *` : '...'}
      searchPlaceholder="Search..."
      value={value}
      itemContainerStyle={{backgroundColor:colors.dropItemContainerStyle}}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setSelect(item.label)
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        <AntDesign
          style={styles.icon}
          color={isFocus ? colors.dropFocusedIconColor:colors.dropIconColor}
          name="Safety"
          size={20}
        />
      )}
    />
  </View>
  )
}
export const AttachFile=(props)=>{
  const [selectedDocument, setSelectedDocument] = useState({});
  const [show, setShow] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
      
      if (result.canceled === true) {
       setShow(true)
      } else {
        setSelectedDocument(result.assets[0]);
        props.setFile(result.assets[0])
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={{
      borderWidth:2,
      flexDirection:"row",
      justifyContent:"space-between",
      borderRadius:10,
      height:50,
      alignItems:'center',
      paddingLeft:5,
      borderColor:colors.documentBorderColor,
      marginTop: 15,
       }}>
      <Text style={{width:"70%",color:colors.documentBodyTextColor}}>{selectedDocument.name}</Text>
      <TouchableOpacity
      style={{
        backgroundColor:colors.documentTitleBackColor,
        height:50,
        width:"30%",
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent:"center",
        alignItems:"center"
      }}
      onPress={()=>pickDocument()}
      >
        <Text style={{color:colors.documentTitleTextColor,fontWeight:"500",fontSize:12}}>Attach</Text>
      </TouchableOpacity>
      <IntructModal show={show} setShow={setShow} info={"You Haven't Selected Any Thing.."} btnTitle={"OK"}/>
    </View>
  );
}









const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  dropdown: {
    minHeight: 50,
    borderColor: colors.dropBorderColor,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:colors.dropBackColor,
    paddingVertical:5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: colors.dropLabelBackColor,
    fontWeight:"700",
    color:colors.dropLabelTextColor,
    left: 22,
    top: 3,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 12,
    color:colors.dropPlaceHolderTextColor,
  },
  selectedTextStyle: {
    fontSize: 12,
    color:colors.dropBodySelectedTextColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  attach:{
    backgroundColor:colors.documentBodyBackColor,
    height:50,
    width:"30%",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    justifyContent:"center",
    alignItems:"center"
  }
});
   
