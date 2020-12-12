import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, Entypo, FontAwesome } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import { API, Auth, graphqlOperation } from 'aws-amplify';

import { createMessage } from "../../graphql/mutations";

const InputBoxComponent = (props) => {

    const { chatRoomId } = props;

    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setUser(userInfo);
        };
        fetchUser();
    }, []);

    const handleMicrophonePress = () => {
        console.log('Microphone pressed');
    };

    const handleSendPress = async () => {
        try {
            await API.graphql(
                graphqlOperation(
                    createMessage,
                    {
                        input: {
                            content: message,
                            userId: user.attributes.sub,
                            chatRoomId
                        }
                    }
                )
            );
        } catch (error) {
            console.error(error);
        }
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