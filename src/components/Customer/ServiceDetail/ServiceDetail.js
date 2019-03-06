import React,{Component} from 'react';
import {Switch,Text,View,TouchableOpacity,} from 'react-native';
import styles from './ServiceDetailStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API } from '../../../util/api';

export default class ServiceDetail extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      serviceTypeID : props.navigation.state.params.serviceTypeID,
      serviceTypeData : null,
      serviceParameter : [],
      servicesAddons : [],
      extraCost : 0,
      servicesUpdate : props.navigation.state.params.servicesUpdate, 
      servicesNotChoosen:  props.navigation.state.params.servicesNotChoosen
    }
  }

  componentDidMount(){
    var parameter_services = []
    var add_ons_services = []
    if(this.state.servicesUpdate.length > 0){
      this.state.servicesUpdate.map((service, index) => {
        if(service.type_service == "parameter"){
          parameter_services.push(service) 
        }
        if(service.type_service == "addon"){
          add_ons_services.push(service)
        }
      })
      this.state.servicesNotChoosen.map((service) => {
        if(service.type_service == "parameter"){
          parameter_services.push(service) 
        }
        if(service.type_service == "addon"){
          add_ons_services.push(service)
        }
      })
      // voy a mapear los servicesNotChoosen y voy a anadir al array los servicios dependiendo si no son paramater or addon
      this.setState({
        // reparar extra cost
        serviceTypeData: this.props.navigation.state.params.serviceType,
        serviceParameter: parameter_services,
        servicesAddons: add_ons_services
      })
    } 
    
    if (this.state.servicesUpdate.length == 0){
      this.state.serviceTypeID && API.getServiceType(this.getServiceTypeResponse, this.state.serviceTypeID, true)
    }
    
  }

  //======================================================================
  // getServiceTypeResponse
  //======================================================================

  getServiceTypeResponse = {
    success: (response) => {
      try {
        let serviceParameter = response.service_type.data && response.service_type.data.attributes && response.service_type.data.attributes.services_parameters 
        let updatedServiceParameter = serviceParameter.map((item) =>{
            item.count = 0
            return item
        })
        let servicesAddons = response.service_type.data && response.service_type.data.attributes && response.service_type.data.attributes.services_addons 
        let updatedServicesAddons = servicesAddons.map((item) =>{
            item.isSelect = false
            return item
        })
        this.setState({
            serviceTypeData : response.service_type.data.attributes,
            serviceParameter : updatedServiceParameter || [],
            servicesAddons : updatedServicesAddons || [],
            extraCost : response.service_type.data.attributes.extra_service_fee_holiday.value
        })  
      } catch (error) {
        console.log('getJobResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getJobResponseData error ' + JSON.stringify(err));
      this.setState({
        isAPICall : false
      })
    },
    complete: () => {
      this.setState({
        isAPICall : false   
      })
    }
  }

  toggleSwitch = (val, index) => {
    let servicesAddons = this.state.servicesAddons
    let selectedObject = servicesAddons[index]
    selectedObject.isSelect = !selectedObject.isSelect
    servicesAddons.slice(index,selectedObject);
    this.setState({ servicesAddons: servicesAddons })
  }

  updateServiceParameterCounter(data,index,number){
    var mydata = this.state.serviceParameter
    var selectedObject = mydata[index];
    if(( selectedObject.count + number) >= 0){
      selectedObject.count = selectedObject.count + number
    }
    mydata.slice(selectedObject,index);
    this.setState({serviceParameter : mydata})
  }

  serviceParameter(data,index){
    return(
      <View>
        <View style={styles.titleViewContainer}>
          <Text style={styles.titleTextStyle}>{data.name}</Text>
        </View>
        <View style={styles.childContainer}>
          <View style={styles.subChildContainer}>
            <View style={styles.itemViewCotainer}>
              <TouchableOpacity onPress={() => this.updateServiceParameterCounter(data,index,-1)}>
                <View style={styles.minusView}>
                  <Text style={{ textAlign: 'center' }}>-</Text>
                </View>
              </TouchableOpacity>
              <Text style={{ width: 150, textAlign: 'center' }}>
                {data.count +" "+ data.name}
              </Text>
              <TouchableOpacity onPress={() => this.updateServiceParameterCounter(data,index,1)}>
                <View style={styles.plusView}>
                  <Text style={{ textAlign: 'center' }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  servicesAddons(data,index){
    return (
      <View style={styles.switchContainer}>
        <Text style={styles.itemTextStyle}>{data.name}</Text>
        <Switch style={styles.swithStyle} onValueChange={(val)=>this.toggleSwitch(val,index)} value={data.isSelect}/>
      </View>
    )
  }

  onPressExcoger = () =>{
    let services_choosen = []
    let services_not_choosen = []
    let data = "", 
    total = 0
    // Escoger el monto del tipo de servicio
    let service_base = this.state.serviceTypeData.service_base[0]
    total = total + (service_base.time * service_base.price)
    // Escoger servicios parametros
    this.state.serviceParameter.map((item)=>{
      console.log("escoer servicio parameter",item, service_base)
      if (item.count != 0){
        services_choosen.push(item)
      } else {
        services_not_choosen.push(item)
      }
      data += item.name+" X "+ item.count
      data += " , "
      total += item.price * item.time * item.count
    })
    let filterData = this.state.servicesAddons
    // .filter(x => x.isSelect)
    filterData.map((item,index)=> {
      if(item.isSelect == true){
        services_choosen.push(item,index)
        data += item.name
        total += item.price * item.time
        if(index < filterData.length - 1)
          data += ","
      } else
        services_not_choosen.push(item,index)
    })
    if(this.state.isHoliday){
      total = total + (total * Number(this.state.extraCost)/100);
    }
    total = total * 1.12
    this.props.navigation.state.params.setServicios(data, services_choosen, services_not_choosen)
    this.props.navigation.goBack();
  }

  render() {
    if(this.state.serviceTypeData != null){
      return (
        <View style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10}}>
            <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
            <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Detalles del servicio"}</Text>
          </View>
          <View style={{flex:1}}>
            {this.state.serviceParameter && this.state.serviceParameter.map((item,index)=>{
                return this.serviceParameter(item,index)
              })    
            }
            {(this.state.servicesAddons.length > 0 ) ?
            <View style={styles.titleViewContainer}>
              <Text style={styles.titleTextStyle}>Servicios adicionales</Text>
            </View> : null}
            <View style={{ margin: 10 }}>
              {this.state.servicesAddons && this.state.servicesAddons.map((item,index)=>{
                  return this.servicesAddons(item,index)
                })
              }
            </View>
            <View style={styles.deviderStyle} />
          </View>
          <TouchableOpacity onPress={this.onPressExcoger}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>Escoger</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else{
      return null
    }
  }
}