import {StyleSheet, Dimensions} from 'react-native'
const {height , width} = Dimensions.get('window')


const AddCardScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    childContainer: {
        margin: 10, flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'
    },
    itemView:{
        margin:10,
        flexDirection:'column',
        flex:1
    },
    buttonViewStyle:
    {
        margin: 10, height: 50, backgroundColor: '#1F68A9', justifyContent: 'center'
    },
    buttonTextStyle:{
        fontSize: 16, color: '#ffffff', textAlign: 'center'
    },
    topImage:{
        height: width * 0.35,
        width : width
    },
    textInputStyleContainer: {
        borderColor: "#d2d2d2",
        borderWidth: 1,
        marginHorizontal:20,
        marginVertical: 10,
        borderRadius:5
    },
    textInputStyle: {
        // placeholderTextColor: "#A8A8A8",
        fontSize: 15,
        paddingLeft: 5,
        alignItems: 'center',
        height: 45,
    },
    textStyle :{fontSize:18,fontFamily:'helvetica',marginHorizontal:20,marginVertical: 10,},
    backButtonImage: {
        color: "#000", position: 'absolute', top: 20, left: 20, zIndex: 1, color: '#fff'
      },
});

export default AddCardScreenStyle;

