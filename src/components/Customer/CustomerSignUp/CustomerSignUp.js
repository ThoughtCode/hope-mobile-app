import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as urls from '../../../constants/api';

const styles = require('./CustomerSignUpStyles');

export default class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errorMessage: ''
    };
    this.signUpCustomer = this.signUpCustomer.bind(this);
  }

  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFields = () => {
    let valid = true;

    if (this.state.firstname.length === 0) {
      valid = false;
      this.setState({ errorMessage: 'El nombre no puede estar vacío' });
      return valid;
    }
    if (this.state.lastname.length === 0) {
      valid = false;
      this.setState({ errorMessage: 'El apellido no puede estar vacío' });
      return valid;
    }
    if (this.validateEmail(this.state.email) === false) {
      valid = false;
      this.setState({ errorMessage: 'El correo ingresado no es válido' });
      return valid;
    }
    if (this.state.password.length < 6) {
      valid = false;
      this.setState({ errorMessage: 'La contraseña es demasiado corta' });
      return valid;
    }
    if (this.state.password !== this.state.password_confirmation) {
      valid = false;
      this.setState({ errorMessage: 'Las contraseñas no coinciden' });
      return valid;
    }

    return valid;
  };

  signUpCustomer = () => {
    this.setState({ errorMessage: '' });
    if (this.validateFields()) {
      signup_url = urls.BASE_URL + urls.SIGNUP_URI;
      fetch(signup_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      })
        .then(response => {
          if (response.status === 200) {
            response.json().then(async data => {
              await this._postMobilePushNotificationToken(
                data.customer.data.attributes.access_token
              );
              this.props.navigation.navigate('CustomerDashboard', { data });
            });
          } else if (response.status === 422) {
            this.setState({
              errorMessage: (
                <Text style={styles.text_error}>
                  Ya existe un usuario con ese correo electrónico
                </Text>
              )
            });
          }
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    } else {
      Alert.alert(
        'Error de validación',
        `${this.state.errorMessage}`,
        [{ text: 'OK', onPress: () => this.setState({ errorMessage: '' }) }],
        { cancelable: false }
      );
    }
  };

  _getStorageValue = async key => {
    var value = await AsyncStorage.getItem(key);
    return value;
  };

  _postMobilePushNotificationToken = async authToken => {
    setMobileTokenUrl = urls.STAGING_URL + urls.SET_CUSTOMER_MOBILE_TOKEN;
    let push_notification = await this._getStorageValue('PushNotificationToken');
    console.log('PushNotificationToken:' + push_notification);
    fetch(setMobileTokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`
      },
      body: JSON.stringify({
        customer: {
          mobile_push_token: push_notification
        }
      })
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(async data => {
            console.log(data);
          });
        }
      })
      .catch(error => console.log('token not saved'));
  };

  render() {
    return (
      <ImageBackground
        style={{
          flex: 1
        }}
        source={require('../../../../assets/img/home_splash_3.jpg')}
      >
        <KeyboardAwareScrollView
          scrollEnabled
          enableOnAndroid={true}
          contentContainerStyle={styles.fullSize}
        >
          <View style={styles.customer_indicator}>
            <Text style={styles.customer_indicator_text}>Registro de Cliente</Text>
          </View>
          <View style={styles.agent_login_action}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AgentSignUp')}>
              <Text style={styles.agent_login_action_text}>Registrarse como agente</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup_form_container}>
            <Image
              style={styles.logo_image}
              source={require('../../../../assets/img/logo_blanco.png')}
            />
            <View style={styles.input_container}>
              <View style={styles.signup_input_container_border}>
                <FontAwesome name="user" size={32} color="#fff" />
                <TextInput
                  style={styles.signup_input}
                  onChangeText={firstname => this.setState({ firstname })}
                  placeholder="NOMBRE"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.signup_input_container_border}>
                <FontAwesome name="user" size={32} color="#fff" />
                <TextInput
                  style={styles.signup_input}
                  onChangeText={lastname => this.setState({ lastname })}
                  placeholder="APELLIDO"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.signup_input_container_border}>
                <FontAwesome name="envelope" size={32} color="#fff" />
                <TextInput
                  style={styles.signup_input}
                  onChangeText={email => this.setState({ email })}
                  placeholder="CORREO ELECTRÓNICO"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.signup_input_container_border}>
                <FontAwesome name="lock" size={32} color="#fff" />
                <TextInput
                  style={styles.signup_input}
                  onChangeText={password => this.setState({ password })}
                  placeholder="CONTRASEÑA"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onFocus={() => {
                    this.setState({ password: '' });
                  }}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.signup_input_container}>
                <FontAwesome name="lock" size={32} color="#fff" />
                <TextInput
                  style={styles.signup_input}
                  onChangeText={password_confirmation => this.setState({ password_confirmation })}
                  placeholder="CONFIRMACIÓN DE CONTRASEÑA"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onFocus={() => {
                    this.setState({ password_confirmation: '' });
                  }}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.signup_actions}>
          <TouchableOpacity onPress={this.signUpCustomer} style={styles.signup_button}>
            <Text style={styles.signup_button_text}>REGISTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.back_button}
          >
            <Text style={styles.back_button_text}>REGRESAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
