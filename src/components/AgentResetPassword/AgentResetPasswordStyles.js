const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create ({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  forgot_password_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40
  },
  forgot_password_form_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgot_password_actions_container: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  forgot_password_banner: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain'
  },
  forgot_password_text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 10
  },
  forgot_password_help_text: {
    fontSize: 12,
    marginTop: -30,
    color: 'lightgray',
  },
  forgot_password_banner_container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  forgot_password_input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    textAlign: 'left',
    fontSize: 10
  },
  login_button: {
    backgroundColor: '#fff',
    color: "lightgrey",
    width: 200,
    margin: 10,
    height: 20,
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  forgot_password_button: {
    backgroundColor: '#000',
    width: Dimensions.get('window').width,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot_password_button_text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 10
  },
});