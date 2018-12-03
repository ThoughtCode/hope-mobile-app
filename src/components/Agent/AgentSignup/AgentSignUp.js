import React, {Component} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';

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
      national_id: "",
      cell_phone: "",
      birthday: "",
      errorMessage: '',
      length_national: {
        maxLength: 0,
      },
      length: {
        maxLength: 0,
      }
    };
    this.signUpAgent = this.signUpAgent.bind(this);
    this.validateInputNational = this.validateInputNational.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  keypressed = (e) => {
    console.log(e)
  }

  validateInputNational = (e) => {
    console.log(e)
    var national_id = e.national_id
    var ml = this.state.length_national.maxLength + 1
    this.setState({national_id, length_national:{maxLength: ml}})
  }
  
  validateInput = (e) => {
    console.log(e)
    var cell_phone = e.cell_phone
    var ml = this.state.length.maxLength + 1
    this.setState({cell_phone, length:{maxLength: ml}})
  }

  signUpAgent = () => {
    this.setState({errorMessage: ''});
    if (this.state.email === '') {
      this.setState({errorMessage: <Text style={styles.text_error}>El campo de correo no puede estar vacío</Text>})
    } else if (this.state.password != this.state.password_confirmation) {
      this.setState({errorMessage: <Text style={styles.text_error}>Las contraseñas no coinciden</Text>})
    } else {
      signup_url = urls.BASE_URL + urls.AGENT_SIGNUP_URI;
      console.log("Registration url",signup_url);
      var data = {
        "agent": {
          "first_name": this.state.firstname,
          "last_name": this.state.lastname,
          "email": this.state.email,
          "password": this.state.password,
          "password_confirmation": this.state.password_confirmation,
          "national_id": this.state.national_id,
          "cell_phone": this.state.cell_phone,
        }
      }
      console.log("Registration body",JSON.stringify(data));
      fetch(signup_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "agent": {
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "password_confirmation": this.state.password_confirmation,
            "national_id": this.state.national_id,
            "cell_phone": this.state.cell_phone,
          }
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Registration response",response);
            response.json().then((data) => {
              AsyncStorage.multiSet([["access_token",data.agent.data.attributes.access_token || ""],
                                  ['first_name', data.agent.data.attributes.first_name || ""],
                                  ['last_name', data.agent.data.attributes.last_name || ""],
                                  ['email', data.agent.data.attributes.email || ""],
                                  ['password', this.state.password || ""],
                                  ['cell_phone', data.agent.data.attributes.cell_phone || ""],
                                  ['status', data.agent.data.attributes.status || ""],
                                  ['avatar', data.agent.data.attributes.avatar.url || ""]],()=>{

                                    globals.access_token = data.agent.data.attributes.access_token ||""
                                    globals.first_name = data.agent.data.attributes.first_name || ""
                                    globals.last_name = data.agent.data.attributes.last_name || ""
                                    globals.email = data.agent.data.attributes.email || ""
                                    globals.password = this.state.password || ""
                                    globals.cell_phone = data.agent.data.attributes.cell_phone || ""
                                    globals.status = data.agent.data.attributes.status || ""
                                    globals.avatar = data.agent.data.attributes.avatar.url || ""
 
                                    this.props.navigation.navigate('AgentDashboard', { data });
                                  })
              
            });
          } else if (response.status === 422) {
            this.setState({errorMessage: <Text style={styles.text_error}>Ya existe un usuario con ese correo electrónico</Text>});
          }
        })
        .catch((error) => this.setState({errorMessage: error.message}));
    }


  };

  render() {
    console.log(this.state.length_national.maxLength)
    console.log(this.state.length.maxLength)
    return (
      <ImageBackground
        style={{ flex: 1, }}
        source={require("../../../../assets/img/home_splash_3.jpg")}
      >
        <KeyboardAvoidingView
          style={styles.fullSize}
          behaviour='padding'
        >
          <View style={styles.agent_indicator}>
            <Text style={styles.agent_indicator_text}>
              Registro de Agente
            </Text>
          </View>
          <View style={styles.customer_login_action}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CustomerSignUp')}
            >
              <Text
                style={styles.customer_login_action_text}
              >
                Registrarse como cliente
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.sign_up_container}
            keyboardShouldPersistTaps='never'
            scrollEnabled={true}
          >
            <View style={styles.logo_container}>
              <Image
                style={styles.logo_image}
                source={require('../../../../assets/img/logo_blanco.png')}
              />
            </View>
            <View style={styles.signup_form_container}>
              <Text>
                {this.state.errorMessage}
              </Text>
              <View style={styles.input_container}>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(firstname) => this.setState({firstname})}
                    placeholder="NOMBRE"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(lastname) => this.setState({lastname})}
                    placeholder="APELLIDO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="envelope"
                    size={26}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(email) => this.setState({email})}
                    placeholder="CORREO ELECTRÓNICO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="lock"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(password) => this.setState({password})}
                    placeholder="CONTRASEÑA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onFocus={() => {
                      this.setState({password: ""});
                    }}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="lock"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                    placeholder="CONFIRMACIÓN DE CONTRASEÑA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onFocus={() => {
                      this.setState({password_confirmation: ""});
                    }}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="id-card"
                    size={24}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(national_id) => this.validateInputNational({national_id})}
                    // onChangeText={(national_id) => this.setState({national_id})}
                    placeholder="CÉDULA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    maxLength = {10}
                    onKeyPress = {this.keypressed}
                  />
                </View>
                {(this.state.length_national.maxLength <= 9) ? <Text style={{color: 'white', textAlign: "center", fontSize: 8 }}>El campo de tener 10 caracteres</Text> : <Text></Text>}
                <View style={styles.signup_input_container}>
                  <FontAwesome
                    name="mobile-phone"
                    size={40}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(cell_phone) => this.validateInput({cell_phone})}
                    // onChangeText={(cell_phone) => this.setState({cell_phone})}
                    placeholder="CELULAR"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="phone-pad"
                    maxLength = {10}
                    minLength = {9}
                  />
                </View>
                {(this.state.length.maxLength <= 9) ? <Text style={{color: 'white', textAlign: "center", fontSize: 8 }}>El campo de tener 10 caracteres</Text> : <Text></Text>}
              </View>
            </View>
            <TouchableOpacity
              onPress={this.signUpAgent}
              style={styles.signup_button}
            >
              <Text style={styles.signup_button_text}>
                REGISTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.back_button}
            >
              <Text style={styles.back_button_text}>
                REGRESAR
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
};