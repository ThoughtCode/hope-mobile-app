import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,Button} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import StarRating from '../../../lib/react-native-star-rating';
import { API } from '../../../util/api';
import Moment from 'moment';
import * as globals from '../../../util/globals';
import openMap from 'react-native-open-maps';

const styles = require('./AgentJobDetailScreenStyles');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class AgentJobDetailScreen extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      jobData : props.navigation.state.params.jobData.attributes || props.item,
      index : props.navigation.state.params.index,
      isJobApply : false,
      canReviewJob : false,
      isLoading : true,
      iemailostuemailte: false,
      isAccepted: false,
      type : props.navigation.state.params.type || null,
      id : globals.id,
      email : globals.email,
      time: new Date().toLocaleString()
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
    this.lookup(this.state.email)
    this.isAgentHired(this.state.email)
  }

  //======================================================================
  // canReviewJobResponse
  //======================================================================

  canReviewJobResponse = {
    success: (response) => {
      try {
        console.log("canReviewJobResponse data-->"+JSON.stringify(response))
        this.setState({
            canReviewJob : response.can_review,
            isLoading:false
          })
          
      } catch (error) {
        console.log('canReviewJobResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('canReviewJobResponse error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  // canReviewJobResponse
  //======================================================================

  canApplyJobResponse = {
    success: (response) => {
      try {
        console.log("jobApplyResponse data-->"+JSON.stringify(response))
          
        this.setState({isJobApply  : response.can_apply,isLoading:false})
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('jobApplyResponse error ' + JSON.stringify(err));
    }
  }

  lookup = (email) => {
    this.state.jobData.proposals.data.map((val)=>{
      if (val.attributes.agent.data.attributes.email == email ) {
        this.setState({
          isPostulate: true
        })
        return true
      }
      return false     
    })
  }

  isAgentHired = (email) => {
    if (this.state.jobData.agent != null){
      if (this.state.jobData.agent.email == email ) {
        this.setState({
          isAccepted: true
        })
      } 
    }
  }

  //======================================================================
  // tapJobApplyTap
  //======================================================================

  tapJobApplyTap = () =>{
    if(this.state.isJobApply){
      API.applyJob(this.jobApplyResponse,"/"+this.props.navigation.state.params.jobData.id+"/proposals",true);
    }else{
      Alert.alert("NOC NOC","Ya te has postulado para este trabajo")
    }
  }

  //======================================================================
  // tapReview
  //======================================================================

  tapReview = () =>{
    Alert.alert("NOC NOC","Antes de continuar. Confirmas que tú trabajo se realizo con exito.",
      [
        {text: 'NO', onPress: () => (this.cancelPayment(), this.props.navigation.navigate("AgentTrabajosDashboard"))},
        {text: 'SI', onPress: () => (this.tapConfirmPayment(), this.props.navigation.navigate("AgentReviewScreen",{jobData : this.props.navigation.state.params.jobData}))},
      ], { cancelable: false }
    ) 
  }


  //======================================================================
  // api call cancel Payment
  //======================================================================

  cancelPayment(){
    var data = {
      "job" : {
        "closed": false
      }
    }
    API.confirmPayment(this.cancelPaymentJobResponse,data,"/"+this.props.navigation.state.params.jobData.id,true);
  }

  //======================================================================
  // jobApplyResponse
  //======================================================================

  cancelPaymentJobResponse = {
    success: (response) => {
      try {
        console.log(response)
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('jobApplyResponse error ' + JSON.stringify(err));
    }
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
        console.log(response)
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('jobApplyResponse error ' + JSON.stringify(err));
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
          this.props.navigation.state.params.setRow(this.state.index)
          Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => this.props.navigation.goBack()}])
        })
      } catch (error) {
        console.log('catch (error)','jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
      error: (err) => {
      Alert.alert("NOC NOC", JSON.stringify(err.message))  
      console.log('jobApplyResponse error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  // Google Map
  //======================================================================
  
  openGoogleMap(p_street, s_street, city) {
    var address = p_street + " & " + s_street + " , " + city
    openMap({ query: address });
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
    if(this.state.jobData.finished_recurrency_at == !null){
      var finisRecurrency = Moment(new Date(this.state.jobData.finished_recurrency_at)).utcOffset(-5).format('hh:mm a')
    }
    var initialDate = Moment.utc(new Date(this.state.jobData.started_at)).utcOffset(-5).format('l - hh:mm a')
    var finishDate = Moment(new Date(this.state.jobData.finished_at)).utcOffset(-5).format('hh:mm a')
    var location = this.state.jobData.property.data.attributes.p_street + ", " + this.state.jobData.property.data.attributes.s_street +", "+this.state.jobData.property.data.attributes.city
    var frequency = ""
    if(this.state.jobData.frequency == "one_time"){
      frequency = "Una vez"
    } else if(this.state.jobData.frequency == "weekly"){
      frequency = "Semanal"
    } else if(this.state.jobData.frequency == "fortnightly"){
      frequency = "Quincenal"
    } else if(this.state.jobData.frequency == "monthly"){
      frequency = "Mensual"
    }
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
          {(this.state.jobData.status == "accepted") ? 
            <View style={[styles.cellPhone,{flexDirection:'row'}]}>
              {(this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone != null) ?
                <View style={{flexDirection:'row'}}>
                  <Text>
                    {(!this.state.canReviewJob) ? (this.state.isJobApply)? (this.state.isAccepted == true)? <MaterialCommunityIcons name={"phone"} size={18} /> || "" : "" : <MaterialCommunityIcons name={"phone"} size={18} /> || "" : <MaterialCommunityIcons name={"phone"} size={18} /> || "" }
                  </Text>
                  <Text style={[styles.subText,{marginHorizontal:5}]}>
                    {(!this.state.canReviewJob) ? (this.state.isJobApply)? (this.state.isAccepted == true)? this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone || this.state.jobData.property.data.attributes.phone : "" : this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone || this.state.jobData.property.data.attributes.phone : this.state.jobData.property.data.attributes.customer.data.attributes.cell_phone || this.state.jobData.property.data.attributes.phone }
                  </Text>
                </View>: null}
            </View>
            : <Text></Text>
          }
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
              <Text style={[styles.subText,{color:'rgb(0,121,189)'}]}>{initialDate + " - "+ ((this.state.jobData.finished_recurrency_at == !null) ? (finisRecurrency):(finishDate))}</Text>
            </View>
            <View style={styles.renderRowView}>
              <Text style={styles.titleText}>{"Frecuencia"}</Text>
              <Text style={[styles.subText,{color:'rgb(0,121,189)'}]}>{frequency}</Text>
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
              <TouchableOpacity
                style={[styles.subText,{paddingHorizontal:5,paddingVertical:10}]}
                onPress={() => this.openGoogleMap(this.state.jobData.property.data.attributes.p_street , this.state.jobData.property.data.attributes.s_street, this.state.jobData.property.data.attributes.real_city)}>
                <View><Text>{"Abrir en Google Map"}</Text></View>
              </TouchableOpacity>
            </View>
            <View style={styles.renderRowView}>
              <Text style={styles.titleText}>{"Precio"}</Text>
              <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{"$ "+ this.state.jobData.total.toFixed(2)}</Text>
            </View>
          </ScrollView>
        </View>
        {(this.state.jobData.status == 'completed') ?               
          <TouchableOpacity>
            <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(7,225,43)'}]}>
              <Text style={[styles.titleText,{color:'#fff'}]}>
                Completado
              </Text>
            </View>
          </TouchableOpacity>
        :
          (this.state.isAccepted == true) ?
          <TouchableOpacity onPress={this.state.canReviewJob == true ? this.tapReview : null}>
            <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
              <Text style={[styles.titleText,{color:'#fff'}]}>
                {(this.state.canReviewJob == true) ? 'Calificar' : 'Aceptado'}
              </Text>
            </View>
          </TouchableOpacity>
          : (this.state.isJobApply == true || this.state.jobData.status == 'pending' && this.isPostulate == false) ?               
          <TouchableOpacity onPress={this.tapJobApplyTap}>
            <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(7,225,43)'}]}>
              <Text style={[styles.titleText,{color:'#fff'}]}>
                Aplicar
              </Text>
            </View>
          </TouchableOpacity>
        : <TouchableOpacity >
            <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(7,225,43)'}]}>
              <Text style={[styles.titleText,{color:'#fff'}]}>
                Postulado
              </Text>
            </View>
          </TouchableOpacity>
        }
      </SafeAreaView>
    )
  }
}