import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ChatMessageComponent from '../components/ChatMessage';
import InputBoxComponent from '../components/InputBox';

import ChatRoomData from '../data/Chats';
import BG from '../assets/images/BG.png';

const ChatRoomScreen = () => {
    const route = useRoute();
    return (
        <ImageBackground source={BG} style={{ height: '100%', width: '100%', }}>
            <FlatList
                data={ChatRoomData.messages}
                renderItem={({ item }) => <ChatMessageComponent message={item} />}
                keyExtractor={(item) => item.id}
                inverted
            />

            <InputBoxComponent />
        </ImageBackground>
    );
};

export default ChatRoomScreen;
