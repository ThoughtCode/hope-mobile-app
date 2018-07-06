import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setProperty} from "../../actions";

import * as urls from '../../constants/api';

const styles = require('./CustomerAddressStyles');

class CustomerAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      errorMessage: ""
    }
  }

  getProperties = (authToken) => {
    getPropertiesURL = urls.BASE_URL + urls.PROPERTIES;
    fetch(getPropertiesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let properties = data.property.data;
      this.setState({properties});
      // console.log(data);
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    const authToken = data.customer.data.attributes.access_token;
    this.getProperties(authToken);
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
              Direcciones
            </Text>
            <Image source={require('../../../assets/img/logo_blanco.png')} style={styles.logo_image}/>
          </View>
        </ImageBackground>

        <ScrollView contentContainerStyle={styles.main_content}>
          {
            this.state.properties.map((property) => {
              return (
                <View key={property.attributes.id} style={styles.jobs_details_container}>
                  <FontAwesome
                    name="home"
                    size={30}
                    color='#2478AE'
                  />
                  <TouchableOpacity
                    onPress={
                      () => {
                        this.props.navigation.navigate('CreateJob',
                          {
                            data: this.props.navigation.getParam('data'),
                          }
                        );
                        this.props.setProperty(property);
                      }
                    }
                  >
                    <View style={styles.job_detail}>
                      <Text style={styles.jobs_titles}>
                        {property.attributes.name}
                      </Text>
                      <Text style={styles.jobs_descriptions}>
                        {property.attributes.number} {property.attributes.p_street}, {property.attributes.city} {'\n'} Ecuador
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.jobs_action_icon}>
                    <FontAwesome
                      name="edit"
                      size={30}
                      color='#2478AE'
                    />
                  </View>

                </View>
              )
            })
          }
        </ScrollView>
        <TouchableOpacity style={styles.jobs_value}>
          <Text style={styles.jobs_value_text}>Nueva Dirección</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.jobs_store_button}>
            <Text style={styles.jobs_store_button_text}>
              Guardar Trabajo
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(null, {setProperty})(CustomerAddress);