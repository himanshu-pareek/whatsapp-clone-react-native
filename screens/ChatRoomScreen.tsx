import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ChatMessageComponent from '../components/ChatMessage';
import InputBoxComponent from '../components/InputBox';

import BG from '../assets/images/BG.png';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../graphql/queries';

const ChatRoomScreen = () => {
    const route = useRoute();

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom, {
                    chatRoomId: route.params?.id,
                    sortDirection: "DESC",
                }
                )
            );
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
