import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';
import * as MailCore from 'react-native-mailcore';

const EmailSender = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const generateVerificationCode = () => {
        // Generate a random 4-digit verification code
        const code = Math.floor(1000 + Math.random() * 9000);
        setVerificationCode(code.toString());
    };

    const sendEmail = async () => {
        if (!email || !verificationCode) {
            Alert.alert('Error', 'Please enter a valid email and generate a verification code.');
            return;
        }

        try {
            // Send the verification code to the email
            await MailCore.send({
                subject: 'Verification Code',
                recipients: [email],
                body: `Your verification code is: ${verificationCode}`,
            });

            Alert.alert('Success', 'Email sent successfully!');
        } catch (error) {
            console.error('Email sending failed:', error);
            Alert.alert('Error', 'Email sending failed. Please check your email address and try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Enter your email"
                onChangeText={(text) => setEmail(text)}
                style={{ width: 300, height: 40, borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Generate Verification Code" onPress={generateVerificationCode} />
            {verificationCode && <Text>Verification Code: {verificationCode}</Text>}
            <Button title="Send Email" onPress={sendEmail} />
        </View>
    );
};

export default EmailSender;
