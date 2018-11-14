import { StyleSheet } from 'react-native';

const ServiceDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    titleViewContainer: { height: 30, backgroundColor: '#58C4C5', justifyContent: 'center' },
    titleTextStyle: { fontSize: 16, color: '#ffffff', textAlign: 'center' },
    childContainer: {
        backgroundColor: '#f9f9f9',
    },
    subChildContainer: {
        height: 100, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center'
    },
    itemViewCotainer: {
        flex: 0.5,
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#58C4C5',
        borderWidth: 1
    },
    minusView: { backgroundColor: '#58C4C5', height: 50, width: 50, justifyContent: 'center' },
    plusView: { backgroundColor: '#58C4C5', height: 50, width: 50, justifyContent: 'center' },
    switchContainer:
    {
        margin: 10, flexDirection: 'row'
    },
    itemTextStyle:
    {
        flex: 0.6
    },
    swithStyle: {
        flex: 0.4
    },
    buttonViewStyle:
    {
        margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    buttonTextStyle:
    {
        fontSize: 16, color: '#ffffff', textAlign: 'center'
    },
    deviderStyle: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
    }
});

export default ServiceDetailStyle;
