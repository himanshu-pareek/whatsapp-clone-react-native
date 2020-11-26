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
        justifyContent: 'space-around',
        flex: 1,
    },

    upperContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;
