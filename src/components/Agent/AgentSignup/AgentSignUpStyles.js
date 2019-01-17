const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  sign_up_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input_container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    width: Dimensions.get('window').width,
  },
  agent_indicator: {
    backgroundColor: '#0069A7',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 30,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  agent_indicator_text: {
    color: '#fff',
    fontSize: 20
  },
  customer_login_action: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 60,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 15,
    zIndex: 1
  },
  customer_login_action_text: {
    color: '#fff',
    fontSize: 18
  },
  signup_form_container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    paddingHorizontal: 10
  },
  signup_input_container_border: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#fff',
    // borderBottomWidth: 1,
    // paddingLeft: 20
    paddingHorizontal: 10,
    width: Dimensions.get('window').width/2,
    left: 10
  },
  signup_input_container_border_email: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#fff',
    // borderBottomWidth: 1,
    // paddingLeft: 20
    // paddingHorizontal: 10,
    width: Dimensions.get('window').width,
    left: 20
  },
  signup_input_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  signup_input: {
    width: 110,
    height: 40,
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    color: '#fff',
    paddingLeft: 10
  },
  signup_actions: {
    alignItems: 'center',
    top: 20
    // justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
  signup_button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 220,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20
  },
  signup_button_text: {
    color: '#0069A7',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 10
  },
  back_button: {
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  back_button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 10
  },
  logo_image: {
    width: 90,
    height: 80,
    top: 23,
  },
  text_error: {
    color: 'white'
  },
  actions_container: {
    // position: 'absolute',
    // bottom: 20,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
});
