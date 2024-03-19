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
import { useDispatch, useSelector } from "react-redux";
import ShowValueTextInput from "./ShowValueTextInput";
import { retrieveData, updateRecord } from "./AllLocalDatabaseFunction";
import { AlertModal } from "./AllModals";

export const EditModal = ({
  isModalVisible,
  setModalVisible,
  item,
  databaseId,
  func,
}) => {
  const unitData = item || {};
  const Dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quaterAchieved, setQuaterAchieved] = useState("0");
  const [quaterExpenditure, setQuarterExpenditure] = useState("0");
  const [comment, setComments] = useState("");
  const [workPlan, setWorkplan] = useState("0");
  const [content, setContent] = useState({ show: false });
  useEffect(() => {
    setQuaterAchieved(unitData.quarterAchieved);
    setQuarterExpenditure(unitData.quarterExpenditure);
    setComments(unitData.quarterComment);
  }, [unitData]);

  useEffect(() => {
    let x =
      (parseFloat(quaterAchieved) /
        parseFloat(unitData["approvedAnnualTarget"])) *
      100;
    setWorkplan(isNaN(x) ? "0" : x);
  }, [quaterAchieved, unitData]);

  const updateFunc = async () => {
    setLoading(true);
    let allUserDataFromDB = await retrieveData("UserSavedData");
    allUserDataFromDB = allUserDataFromDB.filter(
      (item) => item.id == databaseId
    );
    let modalDates = JSON.parse(
      allUserDataFromDB[0].USERSAVEDATA
    ).modalActivityData;
    let restData = allUserDataFromDB.find(
      (item) => item.id === databaseId
    )?.USERSAVEDATA;
    restData = JSON.parse(restData);

    modalDates = modalDates.map((item) => {
      if (item.id === unitData.id) {
        return {
          ...unitData,
          quarterAchieved: quaterAchieved,
          quarterExpenditure: quaterExpenditure,
          quarterComment: comment,
        };
      }
      return item;
    });
    const requestBody = {
      ...restData,
      modalActivityData: modalDates,
    };
    updateRecord(databaseId, JSON.stringify(requestBody));
    func();
    setLoading(false);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const validation = () => {
    // ---------------------------------------------validation for quaterAchieved
    if (
      quaterAchieved == "" ||
      isNaN(quaterAchieved) ||
      parseInt(quaterAchieved) < 0
    ) {
      return setContent({
        show: true,
        msg: "please enter a valid value for quaterAchieved",
        vibration: true,
      });
    }
    if (
      parseFloat(quaterAchieved) > parseFloat(unitData["approvedAnnualTarget"])
    ) {
      return setContent({
        show: true,
        msg: "Cumulative to Date Achieved should not be greater than Approve Annual workplan target",
        vibration: true,
      });
    }
    if (
      parseFloat(quaterAchieved) >
      (unitData.id?.endsWith("a")
        ? `${unitData["quarterOne"]}`
        : unitData.id?.endsWith("b")
        ? `${unitData["quarterTwo"]}`
        : unitData.id?.endsWith("c")
        ? `${unitData["quarterFour"]}`
        : `${unitData["quarterOne"]}`)
    ) {
      return setContent({
        show: true,
        msg: "Cumulative Expenditure(Ugx) should not exceed Quarter Target(Ugx)",
        vibration: true,
      });
    }
    // ---------------------------------------------validation for quaterExpenditure
    if (
      quaterExpenditure == "" ||
      isNaN(quaterExpenditure) ||
      parseInt(quaterExpenditure) < 0
    ) {
      return setContent({
        show: true,
        msg: "please enter a valid value for quaterExpenditure",
        vibration: true,
      });
    }
    if (parseInt(quaterExpenditure) > parseInt(unitData["funds"])) {
      return setContent({
        show: true,
        msg: "Expenditure (Quarter)(Ugx) should not exceed Annual Budget(Ugx)",
        vibration: true,
      });
    }
    // --------------------------------------------------final result after validation
    updateFunc();
  };

  const handleUpdate = () => {
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
              contentContainerStyle={{ paddingBottom: 70 }}
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
                  header={"Quarter Target"}
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
                sty={{ padding: 10 }}
              />

              <ModifiedTextInput2
                header={"Approved Annual Workplan Target"}
                value={`${unitData["approvedAnnualTarget"]}`}
                editable={false}
                CustomStyle={{ backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput3
                setInput={setQuaterAchieved}
                title={"Performance in Quarter Achieved"}
                header={"Performance in Quarter Achieved"}
                value={quaterAchieved}
                keyboardType="numeric"
              />
              <ModifiedTextInput2
                header={"Cumulative to Date Achieved"}
                value={isNaN(parseFloat(quaterAchieved)) ? "0" : quaterAchieved}
                editable={false}
                CustomStyle={{ backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput2
                header={`Workplan (%)`}
                value={`${workPlan}`}
                editable={false}
                CustomStyle={{ backgroundColor: "#e8f1fc" }}
              />

              <ModifiedTextInput3
                title={"Expenditure (Quarter)(Ugx)"}
                header={"Expenditure (Quarter)(Ugx)"}
                value={quaterExpenditure}
                setInput={setQuarterExpenditure}
                keyboardType="numeric"
              />
              <ModifiedTextInput2
                header={`Cumulative Expenditure(Ugx)`}
                value={
                  isNaN(parseFloat(quaterExpenditure)) ? "0" : quaterExpenditure
                }
                editable={false}
                CustomStyle={{ backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput2
                header={`Annual Budget(Ugx)`}
                value={`${unitData["funds"]}`}
                editable={false}
                CustomStyle={{ backgroundColor: "#e8f1fc" }}
              />
              <ModifiedTextInput3
                title={"Comments"}
                value={comment}
                setInput={setComments}
                header="Comments"
              />
            </ScrollView>
            <SubmitButton
              onPress={handleUpdate}
              title={"Update"}
              buttonStyle={{
                position: "absolute",
                bottom: 10,
                alignSelf: "center",
                width: "100%",
              }}
            />
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
                {unitData.id?.endsWith("a")
                  ? "Quarter One Details"
                  : unitData.id?.endsWith("b")
                  ? "Quarter Two Details"
                  : unitData.id?.endsWith("c")
                  ? "Quarter Three Details"
                  : "Quarter Four Details"}
              </Text>
            </View>
          </View>
          {/* -------------------------------------------------------------modal */}
          <AlertModal content={content} setContent={setContent} />
        </View>
      )}
    </Modal>
  );
};
