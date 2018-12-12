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
  bottomButton:{
    backgroundColor:'rgb(0,121,189)',alignItems:'center',paddingVertical:10
  },
  backButtonImage:{
    color:"#000",position:'absolute',top:20,left:20,zIndex:1,color : '#fff'
  },
  filterText:{
    color : "#fff"
  },
  profileImage:{
    height:78,width:78,borderRadius:39
  },
  userImage:{
    height:38,width:38,borderRadius:19
  },
  userImageView:{
    height:40,width:40,borderRadius:20,backgroundColor:'#fff',alignSelf:'center',marginRight:5
  },
  profileView:{
    height:80,width:80,borderRadius:40,backgroundColor:'#fff',alignSelf:'center',borderWidth:1,marginTop:-40,borderColor : '#fff'
  },
  renderRowView:{
    marginHorizontal:20,paddingVertical:10
  },
  listTitleView:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  },
  titleText:{
    fontSize:19,fontWeight:'600',fontFamily:"helvetica"
  },
  subText:{
    fontSize:14,fontFamily:"helvetica",color:'lightgray'
  },
  opinionsView:{
    flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5
  },
  opinionsText:{
    fontSize:16,marginLeft:10,color:'gray',fontFamily : 'helvetica'
  },
  emptyText:{
    fontSize:16,color:'#1e67a9',fontFamily : 'helvetica'
  },
  textInputVieW:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:5,marginTop:10
  },
  textInputTitleText:{
    fontSize:18,fontWeight:'600',fontFamily:"helvetica",marginBottom:5
  },
  textInputCommentText:{
    fontSize:14,fontWeight:'400',fontFamily:"helvetica",marginBottom:5
  },
});