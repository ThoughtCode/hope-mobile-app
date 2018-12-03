import {StyleSheet, Dimensions} from 'react-native'
const {height , width} = Dimensions.get('window')

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImage:{
    height: width * 0.3,
    width : width
  },
  topTitleView:{
    flexDirection:'row',
    justifyContent:"space-between",
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'rgb(240,240,240)',
    alignItems:"center"
  },
  rowStyle :{
    flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'
  },
  rowText:{
    flex:1, paddingHorizontal:15
  },
  titleText :{
    fontFamily:"helvetica",fontSize: 20,marginBottom:5
  },
  subTitleText :{
    fontFamily:"helvetica",fontSize:18,color:'gray'
  },
  iconStyle :{
    marginHorizontal:10,alignSelf:'center'
  },
  childContainer: {
    margin: 10, flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'
  },
  itemView:{
    margin:10,
    flexDirection:'column',
    flex:1
  },
});