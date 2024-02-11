import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { colors, height } from "../../components/AllPackages";
import { retrieveData } from "../../components/AllLocalDatabaseFunction";
const Dashboard = ({ navigation }) => {
  const [tap, setTap] = useState(true);
  const [waterWorkPlan, setWaterWorkPlan] = useState([]);
  const [filteredata, setfilteredata] = useState([]);
  const data = [
    {
      workPlanId: 1,
      rwsrc: "rwsrc1",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "120000",
    },
    {
      workPlanId: 2,
      rwsrc: "rwsrc4",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "1130000",
    },
    {
      workPlanId: 3,
      rwsrc: "rwsrc3",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "450000",
    },
    {
      workPlanId: 4,
      rwsrc: "rwsrc2",
      localGovt: "Adjumani",
      budgetType: "water",
      dateOfApprovedByCouncil: "12/7/2022",
      planedBudget: "1780000",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const waterWorkPlanSql = await retrieveData("waterWorkPlan");
        const userDetais = await retrieveData("userDetais");
        setWaterWorkPlan(waterWorkPlanSql);
        let x = waterWorkPlan.filter(
          (item) => item.districtid === userDetais[0].districtid
        );
        setfilteredata(x);
      } catch (error) {
        alert("error");
        // setShow(true);
      } finally {
        // setTimeout(() => {
        //   setLoading(false);
        // }, 3000);
      }
    };

    fetchData();
  }, []);

  const toggleTap = () => {
    setTap(!tap);
  };

  const changeBackgroundColor = () => {
    // Change background color only if tap is true (for "Sanitation")
    if (tap) {
      // Your logic for changing background color here
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Pressable
          onPress={toggleTap}
          onDoublePress={changeBackgroundColor}
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: tap ? colors.tableHeaderColor : "#e6f2ff",
            paddingVertical: 10,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
          }}
        >
          <Text style={{ color: (tap && "white") || "black", fontSize: 25 }}>
            Sanitation
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleTap}
          onDoublePress={changeBackgroundColor}
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: !tap ? colors.tableHeaderColor : "#e6f2ff",
            paddingVertical: 10,
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <Text style={{ color: (!tap && "white") || "black", fontSize: 25 }}>
            Water
          </Text>
        </Pressable>
      </View>
      {tap ? (
        <View style={{ flex: 1, padding: 16 }}>
          <ScrollView>
            {filteredata.map((item, index) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Report", { data: { item } })
                  }
                  key={index}
                  style={{
                    backgroundColor: "#5b54ab",
                    marginTop: 10,
                    height: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    paddingVertical: 10,
                    elevation: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    {Object.keys(item)[1]}: {item[Object.keys(item)[1]]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Workplan</Text>
        </View>
      )}
    </View>
  );
};

export default Dashboard;
