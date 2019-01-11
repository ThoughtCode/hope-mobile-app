import React,{Component} from 'react';
import {
    Switch,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './ServiceDetailStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API } from '../../../util/api';
import moment from 'moment';

export default class ServiceDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            habitaciones : 0,
            banos : 0,
            serviceTypeID : props.navigation.state.params.serviceTypeID,
            serviceTypeData : null,
            servicePerameter : [],
            servicesAddons : [],
            extaraCost : 0,
            isHoliday: (new Date().getDay() == 6 || new Date().getDay() == 7) ? true : false
        }
    }

    componentDidMount(){
        this.state.serviceTypeID && API.getServiceType(this.getServiceTypeResponse,this.state.serviceTypeID,true)
        !this.state.isHoliday && API.getHoliday(this.getHolidayResponse,this.state.serviceTypeID,true)
        
    }

    getHolidayResponse = {
        success: (response) => {
            let date = moment(new Date()).format('yyyy-mm-dd')
            let isHoliday = false
            response.holiday.data.map(item =>{
                if(item.attributes.holiday_date== date){
                    isHoliday = true
                }
            })

            this.setState({
                isHoliday
            })
            // if(date == )
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

    //======================================================================
    // getServiceTypeResponse
    //======================================================================

    getServiceTypeResponse = {
        success: (response) => {
            console.log("Response data--==->",JSON.stringify(response))
            try {
                
                let servicePerameter = response.service_type.data && response.service_type.data.attributes && response.service_type.data.attributes.services_parameters 
                let updatedServicePerameter = servicePerameter.map((item) =>{
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
                    servicePerameter : updatedServicePerameter || [],
                    servicesAddons : updatedServicesAddons || [],
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

        let servicesAddons = this.state.servicesAddons
        let selectedObject = servicesAddons[index]
        selectedObject.isSelect = !selectedObject.isSelect
        servicesAddons.slice(index,selectedObject);


        this.setState({ servicesAddons: servicesAddons })
        // console.log('Switch is: ' + JSON.stringify(servicesAddons))
    }

    updateServicePerameterCounter(data,index,number){
        var mydata = this.state.servicePerameter
        var selectedObject = mydata[index];
        if(( selectedObject.count + number) >= 0){
            selectedObject.count = selectedObject.count + number
        }
        mydata.slice(selectedObject,index);
        this.setState({servicePerameter : mydata})
        console.log("servicePerameter",JSON.stringify(mydata))
    }

    servicePerameter(data,index){
        return(
            <View>
                <View style={styles.titleViewContainer}>
                    <Text style={styles.titleTextStyle}>Numero de habitaciones</Text>
                </View>
                <View style={styles.childContainer}>
                    <View style={styles.subChildContainer}>
                        <View style={styles.itemViewCotainer}>
                            <TouchableOpacity onPress={() => this.updateServicePerameterCounter(data,index,-1)}>
                                <View style={styles.minusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        -
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ width: 150, textAlign: 'center' }}>
                                {data.count +" "+ data.name}
                            </Text>
                            <TouchableOpacity onPress={() => this.updateServicePerameterCounter(data,index,1)}>
                                <View style={styles.plusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        +
                                        </Text>
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
                <Switch
                    style={styles.swithStyle}
                    onValueChange={(val)=>this.toggleSwitch(val,index)}
                    value={data.isSelect}
                />
            </View>
        )
    }

    onPressExcoger = () =>{
        let data = '',
        total = 0
        this.state.servicePerameter.map((item,index)=>{
            data += item.name+" X "+item.count
            // if(index < filterData.length - 1)
            data += ","
            total += item.price * item.time * item.count
            console.log("Totoal-->",total)
        })


        let filterData = this.state.servicesAddons.filter(x => x.isSelect == true)
        filterData.map((item,index)=> {
            if(item.isSelect){
                data += item.name
                total += item.price * item.time
                console.log("Totoal-->",total)
                if(index < filterData.length - 1)
                    data += ","
            }
        })
        console.log("before Totol-->",total)
        total = (total + (total * (Number(this.state.extaraCost) / 100))) * 1.12
        console.log("after total-->",total)
        
        if(this.state.isHoliday){
            total = total + Number(this.state.extaraCost);
        }

        this.props.navigation.state.params.setServicios(data,total.toFixed(2))
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
                        {
                            this.state.servicePerameter && this.state.servicePerameter.map((item,index)=>{
                                return this.servicePerameter(item,index)
                            })
                            
                        }

                        {(this.state.servicesAddons.length > 0 ) ?<View style={styles.titleViewContainer}>
                            <Text style={styles.titleTextStyle}>Servicios adicionales</Text>
                        </View> : null}
                            <View style={{ margin: 10 }}>
                                {
                                    this.state.servicesAddons && this.state.servicesAddons.map((item,index)=>{
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