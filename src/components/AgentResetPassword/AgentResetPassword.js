import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View } from 'react-native';

import * as urls from '../../constants/api';

const styles = require('./AgentResetPasswordStyles');

export default class AgentResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmNewPassword: '',
      errorMessage: '',
      resetPassword: false,
      recoverButtonText: 'RECUPERAR'
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword = () => {
    if (this.state.email === '') {
      this.setState({errorMessage: "El campo de correo no puede estar vacío"})
    } else {
      forgotPasswordURL = urls.BASE_URL + urls.AGENT_RECOVER_PASSWORD;
      updatePasswordURL = urls.BASE_URL + urls.AGENT_UPDATE_PASSWORD;
      if(this.state.resetPassword === true) {
        fetch(updatePasswordURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "agent": {
              "email": this.state.email,
              "mobile_token": this.state.resetCode,
              "password": this.state.newPassword,
              "password_confirmation": this.state.confirmNewPassword
            }
          }),
        }).then((response) => {
          console.log(response);
          if (response.status === 404) {
            this.setState({errorMessage: "El correo no existe"});
            return response;
          } else {
            response.json().then(() => {
              this.props.navigation.navigate('CustomerLogin' );
            });
          }
        }).catch((error) => this.setState({errorMessage: error.message}));
      } else {
        fetch(forgotPasswordURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "agent": {
              "email": this.state.email
            }
          }),
        }).then((response) => {
          if (response.status === 404) {
            this.setState({errorMessage: "El correo no existe"});
            return response;
          } else {
            response.json().then(() => {
              this.setState({ resetPassword: true })
            });
          }
        }).catch((error) => this.setState({errorMessage: error.message}));
      }
    }

  }

  renderIf = (condition, content) => {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  resetPasswordFields = () => {
    return (
      <View>
        <TextInput
          style = {styles.forgot_password_input}
          onChangeText = {(resetCode) => this.setState({resetCode})}
          placeholder = "CÓDIGO DE REINICIO"
          autoCapitalize = "none"
          onFocus = { () => this.setState({resetCode: ""})}
          keyboardType = "numeric"
          underlineColorAndroid = "#fff"/>
        <TextInput
          style = {styles.forgot_password_input}
          onChangeText = {(newPassword) => this.setState({newPassword})}
          placeholder = "NUEVA CONTRASEÑA"
          autoCapitalize = "none"
          onFocus = { () => {this.setState({newPassword: ""}); this.setState({recoverButtonText: 'RESETEAR'})}}
          secureTextEntry = { true }
          underlineColorAndroid = "#fff"/>
        <TextInput
          style = {styles.forgot_password_input}
          onChangeText = {(confirmNewPassword) => this.setState({confirmNewPassword})}
          placeholder = "CONFIRME NUEVA CONTRASEÑA"
          autoCapitalize = "none"
          onFocus = { () => {this.setState({confirmNewPassword: ""});}}
          secureTextEntry = { true }
          underlineColorAndroid = "#fff"/>
      </View>
    )
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior = "padding"
        style = {styles.fullSize}
      >
        <ScrollView contentContainerStyle = {styles.forgot_password_container}
                    keyboardShouldPersistTaps='never'
                    scrollEnabled={false}
        >
          <View style={styles.forgot_password_banner_container}>
            <Text style={styles.forgot_password_text}>
              RESETEAR CONTRASEÑA
            </Text>
            <Text style={styles.forgot_password_help_text}>
              POR FAVOR INTRODUZCA EL CORREO QUE TENEMOS {"\n"}
              REGISTRADO EN NUESTRO SISTEMA
            </Text>
            <Text>
              {this.state.errorMessage}
            </Text>
          </View>
          <View style={styles.forgot_password_form_container}>
            <TextInput style = {styles.forgot_password_input}
                       onChangeText = {(email) => this.setState({email})}
                       value = {this.state.username}
                       placeholder = "EMAIL ADDRESS"
                       autoCapitalize = "none"
                       keyboardType = "email-address"
                       underlineColorAndroid = "#fff"
            />
            {this.renderIf(this.state.resetPassword, this.resetPasswordFields())}
          </View>
          <View style={styles.forgot_password_actions_container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerLogin')}>
              <Text style={styles.login_button}>
                ATRÁS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.resetPassword}
                              style={styles.forgot_password_button}
            >
              <Text style={styles.forgot_password_text}>
                {this.state.recoverButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}