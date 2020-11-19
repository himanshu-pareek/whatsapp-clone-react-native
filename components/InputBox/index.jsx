import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, Entypo, FontAwesome } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';

const InputBoxComponent = (props) => {

    const [message, setMessage] = useState('');

    const handleMicrophonePress = () => {
        console.log('Microphone pressed');
    };

    const handleSendPress = () => {
        console.log(`Sending message: ${message}`);
        setMessage('');
    };

    const handleButtonPress = () => {
        if (!message) {
            handleMicrophonePress();
        } else {
            handleSendPress();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh" size={24} color="grey" />
                <TextInput 
                    multiline
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                    placeholder={'Type a message'} />
                <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
                {
                    !message && <FontAwesome name="camera" size={24} color="grey" style={styles.icon} />
                }
            </View>

<TouchableOpacity onPress={handleButtonPress}>

            <View style={styles.buttonContainer}>
                {
                    !message
                        ? <FontAwesome name="microphone" size={24} color="white" />
                        : <FontAwesome name="send" size={24} color="white" />
                }
           
            </View>
            
</TouchableOpacity>
        </View>
    );
};

export default InputBoxComponent;