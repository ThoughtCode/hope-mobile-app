import React, {Component} from 'react';
import {
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View
} from 'react-native';
import {SwitchNavigator} from 'react-navigation';

const styles = require('./LoginStyles');

export default class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         errorMessage: ''
      };
      this.signInUser = this.signInUser.bind(this);
   }

   signInUser = () => {
      // TODO Authenticate against API
      console.log(this.state);
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
                  <TouchableOpacity>
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
                     onPress={this.signInUser}
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
