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
import ModalPopup from "./ModalPopup";
import { retrieveData, retrieveDataById } from "./AllLocalDatabaseFunction";
import { AlertModal } from "./AllModals";
export const ReactNativeModal1 = ({
  isModalVisible,
  setModalVisible,
  item,
  quarterType,
  setIsModalEdited,
  isModalEdited,
}) => {
  const unitData = (item !== undefined && item.item) || {};

  const data = useSelector((state) => state.UserReducer);

  const stateUpdater = useSelector((state) => state.TotalCalculationreducer);

  const filteredCumulativeData = stateUpdater.filter(
    (item) => item.Sno == unitData.Sno && item.id == unitData.id
  );
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
        values: {
          qc1: quaterAchieved,
          Sno: unitData.Sno,
          id: unitData.id,
          q1: quaterAchieved,
          e1: quaterExpenditure,
          c1: comment,
        },
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
          id: unitData.id,
          q2: quaterAchieved,
          e2: quaterExpenditure,
          c2: comment,
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
          id: unitData.id,
          q3: quaterAchieved,
          e3: quaterExpenditure,
          c3: comment,
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
          id: unitData.id,
          q4: quaterAchieved,
          e4: quaterExpenditure,
          c4: comment,
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
  const [isDisable, setIsDisable] = useState(false);
  const [disableData, setDisableData] = useState({});
  const [content, setContent] = useState({ show: false });
  // ............................................................................................disable function
  const cheakDisableByMonth = () => {
    if (quarterType == 1) {
      return ["07", "08", "09", "10"].includes(getCurrentMonth());
    }
    if (quarterType == 2) {
      return ["10", "11", "12", "01"].includes(getCurrentMonth());
    }
    if (quarterType == 3) {
      return ["01", "02", "03", "04"].includes(getCurrentMonth());
    }
    if (quarterType == 4) {
      return ["04", "05", "06", "06"].includes(getCurrentMonth());
    }
  };
  const getCurrentMonth = () => {
    const d = new Date();
    const options = { timeZone: "Africa/Kampala" };
    return d.toLocaleString("en-UG", options).split(" ")[0].slice(3, 5);
  };

  const isDataEntered = async () => {
    const id = `${unitData.id}${
      quarterType == "1"
        ? "a"
        : quarterType == "2"
        ? "b"
        : quarterType == "3"
        ? "c"
        : "d"
    }`;
    const result = await retrieveDataById("recordReminder", id);
    if (result && result.length > 0) {
      setQuaterAchieved(result[0].quarterAchieved);
      SetQuaterExpenditure(result[0].quarterExpenditure);
      setComments(result[0].quarterComment);
      setDisableData(result[0]);
      return true;
    } else {
      if (quarterType == 1) {
        setQuaterAchieved(filteredCumulativeData[0]?.q1 || "0");
        SetQuaterExpenditure(filteredCumulativeData[0]?.e1 || "0");
        setComments(filteredCumulativeData[0]?.c1 || " ");
      } else if (quarterType == 2) {
        setQuaterAchieved(filteredCumulativeData[0]?.q2 || "0");
        SetQuaterExpenditure(filteredCumulativeData[0]?.e2 || "0");
        setComments(filteredCumulativeData[0]?.c2 || " ");
      } else if (quarterType == 3) {
        setQuaterAchieved(filteredCumulativeData[0]?.q3 || "0");
        SetQuaterExpenditure(filteredCumulativeData[0]?.e3 || "0");
        setComments(filteredCumulativeData[0]?.c3 || " ");
      } else if (quarterType == 4) {
        setQuaterAchieved(filteredCumulativeData[0]?.q4 || "0");
        SetQuaterExpenditure(filteredCumulativeData[0]?.e4 || "0");
        setComments(filteredCumulativeData[0]?.c4 || " ");
      }
      return false;
    }
  };

  const [comment, setComments] = useState("");
  const [workplan, setWorkplan] = useState(0);
  const validation = () => {
    if (quaterAchieved <= 0 || isNaN(quaterAchieved)) {
      return setContent({
        show: true,
        msg: "Please enter the Performance in quater achieved",
        vibration: true,
      });
    } else if (quaterExpenditure <= 0 || isNaN(quaterExpenditure)) {
      return setContent({
        show: true,
        msg: "Please enter expenditure",
        vibration: true,
      });
    } else if (comment == "") {
      return setContent({
        show: true,
        msg: "Please add comment",
        vibration: true,
      });
    } else if (
      quarterType == 2 &&
      parseInt(filteredCumulativeData[0]?.qe1 || "0") +
        parseInt(quaterExpenditure) >
        parseInt(unitData["funds"])
    ) {
      return setContent({
        show: true,
        msg: "Cumulative Expenditure(Ugx) should not exceed Annual Budget(Ugx)",
        vibration: true,
      });
    } else if (
      quarterType == 3 &&
      parseInt(filteredCumulativeData[0]?.qe2 || "0") +
        parseInt(quaterExpenditure) >
        parseInt(unitData["funds"])
    ) {
      return setContent({
        show: true,
        msg: "Cumulative Expenditure(Ugx) should not exceed Annual Budget(Ugx)",
        vibration: true,
      });
    } else if (
      quarterType == 4 &&
      parseInt(filteredCumulativeData[0]?.qe3 || "0") +
        parseInt(quaterExpenditure) >
        parseInt(unitData["funds"])
    ) {
      return setContent({
        show: true,
        msg: "Cumulative Expenditure(Ugx) should not exceed Annual Budget(Ugx)",
        vibration: true,
      });
    } else if (
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
      return setContent({
        show: true,
        msg: "Performance in quarter achieved should not be greater than Quarter Target",
        vibration: true,
      });
    } else if (
      parseInt(quaterAchieved) > parseInt(unitData.approvedAnnualTarget)
    ) {
      setQuaterAchieved("");
      return setContent({
        show: true,
        msg: "Performance in quarter achieved should not be greater than approved annual workPlan target",
        vibration: true,
      });
    } else if (parseInt(quaterExpenditure) > parseInt(unitData.funds)) {
      SetQuaterExpenditure("");
      return setContent({
        show: true,
        msg: "Expenditure quarter should not be greater than annual budget",
        vibration: true,
      });
    } else {
      valueSendToRedux();
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
          update: false,
        },
      });
      setIsModalEdited([...isModalEdited, item.id]);
      return setContent({
        show: true,
        msg: "Data successfully saved !",
        ok: toggleModal,
        color: "green",
      });
    }
  };

  useEffect(() => {
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "1") {
      let x =
        (parseInt(quaterAchieved) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;
      return setWorkplan(x || "0");
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "2") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc1 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      return setWorkplan(x || "0");
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "3") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc2 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      return setWorkplan(x || "0");
    }
    if (parseInt(unitData["approvedAnnualTarget"]) > 0 && quarterType == "4") {
      let x =
        ((parseInt(filteredCumulativeData[0]?.qc3 || "0") +
          parseInt(quaterAchieved)) /
          parseInt(unitData["approvedAnnualTarget"])) *
        100;

      return setWorkplan(x || "0");
    }
    setWorkplan("0");
  }, [unitData, workplan, filteredCumulativeData, quaterAchieved]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSaveHandle = () => {
    validation();
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
        isDataEntered()
          .then((x) => {
            setIsDisable(x);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShowValueTextInput
                label={unitData["Sno"]}
                title={"Model No ."}
                sty={{ width: "50%", marginTop: 20, minHeight: 52 }}
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
              sty={{ padding: 10 }}
            />
            <ModifiedTextInput2
              //Approved Annual Workplan Target
              header={"Approved Annual Workplan Target"}
              value={`${unitData["approvedAnnualTarget"]}`}
              editable={false}
              CustomStyle={{ backgroundColor: "#e8f1fc" }}
            />
            {isDisable ? (
              <ShowValueTextInput
                label={quaterAchieved}
                title={"Performance in Quarter Achieved"}
                sty={{ padding: 10 }}
              />
            ) : (
              <ModifiedTextInput1
                //Performance in Quarter Achieved
                setInput={setQuaterAchieved}
                title={"Performance in Quarter Achieved"}
                header={"Performance in Quarter Achieved"}
                value={quaterAchieved}
                keyboardType="numeric"
              />
            )}

            <ModifiedTextInput2
              //"Cumulative to Date Achieved
              // dependentValue={quaterAchieved}
              header={"Cumulative to Date Achieved"}
              value={
                quarterType == 1
                  ? isNaN(quaterAchieved)
                    ? parseInt("0")
                    : parseInt(quaterAchieved || "0")
                  : quarterType == 2
                  ? isNaN(quaterAchieved)
                    ? parseInt(filteredCumulativeData[0]?.qc1 || "0")
                    : parseInt(filteredCumulativeData[0]?.qc1 || "0") +
                      parseInt(quaterAchieved || "0")
                  : quarterType == 3
                  ? isNaN(quaterAchieved)
                    ? parseInt(filteredCumulativeData[0]?.qc2 || "0")
                    : parseInt(filteredCumulativeData[0]?.qc2 || "0") +
                      parseInt(quaterAchieved || "0")
                  : quarterType == 4
                  ? isNaN(quaterAchieved)
                    ? parseInt(filteredCumulativeData[0]?.qc3 || "0")
                    : parseInt(filteredCumulativeData[0]?.qc3 || "0") +
                      parseInt(quaterAchieved || "0")
                  : parseInt("0")
              }
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
            {isDisable ? (
              <ShowValueTextInput
                label={quaterExpenditure}
                title={"Expenditure (Quarter)(Ugx)"}
                sty={{ padding: 10 }}
              />
            ) : (
              <ModifiedTextInput1
                //Expenditure (Quarter) (Ugx)
                title={"Expenditure (Quarter)(Ugx)"}
                header={"Expenditure (Quarter)(Ugx)"}
                value={quaterExpenditure}
                setInput={SetQuaterExpenditure}
                keyboardType="numeric"
              />
            )}
            <ModifiedTextInput2
              //Cumulative Expenditure(Ugx)
              setInput={setText}
              header={`Cumulative Expenditure(Ugx)`}
              value={
                quarterType == 1
                  ? isNaN(quaterExpenditure)
                    ? parseInt("0")
                    : parseInt(quaterExpenditure || "0")
                  : quarterType == 2
                  ? isNaN(quaterExpenditure)
                    ? parseInt(filteredCumulativeData[0]?.qe1 || "0")
                    : parseInt(filteredCumulativeData[0]?.qe1 || "0") +
                      parseInt(quaterExpenditure || "0")
                  : quarterType == 3
                  ? isNaN(quaterExpenditure)
                    ? parseInt(filteredCumulativeData[0]?.qe2 || "0")
                    : parseInt(filteredCumulativeData[0]?.qe2 || "0") +
                      parseInt(quaterExpenditure || "0")
                  : quarterType == 4
                  ? isNaN(quaterExpenditure)
                    ? parseInt(filteredCumulativeData[0]?.qe3 || "0")
                    : parseInt(filteredCumulativeData[0]?.qe3 || "0") +
                      parseInt(quaterExpenditure || "0")
                  : parseInt("0")
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
            {isDisable ? (
              <ShowValueTextInput
                label={comment}
                title={"Comments"}
                sty={{ padding: 10 }}
              />
            ) : (
              <ModifiedTextInput1
                title={"Comments"}
                header={"Comments"}
                value={comment}
                setInput={setComments}
              />
            )}
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {!isDisable && (
              <View style={{ width: "20%" }}>
                <ModalPopup />
              </View>
            )}
            <View style={{ width: isDisable ? "100%" : "80%" }}>
              {isDisable || !cheakDisableByMonth() ? (
                <SubmitButton
                  onPress={() => {
                    setContent({
                      show: true,
                      msg: !cheakDisableByMonth()
                        ? "Data can't be saved ! Please select a valid quarter !"
                        : "Can't Change ! Data already saved.",
                      vibration: true,
                    });
                  }}
                  title={"Save"}
                  textStyle={{ fontSize: 15 }}
                  buttonStyle={{ backgroundColor: "hsl(245, 34%, 70%)" }}
                />
              ) : (
                <SubmitButton
                  onPress={onSaveHandle}
                  title={"Save"}
                  textStyle={{ fontSize: 15 }}
                />
              )}
            </View>
          </View>
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
          <View
            style={{
              position: "absolute",
              top: -35,
              left: 0,
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <VectorIcon
              type="FontAwesome"
              name="hand-o-right"
              size={20}
              color="#fff"
              onPress={toggleModal}
            />
            <Text
              style={{
                color: "#fff",
                marginLeft: 15,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {quarterType === "1"
                ? "Quarter One Details"
                : quarterType === "2"
                ? "Quarter Two Details"
                : quarterType === "3"
                ? "Quarter Three Details"
                : "Quarter Four Details"}
            </Text>
          </View>
          {/* -------------------------------------------------------------modal */}
          <AlertModal content={content} setContent={setContent} />
        </View>
      </View>
    </Modal>
  );
};
