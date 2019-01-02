import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import * as urls from '../../../constants/api';

const styles = require('./CreateJobStyles');

class CreateJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 2.50,
      address: "6060 La Floresta, Quito-Ecuador",
      additional_details: "¿Como mas describirias tu trabajo?",
      property: {},
      date: '',
      serviceType: {},
      addonService: null,
      baseService: null
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

  formatDate = (date) => {
    const newDate = new Date(date), locale = "es-ES",
      month = newDate.toLocaleString(locale, {month: "long"});
    formattedDate = month.charAt(0).toUpperCase() + month.slice(1) + " " + newDate.getDate() + " de " + newDate.getFullYear() + " - " + newDate.getHours() + ":" + newDate.getMinutes() + "Hrs";
    return formattedDate;
  }

  renderDateTime = () => {
    if (this.state.date.length !== 0) {
      return (
        this.formatDate(this.state.date)
      );
    } else {
      return ("Seleccione una fecha");
    }
  }

  renderServiceType = () => {
    if (Object.keys(this.state.serviceType).length !== 0) {
      return (this.state.serviceType.attributes.name);
    } else {
      return("Seleccione tipo de servicio");
    }
  }

  renderBaseService = () => {
    if (Object.keys(this.state.baseService).length !== 0) {
      return (this.state.baseService.name);
    } else {
      return("Seleccione un servicio base");
    }
  }

  renderAddonService = () => {
    if (Object.keys(this.state.addonService).length !== 0) {
      return (this.state.addonService.name);
    } else {
      return("Seleccione un servicio adicional");
    }
  }

  renderServices = () => {
    if (Object.keys(this.state.serviceType).length !== 0) {
      return (
        <View style={{ height: 200}}>
          <TouchableOpacity
            style={styles.jobs_details_container}
            onPress={() => this.props.navigation.navigate('CustomerBaseService', {data: this.props.navigation.getParam('data')})}
          >
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Servicio Principal
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.renderBaseService()}
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

          <TouchableOpacity
            style={styles.jobs_details_container}
            onPress={() => this.props.navigation.navigate('CustomerAddonService', {data: this.props.navigation.getParam('data')})}
          >
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Servicios Adicionales
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.renderAddonService()}
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
        </View>
      )
    }
  }

  componentDidMount() {
    if (this.props.job.property != null) {
      let property = this.props.job.property;
      this.setState({property});
    }
    if (this.props.job.date != null) {
      let date = this.props.job.date;
      this.setState({date});
    }
    if (this.props.job.serviceType != null) {
      let serviceType = this.props.job.serviceType;
      this.setState({serviceType});
    }
    if (this.props.job.baseService != null) {
      let baseService = this.props.job.baseService;
      this.setState({baseService});
    }
    if (this.props.job.addonService != null) {
      let addonService = this.props.job.addonService;
      this.setState({addonService});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.banner_image}
          source={require("../../../../assets/img/dashboard-home.png")}
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
            <Image source={require('../../../../assets/img/logo_blanco.gif')} style={styles.logo_image}/>
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
                {this.renderPropertyAddress()}
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
                {this.renderDateTime()}
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

          <TouchableOpacity
            style={styles.jobs_details_container}
            onPress={() => this.props.navigation.navigate('CustomerServiceType', {data: this.props.navigation.getParam('data')})}
          >
            <View style={styles.job_detail}>
              <Text style={styles.jobs_titles}>
                Tipo de Servicio
              </Text>
              <Text style={styles.jobs_descriptions}>
                {this.renderServiceType()}
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

          {this.renderServices()}

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