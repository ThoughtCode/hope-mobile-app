import { StyleSheet } from 'react-native';

const AddressFormStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    bannerImageContainer: {
        height: 50, justifyContent: 'center', borderColor: '#000000', borderWidth: 2, margin: 10
    },
    buttonViewStyle:
    {
        margin: 10, height: 50, backgroundColor: '#287ABD', justifyContent: 'center'
    },
    buttonTextStyle:
    {
        fontSize: 16, color: '#ffffff', textAlign: 'center'
    },
    titleTextViewStyle: {
        margin: 10, height: 50, backgroundColor: '#f0f0f0', justifyContent: 'center'
    },
    titleTextStyle:
    {
        fontSize: 16, color: '#B5B5B5', marginLeft: 10
    },
    textInputStyleContainer: {
        borderColor: "#d2d2d2",
        borderWidth: 1,
        margin: 10,
        height: 30
    },
    textInputStyle: {
        // placeholderTextColor: "#A8A8A8",
        fontSize: 15,
        paddingLeft: 5,
        alignItems: 'center'
    },
});

export default AddressFormStyle;
