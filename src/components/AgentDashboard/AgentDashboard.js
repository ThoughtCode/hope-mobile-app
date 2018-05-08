import React, {Component} from 'react';
import {Text, View} from 'react-native';

const styles = require('./AgentDashboardStyles');

export default class AgentDashboard extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Bievenido Agente
        </Text>
      </View>
    );
  }
}
