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
  },
  subTitleStyle :{
    fontFamily:"helvetica",
    fontSize: 20,
    fontWeight : '600',
    color : '#fff',
    position:'absolute',
    top : width * 0.2,
    alignSelf : 'center'
  },
  servicios_item :{
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    shadowColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  servicios_item_image: {
    width: Dimensions.get('window').width - 60,
    flex: 1,
    resizeMode: 'cover',
  },
  servicios_item_description: {
    margin: 10
  },
  section_servicios_container: {
    height: height / 2,
    padding: 10,
    alignItems: 'flex-start',
  },
  servicios_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});