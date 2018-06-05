import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View }
from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import * as urls from '../../constants/api';

const styles = require('./CustomerDashboardStyles');

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesTypes: [],
      nextJobs: [],
      jobDetails:[]
    };
    this.getServicesTypes = this.getServicesTypes.bind(this);
    this.getNextJobs = this.getNextJobs.bind(this);
  }

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

  getServicesTypes = (authToken) => {
    servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    fetch(servicesTypesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).
      then((data) => {
      let servicesTypes = data.service_type;
      this.setState({servicesTypes: servicesTypes.data});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  getNextJobs = (authToken) => {
    nextJobsURL = urls.BASE_URL + urls.NEXT_JOBS;
    fetch(servicesTypesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).
    then((data) => {
      let nextJobs = data;
      this.setState({nextJobs: Object.values(nextJobs)});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    const data = this.props.navigation.getParam('data');
    const authToken = data.customer.data.attributes.access_token;
    this.getServicesTypes(authToken);
    this.getNextJobs(authToken);
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/img/dashboard-home.png')}  style={styles.banner_image}/>
        <Image source={require('../../../assets/img/logo_blanco.png')}  style={styles.logo_image}/>
        <ScrollView>
          <Text style={styles.section_title}>Servicios</Text>
          <View style={styles.section_servicios_container}>
            <ScrollView
              contentContainerStyle={styles.servicios_container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {
                this.state.servicesTypes.map((serviceType) => {
                  return(
                    <View style={styles.servicios_item}>
                      <Image source={require('../../../assets/img/servicios_1.png')}
                             style={styles.servicios_item_image}
                      />
                      <Text style={styles.servicios_item_description}>{serviceType.attributes.name}</Text>
                    </View>
                  );
                })
              }
            </ScrollView>
          </View>

          <Text style={styles.section_title}>Próximos Trabajos</Text>
          <View style={styles.section_trabajos_container}>
            <ScrollView
              contentContainerStyle={styles.trabajos_container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.trabajos_item}>
                <Text style={styles.trabajos_item_title}>Limpieza de Yate</Text>
                <Text style={styles.trabajos_item_date}>Mayo 18 de 2018 - 8:30 am</Text>
                <View style={styles.trabajos_avatars_container}>
                  <Image source={require('../../../assets/img/profile_avatar1.png')}  style={styles.trabajos_avatar_image}/>
                  <Image source={require('../../../assets/img/profile_avatar2.png')}  style={styles.trabajos_avatar_image}/>
                </View>
                <Text style={styles.trabajos_item_footer}>Mas agentes están en camino</Text>
              </View>
              <View style={styles.trabajos_item}>
                <Text style={styles.trabajos_item_title}>Limpieza de Bodega</Text>
                <Text style={styles.trabajos_item_date}>Mayo 18 de 2018 - 8:30 am</Text>
                <View style={styles.trabajos_avatars_container}>
                  <Image source={require('../../../assets/img/profile_avatar2.png')}  style={styles.trabajos_avatar_image}/>
                  <Image source={require('../../../assets/img/profile_avatar1.png')}  style={styles.trabajos_avatar_image}/>
                  <Image source={require('../../../assets/img/profile_avatar3.png')}  style={styles.trabajos_avatar_image}/>
                </View>
                <Text style={styles.trabajos_item_footer}>Mas agentes están en camino</Text>
              </View>
            </ScrollView>
          </View>
          <Text style={styles.section_title}>Historial de Trabajos</Text>
          <View style={styles.section_trabajos_container}>
            <ScrollView
              contentContainerStyle={styles.trabajos_container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.trabajos_item}>
                <Text style={styles.trabajos_item_title}>Limpieza de Yate</Text>
                <Text style={styles.trabajos_item_date}>Mayo 18 de 2018 - 8:30 am</Text>
                <View style={styles.trabajos_avatars_container}>
                  <Image source={require('../../../assets/img/profile_avatar2.png')}  style={styles.trabajos_avatar_image}/>
                </View>
                <Text style={styles.trabajos_item_footer}>Realizado exitosamente</Text>
              </View>
              <View style={styles.trabajos_item}>
                <Text style={styles.trabajos_item_title}>Limpieza de Edificio</Text>
                <Text style={styles.trabajos_item_date}>Mayo 18 de 2018 - 8:30 am</Text>
                <View style={styles.trabajos_avatars_container}>
                  <Image source={require('../../../assets/img/profile_avatar2.png')}  style={styles.trabajos_avatar_image}/>
                  <Image source={require('../../../assets/img/profile_avatar1.png')}  style={styles.trabajos_avatar_image}/>
                </View>
                <Text style={styles.trabajos_item_footer}>Realizado exitosamente</Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footer_item}>
            <FontAwesome
              name="home"
              size={24}
              color='gray'
            />
            <Text style={styles.footer_item_text}>Home</Text>
          </View>
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
