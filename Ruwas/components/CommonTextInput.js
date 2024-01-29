
import {
    React,
    StyleSheet,
    View,
    TextInput,
    Text,
    useState,
    colors
  } from "./AllPackages";

const CommonTextInput = ({title,setInput,isWrong,setIsWrong,input,lengthOfList}) => {
const [show,setShow]=useState(false)
const [text,setText]=useState(false)
console.log(lengthOfList);
  return (
    <View style={{
        marginTop:20,
        borderWidth:1.5,
        borderColor:isWrong && isWrong ? "red" : colors.commonTextBorderColor,
        borderRadius:10,
        paddingLeft:10
        }}>
     <TextInput 
     value={input || ""}
     onFocus={()=>setShow(true)}
     cursorColor={"#000"}
     onBlur={()=>setShow(false)}
    //  placeholderTextColor={colors.commonTextPlaceHolderColor}
     onChangeText={(text)=>{
        setText(text)
        setInput && setInput(text)
        setIsWrong({
          wrongYear: false,
          wrongRwsrc: false,
          wrongGovt: false,
          wrongQuarter: false,
          wrongTitle: false,
          wrongFile: false,
        })
    }}
     style={{
        minHeight:50,
        color:colors.commonTextPlaceHolderColor,
        fontSize:12,
        }}/>
   {
  
    <Text
    style={{position:"absolute",top:-15,backgroundColor:colors.commonTextLabelBackColor,paddingHorizontal:10,borderRadius:20,left:15,fontWeight:"700",color:colors.commonTextLabelTextColor,fontSize:13}}
    >
    {title || "Add a Title"}
    <Text style={{color:"red"}}> *</Text>
    </Text>

   }
    </View>
  )
}

export default CommonTextInput

const styles = StyleSheet.create({})