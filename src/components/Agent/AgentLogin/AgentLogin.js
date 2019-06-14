import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
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

const styles = require('./AgentLoginStyles');

export default class AgentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.signInAgent = this.signInAgent.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params != null) {
      this.setState({
        errorMessage: this.props.navigation.state.params.data.agent.data.attributes
          .recover_password_text
      });
    }
  }

  signInAgent = () => {
    this.setState({ errorMessage: '' });
    if (this.state.email === '') {
      Alert.alert(
        'Error de validación',
        'El campo de correo no puede estar vacío',
        [
          { text: 'OK', onPress: () => console.log('El campo de correo no puede estar vacío') }
        ],
        { cancelable: false }
      );
    } else if (this.state.password === '') {
      Alert.alert(
        'Error de validación',
        'Por favor ingrese su contraseña',
        [
          { text: 'OK', onPress: () => console.log('Por favor ingrese su contraseña') }
        ],
        { cancelable: false }
      );
    } else {
      signinURL = urls.BASE_URL + urls.AGENT_SIGNIN;
      fetch(signinURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent: {
            email: this.state.email,
            password: this.state.password
          }
        })
      })
      .then(response => {
          if (response.status === 401) {
            this.setState({
              errorMessage: (
                <Text style={styles.text_error}>Verifique su usuario y su contraseña</Text>
              )
            });
            Alert.alert(
              'Error de validación',
              'Verifique su usuario y su contraseña',
              [
                { text: 'OK', onPress: () => console.log('Verifique su usuario y su contraseña') }
              ],
              { cancelable: false }
            );
            return response;
          } else {
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
                  globals.rewiews_average = data.agent.data.attributes.rewiews_average || '';
                  globals.rewiews_count = data.agent.data.attributes.rewiews_count || '';

                  this.props.navigation.navigate('AgentDashboard', { data });
                }
              );
            });
          }
      })
        .catch(error => this.setState({ errorMessage: error.message }));
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
        style={styles.image_background}
        source={require('../../../../assets/img/home_splash_3.jpg')}
      >
        <KeyboardAwareScrollView
          scrollEnabled
          enableOnAndroid={true}
          contentContainerStyle={styles.fullSize}
        >
          <Image
            style={styles.logo_image}
            source={require('../../../../assets/img/logo_blanco.gif')}
          />
          <View style={styles.agent_indicator}>
            <Text style={styles.agent_indicator_text}>AGENTE</Text>
          </View>
          <View style={styles.customer_login_action}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerLogin')}>
              <Text style={styles.customer_login_action_text}>Entrar como cliente</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.login_form_container}>
            <View style={styles.input_container}>
              <View style={styles.input_container_user}>
                <FontAwesome name="user" size={32} color="#fff" />
                <TextInput
                  style={styles.login_input}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  placeholder="CORREO ELECTRÓNICO"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.input_container_password}>
                <FontAwesome name="lock" size={32} color="#fff" />
                <TextInput
                  style={styles.login_input}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  placeholder="CONTRASEÑA"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  onFocus={() => this.setState({ password: '' })}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <TouchableOpacity onPress={this.signInAgent} style={styles.login_button}>
              <Text style={styles.login_button_text}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.back_button}
            >
              <Text style={styles.back_button_text}>REGRESAR</Text>
            </TouchableOpacity>
            <View style={styles.login_actions_container}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerSignUp')}>
                <Text style={styles.sign_up_button}>¿NO TIENE UNA CUENTA?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AgentResetPassword')}
              >
                <Text style={styles.sign_up_button}>¿OLVIDÓ SU CONTRASEÑA?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
