import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-end',
    },
    icon: {
        marginHorizontal: 5,
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    }
});

export default styles;
