import { StyleSheet } from 'react-native';

const FrequencyStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    childContainer: {
        margin: 10, flexDirection: 'row', alignItems: 'center'
    },
    itemView:{
        margin:10,
        flexDirection:'column'
    },
    buttonViewStyle:
    {
        margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    buttonTextStyle:
    {
        fontSize: 16, color: '#ffffff', textAlign: 'center'
    }
});

export default FrequencyStyle;
