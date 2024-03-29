import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import colors from "./colors";
import VectorIcon from "./VectorIcon";
import NormalSearch from "./NormalSearch";
import Divider from "./Divider";
import { ReactNativeModal1 } from "./ReactNativeModal";
import ButtonSheet from "./ButtonSheet";
import * as Animatable from "react-native-animatable";
const ProgressReportTable = ({ tableDatas, quarter }) => {
  let quarterType = quarter !== undefined && quarter;
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [moadalVisiable, setModalVisiable] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [isModalEdited, setIsModalEdited] = useState([]);
  useEffect(() => {
    // Perform filtering based on the search term
    const filteredResults = tableDatas.filter((item) => {
      const noValue = item["Sno"].toLowerCase();
      const modalActivityValue = item["modelActivity"].toLowerCase();
      return (
        noValue.includes(searchTerm.toLowerCase()) ||
        modalActivityValue.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filteredResults);
  }, [searchTerm, tableDatas]);

  return (
    <View
      style={{
        backgroundColor: "#f1f1f1",
        paddingVertical: 10,
        marginTop: 10,
      }}
    >
      <Divider />
      <NormalSearch searchValue={searchTerm} setSearchValue={setSearchTerm} />
      <View
        style={{
          backgroundColor: colors.tableRowsBackColors,
          justifyContent: "space-between",
          marginTop: 5,
          borderWidth: 1,
          borderColor: colors.tableHeaderColor,
          borderRadius: 11,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: colors.tableHeaderColor,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              borderTopLeftRadius: 11,
              borderTopRightRadius: 11,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                width: "15%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              No.
            </Text>
            <Text
              style={{
                color: "#fff",
                width: "65%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Modal Activity
            </Text>
            <Text
              style={{
                color: "#fff",
                width: "20%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Status
            </Text>
          </View>
          {tableDatas.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 400,
              }}
            >
              <Animatable.View
                style={{ height: 70, width: 70, marginBottom: 10 }}
                animation="jello"
                easing="ease-out"
                iterationCount={3}
              >
                <Image
                  source={require("../assets/browser.png")}
                  style={{ height: 60, width: 60, marginTop: 10 }}
                />
              </Animatable.View>
              <Text style={{ marginTop: 10 }}>No records found !!</Text>
            </View>
          ) : (
            <ScrollView
              removeClippedSubviews={true}
              nestedScrollEnabled={true}
              style={{ height: 400 }}
            >
              {filteredData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    // backgroundColor: "#efeef7",
                    backgroundColor: isModalEdited.includes(index)
                      ? "#b8b4d9"
                      : "#efeef7",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0.2,
                  }}
                >
                  <Text style={{ width: "15%", textAlign: "center" }}>
                    {item["Sno"]}
                  </Text>
                  <Text style={{ width: "70%", textAlign: "center" }}>
                    {item["modelActivity"]}
                  </Text>
                  <View
                    style={{
                      width: "15%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="database-plus"
                      size={30}
                      color={colors.tableHeaderColor}
                      onPress={() => {
                        setItems({ item, id: index, quarterType }),
                          setModalVisiable(true);
                      }}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        {/* Footer of table */}
        <View
          style={{
            backgroundColor: colors.tableHeaderColor,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          {/* <View
            style={{
              marginVertical: 10,
              marginLeft: 10,
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: 5,
              borderRadius: 15,
              paddingHorizontal: 10,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              onPress={() => {
                setShowTotal(true);
              }}
              style={{ color: "#fff" }}
            >
              Total Result
            </Text>
          </View> */}
          <View style={{ marginVertical: 10, marginRight: 10 }}>
            <Text style={{ color: "#fff" }}>
              No. of Data Edited {isModalEdited.length}/{filteredData.length}
            </Text>
          </View>
        </View>
      </View>
      <ReactNativeModal1
        isModalVisible={moadalVisiable}
        setModalVisible={setModalVisiable}
        item={items}
        quarterType={quarterType}
        setIsModalEdited={setIsModalEdited}
        isModalEdited={isModalEdited}
      />
      <ButtonSheet isVisible={showTotal} onClose={setShowTotal} />
    </View>
  );
};

export default ProgressReportTable;
