import {
    React,
    StyleSheet,
    View,
    TextInput,
    Text,
    useState,
    colors
  } from "./AllPackages";

const CommonTextInput = ({title,setInput}) => {
const [show,setShow]=useState(false)
const [text,setText]=useState(false)
  return (
    <View style={{
        marginTop:20,
        borderWidth:1.5,
        borderColor:colors.commonTextBorderColor,
        borderRadius:10,
        paddingLeft:10
        }}>
     <TextInput 
     onFocus={()=>setShow(true)}
     
     placeholder={title + " *"}
     cursorColor={"#000"}
     onBlur={()=>setShow(false)}
     placeholderTextColor={colors.commonTextPlaceHolderColor}
     onChangeText={(text)=>{
        setText(text)
        setInput(text)
    }}
     style={{
        minHeight:50,
        color:colors.commonTextPlaceHolderColor,
        fontSize:12,
        }}/>
   {
    show?
    <Text
    style={{position:"absolute",top:-15,backgroundColor:colors.commonTextLabelBackColor,paddingHorizontal:10,borderRadius:20,left:15,fontWeight:"700",color:colors.commonTextLabelTextColor,fontSize:13}}
    >
    Attachments
    </Text>
    :null
   }
    </View>
  )
}

export default CommonTextInput

const styles = StyleSheet.create({})