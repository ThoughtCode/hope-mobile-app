import { StyleSheet } from 'react-native';

const CardSelectStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    bannerImageContainer: {
        height: 50, justifyContent: 'center', borderColor: '#000000', borderWidth: 2, margin: 10
    },
    childContainer: {
        margin: 5, flexDirection: 'row', alignItems: 'center'
    },
    ChildView: { flex: 0.9, margin: 10, flexDirection: 'column' },
    itemView: {
        margin: 10,
        flexDirection: 'column'
    },
    buttonViewStyle:
    {
        width: 300, flex: 1, margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    buttonTextStyle:
    {
        fontSize: 16, color: '#ffffff', textAlign: 'center'
    },
    textStyle: {
        color: '#1F68A9', fontSize: 16
    }
});

export default CardSelectStyle;
