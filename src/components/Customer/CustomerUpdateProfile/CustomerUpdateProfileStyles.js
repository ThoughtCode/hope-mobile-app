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
    marginTop:10,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'rgb(240,240,240)',
    alignItems:"center"
  },
  mainTitleText:{
    fontSize:16,fontWeight:'400',fontFamily:"helvetica",color:'gray'
  },
  profileView:{
    height:80,width:80,borderRadius:40,backgroundColor:'#fff',alignSelf:'center',borderWidth:1,marginTop:-40,borderColor : '#fff'
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
  textInputTitleText:{
    fontSize:18,fontWeight:'600',fontFamily:"helvetica",marginBottom:5
  },
  textInputVieW:{
    marginTop:10
  },
  textInputStyle:{
    borderWidth:1,borderColor:'lightgray',borderRadius:5,height:40,paddingLeft:10
  },
  titleText:{
    fontSize:20,fontWeight:'900',fontFamily:"helvetica"
  },
  subText:{
    fontSize:14,fontFamily:"helvetica",color:'lightgray'
  },
  profileView:{
    height:100,width:100,borderRadius:50,backgroundColor:'#fff',alignSelf:'center',borderWidth:1,marginTop:-50,borderColor : '#fff'
  },
  profileImage:{
    height:100,width:100,borderRadius:50
  },
});