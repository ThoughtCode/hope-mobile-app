import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setBaseService} from "../../actions";

import * as urls from '../../constants/api';

const styles = require('./CustomerBaseServiceStyles');

class CustomerBaseService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBaseService: {},
      baseServices: [],
      errorMessage: ""
    }
  }

  // getMainServices = (authToken) => {
  //   getPropertiesURL = urls.BASE_URL + urls.PROPERTIES;
  //   fetch(getPropertiesURL, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${authToken}`
  //     },
  //   }).then((response) => response.json()).then((data) => {
  //     let properties = data.property.data;
  //     this.setState({properties});
  //   }).catch((error) => this.setState({errorMessage: error.message}));
  // };

  selectedBaseService = (baseService) => {
    this.setState(
      { selectedBaseService: this.state.baseServices.find( bs => {return bs.id === baseService.value}) },
      () => { this.props.setBaseService(this.state.selectedBaseService)});
  }

  renderBaseServices = () => {
    if(this.state.baseServices.length != 0)
    {
      let radio_props = [];
      this.state.baseServices.map(baseService => {
        radio_props.push(
          {
            label: baseService.name,
            value: baseService.id,
            color: '#2478AE',
            size: 30,
          }
        )
      });

      return (
        <View>
          <RadioGroup radioButtons={radio_props} onPress={value => this.selectedBaseService(value.find(baseService => {return baseService.selected}))}/>
        </View>
      );
    }
  }

  componentDidMount() {
    if (this.props.baseServices != null) {
      let baseServices = this.props.baseServices;
      this.setState({baseServices}, () => {
        this.setState({selectedBaseService: this.state.baseServices[0]}, () => {
          this.props.setBaseService(this.state.selectedBaseService);
        })
      });
    }
  }

  render() {
    console.log(this.state);
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
          {
            this.renderBaseServices()
          }
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

const mapStateToProps = state => {
  return {
    baseServices: state.services.base
  };
}

export default connect(mapStateToProps, {setBaseService})(CustomerBaseService);