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
  View
} from 'react-native';

import * as urls from '../../../constants/api';

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
      errorMessage: ''
    };
    this.signUpAgent = this.signUpAgent.bind(this);
  }

  signUpAgent = () => {
    this.setState({errorMessage: ''});
    if (this.state.email === '') {
      this.setState({errorMessage: "El campo de correo no puede estar vacío"})
    } else if (this.state.password != this.state.password_confirmation) {
      this.setState({errorMessage: "Las contraseñas no coinciden"})
    } else {
      signup_url = urls.BASE_URL + urls.AGENT_SIGNUP_URI;
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
            response.json().then((data) => {
              this.props.navigation.navigate('AgentDashboard', {data});
            });
          } else if (response.status === 422) {
            this.setState({errorMessage: "Ya existe un usuario con ese correo electrónico"});
          }
        })
        .catch((error) => this.setState({errorMessage: error.message}));
    }


  };

  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={require("../../../../assets/img/home_splash_3.jpg")}
      >
        <KeyboardAvoidingView
          behaviour='padding'
          style={styles.fullSize}
        >
          <View style={styles.logo_container}>
            <Image
              style={styles.logo_image}
              source={require('../../../../assets/img/logo_blanco.png')}
            />
          </View>
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
          >
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
                    onChangeText={(national_id) => this.setState({national_id})}
                    placeholder="CÉDULA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.signup_input_container}>
                  <FontAwesome
                    name="mobile-phone"
                    size={40}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(national_id) => this.setState({national_id})}
                    placeholder="CELULAR"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="phone-pad"
                  />
                </View>
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