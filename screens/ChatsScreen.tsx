import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import chatRooms from '../data/ChatRooms';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      {/* <ChatListItem chatRoom={chatRooms[0]} />
      <ChatListItem chatRoom={chatRooms[1]} /> */}
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={ item } /> }
        keyExtractor={( item ) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});