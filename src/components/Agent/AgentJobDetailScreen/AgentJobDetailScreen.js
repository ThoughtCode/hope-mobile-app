import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import StarRating from '../../../lib/react-native-star-rating';
import { API } from '../../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';
import Moment from 'moment';

const styles = require('./AgentJobDetailScreenStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class AgentJobDetailScreen extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            jobData : props.navigation.state.params.jobData.attributes,
            index : props.navigation.state.params.index,
            isJobApply : false,
            isJobReview : false,
            isLoading : true,
            type : props.navigation.state.params.type || null
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        API.canApplyJob(this.canApplyJobResponse,"/"+this.props.navigation.state.params.jobData.id+"/can_apply",true);
        if(this.state.type != null){
            API.canReviewJob(this.canReviewJobResponse,"/"+this.props.navigation.state.params.jobData.id+"/can_review",true);
        }
    }

    //======================================================================
    // canReviewJobResponse
    //======================================================================

    canReviewJobResponse = {
        success: (response) => {
            try {
                console.log("canReviewJobResponse data-->"+JSON.stringify(response))
                
                this.setState({isJobReview : response.can_review,isLoading:false})
                
            } catch (error) {
                console.log('canReviewJobResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('canReviewJobResponse error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // canReviewJobResponse
    //======================================================================

    canApplyJobResponse = {
        success: (response) => {
            try {
                console.log("jobApplyResponse data-->"+JSON.stringify(response))
                
                this.setState({isJobApply  : !response.can_apply,isLoading:false})
                
            } catch (error) {
                console.log('jobApplyResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('jobApplyResponse error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // tapJobApplyTap
    //======================================================================

    tapJobApplyTap = () =>{
        if(!this.state.isJobApply){
            API.applyJob(this.jobApplyResponse,"/"+this.props.navigation.state.params.jobData.id+"/proposals",true);
        }else{
            Alert.alert("Noc Noc","Ya te has postulado para este trabajo")
        }
    }

    //======================================================================
    // tapReview
    //======================================================================

    tapReview = () =>{
        Alert.alert("Noc Noc","Antes de continuar.Confirm que tu trabajo se realizo con exito.",
            [
                {text: 'NO', onPress: () => this.props.navigation.navigate("AgentReviewScreen",{jobData : this.props.navigation.state.params.jobData}), style: 'cancel'},
                {text: 'SI', onPress: () => this.tapConfirmPayment()},
            ],
              { cancelable: false }
            )
        
    }

    //======================================================================
    // api call confirm Payment
    //======================================================================

    tapConfirmPayment(){
        var data = {
            "job" : {
                "closed": true
            }
        }
        API.confirmPayment(this.confirmPaymentJobResponse,data,"/"+this.props.navigation.state.params.jobData.id,true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    confirmPaymentJobResponse = {
        success: (response) => {
            try {
                this.props.navigation.navigate("AgentReviewScreen",{jobData : this.props.navigation.state.params.jobData})
            } catch (error) {
                console.log('jobApplyResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('jobApplyResponse error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    jobApplyResponse = {
        success: (response) => {
            try {
                console.log("jobApplyResponse data-->"+JSON.stringify(response))
                this.setState({isJobApply : true},() =>{
                    // AgentJobListScreen.getJobsAPICall()
                    // AgentJobListScreen.setRow(this.state.index)
                    this.props.navigation.state.params.setRow(this.state.index)
                    Alert.alert("Noc Noc",response.message,[{text: 'OK', onPress: () => this.props.navigation.goBack()}])
                })
                
            } catch (error) {
                console.log('jobApplyResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('jobApplyResponse error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // render
    //======================================================================
    
    render(){
        var description = ""
        var subDescription = ""
        var name = this.state.jobData.customer && this.state.jobData.customer.first_name + " " + this.state.jobData.customer.last_name 
        var initials = this.state.jobData.customer && this.state.jobData.customer.first_name.charAt(0)
        initials +=  this.state.jobData.customer && this.state.jobData.customer.last_name.charAt(0)
        this.state.jobData.job_details.map((val,index)=>{
            if(val.service.type_service == "base"){
                description += val.service.name
            }else{
                subDescription += val.service.name + " x " + val.value
                subDescription += (data.job_details && data.job_details.length - 1 == index) ? "" : ", " 
            }
        
        })
        // alert(Moment("2013-11-18").tz("America/Guayaquil").format('Z'))
        // Momenr.setTimezone('+0500')
        // var initialDate = Moment(new Date(this.state.jobData.started_at)).utc().format('MMMM, DD - hh:mm a')
        // America/Guayaquil
        // var finishDate = Moment(this.state.jobData.finished_at).zone(+5).format('hh:mm a')
        var initialDate = Moment.utc(new Date(this.state.jobData.started_at)).utcOffset(-5).format('MMMM, DD - hh:mm a')
        var finishDate = Moment(new Date(this.state.jobData.finished_at)).utcOffset(-5).format('hh:mm a')
        var location = this.state.jobData.property.data.attributes.p_street + ", " + this.state.jobData.property.data.attributes.s_street +", "+this.state.jobData.property.data.attributes.city
				return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                        <View style={styles.profileView}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                                {(this.state.jobData.customer && this.state.jobData.customer.avatar  && this.state.jobData.customer.avatar.url) ?
                                    <Image source={{uri :  this.state.jobData.customer.avatar.url}} style={styles.profileImage} resizeMode={"cover"}/>
                                    :
                                    <View style={[styles.profileImage,{backgroundColor : 'gray',alignItems:'center',justifyContent:'center'}]} >
                                        <Text style={{color:'#fff'}}>{initials}</Text>
                                    </View> 
                                }
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600'}}>{ name}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    {/* </TouchableOpacity> */}
                    <View style={styles.opinionsView}>
                        <StarRating
                            disabled={true}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={"Ionicons"}
                            maxStars={5}
                            rating={this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_average}
                            starSize={20}
                            fullStarColor={'#ffd700'}
                        />
                        <Text style={styles.opinionsText}>
                          {this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_count+" opiniones"}
                        </Text>
                    </View>
                    <View style={[styles.cellPhone,{flexDirection:'row'}]}>
                      {(this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone != null) ?
                      <View style={{flexDirection:'row'}}>
                        <Text>
                          {(!this.state.isJobReview) ? (this.state.isJobApply)? <MaterialCommunityIcons name={"credit-card-plus"} size={18} /> || "" : "" : <MaterialCommunityIcons name={"credit-card-plus"} size={18} /> || "" }
                        </Text>
                        <Text style={[styles.subText,{marginHorizontal:5}]}>
                          {(!this.state.isJobReview) ? (this.state.isJobApply)? this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone || "" : "" : this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone || "" }
                        </Text>
                      </View>: null}
                    </View>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Detalles del Trabajo"}</Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <ScrollView>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Tipo de trabajo"}</Text>
                            <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{description}</Text>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Fecha"}</Text>
                            <Text style={[styles.subText,{color:'rgb(0,121,189)'}]}>{initialDate + " - "+ finishDate}</Text>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Servicios Adicionales"}</Text>
                            <Text style={[styles.subText]}>{subDescription}</Text>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Detalles a Considerar"}</Text>
                            <Text style={styles.subText}>{this.state.jobData.details}</Text>
                        </View>

                        <View style={[styles.renderRowView]}>
                            <Text style={styles.titleText}>{"Ubicación"}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}> 
                                <EvilIcons name={"location"} size={20} />
                                <Text style={styles.subText}>{location}</Text>
                            </View>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Precio"}</Text>
                            <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{"$ "+ this.state.jobData.total.toFixed(2)}</Text>
                        </View>
                    </ScrollView>
                </View>
                {(this.state.type != "completed") ?
                <TouchableOpacity onPress={(!this.state.isJobReview) ? this.tapJobApplyTap : this.tapReview} disabled={this.state.isJobApply && !this.state.isJobReview}>
                    <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:(this.state.isJobApply) ? 'rgb(7,225,43)': 'rgb(0,121,189)'}]}>
                        <Text style={[styles.titleText,{color:'#fff'}]}>{(!this.state.isJobReview) ? (this.state.isJobApply)? "Postulado" :"Aplicar" : "Calificar"}</Text>
                    </View>
                </TouchableOpacity>
                : null}
                
            </SafeAreaView>
        )
    }
}