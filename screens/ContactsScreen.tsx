import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';
import ContactListItem from '../components/ContactListItem';

import users from '../data/Users';

export default function ContactsScreen() {
    return (
        <View style={styles.container}>
            {/* <ChatListItem chatRoom={chatRooms[0]} />
      <ChatListItem chatRoom={chatRooms[1]} /> */}
            <FlatList
                data={users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
