import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';

import Home from './src/components/Home/Home';
import CustomerLogin from './src/components/CustomerLogin/CustomerLogin';
import AgentLogin from './src/components/AgentLogin/AgentLogin';
import CustomerSignUp from './src/components/CustomerSignUp/CustomerSignUp';
import AgentSignUp from './src/components/AgentSignup/AgentSignUp';
import CustomerDashboard from './src/components/CustomerDashboard/CustomerDashboard';
import AgentDashboard from './src/components/AgentDashboard/AgentDashboard';
import CustomerResetPassword from './src/components/CustomerResetPassword/CustomerResetPassword';
import AgentResetPassword from './src/components/AgentResetPassword/AgentResetPassword';
import CustomerProfile from './src/components/CustomerProfile/CustomerProfile';
import CustomerJobs from './src/components/CustomerJobs/CustomerJobs';

// Don't show warnings about deprecation lifecycle methods on the App
import { YellowBox } from 'react-native';
import CreateJob from "./src/components/CreateJob/CreateJob";

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const MainNavigator = SwitchNavigator({
  Home: { screen: Home },
  CustomerLogin: { screen: CustomerLogin },
  AgentLogin: { screen: AgentLogin },
  CustomerSignUp: { screen: CustomerSignUp },
  AgentSignUp: { screen: AgentSignUp },
  CustomerDashboard: { screen: CustomerDashboard },
  AgentDashboard: { screen: AgentDashboard },
  CustomerResetPassword: { screen: CustomerResetPassword},
  AgentResetPassword: { screen: AgentResetPassword},
  CustomerProfile: { screen: CustomerProfile },
  CustomerJobs: { screen: CustomerJobs },
  CreateJob: { screen: CreateJob },
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
