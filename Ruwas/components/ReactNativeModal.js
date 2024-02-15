import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import VectorIcon from "./VectorIcon";
import {
  CustomComments,
  ModifiedTextInput1,
  ModifiedTextInput2,
} from "./AllReusableComponets";
import { SubmitButton } from "../components/AllButtons";
import colors from "./colors";
import { height, width } from "./AllPackages";
import masterData from "../DataBaseHandle/masterData";
import { useDispatch, useSelector } from "react-redux";
export const ReactNativeModal1 = ({
  isModalVisible,
  setModalVisible,
  item,
  quarterType,
}) => {
  const unitData = (item !== undefined && item.item) || {};
  const data = useSelector((state) => state.UserReducer);
  const stateUpdater = useSelector((state) => state.TotalCalculationreducer);
  

  const id = data;
  const Dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [quaterAchieved, setQuaterAchieved] = useState(
    unitData["quarterOneAchieved"]
  );
  const [quaterExpenditure, SetQuaterExpenditure] = useState(
    unitData["quarterOneExpenditure"]
  );
  
  useEffect(()=>{
    
    if(quarterType==1){
      Dispatch({type:"quater",values:{qc1:quaterAchieved}})
      Dispatch({type:"quater",values:{qe1:quaterExpenditure}})
    }else if(quarterType==2){
      Dispatch({type:"quater",values:{qc2:`${parseInt(quaterAchieved) +parseInt(stateUpdater.qc1)}`}})
      Dispatch({type:"quater",values:{qe2:`${parseInt(quaterExpenditure) +parseInt(stateUpdater.qe1)}`}})
    }else if(quarterType==3){
      Dispatch({type:"quater",values:{qc3:`${parseInt(quaterAchieved) +parseInt(stateUpdater.qc2)}`}})
      Dispatch({type:"quater",values:{qe3:`${parseInt(quaterExpenditure) +parseInt(stateUpdater.qe2)}`}})
    }else if(quarterType==4){
      Dispatch({type:"quater",values:{qc4:`${parseInt(quaterAchieved) +parseInt(stateUpdater.qc3)}`}})
      Dispatch({type:"quater",values:{qe4:`${parseInt(quaterExpenditure) +parseInt(stateUpdater.qe3)}`}})
    }
  },[quaterAchieved,quaterExpenditure])
  const [comment, setComments] = useState("");
  const [workplan, setWorkplan] = useState(0);
  const validation=()=>{
    if(parseInt(quaterAchieved)>parseInt(unitData.approvedAnnualTarget)){
      setQuaterAchieved("")
      return alert("Performance In Quarter Achieved Should Not Be Greater Than Approved Annual WorkPlan Target")
    }
    else if(parseInt(quaterExpenditure)>parseInt(unitData.funds)){
      SetQuaterExpenditure("")
      return alert("Expenditure Quarter Should Not Be Greater Than Annual Budget")
    }else{
      Dispatch({type:"quater",values:{totalAnuallBudget:item.funds}})
      setModalVisible(false)
    }
  }

  useEffect(()=>{
    setWorkplan("")
  },[workplan])
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSaveHandle = () => {
    validation()
    Dispatch({
      type: "modalUpdate",
      object: {
        ...id,
        Sno: unitData["Sno"],
        quarteSelected: quarterType,
        quarterAchieved: quaterAchieved,
        quarterExpenditure: quaterExpenditure,
        quarterComment: comment,
        modelActivity:unitData.modelActivity,
      },
    });
  };
  return (
    <Modal
      animationOut={"fadeOut"}
      animationIn={"zoomIn"}
      animationInTiming={500}
      animationOutTiming={1}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: colors.commonTextLabelBackColor,
            height: height * 0.8,
            width: "95%",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ModifiedTextInput2
                //no
                header={"No"}
                value={`${unitData["Sno"]}`}
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput2
                //Quarter Target
                header={"Quarter Target"}
                // value={`${unitData["quarterOne"]}`}
                value={
                  quarterType === "1"
                    ? `${unitData["quarterOne"]}`
                    : quarterType === "2"
                    ? `${unitData["quarterTwo"]}`
                    : quarterType === "3"
                    ? `${unitData["quarterFour"]}`
                    : `${unitData["quarterOne"]}`
                }
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
            </View>
            <ModifiedTextInput2
              //Modal Activity
              header={"Model Activity"}
              value={`${unitData["modelActivity"]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              //Approved Annual Workplan Target
              header={"Approved Annual Workplan Target"}
              value={`${unitData["approvedAnnualTarget"]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput1
              //Performance in Quarter Achieved
              setInput={setQuaterAchieved}
              title={"Performance in Quarter Achieved"}
              header={"Performance in Quarter Achieved"}
              value={quaterAchieved}
              keyboardType="numeric"
            />
            <ModifiedTextInput2
              //"Cumulative to Date Achieved
              // dependentValue={quaterAchieved}
              header={"Cumulative to Date Achieved"}
              value={quarterType==1?parseInt(stateUpdater.qc1):quarterType==2?parseInt(stateUpdater.qc1)+parseInt(quaterAchieved):quarterType==3?parseInt(stateUpdater.qc2)+parseInt(quaterAchieved):quarterType==4?parseInt(stateUpdater.qc3)+parseInt(quaterAchieved):"0"}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              // Workplan %
              header={`Workplan (%)`}
              value={`${workplan}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />

            <ModifiedTextInput1
              //Expenditure (Quarter) (Ugx)
              title={"Expenditure (Quarter)(Ugx)"}
              header={"Expenditure (Quarter)(Ugx)"}
              value={quaterExpenditure}
              setInput={SetQuaterExpenditure}
              keyboardType="numeric"
            />
            <ModifiedTextInput2
              //Cumulative Expenditure(Ugx)
              setInput={setText}
              header={`Cumulative Expenditure(Ugx)`}
              value={quarterType==1?parseInt(stateUpdater.qe1):quarterType==2?parseInt(stateUpdater.qe1)+parseInt(quaterExpenditure):quarterType==3?parseInt(stateUpdater.qe2)+parseInt(quaterExpenditure):quarterType==4?parseInt(stateUpdater.qe3)+parseInt(quaterExpenditure):"0"}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              //Annual Budget(Ugx)
              setInput={setText}
              header={`Annual Budget(Ugx)`}
              value={`${unitData["funds"]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            {/* //cmt */}
            <ModifiedTextInput1
              //Expenditure (Quarter) (Ugx)
              title={"Comments"}
              header={"Comments"}
              value={comment}
              setInput={setComments}
             
            />
          </ScrollView>
          <SubmitButton
            onPress={onSaveHandle}
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
