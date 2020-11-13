import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';

import { ChatRoom } from '../../types';
import styles from './style';

type ChatListItemProps = {
    chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    const user = chatRoom.users[1];

    return (
        <View style={styles.container}>
            <Image source={{
                    uri: user.imageUri,
                }}
                style={styles.avatar} 
            />

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
            
        </View>
    );
};

export default ChatListItem;
