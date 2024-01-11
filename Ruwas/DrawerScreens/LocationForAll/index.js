import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from '../AddFacility/style';
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownSearch from "../../CustomComponents/DropDownSearch";
import { AntDesign } from '@expo/vector-icons';

const LocationDetailsForAll = (props) => {
    const { v, Location, setLocation, locDet } = props;

    const handleInputChange = (category, key, value, valuePorp, index) => {
        if (index == 0) {
            const Update = { ...Location };
            Update[category][valuePorp[index]] = value;
            Update[category][valuePorp[1]] = '';
            Update[category][valuePorp[2]] = '';
            Update[category][valuePorp[3]] = '';
            setLocation(Update);
            return;
        }
        const Update = { ...Location };
        Update[category][valuePorp[index]] = value;
        setLocation(Update)
        // setLocation({
        //   ...Location,
        //   [category]: {
        //     ...Location[category],
        //     [key]: value,
        //   },
        // });
    };


    const handleLocPress = (LocIndex, v, k, arrayOFkeYS) => {
        if (LocIndex == 0) {
            setError(null);
            setVisible(k)
        }
        else {
            if (Location[v][arrayOFkeYS[LocIndex - 1]] == '') {
                setError(LocIndex - 1)
            }
            else {
                setError(null);
                setVisible(k)
            }
        }
    }

    const [error, setError] = React.useState();
    const [visible, setVisible] = React.useState();


    return (
        Object.keys(Location[v]).map((k, LocIndex) => {
            const valuePorp = Object.keys(Location[v]);
            const insideData = [1, 2, 3].includes(LocIndex) ? Location[v][valuePorp[LocIndex - 1]] !== '' &&
                locDet.filter((r) => {
                    if (LocIndex == 1) {
                        return r[valuePorp[LocIndex - 1]] == Location[v][valuePorp[LocIndex - 1]]
                    }
                    else if (LocIndex == 2) {
                        return r[valuePorp[LocIndex - 2]] == Location[v][valuePorp[LocIndex - 2]] && r[valuePorp[LocIndex - 1]] == Location[v][valuePorp[LocIndex - 1]]
                    }
                    else if (LocIndex == 3) {
                        return r[valuePorp[LocIndex - 3]] == Location[v][valuePorp[LocIndex - 3]] && r[valuePorp[LocIndex - 2]] == Location[v][valuePorp[LocIndex - 2]] && r[valuePorp[LocIndex - 1]] == Location[v][valuePorp[LocIndex - 1]]
                    }
                })
                : LocIndex == 0 && locDet
            return (
                <View key={`keyIS${LocIndex}`}>
                    <FloatingLabelInput
                        value={Location[v][k]}
                        editable={false}
                        label={`${k.replace('name','')} *`}
                        containerStyles={styles.input}
                        inputStyles={{ color: '#2b0847', fontWeight: '500' }}
                        labelStyles={{ fontWeight: 'bold',textTransform:'capitalize' }}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => handleLocPress(LocIndex, v, k, valuePorp)}
                            >
                                <AntDesign name="down-square-o" size={24} color="#134484" />
                            </TouchableOpacity>
                        } />
                    {error == LocIndex &&
                        <Text style={{ color: 'red' }}>.Please Select {valuePorp[LocIndex]}</Text>}
                    {visible == k &&
                        <DropDownSearch
                            isVisible={visible}
                            setIsVisible={setVisible}
                            dummyData={insideData.map((j) => { return j[valuePorp[LocIndex]] })}
                            value={Location[v][k]}
                            setValue={(e) => handleInputChange(v, k, e, valuePorp, LocIndex)}
                        />
                    }
                </View>
            )
        }))
}
export default LocationDetailsForAll;
