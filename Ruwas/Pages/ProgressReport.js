import masterData from "../DataBaseHandle/masterData";
import {
  React,
  StyleSheet,
  colors,
  View,
  useState,
  ScrollView,
  TextInput,
  Text,
  height,
  VectorIcon,
  Image
} from "../components/AllPackages";
import { CustomDropDown, AttachFile } from "../components/AllReusableComponets";
import CommonTextInput from "../components/CommonTextInput";
import { SubmitButton, SubmitButton2 } from "../components/AllButtons";
import LocalData from "../Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import ProgressModal from "./ProgressModal";
import { Entypo, AntDesign } from "@expo/vector-icons";
import styles from "./style";
import SearchAnimation from "../components/SearchAnimation";
import ButtonSheet from "../components/ButtonSheet";
import { ReactNativeModal1 } from "../components/ReactNativeModal";

const ProgressReport1 = () => {
  const { ProgresReportHead, ProgressReportTable } = LocalData;

  const [year, setYear] = useState("");
  const [rwsrc, setRwsrc] = useState("");
  const [localGovt, setLocalGovt] = useState("");
  const [quarter, setQuarter] = useState("");
  const [file, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [TblStatus, setTblStatus] = useState(null);
  const [showTotal, setShowTotal] = useState(false);
  const [TbleData, setTbleData] = useState(ProgressReportTable);
const [moadalVisiable,setModalVisiable]=useState(false)
const [items,setItems]=useState("")
  const handleSubmit = () => {
    if (year && rwsrc && localGovt && quarter) {
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.progressReportBody,
        margin: 16,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <CustomDropDown
          dropData={masterData.dshcg.finantialYear}
          setSelect={setYear}
          title="Financial Year"
        />
        <CustomDropDown
          dropData={masterData.dshcg.rwsrc}
          setSelect={setRwsrc}
          title="RWSRC"
        />
        <CustomDropDown
          dropData={masterData.dshcg.localgovt}
          setSelect={setLocalGovt}
          title="Local Government"
        />
        <CustomDropDown
          dropData={masterData.dshcg.quarter}
          setSelect={setQuarter}
          title="Quarter"
        />
        <TextInput
          placeholderTextColor={colors.commonTextPlaceHolderColor}
          placeholder="Funds Received (UGX)"
          editable={false}
          style={styles.DisableTxtInput}
        />
        <TextInput
          placeholderTextColor={colors.commonTextPlaceHolderColor}
          placeholder="Funds Received Cumulative"
          editable={false}
          style={styles.DisableTxtInput}
        />

        {/* <View style={styles.Table}>
          <View style={styles.TblCntr}>
            {ProgresReportHead.map((Head, index) => {
              return (
                <View key={index} style={[styles.head]}>
                  <Text style={styles.HeadTxt}>{Head}</Text>
                </View>
              );
            })}
          </View>

          {TbleData.map((item, index) => {
            const keysWithValues = Object.keys(item).some(
              (key) => key !== "Comments" && item[key] == ""
            );
            return (
              <View style={styles.TblCellCntr} key={index}>
                {Object.keys(item).map((cell, cellIndex) => {
                  const showOnlyData = [0, 1].includes(cellIndex);
                  return showOnlyData ? (
                    <View
                      key={cellIndex}
                      style={[
                        cellIndex == 0 ? { width: "20%" } : { width: "60%" },
                        styles.TblCell,
                      ]}
                    >
                      <Text style={styles.CellTxt}>{item[cell]}</Text>
                    </View>
                  ) : (
                    cellIndex == 2 && (
                      <TouchableOpacity
                        key={cellIndex}
                        style={styles.actionBtn}
                        onPress={() =>
                          setTblStatus({
                            No: item.No,
                            activity: item.Modal_Activity,
                          })
                        }
                      >
                        <MaterialCommunityIcons
                          name={
                            keysWithValues
                              ? "database-plus-outline"
                              : "database-edit"
                          }
                          size={24}
                          color="darkblue"
                        />
                      </TouchableOpacity>
                    )
                  );
                })}
              </View>
            );
          })}
        </View> */}
        {/* -----------------------------------------------table */}
        <View
          style={{
            backgroundColor: colors.tableRowsBackColors,
            justifyContent: "space-between",
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.tableHeaderColor,
            borderRadius: 11,
          }}
        >
          <View style={{}}>
            <View
              style={{
                backgroundColor: colors.tableHeaderColor,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                borderTopRightRadius: 9,
                borderTopLeftRadius: 9,
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
           <ScrollView 
           nestedScrollEnabled={true}
            style={{ height: 200 }}>
           {TbleData.map((item, index) => {
                const allkeys = Object.keys(item);
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#efeef7",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderBottomWidth:0.2
                    }}
                  >
                    <Text style={{ width: "15%", textAlign: "center" }}>
                      {item[allkeys[0]]}
                    </Text>
                    <Text style={{ width: "70%", textAlign: "center" }}>
                      {item[allkeys[1]]}
                    </Text>
                    <TouchableOpacity
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
                        onPress={()=>{setItems(item),setModalVisiable(true)}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
           </ScrollView>
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
              alignContent: "center",
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
                flexDirection:"row"
              }}
            >
              <Text onPress={() => {setShowTotal(true)}} style={{ color: "#fff" }}>
                Total Result
              </Text>
                
              <Image source={require("../assets/gross.png")} style={{height:20,width:20,marginLeft: 5,}}/>
            </View>

            <View style={{ width: "55%", marginVertical: 10, marginRight: 10 }}>
              <SearchAnimation />
            </View>
          </View>
        </View>
<ReactNativeModal1 isModalVisible={moadalVisiable} setModalVisible={setModalVisiable} item={items}/>
        {/* {TblStatus && (
          <ProgressModal
            visible={TblStatus}
            setVisible={setTblStatus}
            data={TbleData}
            setData={setTbleData}
          />
        )} */}
        <ButtonSheet isVisible={showTotal} onClose={setShowTotal} />
        <Text style={{marginLeft: 4,marginTop:10}}>Attach<Text style={{color:"red"}}>*</Text></Text>
        <AttachFile title={"File"} setFile={setFiles} />
        {/* <SubmitButton onPress={handleSubmit} Icon={<Entypo name="save" size={20} color="#fff" />} /> */}
        <SubmitButton />
      </ScrollView>
    </View>
  );
};

export default ProgressReport1;
