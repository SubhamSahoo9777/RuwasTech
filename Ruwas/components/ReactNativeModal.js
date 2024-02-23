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
import ShowValueTextInput from "./ShowValueTextInput";
export const ReactNativeModal1 = ({
  isModalVisible,
  setModalVisible,
  item,
  quarterType,
  setIsModalEdited,
  isModalEdited,
}) => {
  const unitData = (item !== undefined && item.item) || {};
  console.log(unitData.Sno);
  console.log(unitData.id);
  const data = useSelector((state) => state.UserReducer);
  // console.log(data);

  const stateUpdater = useSelector((state) => state.TotalCalculationreducer);
  const filteredCumulativeData = stateUpdater.filter(
    (item) => item.Sno == unitData.Sno && item.id == unitData.id
  );
  console.log(filteredCumulativeData[0]);
  console.log(stateUpdater);
  const id = data.hasOwnProperty("sanitationid")
    ? data.sanitationid
    : data.workplanid;
  const Dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [quaterAchieved, setQuaterAchieved] = useState(
    unitData["quarterOneAchieved"]
  );
  const [quaterExpenditure, SetQuaterExpenditure] = useState(
    unitData["quarterOneExpenditure"]
  );

  const valueSendToRedux = () => {
    if (quarterType == 1) {
      Dispatch({
        type: "quater",
        values: { qc1: quaterAchieved, Sno: unitData.Sno, id: unitData.id,q1:quaterAchieved,e1:quaterExpenditure,c1:comment },
      });
      Dispatch({
        type: "quater",
        values: {
          qe1: quaterExpenditure,
          Sno: unitData.Sno,
          id: unitData.id,
        },
      });
    } else if (quarterType == 2) {
      Dispatch({
        type: "quater",
        values: {
          qc2: `${
            parseInt(quaterAchieved) +
            parseInt(filteredCumulativeData[0]?.qc1 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,q2:quaterAchieved,e2:quaterExpenditure,c2:comment
        },
      });
      Dispatch({
        type: "quater",
        values: {
          qe2: `${
            parseInt(quaterExpenditure) +
            parseInt(filteredCumulativeData[0]?.qe1 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,
        },
      });
    } else if (quarterType == 3) {
      Dispatch({
        type: "quater",
        values: {
          qc3: `${
            parseInt(quaterAchieved) +
            parseInt(filteredCumulativeData[0]?.qc2 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,q3:quaterAchieved,e3:quaterExpenditure,c3:comment
        },
      });
      Dispatch({
        type: "quater",
        values: {
          qe3: `${
            parseInt(quaterExpenditure) +
            parseInt(filteredCumulativeData[0]?.qe2 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,
        },
      });
    } else if (quarterType == 4) {
      Dispatch({
        type: "quater",
        values: {
          qc4: `${
            parseInt(quaterAchieved) +
            parseInt(filteredCumulativeData[0]?.qc3 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,q4:quaterAchieved,e4:quaterExpenditure,c4:comment
        },
      });
      Dispatch({
        type: "quater",
        values: {
          qe4: `${
            parseInt(quaterExpenditure) +
            parseInt(filteredCumulativeData[0]?.qe3 || 0)
          }`,
          Sno: unitData.Sno,
          id: unitData.id,
        },
      });
    }
  };

  const [comment, setComments] = useState("");
  const [workplan, setWorkplan] = useState(0);
  const validation = () => {
    if (
      parseInt(quaterAchieved) >
      (quarterType === "1"
        ? parseInt(unitData["quarterOne"])
        : quarterType === "2"
        ? parseInt(unitData["quarterTwo"])
        : quarterType === "3"
        ? parseInt(unitData["quarterFour"])
        : parseInt(unitData["quarterOne"]))
    ) {
      setQuaterAchieved("");
      return alert(
        "Performance in quarter achieved should not be greater than Quarter Target"
      );
    } else if (
      parseInt(quaterAchieved) > parseInt(unitData.approvedAnnualTarget)
    ) {
      setQuaterAchieved("");
      return alert(
        "Performance in quarter achieved should not be greater than approved annual workPlan target"
      );
    } else if (parseInt(quaterExpenditure) > parseInt(unitData.funds)) {
      SetQuaterExpenditure("");
      return alert(
        "Expenditure quarter should not be greater than annual budget"
      );
    } else {
      alert("Data Saved");
      setIsModalEdited([...isModalEdited, item.id]);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "1") {
      let x =
        (parseInt(quaterAchieved) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      setWorkplan(x);
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "2") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc1 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      setWorkplan(x);
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "3") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc2 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      setWorkplan(x);
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "4") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc3 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      setWorkplan(x);
    }
  }, [workplan, filteredCumulativeData, unitData, quaterAchieved]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSaveHandle = () => {
    valueSendToRedux();
    validation();
    Dispatch({
      type: "modalUpdate",
      object: {
        ...unitData,
        workplanid: id,
        Sno: unitData["Sno"],
        quarteSelected: quarterType,
        quarterAchieved: quaterAchieved,
        quarterExpenditure: quaterExpenditure,
        quarterComment: comment,
        modelActivity: unitData.modelActivity,
        id: `${unitData.id}${
          quarterType == "1"
            ? "a"
            : quarterType == "2"
            ? "b"
            : quarterType == "3"
            ? "c"
            : "d"
        }`,
      },
    });
  };
  useEffect(() => {
    if (quarterType == 1) {
      if (quaterAchieved !== filteredCumulativeData[0]?.qc1)
        SetQuaterExpenditure("0");
    } else if (quarterType == 2) {
      if (quaterAchieved !== filteredCumulativeData[0]?.qc2)
        SetQuaterExpenditure("0");
    } else if (quarterType == 3) {
      if (quaterAchieved !== filteredCumulativeData[0]?.qc3)
        SetQuaterExpenditure("0");
    } else if (quarterType == 4) {
      if (quaterAchieved !== filteredCumulativeData[0]?.qc4)
        SetQuaterExpenditure("0");
    }
  }, [quaterAchieved]);
  return (
    <Modal
      animationOut={"fadeOut"}
      animationIn={"zoomIn"}
      animationInTiming={500}
      animationOutTiming={1}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onModalShow={() => {
        if (quarterType == 1) {
          setQuaterAchieved(filteredCumulativeData[0]?.q1 || "0");
          SetQuaterExpenditure(filteredCumulativeData[0]?.e1 || "0");
          setComments(filteredCumulativeData[0]?.c1 || "");
        } else if (quarterType == 2) {
          setQuaterAchieved(filteredCumulativeData[0]?.q2 || "0");
          SetQuaterExpenditure(filteredCumulativeData[0]?.e2 || "0");
          setComments(filteredCumulativeData[0]?.c2 || "");
        } else if (quarterType == 3) {
          setQuaterAchieved(filteredCumulativeData[0]?.q3 || "0");
          SetQuaterExpenditure(filteredCumulativeData[0]?.e3 || "0");
          setComments(filteredCumulativeData[0]?.c3 || "");
        } else if (quarterType == 4) {
          setQuaterAchieved(filteredCumulativeData[0]?.q4 || "0");
          SetQuaterExpenditure(filteredCumulativeData[0]?.e4 || "0");
          setComments(filteredCumulativeData[0]?.c4 || "");
        }
      }}
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
              value={
                quarterType == 1
                  ? parseInt(quaterAchieved || "0")
                  : quarterType == 2
                  ? parseInt(filteredCumulativeData[0]?.qc1 || "0") +
                    parseInt(quaterAchieved)
                  : quarterType == 3
                  ? parseInt(filteredCumulativeData[0]?.qc2 || "0") +
                    parseInt(quaterAchieved)
                  : quarterType == 4
                  ? parseInt(filteredCumulativeData[0]?.qc3 || "0") +
                    parseInt(quaterAchieved)
                  : "0"
              }
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            <ModifiedTextInput2
              // Workplan %
              header={`Workplan (%)`}
              value={`${workplan} %`}
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
              value={
                quarterType == 1
                  ? parseInt(quaterExpenditure || "0")
                  : quarterType == 2
                  ? parseInt(filteredCumulativeData[0]?.qe1 || "0") +
                    parseInt(quaterExpenditure)
                  : quarterType == 3
                  ? parseInt(filteredCumulativeData[0]?.qe2 || "0") +
                    parseInt(quaterExpenditure)
                  : quarterType == 4
                  ? parseInt(filteredCumulativeData[0]?.qe3 || "0") +
                    parseInt(quaterExpenditure)
                  : "0"
              }
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
