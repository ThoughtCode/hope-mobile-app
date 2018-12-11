import {StyleSheet, Dimensions} from 'react-native'
const {height , width} = Dimensions.get('window')
const thirdScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    bannerImageContainer: {
        height: 50, justifyContent: 'center', borderColor: '#000000', borderWidth: 2, margin: 10
    },
    childContainer: {
        margin: 3, flexDirection: 'row', alignItems: 'center'
    },
    ChildView: { flex: 0.9, margin: 10, flexDirection: 'column' },
    itemView: {
        marginLeft:10,
        marginTop: 5,
        flexDirection: 'row'
    },
    buttonViewStyle:
    {
        width: 300, flex: 1, margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    textInputStyleContainer: {
        borderColor: "#000000",
        borderWidth: 1,
        margin: 10,
        height: 40
    },
    textInputStyle: {
        // placeholderTextColor: "#A8A8A8",
        fontSize: 15,
        marginLeft: 10,
        alignItems: 'center'
    },
    textStyle: {
        fontFamily:"helvetica", color: '#1F68A9', fontSize: 16
    },
    deviderStyle: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    buttonViewStyle:
    {
        margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    buttonTextStyle:
    {
        fontFamily:"helvetica", fontSize: 16, color: '#ffffff', textAlign: 'center'
    },
    topImage:{
        height: width * 0.3,
        width : width
      },
});

export default thirdScreenStyle;
