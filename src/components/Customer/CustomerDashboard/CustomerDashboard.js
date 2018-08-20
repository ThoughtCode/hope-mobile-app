import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
}
  from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import * as urls from '../../../constants/api';


const styles = require('./CustomerDashboardStyles');

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesTypes: [],
      nextJobs: [],
      pastJobs: []
    };
    this.getServicesTypes = this.getServicesTypes.bind(this);
    this.getNextJobs = this.getNextJobs.bind(this);
    this.getPastJobs = this.getPastJobs.bind(this);
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
    }).then((response) => response.json()).then((data) => {
      let servicesTypes = data.service_type.data;
      this.setState({servicesTypes});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  getNextJobs = (authToken) => {
    nextJobsURL = urls.BASE_URL + urls.NEXT_JOBS;
    fetch(nextJobsURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let nextJobs = data.job.data;
      this.setState({nextJobs});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  getPastJobs = (authToken) => {
    pastJobsURL = urls.BASE_URL + urls.PAST_JOBS;
    fetch(pastJobsURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let pastJobs = data.job.data;
      this.setState({pastJobs});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    const authToken = data.customer.data.attributes.access_token;
    this.getServicesTypes(authToken);
    this.getNextJobs(authToken);
    this.getPastJobs(authToken);
  }

  render() {
    return (
        <View style={styles.container}>
          <Image source={require('../../../../assets/img/dashboard-home.png')} style={styles.banner_image}/>
          <Image source={require('../../../../assets/img/logo_blanco.png')} style={styles.logo_image}/>
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
                    return (
                        <View key={serviceType.id} style={styles.servicios_item}>
                          <Image source={require('../../../../assets/img/servicios_1.png')}
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
                {
                  this.state.nextJobs.map((job) => {
                    const date = new Date(job.attributes.started_at), locale = "es-ES",
                        month = date.toLocaleString(locale, {month: "long"});
                    return (
                        <View key={job.id} style={styles.trabajos_item}>
                          <Text style={styles.trabajos_item_title}>{job.attributes.job_details[0].service.name}</Text>
                          <Text style={styles.trabajos_item_date}>
                            {month.charAt(0).toUpperCase() + month.slice(1) + " " + date.getDate() + " de " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + "Hrs"}
                          </Text>
                          <View style={styles.trabajos_avatars_container}>
                            <Image source={require('../../../../assets/img/profile_avatar1.png')}
                                   style={styles.trabajos_avatar_image}/>
                            <Image source={require('../../../../assets/img/profile_avatar2.png')}
                                   style={styles.trabajos_avatar_image}/>
                          </View>
                          <Text style={styles.trabajos_item_footer}>Mas agentes están en camino</Text>
                        </View>
                    );
                  })
                }
              </ScrollView>
            </View>
            <Text style={styles.section_title}>Historial de Trabajos</Text>
            <View style={styles.section_trabajos_container}>
              <ScrollView
                  contentContainerStyle={styles.trabajos_container}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              >
                {
                  this.state.pastJobs.map((job) => {
                    const date = new Date(job.attributes.started_at), locale = "es-ES",
                        month = date.toLocaleString(locale, {month: "long"});
                    return (
                        <View key={job.id} style={styles.trabajos_item}>
                          <Text style={styles.trabajos_item_title}>{job.attributes.job_details[0].service.name}</Text>
                          <Text style={styles.trabajos_item_date}>
                            {month.charAt(0).toUpperCase() + month.slice(1) + " " + date.getDate() + " de " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + "Hrs"}
                          </Text>
                          <View style={styles.trabajos_avatars_container}>
                            <Image source={require('../../../../assets/img/profile_avatar3.png')}
                                   style={styles.trabajos_avatar_image}/>
                          </View>
                          <Text style={styles.trabajos_item_footer}>Realizado exitosamente</Text>
                        </View>
                    );
                  })
                }
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
              <TouchableOpacity
                  style={styles.footer_item}
                  onPress={() => this.props.navigation.navigate('CustomerJobs', {data: this.props.navigation.getParam('data')})}
              >
                <FontAwesome
                    name="briefcase"
                    size={24}
                    color='gray'
                />
                <Text style={styles.footer_item_text}>Trabajos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.footer_item}
                onPress={() => this.props.navigation.navigate('CustomerProfile', {data: this.props.navigation.getParam('data')})}
            >
              <FontAwesome
                  name="user"
                  size={24}
                  color='gray'
              />
              <Text style={styles.footer_item_text}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
