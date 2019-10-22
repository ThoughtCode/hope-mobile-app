import React from 'react';
import {Text,TextInput,View,Image,TouchableOpacity,FlatList,Dimensions,Alert,Linking,ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './PaymentScreenStyle';
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionSheet from 'react-native-actionsheet'
const { width } = Dimensions.get('window');
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
      endDate: this.props.navigation.state.params.data.end_date,
      spinner:false,
      additionalServiceData: [],
      total: this.props.navigation.state.params.data.total,
      invoicesData: this.props.navigation.state.params.data.invoicesData,
      cardData: this.props.navigation.state.params.data.cardData,
      checked: [],
      isHoliday: this.props.navigation.state.params.data.isHoliday,
      extraFee : this.props.navigation.state.params.data.serviceType.attributes.extra_service_fee_holiday.value,
      optionSelecct : "No deseo diferir mi pago",
      toDiffer : [
        {name : "No deseo diferir mi pago"},
        {name : "Diferir mi pago en 3 meses. Sin intereses"},
      ],
      selectTerms : false,
      textCodePlaceholder : "Ingrese código",
      textCode : '',
      dataCodeResponse : [],
      textInputStatus : true,
      codeAplay : false
    }
  }

  componentDidMount() {
    var additionalServiceData = []
    this.props.navigation.state.params.data.service_parameters.filter(service => service.count > 0)
                                                              .map(service => additionalServiceData.push(service))
    this.props.navigation.state.params.data.service_addons.filter(service => service.isSelect)
                                                          .map(service => additionalServiceData.push(service))
    this.setState({
      additionalServiceData: additionalServiceData
    })
  }

  updateSelect = (select) => {
    this.setState({ optionSelecct: select })
  }

  _calculateHours = () => {
    let total_work_hours = 0
    if(this.state.additionalServiceData){
      this.state.additionalServiceData.map((p)=>{
        if (p.quantity) {
          total_work_hours += p.count * p.time;
        } else {
          total_work_hours += p.time;
        }
      })
    }
    total_work_hours += this.state.serviceType.attributes.service_base[0].time
    return total_work_hours
  }
  _selectTerms = (e) => {
    this.setState({selectTerms: e})
  }

  onPressHandle = () =>{ 
    if(this.state.optionSelecct == ""){
      Alert.alert(
        'Alerta',
        'Seleccione opción, diferir tú pago',
        [
          { text: 'OK', onPress: () => console.log('Seleccione opción, diferir tú pago')}
        ],
        { cancelable: false }
      );
    } else if (this.state.selectTerms == false){
      Alert.alert(
        'Alerta',
        'Debe aceptar los terminos y condiciones',
        [
          { text: 'OK', onPress: () => console.log('Debe aceptar los terminos y condiciones')}
        ],
        { cancelable: false }
      );
    } else if (this.state.startedAt < Moment.utc(new Date()).subtract('h')){
      Alert.alert(
        'Alerta',
        'La fecha de inicio debe ser mayor a la fecha del trabajo',
        [
          { text: 'OK', onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
      );
    } else {
      let frequencyDataCall = 0
      let optionSelecctInstallments = 0
      let additionalServiceData = []
      if(this.state.frequencyData[0].name == "Una vez"){
        frequencyDataCall = 0
      }else if(this.state.frequencyData[0].name == "Semanal"){
        frequencyDataCall = 1
      }else if(this.state.frequencyData[0].name == "Quincenal"){
        frequencyDataCall = 2
      }else if(this.state.frequencyData[0].name == "Mensual"){
        frequencyDataCall = 3
      }
      if(this.state.optionSelecct == "No deseo diferir mi pago"){
        optionSelecctInstallments = 1
      }
      if(this.state.optionSelecct == "Diferir mi pago en 3 meses. Sin intereses"){
        optionSelecctInstallments = "3"
      }
      let service_base = this.state.serviceType.attributes.service_base[0]
      additionalServiceData.push({"service_id": service_base.id, "value": 1})
      if(this.state.additionalServiceData){
        this.state.additionalServiceData.map((aS)=>{
          if (aS.id){
            additionalServiceData.push({"service_id": aS.id, "value": (aS.count != null ? aS.count : 1)})
          }
        })
      }

      let codeId = null
      if(this.state.dataCodeResponse.length != 0){
        codeId = this.state.dataCodeResponse.promotion.data.attributes.id
      }
      let finished_recurrency_at = (this.state.endDate == null) ? '' : this.state.endDate
      let data = null
      if (codeId != null){
        data = {
          "job": {
            "property_id": this.props.navigation.state.params.data.directionData.attributes.id,
            "started_at": this.state.startedAt, 
            "details": this.props.navigation.state.params.data.additionalData || "",
            "invoice_detail_id": this.state.invoicesData.id,
            "frequency": frequencyDataCall,
            "job_details_attributes": additionalServiceData,
            "credit_card_id": this.state.cardData.id,
            "installments": optionSelecctInstallments,
            "finished_recurrency_at": finished_recurrency_at,
            "source": 1,
            "promotion_id": codeId
          }
        }
      }else{
        data = {
          "job": {
            "property_id": this.props.navigation.state.params.data.directionData.attributes.id,
            "started_at": this.state.startedAt, 
            "details": this.props.navigation.state.params.data.additionalData || "",
            "invoice_detail_id": this.state.invoicesData.id,
            "frequency": frequencyDataCall,
            "job_details_attributes": additionalServiceData,
            "credit_card_id": this.state.cardData.id,
            "installments": optionSelecctInstallments,
            "finished_recurrency_at": finished_recurrency_at,
            "source": 1
          }
        }
      }

      if(this.state.spinner == false){
        this.setState({ spinner: true }, () => {
          API.createJob(this.createJobResponse,data,true);
        })
      }
    }  
  }
  createJobResponse = {
    success: (response) => {
      console.log("AQUI AQUI AQUI AQUI AQUI AQUI 1", response)
      try {
        Alert.alert('Trabajo creado',response.message,[{text:'OK', onPress: () => this.props.navigation.navigate("CustomerDashboard") [this.setState({spinner: false})] }], {cancelable:false});
      } catch (error) {
        Alert.alert(error);  
      }
      
    },
    error: (err) => {
      Alert.alert(err);  
    }
  }
  _onOpenActionSheet = () => {
    this.ActionSheet.show();
  }
  actionSheetSelect(itemIndex){
    if (itemIndex != 2) {
      var select = this.state.toDiffer[itemIndex].name
      this.setState({optionSelecct: select})
    }
  }

  calculateDiscount = (serviceId, services, discountPercentage) => {
    let service = 0;

    let sb = services.attributes.service_base;
    service = sb.filter(function(service){
      return service.id === serviceId;
    });
    if (service[0]) {
      return (service[0].price * service[0].time) * discountPercentage / 100;
    }

    let sa = services.attributes.services_addons;
    service = sa.filter(function(service){
      return service.id === serviceId;
    });
    if (service)
      return (service.price * service.time) * discountPercentage / 100;

    let sp = services.attributes.services_parameters;
    service = sp.filter(function(service){
      return service.id === serviceId;
    });
    if (service)
      return (service.price * service.time) * discountPercentage / 100;
  }

  onChangeText = (text) => {
    this.setState({
      textCode:text.replace(/\s/g, '')
    })
  }

  validateCodeButton = () => {
    if (this.state.textCode != '' && this.state.textCodePlaceholder == "Ingrese código"){
      Alert.alert(globals.APP_NAME,"¿Seguro que quieres VALIDAR el codigo?",[
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () => {this.promoCode()}},
      ],{cancelable:false})
    }else{
      Alert.alert('Validación de código','No puede estar vacio',[{text:'OK'}], {cancelable:false});
    }
  }

  promoCode = () => {
    let data = {
      "promo_code": this.state.textCode
    }
    API.validateCode(this.validateCodeResponse,data,true)
  }

  validateCodeResponse = {
    success: (response) => {
      try {
        Alert.alert(globals.APP_NAME,response.message + " " + response.promotion.data.attributes.name + " " + "¿Seguro que quieres APLICAR el codigo?",
          [
            {text: 'Cancelar', onPress: () => console.log('Cancel Pressed')},   
            {text: 'Aplicar', onPress: () => this.promoCodeAplay()}, this.setState({dataCodeResponse: response})
          ],
          { cancelable: false }
        )
      } catch (error) {
        console.log("respuesta error",error)
      }
    },
    error: (err) => {
      console.log("respuesta erro",err)
      Alert.alert(globals.APP_NAME,err.message,[{text: 'OK'}])
    }
  }

  promoCodeAplay = () => {
    this.setState({textInputStatus: false, codeAplay: true})
  }

  render() {
    let { data, checked } = this.state;
    let initial_price = this.state.serviceType.attributes.service_base[0].price
    let initial_time = this.state.serviceType.attributes.service_base[0].time
    let total = initial_price * initial_time;
    let vat = 0
    let discount = 0
    let additional_fee = 0
    
    if(this.state.additionalServiceData){
      this.state.additionalServiceData.map((item)=>{
        if (item.quantity){
          total += item.price * item.time * item.count
        } else {
          total += item.price * item.time
        }
      })
    }
    let additional_fee_percentage = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
    if (this.state.isHoliday){  
      additional_fee = total * additional_fee_percentage
      total = (total + additional_fee)
    } else {
      total = total;
    }

    if(this.state.codeAplay == true){
      discount = this.calculateDiscount(this.state.dataCodeResponse.promotion.data.attributes.service.id, this.state.serviceType, this.state.dataCodeResponse.promotion.data.attributes.discount)
      total = (total - discount)
    }else{
      console.log("additionalServiceData ======>>>>>",discount," ----- ",total)
    }

    vat = total * 0.12
    total += vat
    return (
      <View style={styles.container}>
              <Spinner visible={this.state.spinner} />
        <ScrollView>
          <View>
            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
            <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
            <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, width: width }}>
              <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                {this.state.serviceType.attributes.name}
              </Text>
              <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                {this.state.frequencyData[0].name}
              </Text>
            </View>
          </View>
          <Text style={{ margin: 5, fontSize: 18, fontFamily: "helvetica" }}>
            {Moment(this.state.startedAt).format('L, h:mm:ss a')}
          </Text>
          <View style={styles.deviderStyle} />
          <View>
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
                        ${(item.price * item.time).toFixed(2)}
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
                        ${((item.price * item.time) * ((item.count != null) ? (item.count) : (1))).toFixed(2) }
                      </Text>
                    </View>
                  </View>
                }
                keyExtractor={(item, index) => index.toString()}
              />
              {(this.state.isHoliday == true) ? (
                <View style={styles.childContainer}>
                  <View style={styles.itemView}>
                    <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                      Recargo fin de semana o feriados
                    </Text>
                    <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                      ${additional_fee.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ):null}
              {(this.state.codeAplay == true) ? (
                <View style={styles.childContainer}>
                  <View style={styles.itemView}>
                    <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                      Descuentos {this.state.dataCodeResponse.promotion.data.attributes.service.name} {this.state.dataCodeResponse.promotion.data.attributes.discount}%
                    </Text>
                    <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                      $-{discount.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ):null}
              <View style={styles.childContainer}>
                <View style={styles.itemView}>
                  <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                    I.V.A
                  </Text>
                  <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                    ${vat.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text style={{ flex: 0.4,fontSize: 16, fontFamily: "helvetica" }}>
              Horas del servicio
            </Text>
            <Text style={{ flex: 0.6, fontSize: 16,fontFamily: "helvetica", color: '#288fe2' }}>
              {this._calculateHours()} horas
            </Text>
          </View>
          <View style={styles.deviderStyle} />
            <View style={{ flexDirection: 'row', margin: 5 }}>
              <Text style={{ flex: 0.7, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                Total
              </Text>
              <Text style={{ flex: 0.3, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                ${total.toFixed(2)}
              </Text>
            </View>
          <View style={styles.deviderStyle} />
          <Text style={{ margin: 5 }}>
            ¿Quieres diferir tú pago?
          </Text>
          <View style={styles.textInputStyleContainer}>
            <TouchableOpacity onPress={this._onOpenActionSheet}>
              <Text style={{ height: 50, paddingHorizontal:10, paddingVertical:8 }} >{this.state.optionSelecct || "Seleccione opción"}</Text>
            </TouchableOpacity>
          </View>
          {(this.state.textInputStatus == true) ? (
            <View>
              <Text style={{ margin: 5 }}>
                ¿Tiene código promocional?
              </Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={styles.textInputStyleContainerPromotion}>
                  <TextInput
                    autoCapitalize={'characters'}
                    placeholder={this.state.textCodePlaceholder}
                    style={{ height: 35, paddingHorizontal:10, paddingVertical:8 }}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.textCode}
                  />
                </View>
                <TouchableOpacity style={styles.buttonViewStyle} onPress={() => this.validateCodeButton()}>
                  <Text style={styles.buttonTextStyle}>Validar Código</Text>
                </TouchableOpacity>
              </View>
            </View>
          ):null}
          <View style={{ flexDirection: 'row', margin: 5 }}>
            {(this.state.selectTerms == false) ? (
              <Ionicons name={"ios-square-outline"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(true)} />
            ) : (
              <Ionicons name={"ios-checkbox"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(false)} />
            )}
            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.nocnoc.com.ec/politicas#policies')}}>
              <View>
                <Text style={{ textAlign: 'center', margin: 5, color:'blue'}}>
                  Acepto términos y condiciones
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.onPressHandle()}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>Solicitar servicio</Text>
            </View>
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Seleccione opción'}
            options={['No deseo diferir mi pago','Diferir mi pago en 3 meses. Sin intereses','Cancelar']}
            cancelButtonIndex={2}
            onPress={(index) => { this.actionSheetSelect(index) }}
          />
        </ScrollView>
      </View>
    )
  }
}