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
import Spinner from 'react-native-loading-spinner-overlay';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import * as Facebook from 'expo-facebook';

const styles = require('./CustomerLoginStyles');

export default class CustomerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      spinner: false,
      errorMessage: ''
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
        }),
      }).then((response) => {
        if (response.status === 401) {
          this.setState({ errorMessage: <Text style={styles.text_error}>Verifique su usuario y su contraseña</Text> });
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
            await this._postMobilePushNotificationToken(data.customer.data.attributes.access_token);
            globals.password = this.state.password
            AsyncStorage.multiSet([["access_token",data.customer.data.attributes.access_token || ""], ["customerData", JSON.stringify(data)]],()=>{
              globals.access_token = data.customer.data.attributes.access_token ||""
              globals.id = data.customer.data.attributes.id || ""
              globals.first_name = data.customer.data.attributes.first_name || ""
              globals.last_name = data.customer.data.attributes.last_name || ""
              globals.email = data.customer.data.attributes.email || ""
              globals.password = this.state.password || ""
              globals.cell_phone = data.customer.data.attributes.cell_phone || ""
              globals.status = data.customer.data.attributes.status || ""
              globals.avatar = data.customer.data.attributes.avatar.url || ""
              this.props.navigation.navigate('CustomerTabbar');
            })
          });
        }
      })
      .catch(error => console.log('token not saved'));
    };
  }

  _facebookLogin = async() =>{
    await Facebook.initializeAsync('2057031764572769');
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('2057031764572769', {
      permissions: ["public_profile", "user_friends", "email"],
    });
    if (type === 'success') {
      console.log("<<<==== TOKEN TOKEN TOKEN TOKEN TOKEN ====>>>", token)
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ spinner: true });
      try {
        let data = {
          "customer": {
            "facebook_access_token": token
          }
        }
        API.loginWithFacebook(this.loginWithFacebookResponse,data,true);
      } catch ({message}) {
        console.log(`Facebook Login Error: ${message}`)
      }
    } else {
      console.log("Error logging in. You should try again.")
    }
  }
  
  loginWithFacebookResponse = {
    success: async (response) => {
      try {
        await this._postMobilePushNotificationToken(response.customer.data.attributes.access_token);
        AsyncStorage.multiSet([["access_token", response.customer.data.attributes.access_token || ""], ["customerData", JSON.stringify(response)]],()=>{
          globals.access_token = response.customer.data.attributes.access_token ||""
          globals.id = response.customer.data.attributes.id
          globals.first_name = response.customer.data.attributes.first_name || ""
          globals.last_name = response.customer.data.attributes.last_name || ""
          globals.email = response.customer.data.attributes.email || ""
          globals.cell_phone = response.customer.data.attributes.cell_phone || ""
          globals.status = response.customer.data.attributes.status && response.customer.data.attributes.status || ""
          globals.avatar = response.customer.data.attributes.avatar.url || ""
          this.props.navigation.navigate('CustomerTabbar');
        })
      } catch (error) {
        this.setState({ errorMessage: error.message, spinner: false })
        console.log('Loginwith facebook catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('Loginwith facebook error ' + JSON.stringify(err));
      this.setState({ errorMessage: err, spinner: false })
    },
    complete: (err) => {
      this.setState({ errorMessage: err, spinner: false })
    }
  }

  _getStorageValue = async key => {
    var value = await AsyncStorage.getItem(key);
    return value;
  };

  _postMobilePushNotificationToken = async authToken => {
    setMobileTokenUrl = urls.STAGING_URL + urls.SET_CUSTOMER_MOBILE_TOKEN;
    let push_notification = await this._getStorageValue('PushNotificationToken');
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
        response.json().then(async responseData => {
          AsyncStorage.getItem('Data').then((data) => {
            if(data !== null){
              const dataParse = JSON.parse(data);
              AsyncStorage.setItem('Data', JSON.stringify(dataParse))
              globals.access_token = dataParse.customer.data.attributes.access_token;
            }else{
              AsyncStorage.setItem('Data', JSON.stringify(responseData))
            }
          })
        });
      }
    })
    .catch(error => console.log('token not saved'));
  };

  render(){
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
            source={require('../../../../assets/img/logo_blanco.gif')}
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

            <TouchableOpacity onPress={this._facebookLogin} style={styles.fb_login_button}>
              <Text style={styles.fb_login_button_text}>Iniciar sesión con facebook</Text>
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
    )
  }
}
