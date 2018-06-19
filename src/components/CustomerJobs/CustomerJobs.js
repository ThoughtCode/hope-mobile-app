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

import * as urls from '../../constants/api';

const styles = require('./CustomerJobsStyles');

export default class CustomerJobs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_title}>Trabajos</Text>
            <FontAwesome
                name="plus-circle"
                size={24}
                color='#2478AE'
            />
          </View>
          <ScrollView contentContainerStyle={styles.main_content}>

          </ScrollView>
        </View>
    )
  }
}