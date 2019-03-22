import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image,Picker, SafeAreaView, Alert, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import ActionSheet from 'react-native-actionsheet'
const styles = require('./CreatePropertiesStyles');
const IMAGES = { TOP_BACKGROUND: require("../../../../assets/img/topbg.png") }
var is_form_validated = false;

export default class SelectNeighb extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props) {
    super(props)

    this.state = {
      selectedValue: null,
      isLoading: true,
      avatar: globals.avatar,
      name: '',
      city: [],
      street1: '',
      street2: '',
      numeracion: '',
      reference: '',
      userData: null,
      neightborhood: [],
      data: null,
      neighborhoodID: 0,
      selectNeighborhood: '',
      cityID: null,
      cityName: '',
      directionData: null,
      isUpdate: false,
      cityNameOption: [],
      neightborhoodNameOption: [],
      idEdit: 0,
      loading: false,
      state:'java'
    }
    if (this.props.navigation.state.params.city_id) {
      alert(this.props.navigation.state.params.city_id);
      API.getNeightborhoods(this.getneightborhoodResponse, this.props.navigation.state.params.city_id, true);
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount() {
    AsyncStorage.getItem("customerData").then((item) => {
      const data = JSON.parse(item)
      this.setState({ userData: data })
    })
  }

  //======================================================================
  // getneightborhoodResponse
  //======================================================================

  getneightborhoodResponse = {
    success: (response) => {
      try {
        this.setState({
          neightborhood: response.neightborhood.data || [],
          neighborhoodID: response.neightborhood.data.id,
        })
        console.log(response.neightborhood.data);

      } catch (error) {
        Alert.alert("NOC NOC", error.message)
      }
      //this.neightborhoodNameOptionResponse()
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  neightborhoodNameOptionResponse() {
    var nameNeightborhoodOption;
    this.state.neightborhood.map((n) => {
      let d = {
        label: n.attributes.name,
        value: n.id,
      }
      console.log(d);
      nameNeightborhoodOption.push(d);
    });
    this.setState({ nameNeightborhoodOption: nameNeightborhoodOption });
    // console.log(this.state.nameNeightborhoodOption);
    this.setState({ loading: false })
  }

  _onOpenActionSheetCity = () => {
    this.ActionSheetCity.show();
  }

  actionSheetCitySelect(itemIndex) {
    if (this.state.cityNameOption.length - 1 == itemIndex) {
    } else {
      var cityId = this.state.city[itemIndex].id
      var cityName = this.state.city[itemIndex].attributes.name
      API.getNeightborhoods(this.getneightborhoodResponse, cityId, true);
      this.setState({ cityName: cityName })
      if (this.props.navigation.state.params.is_edit == true) {
      } else {
        this.setState({ neiShow: true });
      }
    }
  }

  _onOpenActionSheetNeighborhood = () => {
    this.setState({ loading: true });
    this.ActionSheetNeighborhood.show();
  }

  actionSheetNeighborhoodSelect = (itemIndex) => {
    if (this.state.neightborhoodNameOption.length - 1 == itemIndex) {
    } else {
      if (itemIndex) {
        var neighborhoodId = this.state.neightborhood[itemIndex].id
        var neighborhoodName = this.state.neightborhood[itemIndex].attributes.name
        this.setState({
          selectNeighborhood: neighborhoodName,
          neighborhoodID: neighborhoodId
        })
      }
    }
  }

  //======================================================================
  // render
  //======================================================================

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
         
          <ScrollView style={{ flex: 1 }} bounces={false}>
            <View>
              <Text>Select neighborhood</Text>
            <Picker
              style={{flex:1}}
              selectedValue={this.state.neighborhoodID}
              onValueChange={(lang) => this.setState({language: lang})}>
               {this.state.neightborhood.map( (v)=>{
                  return <Picker.Item label={v.attributes.name} value={v.id} />
                })
               }
            </Picker>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
