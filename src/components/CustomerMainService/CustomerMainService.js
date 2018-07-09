import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setDate} from "../../actions";

import * as urls from '../../constants/api';

const styles = require('./CustomerMainServiceStyles');

class CustomerMainService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainService: {},
      errorMessage: ""
    }
  }

  getMainServices = (authToken) => {
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
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

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
              Servicio Principal
            </Text>
            <View/>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.main_content}>

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

export default connect(null, {setDate})(CustomerMainService);