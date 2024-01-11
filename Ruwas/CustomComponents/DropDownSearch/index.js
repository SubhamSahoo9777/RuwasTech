import React from "react"
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { SearchBar } from "react-native-elements";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const DropDownSearch = (props) => {
    const { isVisible, setIsVisible, dummyData, value, setValue } = props;
    const [searchText, setSearchText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [DataUnique, setDataUnique] = React.useState(Array.from(new Set(dummyData.map(item => item))))
    const filteredData = DataUnique.filter((v) => v.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000)
    }, [searchText])

    const renderItem = ({ item, index }) =>
    (
        <TouchableHighlight
            key={index} onPress={() => {
                setValue(item);
                setIsVisible('');
            }}
        >
            <View key={index} style={[styles.selectionDataContainer, item == value && styles.selectedText]}>
                <Text style={styles.selectionDataText}>{item}</Text>
                {item == value &&
                    <AntDesign name="check" size={24} color="#fff" />
                }
            </View>
        </TouchableHighlight>
    )

    return (
        <Modal
            isVisible={isVisible !== '' ? true : false}
            animationIn="zoomInUp"
            animationOut="bounceOutRight"
            animationInTiming={800}
            useNativeDriver
            backdropColor="rgba(1,1,1,0.5)"
        >
            <View style={styles.container}>
                <SearchBar
                    placeholder={`Search Here ...`}
                    value={searchText}
                    onChangeText={setSearchText}
                    round
                    lightTheme
                    showLoading={loading}
                    inputStyle={{ color: '#293b87' }}
                    inputContainerStyle={{ backgroundColor: '#fff' }}
                />
                {filteredData.length > 0 ?
                    <FlatList
                        data={filteredData}
                        keyExtractor={(_, index) => `index${index}`}
                        renderItem={renderItem}
                    />
                    :
                    <View style={styles.selectionDataContainer}>
                        <Text style={styles.NotFoundData}>Data Not Found !</Text>
                    </View>
                }
            </View>
            <Button
                title="Cancel"
                leading={props => <FontAwesome name="window-close" size={24} color="#fff" />}
                style={{ marginTop: 10, backgroundColor: '#c13142' }}
                onPress={() => setIsVisible(null)}
            />
        </Modal>
    )
}

export default DropDownSearch;