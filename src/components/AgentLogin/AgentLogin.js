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

const styles = require('./AgentLoginStyles');

export default class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         errorMessage: ''
      };
      this.signInUser = this.signInAgent.bind(this);
   }

  signInAgent = () => {
    this.setState({errorMessage: ''});
    if (this.state.email === '') {
      this.setState({errorMessage: "El campo de correo no puede estar vacío"})
    } else if (this.state.password === '') {
      this.setState({errorMessage: "Por favor ingrese su contraseña"})
    } else {
      signinURL = urls.BASE_URL + urls.AGENT_SIGNIN;
      fetch(signinURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "agents": {
            "email": this.state.email,
            "password": this.state.password,
          }
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.props.navigation.navigate('ClientDashboard');
          } else if (response.status === 422) {
            this.setState({errorMessage: "Verifique su usuario y su contraseña"});
          }
        })
        .catch((error) => this.setState({errorMessage: error.message}));
    }
  };

   render() {
      return (
         <KeyboardAvoidingView
            style={styles.fullSize}
            behavior="padding"
         >
            <ScrollView
               contentContainerStyle={styles.login_container}
               keyboardShouldPersistTaps='never'
               scrollEnabled={false}
            >
               <View style={styles.login_form_container}>
                  <Text>
                     {this.state.errorMessage}
                  </Text>
                  <TextInput
                     style={styles.login_input}
                     onChangeText={(email) => this.setState({email})}
                     value={this.state.email}
                     placeholder="CORREO ELECTRÓNICO"
                     autoCapitalize="none"
                     keyboardType="email-address"
                     underlineColorAndroid="#fff"
                  />
                  <TextInput
                     style={styles.login_input}
                     onChangeText={(password) => this.setState({password})}
                     value={this.state.password}
                     placeholder="CONTRASEÑA"
                     autoCapitalize="none"
                     onFocus={() => this.setState({password: ""})}
                     secureTextEntry={true}
                     underlineColorAndroid="#fff"
                  />
               </View>
               <View style={styles.login_actions_container}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerLogin')}>
                     <Text style={styles.sign_up_button}>
                        ENTRAR COMO UN CLIENTE
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ClientSignUp')}>
                     <Text style={styles.sign_up_button}>
                        ¿NO TIENE UNA CUENTA?
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                     <Text style={styles.sign_up_button}>
                        ¿OLVIDÓ SU CONTRASEÑA?
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={this.signInAgent}
                     style={styles.login_button}
                  >
                     <Text style={styles.login_button_text}>
                        INICIAR SESIÓN
                     </Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      );
   }
}
