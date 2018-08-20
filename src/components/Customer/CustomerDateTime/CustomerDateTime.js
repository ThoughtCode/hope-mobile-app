import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setDate} from "../../../actions";

import * as urls from '../../../constants/api';

const styles = require('./CustomerDateTimeStyles');

class CustomerDateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      isDateTimePickerVisible: false,
      errorMessage: ""
    }
  }

  showDatePicker = () => this.setState({isDateTimePickerVisible: true});

  hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  formatDate = (date) => {
    if(date != null) {
      const newDate = new Date(date), locale = "es-ES",
        month = newDate.toLocaleString(locale, {month: "long"});
      formattedDate = month.charAt(0).toUpperCase() + month.slice(1) + " " + newDate.getDate() + " de " + newDate.getFullYear() + " - " + newDate.getHours() + ":" + newDate.getMinutes() + "Hrs";
      return formattedDate;
    } else {
      return '';
    }
  }

  handleDatePicked = (date) => {
    let datePicked = new Date(date);
    this.setState({date: datePicked});
    this.hideDateTimePicker();
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
          <TouchableOpacity
            style={styles.select_date_button}
            onPress={this.showDatePicker}
          >
            <FontAwesome
              name="calendar"
              size={30}
              color='#fff'
            />
            <Text style={styles.select_date_text}>
              Seleccionar
            </Text>
          </TouchableOpacity>
          <Text style={styles.date_text}>
            {this.formatDate(this.state.date)}
          </Text>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode='datetime'
          />
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
                this.props.setDate(this.state.date);
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

export default connect(null, {setDate})(CustomerDateTime);