const React = require('react-native');
const { Dimensions, StyleSheet, Platform } = React;

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carousel_container: {
    flex: 9,
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
  actions_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#000'
  },
  signup_button_container: {
    flex: 1,
    backgroundColor: '#157DF8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  login_button_container: {
    flex: 1,
    backgroundColor: '#C4DE9F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  action_buttons: {
    width: 200,
    color: "#fff",
    fontWeight: '900',
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});