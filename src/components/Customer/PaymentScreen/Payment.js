import React from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    CheckBox,
    Dimensions,
    Picker,
    Alert
} from 'react-native';
const { height, width } = Dimensions.get('window');
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './PaymentScreenStyle';
import { API } from '../../../util/api';
import Moment from 'moment';
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: this.props.navigation.state.params.data.serviceType,
      frequencyData: this.props.navigation.state.params.data.frequencyData,
      startedAt: this.props.navigation.state.params.data.selectedDate,
      additionalServiceData: this.props.navigation.state.params.data.services_choosen,
      total: this.props.navigation.state.params.data.total,
      checked: [],
      isHoliday: this.props.navigation.state.params.data.isHoliday,
      extraFee : this.props.navigation.state.params.data.serviceType.attributes.extra_service_fee_holiday.value,
      optionSelecct : '',
      toDiffer : [
        {name : "No deseo diferir mi pago"},
        {name : "Diferir mi pago en 3 meses. Sin intereses"},
      ],
      selectTerms : false
    }
  }

  updateSelect = (select) => {
    this.setState({ optionSelecct: select })
  }

  _calculateHours = () => {
    console.log("---------------------> _calculateHours DATA DATA DATA",this.state.serviceType.attributes)
    let total_work_hours = 0
    this.state.additionalServiceData.map((p)=>{
      total_work_hours += parseInt(p.time, 10);
    })
    total_work_hours += this.state.serviceType.attributes.service_base[0].time
    return total_work_hours
  }

  _selectTerms = (e) => {
    console.log("-----------------------------------> EVENTO",e)
    this.setState({selectTerms: e})

  }

  onPressHandle = () =>{
    let data = {
      "job": {
        "property_id": 41,
        "started_at": "2019-01-22", 
        "details": "Test",
        "frequency": 0,
        "job_details_attributes": [
          {
            "service_id": 2,
            "value": 1
          },
          {
            "service_id": 1,
            "value": 1
          },
          {
            "service_id": 3,
            "value": 1
          }
        ],
        "invoice_detail_id": 6,
        "credit_card_id": 68,
        "installments": 3
      }
    }
    API.createJob(this.createJobResponse,data,true);
    Alert.alert(
      'Trabajo creado',
      'Se creo tu trabajo con exito',
      [
        { text: 'OK', onPress: () => console.log('Se creo tu trabajo con exito') }
      ],
      { cancelable: false }
    );
    // if(!this.state.isUpdate){
    //   API.createJob(this.createJobResponse,data,true);
    // }else{
    //   this.state.propertyData && this.state.propertyData.id && API.updateProperties(this.createPropertiesResponse,data,true,this.state.propertyData.id);
    // }  
  }

    render() {
      let { data, checked } = this.state;
      let total = 0
      let vat = 0
      let total_with_additional_fee = 0
      this.state.additionalServiceData.map((item)=>{
        if (item.count != null){
          total += item.price * item.time * item.count
        } else {
          total += item.price * item.time
        }
      })
      let additional_fee = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
      if (this.state.isHoliday == true){  
        total = (total + (total * additional_fee))
        total_with_additional_fee = total / additional_fee
      } else {
        total = total;
      }
      vat = total * 0.12

      
      console.log(this.props.navigation.state.params.data)
        return (
            <View style={styles.container}>
                <View>
                  <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                  <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
                    <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                      {this.state.serviceType.attributes.name}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                      {this.state.frequencyData[0].name}
                    </Text>
                  </View>
                </View>
                <Text style={{ margin: 10, fontSize: 18, fontFamily: "helvetica" }}>
                  {Moment(this.state.startedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
                <View style={styles.deviderStyle} />
                <View style={{ flex: 0.9 }}>
                  <FlatList data={this.state.serviceType.attributes.service_base}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                      <View style={styles.childContainer}>
                        <View style={styles.itemView}>
                          <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                            {item.name}
                          </Text>
                          <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                            ${item.price * item.time}
                          </Text>
                        </View>
                      </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <FlatList data={this.state.additionalServiceData}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                      <View style={styles.childContainer}>
                        <View style={styles.itemView}>
                          <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                            {item.name}
                          </Text>
                          <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                            ${item.price * item.time * ((item.count != null) ? (item.count) : (1))}
                          </Text>
                        </View>
                      </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                  />
                  {/* If is holiday mostrar 'Recargo por fin de semana' y usamos el total_with_aditional_fee*/}
                  {(this.state.isHoliday == true) ? (
                    <View style={styles.childContainer}>
                      <View style={styles.itemView}>
                        <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                          Recargo fin de semana o feriados
                        </Text>
                        <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                          ${total_with_additional_fee}
                        </Text>
                      </View>
                    </View>
                  ):null}
                  {/* Iva vamos a usar el VAT */}
                  <View style={styles.childContainer}>
                    <View style={styles.itemView}>
                      <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                        I.V.A
                      </Text>
                      <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                        ${vat}
                      </Text>
                    </View>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Text style={{ flex: 0.4,fontSize: 16, fontFamily: "helvetica" }}>
                    Horas de limpieza
                  </Text>
                  <Text style={{ flex: 0.6, fontSize: 16,fontFamily: "helvetica", color: '#288fe2' }}>
                    {this._calculateHours()} horas
                  </Text>
                </View>
                <View style={styles.deviderStyle} />
                <View style={{ margin: 10, flexDirection: 'row' }}>
                  <Text style={{ flex: 0.7, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                    Total
                  </Text>
                  <Text style={{ flex: 0.3, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                    ${this.state.total.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.deviderStyle} />
                <Text style={{ margin: 10 }}>
                  ¿Quieres diferir tú pago?
                </Text>
                <View style={styles.textInputStyleContainer}>
                  {(this.state.toDiffer && this.state.toDiffer.length > 0) ?
                    <Picker
                      selectedValue={this.state.toDiffer}
                      style={{ height: 50, width: width - 20 }}
                      onValueChange={this.updateSelect}
                    >
                      <Picker.Item label={this.state.optionSelecct || "Seleccione opción"} value={this.state.optionSelecct} key={-1} />
                      { this.state.toDiffer.map((item, key)=>{
                        return (<Picker.Item label={item.name} value={item.name} key={key} />)
                      })}
                    </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{console.log(this.state.optionSelecct)}</Text>
                  }
                  {/* <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    underlineColorAndroid='transparent'
                    placeholder='Diferir en:'
                    // value={initials}
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.enterText(text)} /> */}
                  {/* <TextInput
                    ref={input => {
                      this.textInput = input
                    }}
                    placeholder='No defer your payment'
                    underlineColorAndroid='transparent'
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.enterText(text)}
                  /> */}
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  {(this.state.selectTerms == false) ? (
                    <Ionicons name={"ios-checkmark-circle-outline"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(true)} />
                  ) : (
                    <Ionicons name={"ios-checkmark-circle"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(false)} />
                  )}
                  {/* <FontAwesome name={"fa-check-square"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} /> */}
                  <Text style={{ textAlign: 'center', margin: 5 }}>
                    Acepto términos y condiciones
                  </Text>
                </View>
                <TouchableOpacity onPress={() => this.onPressHandle()}>
                  <View style={styles.buttonViewStyle}>
                    <Text style={styles.buttonTextStyle}>Pagar</Text>
                  </View>
                </TouchableOpacity>
            </View>
        )
    }
}