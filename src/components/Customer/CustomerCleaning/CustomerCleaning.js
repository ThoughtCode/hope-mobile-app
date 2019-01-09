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
            selectedDate: Moment.utc(new Date()).format("DD [de] MMM [de] YYYY") + " - 12:00H",
            cardData : null,
            detailsData : null,
            directionData : null,
            additionalData : null

        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount() {
        // AgentJobListScreen.getJobsAPICall()
    }


    setFrequency = (frequencyData) => {
        this.setState({
            frequencyData: frequencyData
        })
    }

    setDate = (date) => {
        this.setState({
            selectedDate: date
        })
    }

    setCard = (cardData) => {
        this.setState({
            cardData: cardData
        })
    }

    setDetails = (detailsData) => {
        this.setState({
            detailsData: detailsData
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
        },
        complete: () => {
            this.setState({
                isAPICall: false
            })
        }
    }

    //======================================================================
    // render
    //======================================================================

    render() {
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
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("ServiceDetail", { serviceTypeID: this.state.serviceType.id })}>
                        <View style={styles.rowStyle}>
                          <View style={styles.rowText}>
                            <Text style={styles.titleText}>{"Detalles del Servicio"}</Text>
                            <Text style={styles.subTitleText}>{"Seleccione servicios"}</Text>
                          </View>
                          <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate("Frequency", { setFrequency: this.setFrequency })}>
                        <View style={styles.rowStyle}>
                          <View style={styles.rowText}>
                            <Text style={styles.titleText}>{"Frecuencia"}</Text>
                            {console.log('------->', this.state)}
                            {(this.state.frequencyData == "") ? (<Text style={styles.subTitleText}>{"Seleccione Frecuencia"}</Text>) : (
                              <View style={{ flexDirection: 'row' }}>
                                {this.state.frequencyData && this.state.frequencyData.map((item, index) => {
                                  return <Text style={styles.subTitleText}>{(this.state.frequencyData.length - 1 > index) ? item.name + "," : item.name}</Text>
                                })
                                }
                              </View>
                            )}
                          </View>
                          <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>
                      </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CalenderPick", { setDate: this.setDate })}>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Fecha y Hora"}</Text>
                                    {this.state.selectedDate && <Text style={styles.subTitleText}>{this.state.selectedDate.toString()}</Text>}
                                </View>
                                <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            </View>
                        </TouchableOpacity>

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
                                
                              {this.state.detailsData && <View style={styles.childContainer}>
                                <View style={styles.itemView}>
                                  <View style={{ flexDirection: 'row' }}>
                                    {/* <FontAwesome name={"cc-visa"} size={20} color={"rgb(0,121,189)"}  /> */}
                                    <Text style={{ flex: 0.6 }}>
                                      {this.state.detailsData.attributes.social_reason}
                                    </Text>
                                    <Text style={{ flex: 0.4 }}>
                                      {this.state.detailsData.attributes.address}
                                      {/* {"Exp." + this.state.detailsData.attributes.expiry_month + "/" + this.state.detailsData.attributes.expiry_year} */}
                                    </Text>
                                  </View>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text>
																			{this.state.detailsData.attributes.telephone}
                                      {/* {"Nombre : " + this.state.detailsData.attributes.holder_name} */}
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
                        <Text style={{ fontFamily: "helvetica", fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: 'rgb(0,121,189)' }}>{"Total trabajo: 2.5$"}</Text>
                      </View>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentScreen")} style={{ backgroundColor: 'rgb(0,121,189)', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: "helvetica", fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{"Solicitar servicio"}</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}