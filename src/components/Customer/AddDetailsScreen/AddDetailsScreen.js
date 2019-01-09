import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Picker,
    ScrollView
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './AddDetailsScreenStyle';
import { API } from '../../../util/api';
import * as globals from '../../../util/globals';
const { height, width } = Dimensions.get('window')
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class AddCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      number: '',
      month: '',
      cvc: '',
      year: '',
      city : [
        {attributes : { name : "AAA"}},
        {attributes : { name : "BBB"}},
        {attributes : { name : "CCC"}},
        {attributes : { name : "DDD"}},
        {attributes : { name : "EEE"}},
      ],
      identificationType : [
        {attributes : {name : "Consumidor final"}},
        {attributes : {name : "Cédula"}},
        {attributes : {name : "RUC"}},
      ],
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
      email : globals.email,
      phone : globals.cell_phone,
    }
  }

  addCardDataResponseData = {
    success: (response) => {
      try {
        Alert.alert("NOC NOC",response.message)
        console.log("Response data-->" + JSON.stringify(response))
        // this.setState({
        //     jobCommentList: response.review.data
        // })
      } catch (error) {
        console.log('getJobResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getJobResponseData error ' + JSON.stringify(err));
    }
  }

  validation() {
    if (this.state.name === "") {
        console.log("Enter Name")
    }
    else if (this.state.number === "") {
        console.log("Enter Number")
    }
    else if (this.state.month === "") {
        console.log("Enter Month")
    }
    else if (this.state.year === "") {
        console.log("Enter Year")
    }
    else if (this.state.cvc === "") {
        console.log("Enter CVC")
    }
    else {
      console.log("Sucess")
      var data = {
        payment: {
          "holder_name": this.state.name,
          "card_type": "vi",
          "number": this.state.number,
          "token": "9209405777683805561",
          "status": "valid",
          "expiry_month": this.state.month,
          "expiry_year": this.state.year
        }
      }
      API.setAddCard(this.addCardDataResponseData, data, true);
      // JSON.stringify(this.state.jobCommentList)
      // this.props.navigation.navigate('AddressForm')
    }
  }

  selectidentificationType(e) {
    console.log("Evento evento evento evento evento evento ------------->", e)
    
    // this.setState({ identificationType: this.state.identificationType[e -1].id })
  }

  render() {
    let { data, checked } = this.state;
    var initials = this.state.firstName + " "
        initials += this.state.lastName
    return (
      <View style={styles.container}>
        {/* <View>
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
          <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Agregar"}</Text>
          </View>
        </View> */}
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
          <View style={styles.topTitleView}>
            <Text>{"Agregar detalles de facturación"}</Text>
          </View>
        </View>

        <ScrollView>
          <View style={{flex:1}}>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Razon Social:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  underlineColorAndroid='transparent'
                  placeholder='Razon Social'
                  value={initials}
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({name : text})} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Identification:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
              {console.log("____________> ID",this.state.identificationType)}
                {(this.state.identificationType && this.state.identificationType.length > 0) ?
                  <Picker
                    selectedValue={this.state.identificationType}
                    style={{ height: 50, width: width - 20 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ identificationType: this.state.identificationType[itemIndex - 1].id })}
                  >
                    <Picker.Item label={this.state.identificationType && this.state.identificationType[this.state.identificationType - 1] || "Seleccione opción"} value={"Consumidor final"} key={-1} />
                    { this.state.identificationType.map((item, key)=>{
                      return (<Picker.Item label={item.attributes.name} value={item.attributes.name} />)
                    })}
                  </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{console.log("respuesta ----->>>>", this.state)}a</Text>
                }
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"N de identification:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  underlineColorAndroid='transparent'
                  placeholder='N de identification'
                  // value={"092837546er"}
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({name : text})} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Correo electronico:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  underlineColorAndroid='transparent'
                  placeholder='Correo electronico'
                  value={this.state.email}
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({name : text})} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Dirccion:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  underlineColorAndroid='transparent'
                  placeholder='Dirccion'
                  // value={"la floresst"}
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({name : text})} />
                </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Tefefono:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  underlineColorAndroid='transparent'
                  placeholder='Tefefono'
                  value={this.state.phone}
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({name : text})} />
              </View>
            </View>

          </View>
        </ScrollView>
        {/* <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
            <View style={styles.textInputStyleContainer}>
              <TextInput
                ref={input => {
                  this.textInput = input
                }}
                underlineColorAndroid='transparent'
                placeholder='Name'
                style={styles.textInputStyle}
                onChangeText={(name) => this.setState({ name: name })} />
            </View>
            <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
            <View style={styles.textInputStyleContainer}>
              <TextInput
                ref={input => {
                  this.textInput = input
                }}
                maxLength={10}
                underlineColorAndroid='transparent'
                placeholder='Card Number'
                style={styles.textInputStyle}
                onChangeText={(no) => this.setState({ number: no })} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{"Mes"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            keyboardType="numeric"
                            maxLength={2}
                            underlineColorAndroid='transparent'
                            placeholder='Mes'
                            style={styles.textInputStyle}
                            onChangeText={(month) => this.setState({ month: month })} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{"Ano"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            maxLength={2}
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            placeholder='Ano'
                            style={styles.textInputStyle}
                            onChangeText={(year) => this.setState({ year: year })} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{"CVC"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            maxLength={3}
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            placeholder='CVC'
                            style={styles.textInputStyle}
                            onChangeText={(cvc) => this.setState({ cvc: cvc })} />
                    </View>
                </View>
            </View>
        </View> */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => this.validation()}>
            <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"Agregar detalle de facturación"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}