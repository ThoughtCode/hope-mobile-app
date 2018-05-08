import React, {Component} from 'react';
import {Text, View} from 'react-native';

const styles = require('./ClientDashboardStyles');

export default class ClientDashboard extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Bievenido Cliente
        </Text>
      </View>
    );
  }
}
