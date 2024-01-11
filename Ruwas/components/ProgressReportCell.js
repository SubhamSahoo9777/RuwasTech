import masterData from "../DataBaseHandle/masterData";
import {
    React,
    StyleSheet,
    Text,
    colors,
    View,
    height,
    useState,
    Pressable, scale, VectorIcon, TextInput
  } from "./AllPackages";
import CommonTextInput from "./CommonTextInput";
  const ProgressReportCell1 = ({item,id}) => {
    const allKeys=Object.keys(item)

    console.log('====================================');
    console.log(allKeys);
    console.log('====================================');
    const [extend,setExtend]=useState(false)
    const HiddenDropInput=()=>{
        return(
            <View>
            <View style={{flexDirection:"row",paddingLeft:5,alignItems:"center",marginTop:5,}}>
                <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[4]}</Text>
                <Text style={{fontSize:scale(10)}}>:</Text>
                <MiniTextInput/>
            </View>
            <View style={{flexDirection:"row",paddingLeft:5,alignItems:"center",marginTop:5,}}>
                <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[5]}</Text>
                <Text style={{fontSize:scale(10)}}>:</Text>
                <MiniTextInput/>
            </View>
            <View style={{flexDirection:"row",paddingLeft:5,alignItems:"center",marginTop:5,}}>
                <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[6]}</Text>
                <Text style={{fontSize:scale(10)}}>:</Text>
                <MiniTextInput/>
            </View>
            <View style={{flexDirection:"row",paddingLeft:5,alignItems:"center",marginTop:5,}}>
                <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[7]}</Text>
                <Text style={{fontSize:scale(10)}}>:</Text>
                <MiniTextInput/>
            </View>
            <View style={{flexDirection:"row",paddingLeft:5,alignItems:"center",marginTop:5,}}>
                <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[8]}</Text>
                <Text style={{fontSize:scale(10)}}>:</Text>
                <MiniTextInput/>
            </View>
            {/* <CommonTextInput title="Comments.."/> */}
            </View>
        )
    }
  return (
    <View style={{width:'95%',backgroundColor:colors.tableRowsBackColors,borderRadius:20,marginTop:10,alignSelf:"center",minHeight:height*0.18}}>
          <Text style={{color:"#fff",fontSize:scale(11),backgroundColor:colors.tableHeaderColor,borderTopLeftRadius:20,borderTopRightRadius:20,textAlign:"center",paddingVertical:5}}>{allKeys[0]} {item[allKeys[0]]}</Text>
          <View style={{flexDirection:"row",paddingLeft:5}}>
              <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[1]}</Text>
              <Text style={{fontSize:scale(10),width:"40%"}}>: {item[allKeys[1]]}</Text>
          </View>
          <View style={{flexDirection:"row",paddingLeft:5}}>
              <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[2]}</Text>
              <Text style={{fontSize:scale(10),width:"40%"}}>: {item[allKeys[2]]}</Text>
          </View>
          <View style={{flexDirection:"row",paddingLeft:5}}>
              <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[3]}</Text>
              <Text style={{fontSize:scale(10),width:"40%"}}>: {item[allKeys[3]]}</Text>
          </View>
          <View style={{flexDirection:"row",paddingLeft:5}}>
              <Text style={{fontSize:scale(10),width:"60%"}}>{allKeys[9]}</Text>
              <Text style={{fontSize:scale(10),width:"40%"}}>: {item[allKeys[9]]}</Text>
          </View>
         {  
            extend?
           <HiddenDropInput/>
            :null
         }
          <Pressable onPress={()=>{
            setExtend(!extend)
          }}
          style={{flexDirection:"row-reverse",paddingHorizontal:15,borderRadius:20,marginTop:10,paddingVertical:5,backgroundColor:colors.tableRowsBackColors}}>
            <VectorIcon type="AntDesign" name={extend?"upcircle":"downcircle"} size={24} color={colors.tableHeaderColor} />
            <Text style={{color:colors.tableHeaderColor,marginRight:10}}>More</Text>
          </Pressable>
    </View>
  )
}
const MiniTextInput=()=>{
    return(
        <TextInput
        keyboardType="numeric"
        style={{
          borderWidth:1,        
          width:"35%",
          borderRadius: 5,
          marginLeft:4,
          paddingLeft:5,
        }}
        />
    )
}


export default ProgressReportCell1

const styles = StyleSheet.create({})