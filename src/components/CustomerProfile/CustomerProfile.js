import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View }
  from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import * as urls from '../../constants/api';


const styles = require('./CustomerProfileStyles');

export default class CustomerProfile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     servicesTypes: [],
  //     nextJobs: [],
  //     pastJobs: []
  //   };
  //   this.getServicesTypes = this.getServicesTypes.bind(this);
  //   this.getNextJobs = this.getNextJobs.bind(this);
  //   this.getPastJobs = this.getPastJobs.bind(this);
  // }

  // signOutCustomer = (authToken) => {
  //   signoutURL = urls.BASE_URL + urls.CUSTOMER_SIGNOUT;
  //   fetch(signoutURL, {
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${authToken}`
  //     },
  //   }).then((response) => {
  //       if (response.status === 200) {
  //         this.props.navigation.navigate('CustomerLogin');
  //       }
  //     }).catch((error) => this.setState({errorMessage: error.message}));
  // };

  // componentWillMount() {
  //   const data = this.props.navigation.getParam('data');
  //   const authToken = data.customer.data.attributes.access_token;
  //   this.getServicesTypes(authToken);
  //   this.getNextJobs(authToken);
  //   this.getPastJobs(authToken);
  // }

  render() {
    // console.log(this.props.navigation.getParam('data'));
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_title}>Perfil</Text>
          </View>
          <ScrollView>
            <View style={styles.profile_picture_name_container}>

              <Text style={styles.profile_name}>
                {this.props.navigation.getParam('data').customer.data.attributes.first_name} {this.props.navigation.getParam('data').customer.data.attributes.last_name}
              </Text>
            </View>
            <Text style={styles.section_title}>Profile</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.footer_item} onPress={()=>this.props.navigation.navigate('CustomerDashboard', { data: this.props.navigation.getParam('data')})}>
              <FontAwesome
                  name="home"
                  size={24}
                  color='gray'
              />
              <Text style={styles.footer_item_text}>
                Home
              </Text>
            </TouchableOpacity>
            <View style={styles.footer_item}>
              <FontAwesome
                  name="briefcase"
                  size={24}
                  color='gray'
              />
              <Text style={styles.footer_item_text}>Trabajos</Text>
            </View>
            <View style={styles.footer_item}>
              <FontAwesome
                  name="user"
                  size={24}
                  color='gray'
              />
              <Text style={styles.footer_item_text}>Profile</Text>
            </View>
          </View>
        </View>
    );
  }
}
