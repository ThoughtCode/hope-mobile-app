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
  mainTitleText:{
    fontFamily:"helvetica",
    fontSize: 18,
    color : 'gray'  
  },
  filterView:{
    backgroundColor:'rgb(0,121,189)',paddingHorizontal:20,paddingVertical:1
  },
  filterText:{
    color : "#fff"
  },
  renderRowView:{
    marginHorizontal:20,paddingVertical:20
  },
  listTitleView:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  },
  titleText:{
    fontSize:18,fontWeight:'600',fontFamily:"helvetica"
  },
  textFont:{
    fontFamily:"helvetica"
  },
  subtextViewStyle:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  }

});