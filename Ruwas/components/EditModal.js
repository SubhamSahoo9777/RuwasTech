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
import { ModifiedTextInput2, ModifiedTextInput3 } from "./AllReusableComponets";
import { SubmitButton } from "../components/AllButtons";
import colors from "./colors";
import { height, width } from "./AllPackages";
import masterData from "../DataBaseHandle/masterData";
import { useDispatch, useSelector } from "react-redux";
import AutoSelectDrop from "./AutoSelectDrop";
import ShowValueTextInput from "./ShowValueTextInput";
export const EditModal = ({
  isModalVisible,
  setModalVisible,
  item,
}) => {
  const unitData = (item !== undefined && item) || {};
  console.log(unitData);
  //   const id = data.hasOwnProperty("sanitationid")
  //     ? data.sanitationid
  //     : data.workplanid;
  const Dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [quaterAchieved, setQuaterAchieved] = useState("0");
  const [quaterExpenditure, SetQuaterExpenditure] = useState("0");

  const [comment, setComments] = useState("");
  const [workplan, setWorkplan] = useState(0);
  const [x, setX] = useState("");
  useEffect(() => {
    setX(unitData.modelActivity);
    setQuaterAchieved(unitData.quarterAchieved);
    SetQuaterExpenditure(unitData.quarterExpenditure);
    setComments(unitData.quarterComment);
  }, [unitData]);
  // const validation = () => {
  //   if (parseInt(quaterAchieved) > parseInt(unitData.approvedAnnualTarget)) {
  //     setQuaterAchieved("");
  //     return alert(
  //       "Performance In Quarter Achieved Should Not Be Greater Than Approved Annual WorkPlan Target"
  //     );
  //   } else if (parseInt(quaterExpenditure) > parseInt(unitData.funds)) {
  //     SetQuaterExpenditure("");
  //     return alert(
  //       "Expenditure Quarter Should Not Be Greater Than Annual Budget"
  //     );
  //   } else {
  //     Dispatch({ type: "quater", values: { totalAnuallBudget: item.funds } });
  //     alert("Data Saved");
  //     setIsModalEdited([...isModalEdited, item.id]);
  //     setModalVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   if (parseInt(unitData["approvedAnnualTarget"]) > 0 && unitData.id?.endsWith("a")) {
  //     let x =
  //       ((parseInt(stateUpdater.qc1) + parseInt(quaterAchieved)) /
  //         parseInt(unitData["approvedAnnualTarget"])) *
  //       100;

  //     setWorkplan(x);
  //   }
  //   if (parseInt(unitData["approvedAnnualTarget"]) > 0 && unitData.id?.endsWith("b")) {
  //     let x =
  //       ((parseInt(stateUpdater.qc1) + parseInt(quaterAchieved)) /
  //         parseInt(unitData["approvedAnnualTarget"])) *
  //       100;

  //     setWorkplan(x);
  //   }
  //   if (parseInt(unitData["approvedAnnualTarget"]) > 0 && unitData.id?.endsWith("c")) {
  //     let x =
  //       ((parseInt(stateUpdater.qc2) + parseInt(quaterAchieved)) /
  //         parseInt(unitData["approvedAnnualTarget"])) *
  //       100;

  //     setWorkplan(x);
  //   }
  //   if (parseInt(unitData["approvedAnnualTarget"]) > 0 && unitData.id?.endsWith("d")) {
  //     let x =
  //       ((parseInt(stateUpdater.qc3) + parseInt(quaterAchieved)) /
  //         parseInt(unitData["approvedAnnualTarget"])) *
  //       100;

  //     setWorkplan(x);
  //   }
  // }, [workplan, stateUpdater, unitData, quaterAchieved]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSaveHandle = () => {
    validation();
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
                  unitData.id?.endsWith("a")
                    ? `${unitData["quarterOne"]}`
                    : unitData.id?.endsWith("b")
                    ? `${unitData["quarterTwo"]}`
                    : unitData.id?.endsWith("c")
                    ? `${unitData["quarterFour"]}`
                    : `${unitData["quarterOne"]}`
                }
                editable={false}
                CustomStyle={{ width: "49%", backgroundColor: "#e8f1fc" }}
              />
            </View>
            <ShowValueTextInput
              label={unitData["modelActivity"]}
              title={"Model Activity"}
            />

            <ModifiedTextInput2
              //Approved Annual Workplan Target
              header={"Approved Annual Workplan Target"}
              value={`${unitData["approvedAnnualTarget"]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput3
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
              value={"0" || `${workplan} %`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />

            <ModifiedTextInput3
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
              value={quaterExpenditure}
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
            <ModifiedTextInput3
              //Expenditure (Quarter) (Ugx)
              title={"Comments"}
              value={comment}
              setInput={setComments}
            />
          </ScrollView>
          <SubmitButton
            onPress={onSaveHandle}
            title={"Update"}
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
