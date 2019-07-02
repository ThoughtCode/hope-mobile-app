import React, {Component} from 'react';
import {Text,TouchableOpacity,View,ScrollView,Image,SafeAreaView,Alert,TextInput,Keyboard,KeyboardAvoidingView,AsyncStorage} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import ActionSheet from 'react-native-actionsheet';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = require('./CreatePropertiesStyles');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}
var is_form_validated = false;

export default class CreateProperties extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      selectedValue: null,
      isLoading : true,
      avatar : globals.avatar,
      name : '',
      city : [],
      street1 : '',
      street2 : '',
      numeracion : '',
      reference : '',
      userData : null,
      neightborhood : [],  
      data : null,
      neighborhoodID : 0,
      selectNeighborhood : '',
      cityID : null,
      cityName: '',
      directionData: null,
      isUpdate: false,
      cityNameOption: [],
      neightborhoodNameOption: [],
      idEdit: 0,
      spinner:false,
    }
    if(this.props.navigation.state.params.is_edit == true){
      API.getNeightborhoods(this.getneightborhoodResponse,this.props.navigation.state.params.data.attributes.city_id,true);
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      this.setState({userData : data})
    })
    if(this.props.navigation.state.params != undefined){
      if(this.props.navigation.state.params.is_edit == true){
        let idEdit = this.props.navigation.state.params.data.id
        let nameProperty = this.props.navigation.state.params.data.attributes.name
        let nameCityProperty = this.props.navigation.state.params.data.attributes.city
        let nameNeightborhoodProperty = this.props.navigation.state.params.data.attributes.neightborhood
        let nameNeighborhoodIdProperty = this.props.navigation.state.params.data.attributes.neightborhood_id
        let pStreetProperty = this.props.navigation.state.params.data.attributes.p_street
        let sStreetProperty = this.props.navigation.state.params.data.attributes.s_street
        let numberProperty = this.props.navigation.state.params.data.attributes.number
        let aditionalReferences = this.props.navigation.state.params.data.attributes.additional_reference
        this.setState({idEdit:idEdit,name:nameProperty,cityName:nameCityProperty,selectNeighborhood:nameNeightborhoodProperty,neighborhoodID:nameNeighborhoodIdProperty,street1:pStreetProperty,street2:sStreetProperty,numeracion:numberProperty,reference:aditionalReferences})
      }
    }
    API.getCity(this.getCityResponse,{},true);
  }

  //======================================================================
  // jobApplyResponse
  //======================================================================

  getCityResponse = {
    success: (response) => {
      try {
        this.setState({
          city : response.city && response.city.data || []
        },() =>{
          if(this.state.isUpdate){
            this.state.cityId && this.actionSheetCitySelect(this.state.cityId)
          }
        })
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
      this.optionsCitySelection()
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  optionsCitySelection(){
    if (this.state.cityName != ''){
      var cityId = this.state.cityID
      API.getNeightborhoods(this.getneightborhoodResponse,cityId,true);
      var nameCityOption = this.state.city.map((c)=>c.attributes.name)
      nameCityOption.push('Cancelar')
      this.setState({cityNameOption:nameCityOption})
    } else {
      var nameCityOption = this.state.city.map((c)=>c.attributes.name)
      nameCityOption.push('Cancelar')
      this.setState({cityNameOption:nameCityOption})
    }
  }

  btnUpdateTap = (value) =>{
    if(value == "save"){
      this.validation()
      if(is_form_validated == true){
        this.onPressHandle("saveReady")
      }
    }else if(value == "edit"){
      this.validation()
      if(is_form_validated == true){
        this.onPressHandle("editReady")
      }
    }
  }

  validation(){
    let valid = true;
    if(this.state.name == ""){
      valid = false;
      Alert.alert('Error de validación', 'El nombre no puede estar vacío', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.cityName == ""){
      valid = false;
      Alert.alert('Error de validación', 'Seleccione una ciudad', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.selectNeighborhood == ""){
      valid = false;
      Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.street1 == ""){
      valid = false;
      Alert.alert('Error de validación', 'Agrege primera calle', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.street2 == ""){
      valid = false;
      Alert.alert('Error de validación', 'Agrege segunda calle', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.numeracion == ""){
      valid = false;
      Alert.alert('Error de validación', 'Debe colocar una numeración', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else
    if(this.state.reference == ""){
      valid = false;
      Alert.alert('Error de validación', 'Debe colocar una referencia', [{ text: 'OK' }], {
        cancelable: false
      });
      is_form_validated = false;
      return valid;
    } else {
      is_form_validated = true;
    }
  }

  onPressHandle = (checked) => {
    if(is_form_validated == true){
      data = {
        "property": {
          "name": this.state.name,
          "city": this.state.city,
          "neightborhood_id": this.state.neighborhoodID, 
          "p_street": this.state.street1,
          "s_street": this.state.street2,
          "number": this.state.numeracion,
          "additional_reference": this.state.reference
        }
      }
      if(checked == "saveReady"){
        if(this.state.spinner == false){
          this.setState({ spinner: true }, () => {
            API.createProperties(this.createResponse,data,true);
          })
        }        
      }else if(checked == "editReady"){
        let idEdit = this.state.idEdit
        if(this.state.spinner == false){
          this.setState({ spinner: true }, () => {
            API.setEditProperty(this.setEditPropertyResponseData, data, idEdit, true);
          })
        }
      }
    }else{
      console.log("No pasa nada -------- No pasa nada --------")
    }
  }

  setEditPropertyResponseData = {
    success: (response) => {
      try {
        Alert.alert(globals.APP_NAME,response.message,[
          {text: 'OK', onPress: () => this.props.navigation.navigate("CustomerUpdateProperties")},
        ],
        { cancelable: false })
        this.setState({spinner: false});
      } catch (error) {
        this.setState({spinner: false});
        console.log('getBillingResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getBillingResponseData error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  // createResponse
  //======================================================================

  createResponse = {
    success: (response) => {
      try {
        this.props.navigation.state.params.refresProperties()
        Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => {this.props.navigation.goBack()}}])
        this.setState({spinner: false})
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
        this.setState({spinner: false})
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
      this.neightborhoodNameOptionResponse()
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  neightborhoodNameOptionResponse(){
    var nameNeightborhoodOption = this.state.neightborhood.map((n)=>n.attributes.name)
    nameNeightborhoodOption.push('Cancelar')
    this.setState({neightborhoodNameOption:nameNeightborhoodOption})
  }

  _onOpenActionSheetCity = () => {
    this.ActionSheetCity.show();
  }

  actionSheetCitySelect(itemIndex){
    if(this.state.cityNameOption.length -1 != itemIndex){
      var cityId = this.state.city[itemIndex].id
      var cityName = this.state.city[itemIndex].attributes.name
      API.getNeightborhoods(this.getneightborhoodResponse,cityId,true);
      this.setState({cityName: cityName}
    )}
  }

  _onOpenActionSheetNeighborhood = () => {
    if (this.state.cityName != ''){
      this.ActionSheetNeighborhood.show();
    } else {
      Alert.alert('NOC NOC','Por favor selecciona la ciudad')
    }
  }

  actionSheetNeighborhoodSelect = (itemIndex) => {
    if(this.state.neightborhoodNameOption.length -1 != itemIndex){
      var neighborhoodId = this.state.neightborhood[itemIndex].id
      var neighborhoodName = this.state.neightborhood[itemIndex].attributes.name
      this.setState({ 
        selectNeighborhood: neighborhoodName, 
        neighborhoodID: neighborhoodId 
      })}
    }

  //======================================================================
  // render
  //======================================================================
  
  render(){
    if(this.state.userData != null){
    var initials = this.state.userData.customer.data.attributes.first_name.charAt(0)
        initials += this.state.userData.customer.data.attributes.last_name.charAt(0) || ""

    return(
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
          <Spinner visible={this.state.spinner} />
          <ScrollView style={{flex:1}} bounces={false}>
            <View>
                  <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                  <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                    <View style={styles.profileView}>
                      {(this.state.avatar != "")?
                        <Image source={{uri : this.state.avatar}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
                        :
                        <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                          <Text style={{ color: '#fff' }}>{initials}</Text>
                        </View>
                      }
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.userData.customer.data.attributes.first_name + " "+ this.state.userData.customer.data.attributes.last_name}</Text>
                    </View>
                  <View style={styles.topTitleView}>
                    <Text style={styles.mainTitleText}>{(this.props.navigation.state.params.is_edit == false) ? ("Nueva Propiedad") : ("Editar Propiedad")}</Text>
                  </View>
                </View>
            <View>
              <View style={{flex:1,marginHorizontal:20,marginBottom:20}}>
                <View style={styles.textInputVieW}>
                  <TextInput  ref={ref => (this.firtNameInput = ref)}
                              underlineColorAndroid={"transparent"}
                              style={styles.textInputStyle}
                              placeholder={"Nombre propiedad"}
                              placeholderTextColor={"gray"}
                              value={this.state.name}
                              onChangeText={(name) => this.setState({name : name})}
                  />
                </View>
                <View style={[styles.textInputVieW, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                  <TouchableOpacity onPress={this._onOpenActionSheetCity}>
                    <Text style={styles.textStyle}>{this.state.cityName || "Ciudad"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.textInputVieW}>
                  <TextInput  ref={ref => (this.streetInput = ref)}
                              underlineColorAndroid={"transparent"}
                              style={styles.textInputStyle}
                              placeholder={"Calle Principal"}
                              placeholderTextColor={"gray"}
                              value={this.state.street1}
                              onChangeText={(street1) => this.setState({street1 : street1})}
                              returnKeyType={"next"}
                              onSubmitEditing={() => this.setFocus("street2Input")} />
                </View>
                <View style={styles.textInputVieW}>
                  <TextInput  ref={ref => (this.street2Input = ref)}
                              underlineColorAndroid={"transparent"}
                              style={styles.textInputStyle}
                              placeholder={"Calle Secundaria"}
                              placeholderTextColor={"gray"}
                              value={this.state.street2}
                              onChangeText={(street2) => this.setState({street2 : street2})}
                              returnKeyType={"next"}
                              onSubmitEditing={() => this.setFocus("numeracionInput")} />
                </View>
                <View style={styles.textInputVieW}>
                  <TextInput  ref={ref => (this.numeracionInput = ref)}
                              underlineColorAndroid={"transparent"}
                              style={styles.textInputStyle}
                              placeholder={"Numeración"}
                              placeholderTextColor={"gray"}
                              value={this.state.numeracion}
                              onChangeText={(numeracion) => this.setState({numeracion : numeracion})}
                              returnKeyType={"next"}
                              onSubmitEditing={() => this.setFocus("referenceInput")} />
                </View>
                <View style={styles.textInputVieW}>
                  <TextInput  ref={ref => (this.referenceInput = ref)}
                              underlineColorAndroid={"transparent"}
                              style={styles.textInputStyle}
                              placeholder={"Referencias adicionales"}
                              placeholderTextColor={"gray"}
                              value={this.state.reference}
                              onChangeText={(reference) => this.setState({reference : reference})}
                              returnKeyType={"done"}
                              onSubmitEditing={() => Keyboard.dismiss()} />
                </View>
                <View style={[styles.textInputVieW, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                  <TouchableOpacity onPress={this._onOpenActionSheetNeighborhood}>
                    <Text style={styles.textStyle}>{this.state.selectNeighborhood || "Barrio"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          {(this.props.navigation.state.params.is_edit == false) ? (
            <TouchableOpacity onPress={() => this.btnUpdateTap("save")}>
              <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                <Text style={[styles.titleText,{color:'#fff'}]}>{"Guardar"}</Text>
              </View>
            </TouchableOpacity>  
          ):(
            <TouchableOpacity onPress={() => this.btnUpdateTap("edit")}>
              <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                <Text style={[styles.titleText,{color:'#fff'}]}>{"Editar"}</Text>
              </View>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>        
        {this.state.cityNameOption ? (
          <ActionSheet
            ref={o => this.ActionSheetCity = o}
            title={'Seleccionar ciudad'}
            options={this.state.cityNameOption}
            cancelButtonIndex={this.state.cityNameOption.length - 1}
            onPress={(index) => { this.actionSheetCitySelect(index) }}
          />
        ):('')}
        {this.state.neightborhoodNameOption ? (
          <ActionSheet
            ref={o => this.ActionSheetNeighborhood = o}
            title={'Seleccionar barrio'}
            options={this.state.neightborhoodNameOption}
            cancelButtonIndex={this.state.neightborhoodNameOption.length -1}
            onPress={(index) => { this.actionSheetNeighborhoodSelect(index) }}
          />
        ):('')}
      </SafeAreaView>
    )
    }else{
      return null
    }
  }
}