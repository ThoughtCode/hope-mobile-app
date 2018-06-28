import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setProperty} from "../../actions";

import * as urls from '../../constants/api';

const styles = require('./CustomerDateTimeStyles');

class CustomerDateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "2016-05-15",
      errorMessage: ""
    }
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
              Fecha y Hora
            </Text>
            <View/>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.main_content}>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.jobs_store_button}>
            <Text style={styles.jobs_store_button_text}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(null, {setProperty})(CustomerDateTime);