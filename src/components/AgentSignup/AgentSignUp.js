import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import * as urls from '../../constants/api';

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
            "birthday": this.state.birthday
          }
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              this.props.navigation.navigate('AgentDashboard', { data });
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
      <KeyboardAvoidingView
        behaviour='padding'
        style={styles.sign_up_container}
      >
        <ScrollView
          contentContainerStyle={styles.sign_up_container}
          keyboardShouldPersistTaps='never'
        >
          <View style={styles.sign_up_form_container}>
            <Text style={styles.sign_up_banner_text}>
              REGISTRO
            </Text>
            <Text>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(firstname) => this.setState({firstname})}
              placeholder="NOMBRE"
              autoCapitalize="none"
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(lastname) => this.setState({lastname})}
              placeholder="APELLIDO"
              autoCapitalize="none"
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(email) => this.setState({email})}
              placeholder="CORREO ELECTRÓNICO"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(password) => this.setState({password})}
              placeholder="CONTRASEÑA"
              autoCapitalize="none"
              onFocus={() => {
                this.setState({password: ""});
              }}
              secureTextEntry={true}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(password_confirmation) => this.setState({password_confirmation})}
              placeholder="CONFIRMACIÓN DE CONTRASEÑA"
              autoCapitalize="none"
              onFocus={() => {
                this.setState({password_confirmation: ""});
              }}
              secureTextEntry={true}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(national_id) => this.setState({national_id})}
              placeholder="CÉDULA"
              autoCapitalize="none"
              underlineColorAndroid="#fff"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(national_id) => this.setState({national_id})}
              placeholder="CELULAR"
              autoCapitalize="none"
              underlineColorAndroid="#fff"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.sign_up_input}
              onChangeText={(national_id) => this.setState({national_id})}
              placeholder="CUMPLEAÑOS"
              autoCapitalize="none"
              underlineColorAndroid="#fff"
            />
          </View>
          <View style={styles.sign_up_actions_container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.login_button}>
                ATRÁS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.signUpAgent}
              style={styles.sign_up_button}
            >
              <Text style={styles.sign_up_text}>
                REGISTRAR
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
};