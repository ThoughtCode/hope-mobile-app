import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import {FontAwesome} from '@expo/vector-icons';

import {connect} from 'react-redux';
import {setAddonService} from "../../actions";

const styles = require('./CustomerAddonServiceStyles');

class CustomerAddonService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAddonService: {},
      addonServices: [],
      errorMessage: ""
    }
  }

  selectedAddonService = (addonService) => {
    this.setState(
      { selectedAddonService: this.state.addonServices.find( as => {return as.id === addonService.value}) },
      () => { this.props.setAddonService(this.state.selectedAddonService)});
  }

  renderAddonServices = () => {
    if(this.state.addonServices.length != 0)
    {
      let radio_props = [];
      this.state.addonServices.map(addonService => {
        radio_props.push(
          {
            label: addonService.name,
            value: addonService.id,
            color: '#2478AE',
            size: 30,
          }
        )
      });

      return (
        <View>
          <RadioGroup radioButtons={radio_props} onPress={value => this.selectedAddonService(value.find(addonService => {return addonService.selected}))}/>
        </View>
      );
    }
  }

  componentDidMount() {
    if (this.props.addonServices != null) {
      let addonServices = this.props.addonServices;
      this.setState({addonServices}, () => {
        this.setState({selectedAddonService: this.state.addonServices[0]}, () => {
          this.props.setAddonService(this.state.selectedAddonService);
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
              Servicio Adicional
            </Text>
            <View/>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.main_content}>
          {
            this.renderAddonServices()
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
    addonServices: state.services.addon
  };
}

export default connect(mapStateToProps, {setAddonService})(CustomerAddonService);