import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';

import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';

const MainNavigator = SwitchNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  // Signup: { screen: Signup },
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
