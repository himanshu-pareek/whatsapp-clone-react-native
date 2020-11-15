import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

const ChatRoomScreen = () => {
    const route = useRoute();
    return (
        <View>
            <Text>
                Chat Room me aapka swagat hai!!!
                {JSON.stringify(route.params)}
            </Text>
        </View>
    );
};

export default ChatRoomScreen;
