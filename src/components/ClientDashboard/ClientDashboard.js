import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import * as urls from '../../constants/api';

const styles = require('./ClientDashboardStyles');

export default class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    //   password: '',
    //   errorMessage: ''
    // };
    this.signOutCustomer = this.signOutCustomer.bind(this);
  }

  signOutCustomer = (authToken) => {
    signoutURL = urls.BASE_URL + urls.CUSTOMER_SIGNOUT;
    fetch(signoutURL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('CustomerLogin');
        }
      }).catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Bievenido {this.props.navigation.state.params.data.customer.data.attributes.first_name}
        </Text>
        <TouchableOpacity onPress={() => this.signOutCustomer (this.props.navigation.state.params.data.customer.data.attributes.access_token)}>
          <Text>
            SIGNOUT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
