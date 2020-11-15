import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { ChatRoom } from '../../types';
import styles from './style';

type ChatListItemProps = {
    chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    const user = chatRoom.users[1];

    const navigation = useNavigation();

    const handleChatListItemPressed = () => {
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: user.name,
        });
    };

    return (
        <View style={styles.container}>
            <Image source={{
                uri: user.imageUri,
            }}
                style={styles.avatar}
            />

            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10, }}>

                <TouchableWithoutFeedback onPress={handleChatListItemPressed}>
                    <View style={styles.content}>
                        <View style={styles.upperContent}>
                            <Text style={styles.name}>
                                {user.name}
                            </Text>
                            <Text style={styles.time}>
                                {
                                    moment(chatRoom.lastMessage.createdAt).format('MM/DD/YYYY')
                                }
                            </Text>
                        </View>
                        <View style={styles.lowerContent}>
                            <Text style={styles.lastMessage}
                                numberOfLines={1}
                                ellipsizeMode='middle'>
                                {chatRoom.lastMessage.content}
                            </Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

export default ChatListItem;
