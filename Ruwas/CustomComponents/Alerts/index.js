import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

const Alerts = (props) => {
    const { showAlert, setShowAlert, onPress } = props;

    const hideAlertHandler = () => {
        setShowAlert('');
        onPress ? onPress() : null;
    };

    return (
        <AwesomeAlert
            show={showAlert ? true : false}
            showProgress={false}
            title="Alert"
            message={showAlert}
            showConfirmButton={true}
            cancelText="cancel"
            confirmText="Ok"
            confirmButtonColor="#DD6B55"
            onCancelPressed={hideAlertHandler}
            onConfirmPressed={hideAlertHandler}
            showCancelButton={onPress ? false : true}
            cancelButtonStyle={{ width: width * 0.3, alignItems: 'center' }}
            cancelButtonTextStyle={{ color: '#000' }}
            confirmButtonStyle={{ width: width * 0.3, alignItems: 'center' }}
            contentContainerStyle={{ width: width * 0.9 }}
            confirmButtonTextStyle={{ color: '#fff', fontWeight: 'bold' }}
            titleStyle={{ color: 'red' }}
            messageStyle={{ color: '#000' }}
        />
    );
};

export default Alerts;
