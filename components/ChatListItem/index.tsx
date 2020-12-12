import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { ChatRoom } from '../../types';
import styles from './style';
import { Auth } from 'aws-amplify';

type ChatListItemProps = {
    chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;
    const [user, setUser] = useState(null);

    console.log('chatRoom');
    console.log(chatRoom);

    const navigation = useNavigation();

    useEffect(() => {
        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            let otherUser = null;
            if (userInfo.attributes.sub === chatRoom.chatRoom.chatRoomUsers.items[0].user.id) {
                otherUser = chatRoom.chatRoom.chatRoomUsers.items[1].user
            } else {
                otherUser = chatRoom.chatRoom.chatRoomUsers.items[0].user;
            }
            setUser(otherUser);
        };
        getOtherUser();
    }, []);

    const handleChatListItemPressed = () => {
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: user?.name,
        });
    };

    return (
        <View style={styles.container}>
            <Image source={{
                uri: user?.imageUri,
            }}
                style={styles.avatar}
            />

            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10, }}>

                <TouchableWithoutFeedback onPress={handleChatListItemPressed}>
                    <View style={styles.content}>
                        <View style={styles.upperContent}>
                            <Text style={styles.name}>
                                {user?.name}
                            </Text>
                            <Text style={styles.time}>
                                {
                                    chatRoom.lastMessage ? moment(chatRoom.lastMessage.createdAt).format('MM/DD/YYYY') : 'Never'
                                }
                            </Text>
                        </View>
                        <View style={styles.lowerContent}>
                            <Text style={styles.lastMessage}
                                numberOfLines={1}
                                ellipsizeMode='middle'>
                                {chatRoom.lastMessage?.content || ''}
                            </Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

export default ChatListItem;
