import React,{Component} from 'react';
import {Switch,Text,View,TouchableOpacity, ScrollView} from 'react-native';
import styles from './ServiceDetailStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API } from '../../../util/api';

export default class ServiceDetail extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      habitaciones : 0,
      banos : 0,
      serviceTypeID : props.navigation.state.params.serviceTypeID,
      serviceTypeData : null,
      serviceParameter : [],
      servicesAddons : [],
      selectedServiceParameter : props.navigation.state.params.serviceParameters || [],
      selectedServicesAddons : props.navigation.state.params.serviceAddons || [],
      extaraCost : 0
    }
  }

  componentDidMount(){
    this.state.serviceTypeID && API.getServiceType(this.getServiceTypeResponse, this.state.serviceTypeID, true)
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
        if(this.state.selectedServiceParameter.length == 0 && this.state.selectedServicesAddons.length == 0){

          this.setState({
            selectedServiceParameter : updatedServiceParameter.reverse() || [],
            selectedServicesAddons : updatedServicesAddons || [],
          })
        }
        this.setState({
            serviceTypeData : response.service_type.data.attributes,
            extaraCost : response.service_type.data.attributes.extra_service_fee_holiday.value
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

  toggleSwitch = (value,index) => {
    let selectedServicesAddons = this.state.selectedServicesAddons
    let selectedObject = selectedServicesAddons[index]
    selectedObject.isSelect = !selectedObject.isSelect
    selectedServicesAddons.slice(index,selectedObject);
    this.setState({ selectedServicesAddons: selectedServicesAddons })
  }

  updateServiceParameterCounter(data,index,number){
    var mydata = this.state.selectedServiceParameter
    var selectedObject = mydata[index];
    if(( selectedObject.count + number) >= 0){
      selectedObject.count = selectedObject.count + number
    }
    mydata.slice(selectedObject,index);
    this.setState({selectedServiceParameter : mydata})
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
    selected_parameter = [];
    selected_addons = [];
    let data = "", 
    total = 0
    // Escoger el monto del tipo de servicio
    let service_base = this.state.serviceTypeData.service_base[0]
    total = total + (service_base.time * service_base.price)
    // Escoger servicios parametros
    this.state.selectedServiceParameter.map((item)=>{
      selected_parameter.push(item);
      data += item.name+" X "+ item.count
      data += " , "
      total += item.price * item.time * item.count
    })
    let filterData = this.state.selectedServicesAddons
    filterData.map((item,index)=> {
      selected_addons.push(item)
      if(item.isSelect){
        data += item.name
        total += item.price * item.time
        if(index < filterData.length - 1)
          data += ","
      }
    })
    if(this.state.isHoliday){
      total = total + (total * Number(this.state.extaraCost)/100);
    }
    total = total * 1.12
    this.props.navigation.state.params.setServicios(data, selected_parameter, selected_addons)
    this.props.navigation.goBack();
  }

  render() {
    if(this.state.serviceTypeData != null){
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10}}>
              <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
              <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Detalles del servicio"}</Text>
            </View>
            <View>
              {this.state.selectedServiceParameter && this.state.selectedServiceParameter.map((item,index)=>{
                console.log("ESTE ITEM VA PRIMERO ---->", item)
                  return this.serviceParameter(item,index)
                })    
              }
              {(this.state.selectedServicesAddons.length > 0 ) ?<View style={styles.titleViewContainer}>
                <Text style={styles.titleTextStyle}>Servicios adicionales</Text>
              </View> : null}
                <View style={{ margin: 10 }}>
                  {this.state.selectedServicesAddons && this.state.selectedServicesAddons.map((item,index)=>{
                      return this.servicesAddons(item,index)
                    })
                  }
                </View>
              <View style={styles.deviderStyle} />
            </View>
            <View>
              <TouchableOpacity onPress={this.onPressExcoger}>
                <View style={styles.buttonViewStyle}>
                  <Text style={styles.buttonTextStyle}>Escoger</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )
    }else{
      return null
    }
  }
}