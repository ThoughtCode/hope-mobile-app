import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import * as urls from '../../constants/api';

const styles = require('./CreateJobStyles');

class CreateJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 2.50,
      address: "6060 La Floresta, Quito-Ecuador",
      time_and_date: "23 de mayo de 2018 - 12:00 HH",
      main_service: "Limpieza de casa",
      added_services: "Limpieza de Edificio",
      additional_details: "¿Como mas describirias tu trabajo?",
      property:{},
      date: ''
    }
  }

  renderPropertyAddress = () => {
    if (Object.keys(this.state.property).length !== 0) {
      return (
        this.state.property.attributes.number + " " + this.state.property.attributes.p_street + " " + this.state.property.attributes.city + "\n" + "Ecuador"
      );
    } else {
      return ("Seleccione una propiedad");
    }
  }

  componentWillMount() {
    if (this.props.job.property != null) {
      let property = this.props.job.property;
      this.setState({property});
    }
  }

  render() {
    console.log('this.props', this.props);

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.banner_image}
          source={require("../../../assets/img/dashboard-home.png")}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.jobs_back_button}
              onPress={() => this.props.navigation.navigate('CustomerDashboard', {data: this.props.navigation.getParam('data')})}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color='#fff'
              />
            </TouchableOpacity>
            <Text style={styles.jobs_header}>
              Describe tu Trabajo
            </Text>
            <Image source={require('../../../assets/img/logo_blanco.png')} style={styles.logo_image}/>
          </View>
        </ImageBackground>

        <ScrollView contentContainerStyle={styles.main_content}>

          <TouchableOpacity
            style={styles.jobs_details_container}
            onPress={() => this.props.navigation.navigate('CustomerAddress', {data: this.props.navigation.getParam('data')})}
          >
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Dirección
              </Text>
              <Text style={styles.jobs_descriptions}>
                { this.renderPropertyAddress() }
              </Text>
            </View>
            <View style={styles.jobs_action_icon}>
              <FontAwesome
                name="map-marker"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.jobs_details_container}
            onPress={() => this.props.navigation.navigate('CustomerDateTime', {data: this.props.navigation.getParam('data')})}
          >
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Fecha y Hora
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.state.time_and_date}
              </Text>
            </View>
            <View style={styles.jobs_action_icon}>
              <FontAwesome
                name="chevron-right"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobs_details_container}>
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Servicio Principal
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.state.main_service}
              </Text>
            </View>
            <View style={styles.jobs_action_icon}>
              <FontAwesome
                name="chevron-right"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobs_details_container}>
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Servicios Adicionales
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.state.added_services}
              </Text>
            </View>
            <View style={styles.jobs_action_icon}>
              <FontAwesome
                name="chevron-right"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobs_details_container}>
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Detalles adicionales
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.state.additional_details}
              </Text>
            </View>
            <View style={styles.jobs_action_icon}>
              <FontAwesome
                name="edit"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>

          <View style={styles.jobs_value}>
            <Text style={styles.jobs_value_text}>Total trabajo: </Text>
            <Text style={styles.jobs_value_text}>$ {this.state.valor}</Text>
          </View>
        </ScrollView>

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

function mapStateToProps(state) {
  return {
    job: state
  };
}

export default connect(mapStateToProps, null)(CreateJob);