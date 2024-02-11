import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import colors from "./colors";
import VectorIcon from "./VectorIcon";
import { useState } from "react";
import { ReactNativeModal1 } from "./ReactNativeModal";
import ButtonSheet from "./ButtonSheet";
import NormalSearch from "./NormalSearch";
import masterData from "../DataBaseHandle/masterData";
import Divider from "./Divider";

const ProgressReportTable = ({tableDatas,setTableDatas}) => {
  const [moadalVisiable, setModalVisiable] = useState(false);
  const [TableData, setTableData] = useState(masterData.dshcg.table);
  const [items, setItems] = useState("");
  const [showTotal, setShowTotal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(tableDatas[0]);
  useEffect(() => {
    // Perform filtering based on the search term
    const filteredResults = tableDatas.filter(item => {
      const noValue = item["Sno"].toLowerCase();
      const modalActivityValue = item['modelActivity'].toLowerCase();
      return noValue.includes(searchTerm.toLowerCase()) || modalActivityValue.includes(searchTerm.toLowerCase());
    });

    setFilteredData(filteredResults);
  }, [searchTerm, tableDatas]);
  const handlefunction=(item)=>{
setModalVisiable(true)
  }
  return (
    <View
      style={{
        backgroundColor: "#f1f1f1",
        paddingVertical: 10,
        marginTop: 10,
      }}
    >
      <Divider/>
      <NormalSearch
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
      />
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

          <View>
          <FlatList
                    nestedScrollEnabled={true}

  data={filteredData}
  renderItem={({ item, index }) => (
    <View
      key={index}
      style={{
        backgroundColor: "#efeef7",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
      }}
    >
      <Text style={{ width: "15%", textAlign: "center" }}>
        {/* no */}
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
            handlefunction(item);
            // setItems({item,id:index}), setModalVisiable(true);
          }}
        />
      </View>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  style={{ height: 400 }}
/>

          </View>
        </View>
        {/* ------------------footer of table----------------- */}
        <View
          style={{
            backgroundColor: colors.tableHeaderColor,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
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

            <Image
              source={require("../assets/gross.png")}
              style={{ height: 20, width: 20, marginLeft: 5 }}
            />
          </View>

          <View style={{ marginVertical: 10, marginRight: 10 }}>
            <Text style={{ color: "#fff" }}>0/{TableData.length}</Text>
          </View>
        </View>
        <ReactNativeModal1
          isModalVisible={moadalVisiable}
          setModalVisible={setModalVisiable}
          item={items}
        />
        <ButtonSheet isVisible={showTotal} onClose={setShowTotal} />
      </View>
    </View>
  );
};

export default ProgressReportTable;

const styles = StyleSheet.create({});
