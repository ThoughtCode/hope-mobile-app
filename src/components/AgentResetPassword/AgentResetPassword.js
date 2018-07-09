import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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
      this.setState({ errorMessage: "El campo de correo no puede estar vacío" })
    } else {
      forgotPasswordURL = urls.BASE_URL + urls.AGENT_RECOVER_PASSWORD;
      updatePasswordURL = urls.BASE_URL + urls.AGENT_UPDATE_PASSWORD;
      if (this.state.resetPassword === true) {
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
          if (response.status === 404) {
            this.setState({ errorMessage: "El correo electrónico introducido \n no existe en nuestro sistema" });
            return response;
          } else {
            response.json().then(() => {
              this.props.navigation.navigate('AgentLogin', {recover_password_text: "Contraseña recuperada. \n Utilice nuevas credenciales \n para ingresar"});
            });
          }
        }).catch((error) => this.setState({ errorMessage: error.message }));
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
            this.setState({ errorMessage: "El correo electrónico introducido \n no existe en nuestro sistema" });
            return response;
          } else {
            response.json().then(() => {
              this.setState({ resetPassword: true })
            });
          }
        }).catch((error) => this.setState({ errorMessage: error.message }));
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
      <View style={styles.form_container}>
        <View style={styles.forgot_password_input_container}>
          <FontAwesome
            name="key"
            size={32}
            color='#000'
          />
          <TextInput
            style={styles.forgot_password_input}
            onChangeText={(resetCode) => this.setState({ resetCode })}
            placeholder="CÓDIGO DE REINICIO"
            placeholderTextColor="#000"
            autoCapitalize="none"
            onFocus={() => this.setState({ resetCode: "" })}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.forgot_password_input_container}>
          <FontAwesome
            name="lock"
            size={32}
            color='#000'
          />
          <TextInput
            style={styles.forgot_password_input}
            onChangeText={(newPassword) => this.setState({ newPassword })}
            placeholder="NUEVA CONTRASEÑA"
            placeholderTextColor="#000"
            autoCapitalize="none"
            onFocus={() => {
              this.setState({ newPassword: "" });
              this.setState({ recoverButtonText: 'RESETEAR' })
            }}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.forgot_password_input_container}>
          <FontAwesome
            name="lock"
            size={32}
            color='#000'
          />
          <TextInput
            style={styles.forgot_password_input}
            onChangeText={ (confirmNewPassword) => this.setState({ confirmNewPassword }) }
            placeholder="CONFIRME NUEVA CONTRASEÑA"
            placeholderTextColor="#000"
            autoCapitalize="none"
            onFocus={() => { this.setState({ confirmNewPassword: "" }); } }
            secureTextEntry={true}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.fullSize}
      >
        <ScrollView
          contentContainerStyle={styles.forgot_password_container}
          keyboardShouldPersistTaps='never'
          scrollEnabled={false}
        >
          <View style={styles.logo_container}>
            <Image
              style={ styles.logo_image } 
              source={require('../../../assets/img/logo_azul.png')}
            />
          </View>
          <View style={styles.agent_indicator}>
            <Text style={styles.agent_indicator_text}>
              Recuperar Contraseña Agente
            </Text>
          </View>
          <View style={styles.forgot_password_banner_container}>
            <Text style={styles.forgot_password_help_text}>
              Introduzca su correo electrónico
            </Text>
            <Text style={styles.error_message}>
              {this.state.errorMessage}
            </Text>
          </View>
          <View style={styles.forgot_password_form_container}>
            <View style={styles.forgot_password_input_container}>
              <FontAwesome
                name="envelope"
                size={32}
                color='#000'
              />
              <TextInput
                style={styles.forgot_password_input}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.username}
                placeholder="CORREO ELECTRONICO"
                placeholderTextColor="#000"
                autoCapitalize="none"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
              />
            </View>
            {this.renderIf(this.state.resetPassword, this.resetPasswordFields())}
          </View>
          <View style={styles.forgot_password_actions_container}>
            <TouchableOpacity
              onPress={this.resetPassword}
              style={styles.forgot_password_button}
            >
              <Text style={styles.forgot_password_text}>
                {this.state.recoverButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerLogin')}>
              <Text style={styles.login_button}>
                Regresar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
