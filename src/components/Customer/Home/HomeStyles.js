const React = require('react-native');
const { Dimensions, StyleSheet, Platform } = React;

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carousel_container: {
    flex: 9,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  carousel_description: {
    width: BannerWidth,
    textAlign: 'center',  
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    position: 'absolute', 
    top: BannerHeight/2
  },
  carousel_subtitle: {
    width: BannerWidth,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    position: 'absolute',
    top: BannerHeight/1.8
  },
  actions_container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  signup_button_container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 30,
    borderRadius: 3,
    margin: 10
  },
  login_button_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 30,
    borderRadius: 3,
    margin: 10
  },
  action_buttons: {
    width: 200,
    color: "#0069A7",
    fontWeight: '900',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  logo_image: {
    position: 'absolute',
    width: 120,
    height: 110,
    top: 150
  },
  recover_password_text: {
    position: 'absolute',
    width: 200,
    height: 20,
    top: 300,
    fontSize: 16,
    color: "#fff",
    fontWeight: '600'
  }
});