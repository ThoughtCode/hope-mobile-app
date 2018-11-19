import {StyleSheet, Dimensions} from 'react-native'
const {height , width} = Dimensions.get('window')


const CardListScreenStyle = StyleSheet.create({
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
});

export default CardListScreenStyle;

