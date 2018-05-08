import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import * as urls from '../../constants/api';

const styles = require('./AgentDashboardStyles');

export default class AgentDashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    //   password: '',
    //   errorMessage: ''
    // };
    this.signOutAgent = this.signOutAgent.bind(this);
  }

  signOutAgent = (authToken) => {
    signoutURL = urls.BASE_URL + urls.AGENT_SIGNOUT;
    fetch(signoutURL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => {
      if (response.status === 200) {
        this.props.navigation.navigate('AgentLogin');
      }
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Bievenido {this.props.navigation.state.params.data.agent.data.attributes.first_name}
        </Text>
        <TouchableOpacity onPress={() => this.signOutAgent(this.props.navigation.state.params.data.agent.data.attributes.access_token)}>
          <Text>
            SIGNOUT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
