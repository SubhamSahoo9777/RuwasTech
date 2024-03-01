import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { VectorIcon, colors, height } from "../../components/AllPackages";
import { retrieveData } from "../../components/AllLocalDatabaseFunction";
import { useDispatch } from "react-redux";

const Dashboard = ({ navigation }) => {
  const [tap, setTap] = useState(true);
  const [waterWorkPlan, setWaterWorkPlan] = useState([]);
  const [sanitationWorkPlan, setSanitationWorkPlan] = useState([]);
  const [filteredata, setfilteredata] = useState([]);
  const [filteredSanitation, setFilteredSanitation] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const Dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const waterWorkPlanSql = await retrieveData("waterWorkPlan");
        console.log(waterWorkPlanSql)
        const userDetais = await retrieveData("userDetais");
        let userId = userDetais[0].userid;
        let dist = userDetais[0].districtid;
        Dispatch({
          type: "userDetails",
          userDetails: { userId: userId, districtId: dist },
        });

        setWaterWorkPlan(waterWorkPlanSql);
        let x = waterWorkPlanSql.filter(
          (item) => item.districtid === userDetais[0].districtid
        );
        setfilteredata(x);
        //sanitationWorkPlan
        const sanitationWorkPlanSql = await retrieveData("sanitationWorkPlan");
        setSanitationWorkPlan(sanitationWorkPlanSql);
        let y = sanitationWorkPlanSql.filter(
          (item) => item.districtid === userDetais[0].districtid
        );
        setFilteredSanitation(y);
        setLoading(false);
      } catch (error) {
        alert("error");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    Dispatch({
      type: "CLEAR_STATE",
    });
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
            Water
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
            Sanitation
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : tap ? (
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <VectorIcon
              type="FontAwesome5"
              name="arrow-circle-right"
              size={24}
              color="green"
            />
            <Text style={{ marginLeft: 10, fontSize: 16, color: "green" }}>
              DWSCG
            </Text>
          </View>
          <FlatList
            data={filteredata}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Report", {
                    data: { item, type: "water" },
                  })
                }
                key={index}
                style={{
                  backgroundColor: "#5b54ab",
                  marginTop: 10,
                  height: "auto",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingVertical: 10,
                  elevation: 10,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <VectorIcon
                    type="FontAwesome5"
                    name="hand-point-right"
                    size={24}
                    color="#fff"
                  />
                  <Text style={{ color: "#fff", marginLeft: 10 }}>
                    {"Work Plan Id"}: {item["workplanid"]}
                  </Text>
                </View>

                <VectorIcon
                  type="AntDesign"
                  name="rightcircle"
                  size={24}
                  color="#fff"
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <VectorIcon
              type="FontAwesome5"
              name="arrow-circle-right"
              size={24}
              color="green"
            />
            <Text style={{ marginLeft: 10, fontSize: 16, color: "green" }}>
              DSHCG
            </Text>
          </View>
          <FlatList
            data={filteredSanitation}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Report", {
                    data: { item, type: "sanitation" },
                  })
                }
                key={index}
                style={{
                  backgroundColor: "#5b54ab",
                  marginTop: 10,
                  height: "auto",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingVertical: 10,
                  elevation: 10,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <VectorIcon
                    type="FontAwesome5"
                    name="hand-point-right"
                    size={24}
                    color="#fff"
                  />
                  <Text style={{ color: "#fff", marginLeft: 10 }}>
                    {"Work Plan Id"}: {item["sanitationid"]}
                  </Text>
                </View>

                <VectorIcon
                  type="AntDesign"
                  name="rightcircle"
                  size={24}
                  color="#fff"
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Dashboard;
