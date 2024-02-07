import  React ,{useState} from "react";
import { TouchableOpacity, View ,StyleSheet,TextInput,Text,Image} from "react-native";

import VectorIcon from "./VectorIcon";
import { Dropdown } from 'react-native-element-dropdown';
import colors from "./colors";
import * as DocumentPicker from 'expo-document-picker';
import {IntructModal, SuccessModal} from "./AllModals"
export const CustomDropDown=({dropData,setSelect,title,isWrong,setIsWrong,icon,fieldName,valueFieldName})=>{
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const data1 =[
    { label: '--No Result--', value: '1' },
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.dropFocusLabelTextColor }]}>
         {title || "choose title"}{" "}
         <Text style={{color:"red"}}>*</Text>
        </Text>
      );
    }
    return null;
  };
  return(
    <View style={styles.container}>
    {renderLabel()}
    <Dropdown
      style={[{
        height: 50,
        borderColor:isWrong?"red": colors.dropBorderColor,
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:colors.dropBackColor,
      }, isFocus && { borderColor: colors.dropFocusedBorderColor }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      iconColor={colors.dropArrowColor}
      data={dropData ?dropData :data1}
      search
      maxHeight={300}
      labelField={fieldName || "label"}
      valueField={fieldName || "label"}
      placeholder={!isFocus ? `Select ${title}` : '...'}
      searchPlaceholder="Search..."
      value={value}
      itemContainerStyle={{backgroundColor:colors.dropItemContainerStyle}}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item[fieldName] ||item.label);
        setSelect(item[valueFieldName] ||item[fieldName] ||item.label)
        setIsWrong({
          wrongYear:false,
          wrongRwsrc:false,
          wrongGovt:false,
          wrongQuarter:false,
          wrongTitle:false,
          wrongFile:false,
        })
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        icon && icon || <VectorIcon type="AntDesign"
        style={styles.icon}
        color={isFocus ? colors.dropFocusedIconColor:isWrong && "red" ||colors.dropIconColor}
        name="Safety"
        size={18}
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
      
      if (result.canceled === true) {
       setShow(true)
      } else {
        setSelectedDocument(result.assets[0]);
        props.setFile(result.assets[0])
         props.setIsWrong({
          wrongYear: false,
          wrongRwsrc: false,
          wrongGovt: false,
          wrongQuarter: false,
          wrongTitle: false,
          wrongFile: false,
        })
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={{
      borderWidth:1.5,
      flexDirection:"row",
      justifyContent:"space-between",
      borderRadius:10,
      height:50,
      alignItems:'center',
      paddingLeft:5,
      borderColor:props.isWrong ? "red" : colors.commonTextBorderColor,
      
       }}>
      <Text style={{width:"80%",color:colors.documentBodyTextColor}}>{props.file && props.file?.name || ""}</Text>
      <TouchableOpacity
      style={{
        backgroundColor:props.isWrong ? "#ff6666" : colors.tableHeaderColor,
        height:50,
        width:"20%",
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent:"center",
        alignItems:"center",
      
      }}
      onPress={()=>pickDocument()}
      >
        <Image source={require("../assets/file.png")} style={{height:37,width:37,marginRight: -7,}}/>
      </TouchableOpacity>
     
      <SuccessModal show={show} setShow={setShow} type="info" title="You Haven't Selected Any Thing" content ="" />
    </View>
  );
}
export const ModifiedTextInput1=(props)=>{
  const {title,setInput,header,value,keyboardType} =props
const [show,setShow]=useState(false)
const [text,setText]=useState("")
  return (
    <View style={{
        marginTop:20,
        borderWidth:1.2,
        borderRadius:10,
        paddingLeft:10
        }}>
     <TextInput 
    onFocus={()=>{setShow(true)}}
    value={`${value || text}`}
     placeholder={show?"": title}
     cursorColor={"#000"}
     onBlur={()=>setShow(false)}
     placeholderTextColor={colors.commonTextPlaceHolderColor}
     keyboardType={keyboardType || "default"}
     onChangeText={(text)=>{
       setInput(text)
       setText(text)
    }}
     style={{
        minHeight:50,
        color:colors.commonTextPlaceHolderColor,
        fontSize:12,
        opacity:0.8,
        }}/>
   {
    value ||show || text?
    <Text
    style={{position:"absolute",top:-15,backgroundColor:colors.commonTextLabelBackColor,paddingHorizontal:10,borderRadius:20,left:15,fontWeight:"500",color:colors.commonTextLabelTextColor,fontSize:13,}}
    >
   {header || "Attachments"}
    </Text>
    :null
   }
    </View>
  )
}
export const ModifiedTextInput2=(props)=>{
  const {title,header,editable,value,CustomStyle} =props
const [show,setShow]=useState(true)
const [text,setText]=useState(false)
  return (
    <View style={[{
        marginTop:20,
        borderWidth:1.5,
        borderColor:colors.commonTextBorderColor,
        borderRadius:10,
        paddingLeft:10
        },CustomStyle]}>
     <TextInput 
     value={value}
     multiline={true}
    onFocus={()=>{setShow(true)}}
     editable={editable || false}
     placeholder={title + " *"}
     cursorColor={"#000"}
     onBlur={()=>setShow(false)}
     placeholderTextColor={colors.commonTextPlaceHolderColor}
     style={{
        minHeight:50,
        color:colors.commonTextPlaceHolderColor,
        fontSize:12,

        }}/>
   {
    show?
    <Text
    style={{position:"absolute",top:-15,backgroundColor:colors.commonTextLabelBackColor,paddingHorizontal:10,borderRadius:20,left:15,fontWeight:"500",color:colors.commonTextLabelTextColor,fontSize:13}}
    >
   {header || "Attachments"}
    </Text>
    :null
   }
    </View>
  )
}
export const CustomComments=()=>{
  return(
    <View style={{marginTop: 10,}}>
       <Text style={{paddingLeft:5,color:colors.tableHeaderColor,fontWeight:"500"}}>Comments</Text>
            <TextInput
            placeholder="Write Here..."
            multiline={true}
            numberOfLines={3}
            style={{
              borderWidth:1.2,
              color:colors.commonTextPlaceHolderColor,
              borderRadius:10,
              textAlignVertical: 'top',
              paddingTop:10,
              paddingLeft:10,
              borderColor:colors.commonTextBorderColor
            }}
            />
    </View>
  )
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
   
