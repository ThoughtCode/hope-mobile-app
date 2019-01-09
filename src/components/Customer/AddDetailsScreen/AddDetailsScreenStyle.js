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
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    flex:1
  },
  textInputStyle: {
    // placeholderTextColor: "#A8A8A8",
    fontSize: 15,
    paddingLeft: 5,
    alignItems: 'center',
    height: 45,
  },
  // textStyle :{fontSize:18,fontFamily:'helvetica',marginHorizontal:20,marginVertical: 10,},
  textStyle :{flex:1,justifyContent:'center',marginLeft:20
  },
  
  backButtonImage: {
    color: "#000", position: 'absolute', top: 20, left: 20, zIndex: 1, color: '#fff'
  },
  profileView: {
    height: 80, width: 80, borderRadius: 40, backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1, marginTop: -40, borderColor: '#fff'
  },
  topTitleView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgb(240,240,240)',
    alignItems: "center"
  },
});

export default AddCardScreenStyle;