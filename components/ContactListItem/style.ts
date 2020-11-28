import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 50,
    },

    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },

    content: {
        marginLeft: 10,
    },

    lowerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    status: {
        color: 'gray',
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    upperContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default styles;
