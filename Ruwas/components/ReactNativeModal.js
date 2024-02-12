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

export const ReactNativeModal1 = ({
  isModalVisible,
  setModalVisible,
  item,
}) => {
  const allkeys = Object.keys((item !== undefined && item.item) || {});
  const unitData = (item !== undefined && item.item) || {};
  console.log(allkeys);
  const [isLoading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [cda, setCda] = useState("5");
  const [qt, setQt] = useState("10");
  const [workplan, setWorkplan] = useState(0);
  // --------
  const [pqa, setPqa] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  const updateData = (index, pqa, expenditure) => {
    let temp = [...masterData.dshcg.table];
    temp = temp.map((item, index) => {});
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // useEffect(()=>{

  //   setWorkplan(`${(parseInt(cda) / parseInt(qt))*100} %`)

  // },[cda,qt,item])
  return (
    <Modal
      // animationIn={"slideInRight"}
      // animationInTiming={1000}
      // animationOut={"zoomOutDown"}
      // animationOutTiming={1000}
      // isVisible={isModalVisible}
      // onBackdropPress={() => setModalVisible(false)}
      // animationIn={"fadeIn"} // Change animation to fadeIn
      animationOut={"fadeOut"} // Change animation to fadeOut
      animationIn={"zoomIn"}
      // animationOut={"zoomOut"}
      animationInTiming={500} // Adjust animation timing
      animationOutTiming={1} // Adjust animation timing
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
                value={`${unitData[allkeys[0]]}`}
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput2
                //Quarter Target
                header={"Quarter Target"}
                value={`${unitData[allkeys[3]]}`}
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
            </View>
            <ModifiedTextInput2
              //Modal Activity
              header={"Model Activity"}
              value={`${unitData[allkeys[1]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              //Approved Annual Workplan Target
              header={"Approved Annual Workplan Target"}
              value={`${unitData[allkeys[2]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput1
              //Performance in Quarter Achieved
              setInput={setText}
              title={"Performance in Quarter Achieved"}
              header={"Performance in Quarter Achieved"}
              value={`${unitData[allkeys[4]]}`}
              keyboardType="numeric"
            />
            <ModifiedTextInput2
              //"Cumulative to Date Achieved
              header={"Cumulative to Date Achieved"}
              value={`${cda}`}
              // value={`${unitData[allkeys[5]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              // Workplan
              header={`Workplan (%)`}
              // value={`${unitData[allkeys[6]]}`}
              value={`${workplan}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />

            <ModifiedTextInput1
              //Expenditure (Quarter) (Ugx)
              title={"Expenditure (Quarter)(Ugx)"}
              header={"Expenditure (Quarter)(Ugx)"}
              setInput={setText}
              value="12"
            />
            <ModifiedTextInput2
              //Cumulative Expenditure(Ugx)
              setInput={setText}
              header={`Cumulative Expenditure(Ugx)`}
              value={`${unitData[allkeys[8]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              //Annual Budget(Ugx)
              setInput={setText}
              header={`Annual Budget(Ugx)`}
              value={`${unitData[allkeys[9]]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            {/* //cmt */}
            <CustomComments />
          </ScrollView>
          <SubmitButton
            onPress={updateData}
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
