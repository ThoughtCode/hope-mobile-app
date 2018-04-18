import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';

import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';
import SignUp from './src/components/SignUp/SignUp';

const MainNavigator = SwitchNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
   SignUp: { screen: SignUp },
  // Profile: { screen: Profile },
  // RegisterMoon: { screen: RegisterMoon },
  // Confirmation: { screen: Confirmation },
  // ForgotPassword: { screen: ForgotPassword },
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
