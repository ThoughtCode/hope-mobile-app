import { StyleSheet,Dimensions } from 'react-native';
const {height , width} = Dimensions.get('window')
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
        margin: 10, height: 60, backgroundColor: '#287ABD', justifyContent: 'center'
    },
    buttonTextStyle:{
        fontSize: 20, color: '#ffffff', textAlign: 'center'
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
        borderRadius:5
    },
    textInputStyle: {
        // placeholderTextColor: "#A8A8A8",
        fontSize: 15,
        paddingLeft: 5,
        alignItems: 'center',
        height: 45,
    },
    profile_picture_name_container: {
        width: Dimensions.get('window').width,
        // height: 160,
        // backgroundColor: '#FAFAFA',
        borderColor: '#DDDCDC',
        // borderTopWidth: 2,
        // borderBottomWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      profile_name: {
        fontSize: 20,
        fontWeight: '600'
      },
      profile_image: {
        height: 100,
        resizeMode: 'contain',
        marginTop : -50,
        width:100,
        borderRadius:50
      },
      topImage:{
        height: width * 0.3,
        width : width
      },
});

export default AddressFormStyle;
