const React = require('react-native');
const {Dimensions, StyleSheet} = React;

module.exports = StyleSheet.create({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  sign_up_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input_container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5
  },
  agent_indicator: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 70,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  agent_indicator_text: {
    color: '#0069A7',
  },
  customer_login_action: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 100,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 15,
    zIndex: 1
  },
  customer_login_action_text: {
    color: '#fff',
    fontSize: 10
  },
  signup_form_container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signup_input_container_border: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#fff',
      borderBottomWidth: 1,
      paddingLeft: 20
  },
  signup_input_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  signup_input: {
    width: 200,
    height: 40,
    marginTop: 5,
    textAlign: 'left',
    fontSize: 10,
    color: '#fff',
    paddingLeft: 10
  },
  sign_up_actions_container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signup_button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 220,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  logo_container: {
    position: 'absolute',
    top: 70,
    left: 50,
  },
  logo_image: {
    width: 60,
    height: 54,
  }
});