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
            servicesAddons : []
        }
    }

    componentDidMount(){
        this.state.serviceTypeID && API.getServiceType(this.getServiceTypeResponse,this.state.serviceTypeID,true)
    }

    //======================================================================
    // getServiceTypeResponse
    //======================================================================

    getServiceTypeResponse = {
        success: (response) => {
            try {
                
                let servicePerameter = response.service_type.data && response.service_type.data.attributes && response.service_type.data.attributes.services_parameters 
                let updatedServicePerameter = servicePerameter.map((item) =>{
                    item.count = 0
                    return item
                })

                let servicesAddons = response.service_type.data && response.service_type.data.attributes && response.service_type.data.attributes.services_addons 
                let updatedServicesAddons = servicesAddons.map((item) =>{
                    item.isSelect = 0
                    return item
                })
                
                this.setState({
                    serviceTypeData : response.service_type.data.attributes,
                    servicePerameter : updatedServicePerameter || [],
                    servicesAddons : updatedServicesAddons || [],
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

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        console.log('Switch is: ' + value)
    }

    updateServicePerameterCounter(data,index,number){
        var mydata = this.state.servicePerameter
        var selectedObject = mydata[index];
        if(( selectedObject.count + number) >= 0){
            selectedObject.count = selectedObject.count + number
        }
        mydata.slice(selectedObject,index);
        this.setState({servicePerameter : mydata})
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
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                />
            </View>
        )
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
                        
                    
                    <TouchableOpacity>
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