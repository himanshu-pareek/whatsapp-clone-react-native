import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';

import NewMessageButton from '../components/NewMessageButton';

// import chatRooms from '../data/ChatRooms';
import { getUser } from './queries';

const ChatsScreen = () => {

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(
          getUser,
          {
            id: userInfo.attributes.sub,
          }
        )
      );
      setChatRooms(userData.data.getUser.chatRoomsUser.items);
      // console.log(userData.data.getUser.chatRoomsUser.items);
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ChatListItem chatRoom={chatRooms[0]} />
      <ChatListItem chatRoom={chatRooms[1]} /> */}
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ChatsScreen;
