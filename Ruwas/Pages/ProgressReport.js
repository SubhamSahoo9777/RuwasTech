import masterData from "../DataBaseHandle/masterData";
import {
  React,
  StyleSheet,
  colors,
  View,
  useState,
  ScrollView,
  TextInput,
  Text
} from "../components/AllPackages";
import { CustomDropDown, AttachFile } from "../components/AllReusableComponets"
import CommonTextInput from "../components/CommonTextInput"
import { SubmitButton } from "../components/AllButtons";
import LocalData from '../Constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import ProgressModal from "./ProgressModal";
import { Entypo, AntDesign } from '@expo/vector-icons';
import styles from "./style";


const ProgressReport1 = () => {
  const { ProgresReportHead, ProgressReportTable } = LocalData;

  const [year, setYear] = useState("")
  const [rwsrc, setRwsrc] = useState("")
  const [localGovt, setLocalGovt] = useState("")
  const [quarter, setQuarter] = useState("")
  const [file, setFiles] = useState("")
  const [title, setTitle] = useState("")
  const [TblStatus, setTblStatus] = useState(null)

  const [TbleData, setTbleData] = useState(ProgressReportTable);

  const handleSubmit = () => {
    if (year && rwsrc && localGovt && quarter) { }
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.progressReportBody, margin: 16 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <CustomDropDown dropData={masterData.dshcg.finantialYear} setSelect={setYear} title="Financial Year" />
        <CustomDropDown dropData={masterData.dshcg.rwsrc} setSelect={setRwsrc} title="RWSRC" />
        <CustomDropDown dropData={masterData.dshcg.localgovt} setSelect={setLocalGovt} title="Local Government" />
        <CustomDropDown dropData={masterData.dshcg.quarter} setSelect={setQuarter} title="Quarter" />
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

        <View style={styles.Table}>
          <View style={styles.TblCntr}>
            {ProgresReportHead.map((Head, index) => {
              return (
                <View key={index} style={[styles.head]}>
                  <Text style={styles.HeadTxt}>{Head}</Text>
                </View>
              )
            })}
          </View>

          {TbleData.map((item, index) => {
            const keysWithValues = Object.keys(item).some(key => key !== 'Comments' && item[key] == "");
            return (
              <View style={styles.TblCellCntr} key={index}>
                {
                  Object.keys(item).map((cell, cellIndex) => {
                    const showOnlyData = [0, 1].includes(cellIndex);
                    return (
                      showOnlyData ?
                        <View key={cellIndex} style={[cellIndex == 0 ? { width: '20%' } : { width: '60%' }, styles.TblCell]}>
                          <Text style={styles.CellTxt}>{item[cell]}</Text>
                        </View>
                        :
                        cellIndex == 2 &&
                        <TouchableOpacity
                          key={cellIndex}
                          style={styles.actionBtn}
                          onPress={() => setTblStatus({ No: item.No, activity: item.Modal_Activity })}>
                          <MaterialCommunityIcons name={keysWithValues ? "database-plus-outline" : "database-edit"} size={24} color="darkblue" />
                        </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })}
        </View>

        {TblStatus &&
          <ProgressModal visible={TblStatus} setVisible={setTblStatus} data={TbleData} setData={setTbleData} />
        }
        <AttachFile title={"File"} setFile={setFiles} />
        <SubmitButton onPress={handleSubmit} Icon={<Entypo name="save" size={20} color="#fff" />} />
      </ScrollView>
    </View >
  )
}

export default ProgressReport1