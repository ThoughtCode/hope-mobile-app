import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons'
const styles = require('./CustomerCleaningStyles');
import * as globals from '../../../util/globals';
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
var _this = null;
export default class CustomerCleaning extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props) {
        super(props)
        _this = this
        this.state = {
            serviceType: props.navigation.state.params.serviceType,
            frequencyData: [],
            selectedDate: Moment.utc(new Date(Date.UTC(new Date().getUTCFullYear(), (new Date().getMonth()), +new Date().getUTCDate(), new Date().getHours(), new Date().getMinutes()))),
            end_date : Moment.utc(new Date()),
            cardData : null,
            invoicesData : null,
            directionData : null,
            additionalData : null,
            servicios : null,
            total : 0,
            services_choosen : [],
            is_frequent_job: false,
            isHoliday: (new Date().getDay() == 6 || new Date().getDay() == 7) ? true : false
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount() {
      console.log('CARGANDO COMPONENTE')
      // Si es sabado o domingo, no hace llamado al api
      if (this.state.isHoliday == false){
        API.getHoliday(this.getHolidayResponse, this.state.serviceType.id, true)
      } else {
        let initial_price = this.state.serviceType.attributes.service_base[0].price
        let initial_time = this.state.serviceType.attributes.service_base[0].time
        let initial_total = initial_price * initial_time;
        let additional_fee = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
        initial_total = (initial_total + (initial_total * additional_fee)) * 1.12
        this.setState({
          total: initial_total
        })
      }
    }

    //======================================================================
    // componentDidUpdate
    //======================================================================

    componentDidUpdate() {
      console.log('ACTUALIZE EL COMPONENTE')
    }
    
    getHolidayResponse = {
        success: (response) => {
          console.log("TOTAL INICIAL ---->", response)

            let date = this.state.selectedDate
            let isHoliday = false
            let initial_price = this.state.serviceType.attributes.service_base[0].price
            let initial_time = this.state.serviceType.attributes.service_base[0].time
            let initial_total = initial_price * initial_time;
            let additional_fee = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
            
            console.log("TOTAL INICIAL ---->", initial_total)

            response.holiday.data.map(item =>{
                if(item.attributes.holiday_date == date.format("YYYY-MM-DD")){
                    isHoliday = true
                    initial_total = (initial_total + (initial_total * additional_fee)) * 1.12
                    this.setState({
                        isHoliday: isHoliday,
                        total: initial_total
                    })
                    return true
                }
            })
            this.setState({
                isHoliday: isHoliday,
                total: initial_total
            })
        },
        error: (err) => {
          console.log('getHolidayData error ' + JSON.stringify(err));
        }
    }

    setServicios = (servicios, services_choosen) =>{
        this.calculate_total_job(servicios, services_choosen, this.state.isHoliday)
    }

    setFrequency = (frequencyData) => {
        
        if (frequencyData[0].name == "Una vez"){
            this.setState({
                frequencyData: frequencyData,
                is_frequent_job: false
            })
        } else {
            this.setState({
                frequencyData: frequencyData,
                is_frequent_job: true
            })
        }

    }

    setDate = (date, is_start, is_holiday) => {
      
        total = this.calculate_total_job_after_date(is_holiday)
      
        if (is_start == true){
            this.setState({
                selectedDate: date,
                total: total
            })
        } else {
            this.setState({
                end_date: date
            })
        }
    }

    // Funcion que me calcule el total

    calculate_total_job = (servicios, services_choosen, is_holiday) => {

        //   calculado del tipo de servicio
      let initial_price = this.state.serviceType.attributes.service_base[0].price
      let initial_time = this.state.serviceType.attributes.service_base[0].time
      let total = initial_price * initial_time;
    
        //   calcular los servicios escogido 

      
       services_choosen.map((item)=>{
            if (item.count != null){
                total += item.price * item.time * item.count
            } else {
                total += item.price * item.time
            }
        })
      
      let additional_fee = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
      
      
      if (is_holiday == true){  
        total = (total + (total * additional_fee)) * 1.12
      } else {
        total = total * 1.12;
      }

        this.setState({
            servicios : servicios,
            total : total,
            services_choosen: services_choosen
        })
    }

    calculate_total_job_after_date = (is_holiday) => {

        //   calculado del tipo de servicio
      let initial_price = this.state.serviceType.attributes.service_base[0].price
      let initial_time = this.state.serviceType.attributes.service_base[0].time
      let total = initial_price * initial_time;
    
        //   calcular los servicios escogido 
       this.state.services_choosen.map((item)=>{
            if (item.count != null){
                total += item.price * item.time * item.count
            } else {
                total += item.price * item.time
            }
        })
      
      let additional_fee = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
      
      if (is_holiday == true){  
        total = (total + (total * additional_fee)) * 1.12
      } else {
        total = total * 1.12;
      }

        return total
    }


    setCard = (cardData) => {
        this.setState({
            cardData: cardData
        })
    }

    setDetails = (invoicesData) => {
        this.setState({
            invoicesData: invoicesData
        })
    }

    setDirection = (directionData) => {
        this.setState({
            directionData: directionData
        })
    }

    setAdditionalInfo = (additionalData) => {
        this.setState({
            additionalData: additionalData
        })
    }


    //======================================================================
    // onRefresh
    //======================================================================

    onRefresh = () => {
        this.setState({ isOnRefresh: true, isAPICall: true, page: 1 })
        var data = ""
        if (this.state.filterdata != null) {
            data = this.state.filterdata,
                data += "&current_page=1"
        } else {
            data += "?current_page=1"
        }
        API.getJobs(_this.getJobResponseData, data, true);
    }


    //======================================================================
    // getJobResponseData
    //======================================================================

    getJobResponseData = {
        success: (response) => {
            try {

                if (this.state.isOnRefresh) {
                    this.setState({
                        jobList: []
                    }, () => {
                        var newJobData = (response.job) ? [...this.state.jobList, ...response.job.data] : this.state.jobList
                        // console.log("New JobData-->",JSON.stringify(newJobData))

                        this.setState({
                            jobList: newJobData || [],
                            isOnRefresh: false,
                            isAPICall: false,
                            isPagination: (response.job) ? response.job.data.length == 0 ? false : true : false
                        })
                    })
                } else {
                    var newJobData = (response.job) ? [...this.state.jobList, ...response.job.data] : this.state.jobList
                    this.setState({
                        // jobList : (response.job) ? response.job.data || [] : [],
                        jobList: newJobData || [],
                        isOnRefresh: false,
                        isAPICall: false,
                        isPagination: (response.job) ? response.job.data.length == 0 ? false : true : false
                    })
                }

            } catch (error) {
                this.setState({
                    jobList: [],
                    isOnRefresh: false,
                    isAPICall: false,
                    isPagination: false
                })
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
            this.setState({
                isAPICall: false
            })
        }
    }

    //======================================================================
    // render
    //======================================================================

    render() {
        console.log("ESTADO ACTUAL", this.state)
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                      <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                      <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                      <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
                        <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica', marginLeft:20 }}>{this.state.serviceType.attributes.name}</Text>
                      </View>
                    </View>

                    <View style={{flex:1}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("ServiceDetail", { serviceTypeID: this.state.serviceType.id,setServicios : this.setServicios })}>
                        <View style={styles.rowStyle}>
                          <View style={styles.rowText}>
                            <Text style={styles.titleText}>{"Detalles del Servicio"}</Text>
                            {(this.state.servicios) ? <Text style={styles.subTitleText}>{this.state.servicios}</Text> : <Text style={styles.subTitleText}>{"Seleccione servicios"}</Text>}
                          </View>
                          <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate("Frequency", { setFrequency: this.setFrequency })}>
                        <View style={styles.rowStyle}>
                          <View style={styles.rowText}>
                            <Text style={styles.titleText}>{"Frecuencia"}</Text>
                            {(this.state.frequencyData == "") ? (<Text style={styles.subTitleText}>{"Seleccione Frecuencia"}</Text>) : (
                              <View style={{ flexDirection: 'row' }}>
                                {this.state.frequencyData && this.state.frequencyData.map((item, index) => {
                                  return <Text style={styles.subTitleText}>{(this.state.frequencyData.length - 1 > index) ? item.name + "," : item.name}</Text>
                                })
                                }
                              </View>
                            )}
                          </View>
                          <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,12class1,189)"} style={styles.iconStyle} />
                        </View>
                      </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CalenderPick", { 
                          setDate: this.setDate, is_start: true, start_date: this.state.selectedDate, service_id: this.state.serviceType.id })}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Fecha y Hora"}</Text>
                                    {this.state.selectedDate && <Text style={styles.subTitleText}>{  (this.state.selectedDate).format("DD/MM/YYYY, h:mm")}</Text>}
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>
                        
                        {
                            ( this.state.is_frequent_job == true) ? 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CalenderPick", { 
                                setDate: this.setDate, is_start: false, start_date: this.state.end_date, service_id: this.state.serviceType.id })}>
                                <View style={styles.rowStyle}>
                                    <View style={styles.rowText}>
                                        <Text style={styles.titleText}>{"Fecha final"}</Text>
                                        {this.state.end_date && <Text style={styles.subTitleText}>{(this.state.end_date).format("DD/MM/YYYY")}</Text>}
                                    </View>
                                    <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                                </View>
                            </TouchableOpacity> : null
                        }

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DirectionScreen",{setDirection : this.setDirection})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Dirección"}</Text>
                                    {this.state.directionData && <Text style={styles.subTitleText}>{this.state.directionData.attributes.number +" "+this.state.directionData.attributes.s_street + " "+this.state.directionData.attributes.p_street+" "+this.state.directionData.attributes.city}</Text>}
                                </View>
                                <Entypo name={"location-pin"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AdditionalDetail",{setAdditionalInfo : this.setAdditionalInfo})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Detalles adicionales del trabajo"}</Text>
                                    {this.state.additionalData && <Text style={styles.subTitleText}>{this.state.additionalData}</Text>}
                                </View>
                                <MaterialIcons name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CardListScreen",{setCard : this.setCard})}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Ingresa tú forma de Pago"}</Text>
                                    
                                    {this.state.cardData && <View style={styles.childContainer}>
                                        <View style={styles.itemView}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <FontAwesome name={"cc-visa"} size={20} color={"rgb(0,121,189)"}  />
                                                <Text style={{ flex: 0.6 }}>
                                                    {this.state.cardData.attributes.number}
                                                </Text>
                                                <Text style={{ flex: 0.4 }}>
                                                    {"Exp." + this.state.cardData.attributes.expiry_month + "/" + this.state.cardData.attributes.expiry_year}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>
                                                    {"Nombre : " + this.state.cardData.attributes.holder_name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DetailsListScreen",{setDetails : this.setDetails})}>
                          <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                              <Text style={styles.titleText}>{"Detalles de facturación"}</Text>
                                
                              {this.state.invoicesData && <View style={styles.childContainer}>
                                <View style={styles.itemView}>
                                  <View style={{ flexDirection: 'row' }}>
                                    {/* <FontAwesome name={"cc-visa"} size={20} color={"rgb(0,121,189)"}  /> */}
                                    <Text style={{ flex: 0.6 }}>
                                      {this.state.invoicesData.attributes.social_reason}
                                    </Text>
                                    <Text style={{ flex: 0.4 }}>
                                      {this.state.invoicesData.attributes.address}
                                      {/* {"Exp." + this.state.invoicesData.attributes.expiry_month + "/" + this.state.invoicesData.attributes.expiry_year} */}
                                    </Text>
                                  </View>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text>
																			{this.state.invoicesData.attributes.telephone}
                                      {/* {"Nombre : " + this.state.invoicesData.attributes.holder_name} */}
                                    </Text>
                                  </View>
                                </View>
                              </View>}
                            </View>
                            <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                          </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                        <Text style={{ fontFamily: "helvetica", fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: 'rgb(0,121,189)' }}>{"Total trabajo: $" + this.state.total.toFixed(2)}</Text>
                      </View>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentScreen",{data:this.state})} style={{ backgroundColor: 'rgb(0,121,189)', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: "helvetica", fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{"Solicitar servicio"}</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}