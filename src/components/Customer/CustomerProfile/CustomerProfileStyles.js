const React = require('react-native');
const { Dimensions, StyleSheet } = React;
const { height , width} = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  topImage:{
    height: width * 0.3,
    width : width
  },
  header: {
    width: Dimensions.get('window').width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main_content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  header_title: {
    fontSize: 20,
    color: '#2478AE',
    fontWeight: '600'
  },
  profile_picture_name_container: {
    width: Dimensions.get('window').width,
    // height: 160,
    // backgroundColor: '#FAFAFA',
    borderColor: '#DDDCDC',
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_name: {
    fontSize: 20,
    fontWeight: '600'
  },
  profile_image: {
    height: 100,
    resizeMode: 'contain',
    marginTop : -50,
    width:100,
    borderRadius:50
  },
  accordion_header: {
    width: Dimensions.get('window').width,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    borderColor: '#DDDCDC',
    borderBottomWidth: 1,
  },
  accordion_header_title: {
    fontSize: 16
  },
  accordion_header_contact: {
    width: Dimensions.get('window').width,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    borderColor: 'transparent',
    borderBottomWidth: 1,
  },
  accordion_content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#DDDCDC',
  },
  logout_container: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#2478AE',
  },
  logout_button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logout_button_text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 3,
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 50,
    borderColor: '#DDDCDC'
  },
  footer_item: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footer_item_text: {
    color: 'gray'
  },
});