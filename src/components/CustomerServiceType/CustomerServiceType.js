import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

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
      errorMessage: "",
      selectedServiceType: null
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

  selectedServiceType =(serviceType) => {
    this.setState({selectedServiceType: this.state.servicesTypes.find( st => {return st.id === serviceType.value} )
  })}

  renderServicesTypes = () => {
    if(this.state.servicesTypes.length != 0)
    {
      let radio_props = [];
      this.state.servicesTypes.map(serviceType => {
        radio_props.push(
          {
            label: serviceType.attributes.name,
            value: serviceType.id,
            color: '#2478AE',
            size: 30,
          }
        )
      });

      return (
        <View>
          <RadioGroup radioButtons={radio_props} onPress={value => this.selectedServiceType(value.find(serviceType => {return serviceType.selected}))}/>
        </View>
      );
    }

  }

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
            // this.state.servicesTypes.map((serviceType) => {
            //   return (
            //       <Text style={styles.servicios_item_description}>{serviceType.attributes.name}</Text>
            //   );
            // })
            this.renderServicesTypes()
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
                this.props.setServiceType(this.state.selectedServiceType);
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