import React, {Component} from 'react';
import {
   KeyboardAvoidingView,
   ScrollView,
   Text,
   TextInput,
   TouchableOpacity,
   View
} from 'react-native';

const styles = require('./SignUpStyles');

export default class SignUp extends Component {

   constructor(props) {
      super(props);
      this.state = {
         password: '',
         email: '',
         errorMessage: ''
      };
      this.signUpUser = this.signUpUser.bind(this);
   }

   signUpUser = () => {
      // TODO Sign up user against API
      console.log(this.state);
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
               </View>
               <View style={styles.sign_up_actions_container}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                     <Text style={styles.login_button}>
                        ATRÁS
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={this.signUpUser}
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