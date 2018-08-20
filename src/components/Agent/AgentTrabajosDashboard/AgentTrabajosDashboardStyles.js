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
  logoStyle : {
    position:'absolute',height:40,width:40,alignSelf:'flex-end',top : width * 0.1,right : width * 0.1
  },
  titleStyle:{
    fontFamily:"helvetica",
    fontSize: 20,
    fontWeight : '600',
    color : '#fff',
    position:'absolute',
    top : width * 0.1,
    alignSelf : 'center'
  }
});