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
  console.log(unitData, "hi");
  const data = useSelector((state) => state.UserReducer);
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
  const [comment, setComments] = useState("");
  const [workplan, setWorkplan] = useState(0);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSaveHandle = () => {
    Dispatch({
      type: "modalUpdate",
      object: {
        ...id,
        id: unitData["id"],
        Sno: unitData["Sno"],
        quarteSelected: quarterType,
        quarterAchieved: quaterAchieved,
        quarterExpenditure: quaterExpenditure,
        quarterComment: comment,
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
              header={"Cumulative to Date Achieved"}
              value={quaterAchieved}
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
            />
            <ModifiedTextInput2
              //Cumulative Expenditure(Ugx)
              setInput={setText}
              header={`Cumulative Expenditure(Ugx)`}
              value={`${unitData["quarterOneExpenditure"]}`}
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
