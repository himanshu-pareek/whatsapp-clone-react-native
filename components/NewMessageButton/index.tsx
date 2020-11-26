import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const NewMessageButton = () => {

    const navigator = useNavigation();

    const handleNewMessagePressed = () => {
        navigator.navigate('Contacts');
        // console.log('New Message button clicked');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNewMessagePressed}>
                <Entypo name="new-message" size={28} color="white" />
            </TouchableOpacity >
        </View>
    );
};

export default NewMessageButton;