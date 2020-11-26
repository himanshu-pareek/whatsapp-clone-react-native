import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { User } from '../../types';
import styles from './style';

type ContactListItemProp = {
    user: User;
};

const ContactListItem = (props: ContactListItemProp) => {

    const { user } = props;

    const navigation = useNavigation();

    const handleContactListItemClicked = () => {
        // later
    };

    return (
        <View style={styles.container}>
            <Image source={{
                uri: user.imageUri,
            }}
                style={styles.avatar}
            />

            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10, }}>

                <TouchableWithoutFeedback onPress={handleContactListItemClicked}>
                    <View style={styles.content}>
                        <View style={styles.upperContent}>
                            <Text style={styles.name}>
                                {user.name}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

export default ContactListItem;
