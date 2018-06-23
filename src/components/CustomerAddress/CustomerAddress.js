import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import * as urls from '../../constants/api';

const styles = require('./CustomerAddressStyles');

export default class CustomerAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 2.50,
      address: "6060 La Floresta, Quito-Ecuador",
      time_and_date: "23 de mayo de 2018 - 12:00 HH",
      main_service: "Limpieza de casa",
      added_services: "Limpieza de Edificio",
      additional_details: "¿Como mas describirias tu trabajo?"
    }
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

          <TouchableOpacity style={styles.jobs_details_container}>
            <FontAwesome
              name="home"
              size={30}
              color='#2478AE'
            />
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Dirección
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.state.address}
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

          <TouchableOpacity style={styles.jobs_details_container}>
            <FontAwesome
              name="briefcase"
              size={30}
              color='#2478AE'
            />
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
                name="edit"
                size={30}
                color='#2478AE'
              />
            </View>
          </TouchableOpacity>
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