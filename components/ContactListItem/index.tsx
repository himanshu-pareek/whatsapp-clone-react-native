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

            <View style={{
                flex: 1, marginLeft: 10, justifyContent: 'center',
            }}>

                <TouchableWithoutFeedback onPress={handleContactListItemClicked}>
                    <View style={styles.content}>
                        <View style={styles.upperContent}>
                            <Text style={styles.name}
                                numberOfLines={1}>
                                {user.name}
                            </Text>
                        </View>

                        <View style={styles.lowerContent}>
                            <Text style={styles.status}
                                numberOfLines={1}>
                                {user.status}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

export default ContactListItem;
