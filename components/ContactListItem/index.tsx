import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { User } from '../../types';
import styles from './style';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

type ContactListItemProp = {
    user: User;
};

const ContactListItem = (props: ContactListItemProp) => {

    const { user } = props;

    const navigation = useNavigation();

    const handleContactListItemClicked = async () => {

        try {
            // 1. Crate a new Chat Room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom,
                    {
                        input: {
                            lastMessageId: ''
                        }
                    }
                )
            );

            if (!newChatRoomData.data) {
                console.log('Failed to create new chat room');
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // 2. Add `user` to new chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input: {
                            userId: user.id,
                            chatRoomId: newChatRoom.id,
                        },
                    }
                )
            );

            // 3. Add authenticated user to new chat room
            const userInfo = await Auth.currentAuthenticatedUser();

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input: {
                            userId: userInfo.attributes.sub,
                            chatRoomId: newChatRoom.id,
                        },
                    }
                )
            );

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: user.name,
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{
                uri: user.imageUri,
            }}
                style={styles.avatar}
            />

            <View style={{
                flex: 1, marginLeft: 10, justifyContent: 'center',
            }}>

                <TouchableWithoutFeedback onPress={handleContactListItemClicked}>
                    <View style={styles.content}>
                        <View style={styles.upperContent}>
                            <Text style={styles.name}
                                numberOfLines={1}>
                                {user.name}
                            </Text>
                        </View>

                        <View style={styles.lowerContent}>
                            <Text style={styles.status}
                                numberOfLines={1}>
                                {user.status}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

export default ContactListItem;
