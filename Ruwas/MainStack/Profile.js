import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import MyCameraApp from '../CustomComponents/ImagePicker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [file, setFile] = React.useState(null);

    React.useEffect(() => {
        GetFile()
    }, [])

    const GetFile = async () => {
        const myFile = await AsyncStorage.getItem('file');
        if (myFile !== null) {
            setFile(JSON.parse(myFile))
        }
    }

    const onFileChange = async (e) => {
        await AsyncStorage.setItem('file', JSON.stringify(e))
        setFile(e)
    }

    const renderTable = (label, data) => {
        return <View style={{ flexDirection: 'row', margin: 20 }}>
            <Text>{label}</Text>
            <Text> :{data}</Text>
        </View>
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f7fdfd', paddingVertical: 50 }}>
            <MyCameraApp value={file} onDocumentChange={(e) => onFileChange(e)} />
            {/* {renderTable('Name', 'krishna')} */}
        </View>
    );
};


export default Profile;
