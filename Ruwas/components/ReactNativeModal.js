import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import VectorIcon from "./VectorIcon";
import { CustomComments, ModifiedTextInput1, ModifiedTextInput2 } from "./AllReusableComponets";
import { SubmitButton } from "../components/AllButtons";
import colors from "./colors";
import { height,width } from "./AllPackages";

export const ReactNativeModal1 = ({
  isModalVisible,
  setModalVisible,
  item,

  setIconColor
}) => {
  const [isLoading, setLoading] = useState(true);
  const allkeys = Object.keys(item);
  console.log(allkeys);
  const [text, setText] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
//field variables
//cda=pqa+cda
// workplan=cda/qt*100
const [cda,setCda]=useState(item[""])
const[qt,setQt]=useState("0")
const [workplan,setWorkplan]=useState("0")
setWorkplan()
  return (
    <Modal
      animationIn={"slideInRight"}
      animationInTiming={1000}
      animationOut={"zoomOutDown"}
      animationOutTiming={1000}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,}}>
        <View
          style={{
            backgroundColor: colors.commonTextLabelBackColor,
            height: height*0.8,
            width: "95%",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ModifiedTextInput2
              //no
                header={allkeys[0]}
                value={`${item[allkeys[0]]}`}
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput2
              //Quarter Target
                header={allkeys[3]}
                value={`${item[allkeys[3]]}`}
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
            </View>
            <ModifiedTextInput2
            //Modal Activity
              header={allkeys[1]}
              value={`${item[allkeys[1]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
            //Approved Annual Workplan Target
              header={allkeys[2]}
              value={`${item[allkeys[2]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput1
            //Performance in Quarter Achieved
              setInput={setPqa}
              title={allkeys[4]}
              header={allkeys[4]}
              value={`${pqa}`}
              keyboardType="numeric"
            />
            <ModifiedTextInput2
            //"Cumulative to Date Achieved
              header={allkeys[5]}
              value={`${cda}`}
              // value={`${item[allkeys[5]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
            //Percentage Workplan
              header={`${allkeys[6]} (%)`}
              // value={`${item[allkeys[6]]}`}
              value={`${workplan}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            
            <ModifiedTextInput1
            //Expenditure (Quarter) (Ugx)
              title={allkeys[7]}
              setInput={setText}
              header={allkeys[7]}
              value="12"
            />
            <ModifiedTextInput2
            //Cumulative Expenditure(Ugx)
               setInput={setText}
               header={`${allkeys[8]} (%)`}
               value={`${item[allkeys[8]]}`}
               editable={false}
               CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
           <ModifiedTextInput2
           //Annual Budget(Ugx)
               setInput={setText}
               header={`${allkeys[9]} (%)`}
               value={`${item[allkeys[9]]}`}
               editable={false}
               CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
          {/* //cmt */}
           <CustomComments/>
          </ScrollView>
          <SubmitButton
  
            title={"Save"}
            buttonStyle={{
              position: "absolute",
              bottom: 10,
              alignSelf: "center",
              width: "100%",
            }}
          />
          {/* -------------------------------------------logo */}
          <View style={{ position: "absolute", top: -22, right: -20 }}>
            <VectorIcon
              type="Entypo"
              name="circle-with-cross"
              size={35}
              color="#fff"
              onPress={toggleModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
