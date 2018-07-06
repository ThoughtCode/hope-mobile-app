import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setServiceType} from "../../actions";

import * as urls from '../../constants/api';

const styles = require('./CustomerServiceTypeStyles');

class CustomerServiceType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servicesTypes: [],
      errorMessage: ""
    }
  }

  getServicesTypes = (authToken) => {
    servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    fetch(servicesTypesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let servicesTypes = data.service_type.data;
      this.setState({servicesTypes});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    const authToken = data.customer.data.attributes.access_token;
    this.getServicesTypes(authToken);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.banner_image}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.jobs_back_button}
              onPress={() => this.props.navigation.navigate('CreateJob', {data: this.props.navigation.getParam('data')})}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color='#000'
              />
            </TouchableOpacity>
            <Text style={styles.jobs_header}>
              Tipo de Servicio
            </Text>
            <View/>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.main_content}>
          {
            this.state.servicesTypes.map((serviceType) => {
              return (
                  <Text style={styles.servicios_item_description}>{serviceType.attributes.name}</Text>
              );
            })
          }
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.jobs_store_button}
            onPress={
              () => {
                this.props.navigation.navigate('CreateJob',
                  {
                    data: this.props.navigation.getParam('data'),
                  }
                );
                // this.props.setDate(this.state.date);
              }
            }
          >
            <Text style={styles.jobs_store_button_text}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(null, {setServiceType})(CustomerServiceType);