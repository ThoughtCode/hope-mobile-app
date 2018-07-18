import React, {Component} from 'react';
import {ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';

import * as urls from '../../constants/api';

const styles = require('./CustomerNewAddressStyles');

class CustomerNewAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      p_street: '',
      number: '',
      s_street: '',
      aditional_reference: '',
      phone: '',
      neightborhood_id: '',
      neighborhood: '',
      city_id: '',
      city: '',
      citiesList: [],
      neighborhoodList: []
    }
  }

  getNeighborhoods = (authToken) => {
    // servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    // fetch(servicesTypesURL, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${authToken}`
    //   },
    // }).then((response) => response.json()).then((data) => {
    //   let servicesTypes = data.service_type.data;
    //   this.setState({servicesTypes});
    //   this.setState({selectedServiceType: this.state.servicesTypes[0]})
    // }).catch((error) => this.setState({errorMessage: error.message}));
    console.log('List of neighbordhoods');
  };

  getCities = (authToken) => {
    // servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    // fetch(servicesTypesURL, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${authToken}`
    //   },
    // }).then((response) => response.json()).then((data) => {
    //   let servicesTypes = data.service_type.data;
    //   this.setState({servicesTypes});
    //   this.setState({selectedServiceType: this.state.servicesTypes[0]})
    // }).catch((error) => this.setState({errorMessage: error.message}));
    console.log('List of cities');
  }

  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    const authToken = data.customer.data.attributes.access_token;
    this.getCities(authToken);
    this.getNeighborhoods(authToken);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.banner_image}
          source={require("../../../assets/img/dashboard-home.png")}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.jobs_back_button}
              onPress={() => this.props.navigation.navigate('CreateJob', {data: this.props.navigation.getParam('data')})}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color='#fff'
              />
            </TouchableOpacity>
            <Text style={styles.jobs_header}>
              Nueva Dirección
            </Text>
            <View/>
          </View>
        </ImageBackground>

        <ScrollView contentContainerStyle={styles.main_content}>
          <TextInput
            style={styles.text_inputs}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder= "Nombre de la propiedad"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(p_street) => this.setState({p_street})}
            value={this.state.p_street}
            placeholder= "Calle principal"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(number) => this.setState({number})}
            value={this.state.number}
            placeholder= "Número"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(s_street) => this.setState({s_street})}
            value={this.state.s_street}
            placeholder= "Calle secundaria"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(aditional_reference) => this.setState({aditional_reference})}
            value={this.state.aditional_reference}
            placeholder= "Referencias adicionales"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(phone) => this.setState({phone})}
            value={this.state.phone}
            placeholder= "Teléfono"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(neightborhood_id) => this.setState({neightborhood_id})}
            value={this.state.neightborhood_id}
            placeholder= "Barrio"
          />
          <TextInput
            style={styles.text_inputs}
            onChangeText={(city_id) => this.setState({city_id})}
            value={this.state.city_id}
            placeholder= "Ciudad"
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.jobs_store_button}
            onPress={
              () => {
                console.log('Guardar Address');
                this.props.navigation.navigate('CustomerAddress', {data: this.props.navigation.getParam('data')});
              }
              // () => {
              //   this.getServices(this.props.navigation.getParam('data').customer.data.attributes.access_token, this.state.selectedServiceType.id);
              // }
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

export default CustomerNewAddress;
