import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';

const styles = require('./CustomerLoginStyles');

export default class CustomerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      spinner: false
    };
    this.signInUser = this.signInCustomer.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params != null) {
      this.setState({
        errorMessage: this.props.navigation.state.params.data.agent.data.attributes
          .recover_password_text
      });
    }
  }

  signInCustomer = () => {
    if (this.state.email === '') {
      Alert.alert(
        'Error de validación',
        'El campo de correo no puede estar vacío'[
          { text: 'OK', onPress: () => console.log('El campo de correo no puede estar vacío') }
        ],
        { cancelable: false }
      );
    } else if (this.state.password === '') {
      Alert.alert(
        'Error de validación',
        'Por favor ingrese su contraseña'[
          { text: 'OK', onPress: () => console.log('Por favor ingrese su contraseña') }
        ],
        { cancelable: false }
      );
    } else {
      signinURL = urls.BASE_URL + urls.CUSTOMER_SIGNIN;
      fetch(signinURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            email: this.state.email,
            password: this.state.password
          }
        })
      })
        .then(response => {
          this._handleLoginResponse(response);
        })
        .catch(error => this.setState({ errorMessage: error.message, spinner: false }));
    }
  };

  facebookLogin = async () => {
    this.setState({ errorMessage: '' });
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2057031764572769', {
      permissions: ['email', 'public_profile']
    });
    if (type === 'success') {
      this.setState({ spinner: true });
      fbSigninURL = urls.STAGING_URL + urls.CUSTOMER_FACEBOOK_LOGIN;
      fetch(fbSigninURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            facebook_access_token: token
          }
        })
      })
        .then(response => {
          this._handleLoginResponse(response);
        })
        .catch(error => this.setState({ errorMessage: error.message, spinner: false }));
    } else {
      this.setState({ spinner: false });
      alert('Something went wrong. Try again later!');
    }
  };

  _handleLoginResponse = async response => {
    if (response.status === 401) {
      this.setState({
        errorMessage: <Text style={styles.text_error}>Verifique su usuario y su contraseña</Text>,
        spinner: false
      });
      return response;
    } else {
      response.json().then(async data => {
        await this._postMobilePushNotificationToken(data.customer.data.attributes.access_token);
        AsyncStorage.multiSet(
          [
            ['access_token', data.customer.data.attributes.access_token || ''],
            ['customerData', JSON.stringify(data)]
          ],
          () => {
            globals.access_token = data.customer.data.attributes.access_token || '';
            // this.props.navigation.navigate('CustomerTabbar', { data: data });
            this.props.navigation.navigate('CustomerTabbar');
          }
        );
      });
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
        style={styles.image_background}
        source={require('../../../../assets/img/home_splash_2.jpg')}
      >
        <KeyboardAwareScrollView
          scrollEnabled
          enableOnAndroid={true}
          contentContainerStyle={styles.fullSize}
        >
          <Spinner visible={this.state.spinner} />
          <View style={styles.customer_indicator}>
            <Text style={styles.customer_indicator_text}>CLIENTE</Text>
          </View>
          <View style={styles.agent_login_action}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AgentLogin')}>
              <Text style={styles.agent_login_action_text}>Entrar como agente</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.logo_image}
            source={require('../../../../assets/img/logo_blanco.png')}
          />
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
            <TouchableOpacity onPress={this.signInCustomer} style={styles.login_button}>
              <Text style={styles.login_button_text}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.facebookLogin} style={styles.fb_login_button}>
              <Text style={styles.fb_login_button_text}>Login with facebook</Text>
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
                onPress={() => this.props.navigation.navigate('CustomerResetPassword')}
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
