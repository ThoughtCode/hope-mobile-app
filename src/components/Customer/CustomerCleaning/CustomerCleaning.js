import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
const styles = require('./CustomerCleaningStyles');
import * as globals from '../../../util/globals';
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
var _this = null;
export default class CustomerCleaning extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            serviceType : props.navigation.state.params.serviceType,
            frequencyData: [],
            selectedDate : null

        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        // AgentJobListScreen.getJobsAPICall()
    }


    setFrequency = (frequencyData) =>{
        this.setState({
            frequencyData : frequencyData
        })
    }

    setDate = (date) =>{
        this.setState({
            selectedDate : date 
        })
    }

    //======================================================================
    // onRefresh
    //======================================================================

    onRefresh = () =>{
        this.setState({isOnRefresh : true,isAPICall : true,page :1})
        var data =  ""
        if(this.state.filterdata != null){
            data = this.state.filterdata,
            data += "&current_page=1"
        }else{
            data += "?current_page=1"
        }
        API.getJobs(_this.getJobResponseData,data,true);
    }


    //======================================================================
    // getJobResponseData
    //======================================================================

    getJobResponseData = {
        success: (response) => {
            try {
                
                if(this.state.isOnRefresh){
                    this.setState({
                        jobList : []
                    },() =>{
                        var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                        // console.log("New JobData-->",JSON.stringify(newJobData))
                        
                        this.setState({
                            jobList : newJobData || [],
                            isOnRefresh : false,
                            isAPICall : false,
                            isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                        })
                    })
                }else{
                    var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                    this.setState({
                        // jobList : (response.job) ? response.job.data || [] : [],
                        jobList : newJobData || [],
                        isOnRefresh : false,
                        isAPICall : false,
                        isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                    })
                }
                
            } catch (error) {
                this.setState({
                    jobList :  [],
                    isOnRefresh : false,
                    isAPICall : false,
                    isPagination : false
                })
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

    //======================================================================
    // render
    //======================================================================

    render(){
        
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View>
                        <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                        <View style={{position:'absolute',zIndex:1,alignItems:'center',justifyContent:'center',marginTop:50,width : width}}>
                            <Text style={{color:'#fff',fontSize:22,fontFamily:'helvetica'}}>{"Limpieza de casa"}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ServiceDetail",{serviceTypeID : this.state.serviceType.id})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Dettale del Servicio"}</Text>
                                    <Text style={styles.subTitleText}>{"Sala x1, Habitacion "}</Text>
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Frequency",{setFrequency : this.setFrequency})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Frecuencia"}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        {this.state.frequencyData && this.state.frequencyData.map((item,index) =>{
                                            return  <Text style={styles.subTitleText}>{(this.state.frequencyData.length -1 > index) ? item.name+ "," : item.name}</Text>
                                            })
                                        }
                                    </View>
                                    
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CalenderPick",{setDate : this.setDate})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Fecha y Hora"}</Text>
                                    {this.state.selectedDate && <Text style={styles.subTitleText}>{this.state.selectedDate.toString()}</Text>}
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DirectionScreen")}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Direccion"}</Text>
                                    <Text style={styles.subTitleText}>{"2603 La floresta, Quito Ecuador"}</Text>
                                </View>
                                <Entypo name={"location-pin"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AdditionalDetail")}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Detallens adicionales del trabajo"}</Text>
                                    <Text style={styles.subTitleText}>{"Information adicional del Servicio"}</Text>
                                </View>
                                <MaterialIcons name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CardListScreen")}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Ingresa tu forma de Pago"}</Text>
                                    <Text style={{fontFamily:"helvetica",fontSize:18}}>{"N XXXX-1111 Exp. 9/2020"}</Text>
                                    <Text style={{fontFamily:"helvetica",fontSize:15}}>{"Nombre: Jose Castellanos"}</Text>
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>

                        <View style={{paddingVertical:10,paddingHorizontal:15}}>
                            <Text style={{fontFamily:"helvetica",fontSize: 20, fontWeight:'bold',marginBottom:5,color : 'rgb(0,121,189)'}}>{"Total trabajo: 2.5$"}</Text>
                        </View>

                        <View style={{backgroundColor:'rgb(0,121,189)',paddingVertical:15,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontFamily:"helvetica",fontSize: 20, fontWeight:'bold',color:'#fff'}}>{"Solicitar servicio"}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}