import React, { Component } from 'react';
import {Text,View,TouchableOpacity,TextInput,Image,Dimensions,Picker,ScrollView,Alert,KeyboardAvoidingView} from 'react-native';
import { API } from '../../../util/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './CustomerAddBillingScreenStyle';
import * as globals from '../../../util/globals';
import ActionSheet from 'react-native-actionsheet';

const { width } = Dimensions.get('window')
const IMAGES = {TOP_BACKGROUND: require("../../../../assets/img/topbg.png")}

var is_form_validated = false;

export default class AddBillingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      socialReason: '',
      identification: '',
      email: '',
      address: '',
      telephone: '',
      identificationTypeSelecct: null,
      identificationType : '',
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
      email : globals.email,
      phone : globals.cell_phone,
      detailsData : null,
      jobCurrentState: '',
      maxLengthInput : 0,
      maxLengthText : ''
    }
  }

  validation() {
    if (this.state.identificationTypeSelecct == null){
      Alert.alert(
        'Error, en el tipo identificación ',
        'Debe seleccionar un tipo de identificación',
        [
          { text: 'OK', onPress: () => console.log('Debe seleccionar un tipo de identificación') }
        ]
      );
      is_form_validated = false;
    }else if (this.state.identification === "") {
      Alert.alert(
        'Error, número de deidentificación',
        'Debe colocar su número de identificación',
        [
          { text: 'OK', onPress: () => console.log('Debe colocar su número de identificación') }
        ]
      );
      is_form_validated = false;
    }else if (this.state.address === "") {
      Alert.alert(
        'Error, de dirección',
        'Debe colocar la dirección para su facturación',
        [
          { text: 'OK', onPress: () => console.log('Debe colocar la dirección para su facturación') }
        ]
      );
      is_form_validated = false;
    }else if (this.state.telephone === "") {
      Alert.alert(
        'Error, de Teléfono',
        'Debe colocar número de teléfono',
        [
          { text: 'OK', onPress: () => console.log('Debe colocar número de telefono') }
        ]
      );
      is_form_validated = false;
    }else {
      is_form_validated = true;
    }
    this.onPressHandle()
  }

  addBillingDataResponseData = {
    success: (response) => {
      try {
        Alert.alert(globals.APP_NAME,response.message,[
          {text: 'OK', onPress: () => this.props.navigation.navigate("CustomerBillingList")},
        ],
        { cancelable: false })
      } catch (error) {
        console.log('getBillingResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getBillingResponseData error ' + JSON.stringify(err));
    }
  }
  
  onPressHandle = () =>{
    let data = {
      "invoice_detail": {
        "email": this.state.email,
        "identification": this.state.identification,
        "identification_type": this.state.identificationTypeSelecct,
        "social_reason": this.state.socialReason,
        "address": this.state.address,
        "telephone": this.state.telephone
      }
    }
    if(!this.state.isUpdate && is_form_validated){
      API.setAddInvoiceDetail(this.addBillingDataResponseData, data, true);
    }else{
    }
    
  }

  updateSelect = (select) => {
    this.setState({ identificationTypeSelecct: select })
  }

  setDetails = (detailsData) => {
    this.setState({
      detailsData: detailsData
    })
  }

  _onOpenActionSheetIdentification = () => {
    this.ActionSheetIdentification.show();
  }

  actionSheetIdentificationSelect(itemIndex){
    let select = null
    if(itemIndex == 0){
      select = "Consumidor final"
      Alert.alert(
        'Mensaje',
        'N° de identificación, debe contener 10 caracteres',
        [
          { text: 'OK', onPress: () => this.setState({maxLengthInput:10})}
        ]
      );
      this.setState({identificationTypeSelecct:itemIndex,identificationType:select})
    }else if(itemIndex == 1){
      select = "Cédula"
      Alert.alert(
        'Mensaje',
        'N° de identificación, debe contener 10 caracteres',
        [
          { text: 'OK', onPress: () => this.setState({maxLengthInput:10})}
        ]
      );
      this.setState({identificationTypeSelecct:itemIndex,identificationType:select})
    }else if(itemIndex == 2){
      select = "RUC"
      Alert.alert(
        'Mensaje',
        'N° de identificación, debe contener 13 caracteres',
        [
          { text: 'OK', onPress: () => this.setState({maxLengthInput:13})}
        ]
      );
      this.setState({identificationTypeSelecct:itemIndex,identificationType:select})
    }else{}
  }

  render() {
    let { data, checked } = this.state;
    var initials = this.state.firstName + " "
        initials += this.state.lastName
    if(this.state.socialReason == ""){
      this.setState({socialReason: initials})
    }
    return (
      <View style={styles.container}>
        <View>
          <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Agregar detalles de facturación"}</Text>
          </View>
        </View>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
          <View style={styles.topTitleView}>
            <Text>{"Agregar detalles de facturación"}</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Razón Social:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='Razón Social'
                    value={initials}
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setState({socialReason : text})} />
                </View>
              </View>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Identificación:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TouchableOpacity onPress={this._onOpenActionSheetIdentification}>
                    <Text style={(this.state.identificationType == '') ? ({alignItems:'center',justifyContent:'center',marginVertical:12,paddingLeft:5,color:'gray'}):({alignItems:'center',justifyContent:'center',marginVertical:12,paddingLeft:5})}>{this.state.identificationType || "Identificación"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"N° de identificación:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='N° de identificación'
                    style={styles.textInputStyle}
                    keyboardType = 'numeric'
                    maxLength = {this.state.maxLengthInput}
                    onChangeText={(text) => this.setState({identification : text})} />
                </View>
              </View>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Correo electrónico:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='Correo electrónico'
                    value={this.state.email}
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setState({email : text})} />
                </View>
              </View>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Dirección:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='Dirección'
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setState({address : text})} />
                  </View>
              </View>
              <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Teléfono:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                  <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='Teléfono'
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setState({telephone : text})} />
                </View>
              </View>

            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => this.validation()}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>{"Guardar"}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <ActionSheet
          ref={o => this.ActionSheetIdentification = o}
          title={'Seleccionar identificación'}
          options={['Consumidor final','Cédula','RUC','Cancelar']}
          cancelButtonIndex={3}
          onPress={(index) => { this.actionSheetIdentificationSelect(index) }}
        />
        </View>
    );
  }
}