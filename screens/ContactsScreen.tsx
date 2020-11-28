import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ContactListItem from '../components/ContactListItem';

import { listUsers } from '../graphql/queries';

export default function ContactsScreen() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await API.graphql(
                    graphqlOperation(
                        listUsers,
                    )
                );
                setUsers(usersData.data.listUsers.items);
            } catch (e) {
                console.log(e);
            }
        };

        fetchUsers();
    }, []);

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
