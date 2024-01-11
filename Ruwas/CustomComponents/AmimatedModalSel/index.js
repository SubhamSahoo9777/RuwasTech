// import React from 'react';
// import { Button, Overlay } from 'react-native-elements';
// import styles from './style';
// import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// import { FloatingLabelInput } from 'react-native-floating-label-input';
// import { SearchBar } from 'react-native-elements';
// import { AntDesign, FontAwesome } from '@expo/vector-icons';

// const AnimatedModalSel = (props) => {
//     const { data, initValue, onChange, value, error, setError } = props;

//     const [visible, setVisible] = React.useState(false);
//     const [search, setSearch] = React.useState('');

//     const filteredItems = data.filter((v) => v.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

//     const toggleOverlay = () => {
//         setVisible(!visible);
//     };

//     const handlePressItem = (item) => {
//         onChange(item);
//         toggleOverlay();
//     }

//     const renderItem = ({ item, index }) => {
//         return (
//             <TouchableOpacity
//                 style={styles.lable}
//                 onPress={() => handlePressItem(item.label)}
//             >
//                 <Text style={styles.lableText}>{item.label}</Text>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         <View>
//             <TouchableOpacity
//                 onPress={toggleOverlay}
//             >
//                 <FloatingLabelInput
//                     value={value}
//                     placeholder={initValue}
//                     editable={false}
//                     label={initValue}
//                     containerStyles={styles.input}
//                     inputStyles={{ color: '#2b0847', fontWeight: '500' }}
//                     labelStyles={{ fontWeight: 'bold' }}
//                     rightComponent={
//                         <TouchableOpacity
//                             onPress={toggleOverlay}
//                         >
//                             <AntDesign name="down-square-o" size={24} color="#888" />
//                         </TouchableOpacity>

//                     } />
//             </TouchableOpacity>

//             <Overlay
//                 isVisible={visible}
//                 onBackdropPress={toggleOverlay}
//                 overlayStyle={styles.overlay}
//             >
//                 <SearchBar
//                     placeholder="Type Here..."
//                     value={search}
//                     onChangeText={setSearch}
//                     round
//                     lightTheme
//                     containerStyle={{ borderRadius: 10 }}
//                     inputStyle={{ color: '#293b87' }}
//                 />
//                 {filteredItems.length > 0 ?
//                     <FlatList
//                         data={filteredItems}
//                         keyExtractor={(_, index) => `KEY${index}`}
//                         renderItem={renderItem}
//                     />
//                     :
//                     <View style={styles.NoDataCont}>
//                         <Text style={styles.NoDataContText}>No Data Found !</Text>
//                     </View>
//                 }
//                 <Button
//                     title="close" onPress={toggleOverlay}
//                     buttonStyle={{ backgroundColor: '#e76375' }}
//                     icon={{
//                         name: "close",
//                         size: 20,
//                         color: "white"
//                     }}
//                     raised={true}
//                 />

//             </Overlay>
//         </View>

//     );
// };

// export default AnimatedModalSel;


import React from 'react';
import { Button, Overlay } from 'react-native-elements';
import styles from './style';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

const AnimatedModalSel = (props) => {
    const { data, visible, setVisible, onChange } = props;

    const [search, setSearch] = React.useState('');

    const filteredItems = data.filter((v) => v.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    const toggleOverlay = () => {
        setVisible('');
    };

    const handlePressItem = (item) => {
        onChange(item);
        toggleOverlay();
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.lable}
                onPress={() => handlePressItem(item.label)}
            >
                <Text style={styles.lableText}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Overlay
                isVisible={visible == '' ? false : true}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlay}
            >
                <SearchBar
                    placeholder="Type Here..."
                    value={search}
                    onChangeText={setSearch}
                    round
                    lightTheme
                    containerStyle={{ borderRadius: 10 }}
                    inputStyle={{ color: '#293b87' }}
                />
                {filteredItems.length > 0 ?
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(_, index) => `KEY${index}`}
                        renderItem={renderItem}
                    />
                    :
                    <View style={styles.NoDataCont}>
                        <Text style={styles.NoDataContText}>No Data Found !</Text>
                    </View>
                }
                <Button
                    title="close" onPress={toggleOverlay}
                    buttonStyle={{ backgroundColor: '#e76375' }}
                    icon={{
                        name: "close",
                        size: 20,
                        color: "white"
                    }}
                    raised={true}
                />

            </Overlay>
        </View>

    );
};

export default AnimatedModalSel;