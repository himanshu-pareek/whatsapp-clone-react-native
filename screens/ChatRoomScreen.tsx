import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ChatMessageComponent from '../components/ChatMessage';
import InputBoxComponent from '../components/InputBox';

import BG from '../assets/images/BG.png';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const ChatRoomScreen = () => {
    const route = useRoute();

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(`Chat room id = ${route.params?.id}`);
        const fetchMessages = async () => {
            const messagesData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom, {
                    chatRoomId: route.params?.id,
                    sortDirection: "DESC",
                }
                )
            );
            console.log(messagesData.data.messagesByChatRoom.items);
            setMessages(messagesData.data.messagesByChatRoom.items);
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setUser(userInfo);
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(
                onCreateMessage
            )
        );
        subscription.subscribe({
            next: (data) => {
                const newMessage = data.value.data.onCreateMessage;
                if (newMessage.chatRoomId !== route.params?.id) {
                    console.log('Message for another room');
                    return;
                }
                setMessages([newMessage, ...messages]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <ImageBackground source={BG} style={{ height: '100%', width: '100%', }}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessageComponent message={item} currentUserId={user?.attributes?.sub} />}
                keyExtractor={(item) => item.id}
                inverted
            />

            <InputBoxComponent chatRoomId={route.params?.id} />
        </ImageBackground>
    );
};

export default ChatRoomScreen;
