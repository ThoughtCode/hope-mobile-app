const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create ({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logo_container: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  customer_indicator: {
    backgroundColor: 'darkgray',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 60,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  customer_indicator_text: {
    color: '#fff',
    fontWeight: '600'
  },
  forgot_password_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  forgot_password_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    paddingLeft: 10
  },
  forgot_password_actions_container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  forgot_password_banner: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain'
  },
  forgot_password_help_text: {
    fontSize: 18,
    color: '#0069A7',
  },
  error_message: {
    marginTop: 20,
    color: '#0069A7',
    textShadowColor: 'red',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  forgot_password_banner_container: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgot_password_input: {
    width: 200,
    height: 40,
    textAlign: 'left',
    fontSize: 10,
    paddingLeft: 10
  },
  login_button: {
    backgroundColor: '#fff',
    color: "#0069A7",
    width: 200,
    margin: 10,
    height: 20,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  forgot_password_button: {
    backgroundColor: '#0069A7',
    width: 200,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot_password_text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 10,
    textAlignVertical: 'center'
  },
  forgot_password_button_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 10
  },
  logo_image: {
    width: 50,
    height: 50,
  }
});