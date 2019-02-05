import React from 'react';
import {Text,View,TextInput,TouchableOpacity,Dimensions,AsyncStorage,ScrollView,SafeAreaView,KeyboardAvoidingView,Image,Picker,Alert} from 'react-native';
import styles from './AddressFormStyle';
import { API } from '../../../util/api';
import * as globals from '../../../util/globals';
import Ionicons from '@expo/vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class AddressForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      avatar : globals.avatar,
      data : null,
      nombre : '',
      neighborhoodID : 0,
      selectNeighborhood : '',
      street1 : '',
      street2 : '',
      numeracion : '',
      phone : '',
      reference : '',
      userData : null,
      city : [],
      neightborhood : [],
      isUpdate : props.navigation.state.params.isUpdate || false,
      propertyData : props.navigation.state.params.propertyData || null,
      cityID : null,
      firstName : globals.first_name,
      lastName : globals.last_name,
      cityName: '',
      directionData: null,
      jobCurrentState: this.props.navigation.state.params.jobActualState,
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      this.setState({data : data})
    })
    API.getCity(this.getCityResponse,{},true);

    if(this.state.isUpdate){
      this.setState({
        nombre : this.state.propertyData.attributes.name,
        neighborhoodID : this.state.propertyData.attributes.neightborhood_id, 
        street1 : this.state.propertyData.attributes.s_street,
        street2 : this.state.propertyData.attributes.p_street,
        numeracion : this.state.propertyData.attributes.number,
        phone : this.state.propertyData.attributes.phone,
        reference : this.state.propertyData.attributes.additional_reference,
        cityID : this.state.propertyData.attributes.city_id
      })
    }
  }

  //======================================================================
  // getCityResponse
  //======================================================================

  getCityResponse = {
    success: (response) => {
      try {
        this.setState({
          city : response.city && response.city.data || []
        },() =>{
          if(this.state.isUpdate){
            this.state.cityId && this.selectCity(this.state.cityId)
          }
        })
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  // selectCity
  //======================================================================
  
  selectCity(itemIndex){
    API.getNeightborhoods(this.getneightborhoodResponse,itemIndex,true);
    this.state.city.map(r=>{
      this.setState({cityName: r.attributes.name})
    })
    return
  }

  //======================================================================
  // getneightborhoodResponse
  //======================================================================

  getneightborhoodResponse = {
    success: (response) => {
      try {
        this.setState({
          neightborhood : response.neightborhood.data || [],
          neighborhoodID : response.neightborhood.data.id,
        })
          
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  onPressHandle = () =>{
    let data = {
      "property": {
        "name": this.state.nombre,
        "neightborhood_id": this.state.neighborhoodID, 
        "p_street": this.state.street1,
        "s_street": this.state.street2,
        "number": this.state.numeracion,
        "phone": this.state.numeracion,
        "aditional_references0": this.state.reference
      }
    }
    if(!this.state.isUpdate){
      API.createProperties(this.createPropertiesResponse,data,true);
    }else{
      this.state.propertyData && this.state.propertyData.id && API.updateProperties(this.createPropertiesResponse,data,true,this.state.propertyData.id);
    }
  }

  setDirection = (directionData) => {
    this.setState({
      directionData: directionData
    })
  }

  //======================================================================
  // createPropertiesResponse
  //======================================================================

  createPropertiesResponse = {
    success: (response) => {
      try {
        this.props.navigation.state.params.refresProperties()
        let jobCurrentStateSend = this.props.navigation.state.params.jobActualState
        Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => {this.props.navigation.navigate("DirectionScreen",{setDirection : this.setDirection, jobActualState : jobCurrentStateSend})}}])
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  // setFocus
  //======================================================================

  setFocus = (textField) =>{
    this[textField].focus()
  }

  updateNeighborhood = (name, id) => {
    if(id != 0){
      this.setState({ 
        selectNeighborhood: name, 
        neighborhoodID: id 
      })
    }
  }

  render() {
    if(this.state.data != null){
      var initials = this.state.firstName + " "
          initials += this.state.lastName
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ flex: 1 }} bounces={false}>
              <View>
                <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                <View style={styles.profile_picture_name_container}>
                  <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"} />
                  {(this.state.avatar && this.state.avatar != "") ?
                    <Image source={{ uri: this.state.avatar + '?time=' + new Date() }} style={styles.profile_image} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")} />
                    :
                    <View style={[styles.profile_image, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', width: 100, borderRadius: 50 }]} >
                      <Text style={{ color: '#fff' }}>{initials}</Text>
                    </View>
                  }
                  <Text style={styles.profile_name}>
                    {this.state.data.customer.data.attributes.first_name} {this.state.data.customer.data.attributes.last_name}
                  </Text>
                </View>
                <View style={styles.titleTextViewStyle}>
                  <Text style={styles.titleTextStyle}>{"Nueva Propiedad"}</Text>
                </View>
              </View>

              <View>
                <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 20 }}>
                  <View style={styles.textInputStyleContainer}>
                    <TextInput ref={ref => (this.firtNameInput = ref)}
                      underlineColorAndroid={"transparent"}
                      style={styles.textInputStyle}
                      placeholder={"Nombre"}
                      placeholderTextColor={"gray"}
                      value={this.state.nombre}
                      onChangeText={(nombre) => this.setState({ nombre: nombre })}
                    />
                  </View>

                  {this.state.city.map(r=>{
                  })}
                  <View style={[styles.textInputStyleContainer, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                    {(this.state.city && this.state.city.length > 0) ?
                      <Picker
                        selectedValue={this.state.cityID}
                        style={{ height: 50, width: width - 20 }}
                        onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex, itemValue)}>
                        <Picker.Item label={this.state.cityName || "Ciudad"} value={this.state.cityName} key={-1} />
                          {this.state.city.map((item, key) => {
                            return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                          })}
                      </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Ciudad"}</Text>
                    }
                  </View>

                  <View style={[styles.textInputStyleContainer, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                    {(this.state.neightborhood && this.state.neightborhood.length > 0) ?
                      <Picker
                        selectedValue={this.state.neighborhoodID}
                        style={{ height: 50, width: width - 20 }}
                        onValueChange={(itemValue, itemIndex) => this.updateNeighborhood(itemValue, itemIndex)}
                        >
                        <Picker.Item label={ this.state.selectNeighborhood || "Barrio"} value={this.state.selectNeighborhood} key={-1} />
                          {this.state.neightborhood.map((item, key) => {
                            return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                          })}
                      </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Barrio"}</Text>
                    }
                  </View>

                  <View style={styles.textInputStyleContainer}>
                    <TextInput ref={ref => (this.streetInput = ref)}
                      underlineColorAndroid={"transparent"}
                      style={styles.textInputStyle}
                      placeholder={"Calle Principal"}
                      placeholderTextColor={"gray"}
                      value={this.state.street1}
                      onChangeText={(street1) => this.setState({ street1: street1 })}
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.setFocus("street2Input")} />
                  </View>

                  <View style={styles.textInputStyleContainer}>
                    <TextInput ref={ref => (this.street2Input = ref)}
                      underlineColorAndroid={"transparent"}
                      style={styles.textInputStyle}
                      placeholder={"Calle Secundaria"}
                      placeholderTextColor={"gray"}
                      value={this.state.street2}
                      onChangeText={(street2) => this.setState({ street2: street2 })}
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.setFocus("numeracionInput")} />
                  </View>

                  <View style={styles.textInputStyleContainer}>
                    <TextInput ref={ref => (this.numeracionInput = ref)}
                      underlineColorAndroid={"transparent"}
                      style={styles.textInputStyle}
                      placeholder={"Numeración"}
                      placeholderTextColor={"gray"}
                      value={this.state.numeracion}
                      onChangeText={(numeracion) => this.setState({ numeracion: numeracion })}
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.setFocus("referenceInput")} />
                  </View>

                  <View style={styles.textInputStyleContainer}>
                    <TextInput ref={ref => (this.referenceInput = ref)}
                      underlineColorAndroid={"transparent"}
                      style={styles.textInputStyle}
                      placeholder={"Referencias adicionales"}
                      placeholderTextColor={"gray"}
                      value={this.state.reference}
                      onChangeText={(reference) => this.setState({ reference: reference })}
                      returnKeyType={"done"}/>
                  </View>

                </View>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={this.onPressHandle}>
              <View style={styles.buttonViewStyle}>
                <Text style={styles.buttonTextStyle}>{"Guardar"}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )
    }else{
      return null
    }
  }
}