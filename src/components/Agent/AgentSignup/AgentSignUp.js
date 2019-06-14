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
import * as globals from '../../../util/globals';

const styles = require('./AgentSignUpStyles');

export default class AgentSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      national_id: '',
      cell_phone: '',
      birthday: '',
      length_national: {
        maxLength: 0
      },
      length: {
        maxLength: 0
      }
    };
    this.signUpAgent = this.signUpAgent.bind(this);
  }

  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFields = () => {
    let valid = true;

    if (this.state.firstname.length === 0) {
      valid = false;
      Alert.alert('Error de validación', 'El nombre no puede estar vacío', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.state.lastname.length === 0) {
      valid = false;
      Alert.alert('Error de validación', 'El apellido no puede estar vacío', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.validateEmail(this.state.email) === false) {
      valid = false;
      Alert.alert('Error de validación', 'El correo ingresado no es válido', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.state.password.length < 6) {
      valid = false;
      Alert.alert('Error de validación', 'La contraseña es demasiado corta', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.state.password !== this.state.password_confirmation) {
      valid = false;
      Alert.alert('Error de validación', 'Las contraseñas no coinciden', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.state.national_id.length !== 10) {
      valid = false;
      Alert.alert('Error de validación', 'El número de cédula debe tener 10 caracteres', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    if (this.state.cell_phone.length !== 10) {
      valid = false;
      Alert.alert('Error de validación', 'El número celular debe tener 10 caracteres', [{ text: 'OK' }], {
        cancelable: false
      });
      return valid;
    }
    return valid;
  };

  signUpAgent = () => {
    if (this.validateFields()) {
      signup_url = urls.BASE_URL + urls.AGENT_SIGNUP_URI;
      var data = {
        agent: {
          first_name: this.state.firstname,
          last_name: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          national_id: this.state.national_id,
          cell_phone: this.state.cell_phone
        }
      };
      fetch(signup_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent: {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            national_id: this.state.national_id,
            cell_phone: this.state.cell_phone
          }
        })
      })
        .then(response => {
          if (response.status === 200) {
            response.json().then(async data => {
              await this._postMobilePushNotificationToken(data.agent.data.attributes.access_token);
              AsyncStorage.multiSet(
                [
                  ['access_token', data.agent.data.attributes.access_token || ''],
                  ['first_name', data.agent.data.attributes.first_name || ''],
                  ['last_name', data.agent.data.attributes.last_name || ''],
                  ['email', data.agent.data.attributes.email || ''],
                  ['password', this.state.password || ''],
                  ['cell_phone', data.agent.data.attributes.cell_phone || ''],
                  ['status', data.agent.data.attributes.status || ''],
                  ['avatar', data.agent.data.attributes.avatar.url || '']
                ],
                () => {
                  globals.access_token = data.agent.data.attributes.access_token || '';
                  globals.first_name = data.agent.data.attributes.first_name || '';
                  globals.last_name = data.agent.data.attributes.last_name || '';
                  globals.email = data.agent.data.attributes.email || '';
                  globals.password = this.state.password || '';
                  globals.cell_phone = data.agent.data.attributes.cell_phone || '';
                  globals.status = data.agent.data.attributes.status || '';
                  globals.avatar = data.agent.data.attributes.avatar.url || '';

                  this.props.navigation.navigate('AgentDashboard', { data });
                }
              );
            });
          } else if (response.status === 422) {
            Alert.alert(
              'Usuario duplicado',
              'Ya existe un usuario con ese correo electrónico',
              [{ text: 'OK' }],
              { cancelable: false }
            );
          }
        })
        .catch(error =>
          Alert.alert('Usuario duplicado', error.message, [{ text: 'OK' }], { cancelable: false })
        );
    }
  };

  _getStorageValue = async key => {
    var value = await AsyncStorage.getItem(key);
    return value;
  };

  _postMobilePushNotificationToken = async authToken => {
    setMobileTokenUrl = urls.STAGING_URL + urls.SET_AGENT_MOBILE_TOKEN;
    let push_notification = await this._getStorageValue('PushNotificationToken');
    fetch(setMobileTokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`
      },
      body: JSON.stringify({
        agent: {
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
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
        source={require('../../../../assets/img/home_splash_3.jpg')}
      >
        <KeyboardAwareScrollView
          scrollEnabled
          enableOnAndroid={true}
          contentContainerStyle={styles.fullSize}
        >
          <View style={styles.agent_indicator}>
            <Text style={styles.agent_indicator_text}>Registro de Agente</Text>
          </View>
          <View style={styles.customer_login_action}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerSignUp')}>
              <Text style={styles.customer_login_action_text}>Registrarse como cliente</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.logo_image}
            source={require('../../../../assets/img/logo_blanco.gif')}
          />
          <View style={styles.signup_form_container}>
            <View style={styles.input_container}>
              <View style={styles.actions_container}>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome name="user" size={26} color="#fff" />
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
                  <FontAwesome name="user" size={26} color="#fff" />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={lastname => this.setState({ lastname })}
                    placeholder="APELLIDO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <View style={styles.actions_container}>
                <View style={styles.signup_input_container_border_email}>
                  <FontAwesome name="envelope" size={20} color="#fff" />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={email => this.setState({ email })}
                    placeholder="CORREO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <View style={styles.actions_container}>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome name="lock" size={29} color="#fff" />
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
                <View style={styles.signup_input_container_border}>
                  <FontAwesome name="lock" size={29} color="#fff" />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={password_confirmation => this.setState({ password_confirmation })}
                    placeholder="CONFIRMACIÓN"
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
              <View style={styles.actions_container}>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome name="id-card" size={18} color="#fff" />
                  <TextInput
                    style={styles.signup_input}
                    // onChangeText={national_id => this.validateInputNational({ national_id })}
                    onChangeText={(national_id) => this.setState({national_id})}
                    placeholder="CÉDULA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome name="mobile-phone" size={34} color="#fff" />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={cell_phone => this.setState({ cell_phone })}
                    placeholder="CELULAR"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.signup_actions}>
            <TouchableOpacity onPress={this.signUpAgent} style={styles.signup_button}>
              <Text style={styles.signup_button_text}>REGISTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.back_button}
            >
              <Text style={styles.back_button_text}>REGRESAR</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
