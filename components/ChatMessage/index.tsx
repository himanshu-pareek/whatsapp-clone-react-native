import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { Message } from '../../types';
import useColorScheme from '../../hooks/useColorScheme';

import styles from './style';
import Colors from '../../constants/Colors';

type ChatMessageProps = {
    message: Message,
};

const ChatMessageComponent = (props: ChatMessageProps) => {
    const colorScheme = useColorScheme();
    const { message } = props;

    const isMyMessage = () => {
        return message.user.id === 'u1';
    };

    const getNameColor = () => {
        return Colors[colorScheme].tint;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? Colors[colorScheme].myMessageBoxColor : Colors[colorScheme].messageBoxColor,
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50,
                }
            ]}>
                {!isMyMessage() && <Text style={[
                    styles.name,
                    {
                        color: getNameColor(),
                    }
                ]}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    );
};

export default ChatMessageComponent;
