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

const styles = require('./CustomerJobsStyles');

export default class CustomerJobs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.add_job_button}
            onPress={() => this.props.navigation.navigate('CreateJob', {data: this.props.navigation.getParam('data')})}
          >
            <Text style={styles.header_title}>Trabajos</Text>
            <FontAwesome
              name="plus-circle"
              size={24}
              color='#2478AE'
            />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.main_content}>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footer_item}
            onPress={() => this.props.navigation.navigate('CustomerDashboard', {data: this.props.navigation.getParam('data')})}
          >
            <FontAwesome
              name="home"
              size={24}
              color='gray'
            />
            <Text style={styles.footer_item_text}>
              Home
            </Text>
          </TouchableOpacity>
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
          <View style={styles.footer_item}>
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
      </View>
    )
  }
}