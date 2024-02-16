import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';



const ProgressModal = (props) => {
    const { visible, setVisible, data, setData } = props;

    const [tempData, setTempData] = React.useState(data);

    const DataObjects = {
        No: '',
        Modal_Activity: '',
        Approved_Annual_Workplan_Target: '',
        Target_Quarter: '',
        Performance_in_Quarter_Achieved: '',
        Cumulative_to_Date_Achieved: '',
        Percentage_Workplan: '',
        'Expenditure (Quarter) (Ugx)': '',
        'Cumulative Expenditure(Ugx)': '',
        'Annual Budget(Ugx)': '',
        Comments: ''
    }
    const my_Data = Object.keys(DataObjects)

    const handleInputChange = (txt, item, ItemIndex) => {
        const updateData = [...tempData];
        updateData[ItemIndex][item] = txt;
        setTempData(updateData)
    }

    const findData = tempData?.find(v => (v.No == visible.No && v.Modal_Activity == visible.activity))
    const findDataIndex = tempData?.findIndex(v => (v.No == visible.No && v.Modal_Activity == visible.activity))
    return (
        <Modal
            isVisible={visible ? true : false}
            animationIn="slideInRight"
            animationOut="zoomOutDown"
            onBackdropPress={() => setVisible(null)}
            useNativeDriver
        >
            <ScrollView>
                <View style={styles.ModalWrapper}>
                    {my_Data?.map((item, index) => {
                        const disabledFields = [0, 1, 2, 3, 5, 6, 8, 9].includes(index)
                        return (
                            <Sae
                                label={item.replace(/_/g, ' ')}
                                key={index}
                                value={findData[item]}
                                iconClass={FontAwesomeIcon}
                                readOnly={disabledFields}
                                iconName={disabledFields ? 'ban' : 'pencil'}
                                iconColor={'darkblue'}
                                inputPadding={16}
                                labelHeight={20}
                                labelStyle={{ paddingLeft: 10 }}
                                inputStyle={{ color: 'darkblue', paddingLeft: 10 }}
                                borderHeight={1}
                                autoCapitalize='words'
                                autoCorrect={true}
                                onChangeText={(txt) => handleInputChange(txt, item, findDataIndex)}
                                style={[{ marginBottom: 5 }, disabledFields && { backgroundColor: '#c7d6e2', borderRadius: 5 }]}
                            />
                        )
                    })}
                    <TouchableOpacity style={styles.ModalCloseBtn}
                        onPress={() => setVisible(null)}
                    >
                        <AntDesign name="closesquare" size={24} color="#520c0f" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ModalSbmtBtn}
                        onPress={() => {
                            setVisible(null)
                            setData(tempData)
                        }}
                    >
                        <Text style={styles.ModalSbmtBtnTxt}>SAVE</Text>
                        <AntDesign name="save" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    )

};


export default ProgressModal;
