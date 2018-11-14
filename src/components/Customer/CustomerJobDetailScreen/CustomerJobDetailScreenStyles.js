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
  mainTitleText:{
    fontSize:16,fontWeight:'400',fontFamily:"helvetica",color:'gray',
  },
  profileView:{
    height:80,width:80,borderRadius:40,backgroundColor:'#fff',alignSelf:'center',borderWidth:1,marginTop:-40,borderColor : '#fff'
  },
  profileImage:{
    height:78,width:78,borderRadius:39
  },
  backButtonImage:{
    color:"#000",position:'absolute',top:20,left:20,zIndex:1,color : '#fff'
  },
  opinionsView:{
    flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5
  },
  opinionsText:{
    fontSize:16,marginLeft:10,color:'gray',fontFamily : 'helvetica'
  },
  bottomButton:{
    alignItems:'center',paddingVertical:10
  },
  filterText:{
    color : "#fff"
  },
  renderRowView:{
    paddingHorizontal:20,paddingVertical:10,borderBottomWidth:1,borderBottomColor :'gray'
  },
  listTitleView:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  },
  titleText:{
    fontSize:20,fontWeight:'900',fontFamily:"helvetica"
  },
  subText:{
    fontSize:14,fontFamily:"helvetica",color:'gray'
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
  renderRowView1:{
    marginHorizontal:20,paddingVertical:10
  },
  
  
  

});