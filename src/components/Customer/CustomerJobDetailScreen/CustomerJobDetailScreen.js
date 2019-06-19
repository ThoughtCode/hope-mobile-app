import React, {Component} from 'react';
import {Text,TouchableOpacity,View,ScrollView,Image,SafeAreaView,Alert,LayoutAnimation,FlatList} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import StarRating from '../../../lib/react-native-star-rating';
import { API } from '../../../util/api';
import Moment from 'moment';
import Collapsible from 'react-native-collapsible';

const styles = require('./CustomerJobDetailScreenStyles');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class CustomerJobDetailScreen extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      jobData : props.navigation.state.params.jobData.attributes,
      jobId : props.navigation.state.params.jobData.id,
      index : props.navigation.state.params.index,
      agentList : [],
      isJobApply : false,
      isJobReview : false,
      isLoading : true,
      isCallapseOpen : true,
      isCallapseOpen1 : true,
      type : props.navigation.state.params.type || null,
      canReview : false,
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    API.agentReviews(this.agentReviewsResponse,this.state.jobId,true)
    // var hiredAgent = this.state.jobData.agent || []
    this.setState({
      isCallapseOpen : true,
    //   agentList: [...this.state.jobData.proposals.data,...hiredAgent] || [] },
    // ()=>{
    //   this.forceUpdate()
    })
  }

  agentReviewsResponse = {
    success: (response) => {
      try {
        this.setState({canReview: response.can_review})
      } catch (error) {
        console.log('agentReviewsResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      Alert.alert("NOC NOC",err.message)
    }
  }

  //======================================================================
  // api call confirm Payment
  //======================================================================

  agentContract(proposalsId){
    API.agentContract(this.agentContractResponse,"/"+this.state.jobId+"/accepted/"+proposalsId,true);
  }

  //======================================================================
  // jobApplyResponse
  //======================================================================

  agentContractResponse = {
    success: (response) => {
      try {
        this.getJobDtail()
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      Alert.alert("NOC NOC",err.message)
    }
  }

  tapOnCancle = () =>{
    var penalty_time = this.state.jobData.config[0].value
    var penalty_ammount = this.state.jobData.config[1].value
    Alert.alert("Aviso de penalización","Recuerda que si cancelas el servicio antes de ‘"+ penalty_time +" horas’ del inicio de trabajo se cobrará un valor de $"+ penalty_ammount +" por cargos administrativos.",
      [
        {text: 'Cancelar Trabajo', onPress: () => this.canceleAPI(), style: 'destructive'},
        {text: 'Cerrar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},   
      ],
      { cancelable: false }
    )
  }

  //======================================================================
  // api call confirm Payment
  //======================================================================

  canceleAPI(){
    API.agentContract(this.cancleJobResponse,"/"+this.state.jobId+"/cancelled",true);
  }

  //======================================================================
  // jobApplyResponse
  //======================================================================

  cancleJobResponse = {
    success: (response) => {
      try {
        this.props.navigation.goBack()
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('jobApplyResponse error ' + JSON.stringify(err));
    }
  }


  getJobDtail(){
    API.jobDetail(this.getJobDtailResponse,"/"+this.state.jobId,true);
  }

  //======================================================================
  // getJobDtailResponse
  //======================================================================

  getJobDtailResponse = {
    success: (response) => {
      try {
        response.job && response.job.data && response.job.data.attributes && this.setState({
          jobData : response.job.data.attributes
        })
      } catch (error) {
        console.log('jobApplyResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('jobApplyResponse error ' + JSON.stringify(err));
    }
  }

  expand_collapse_Function =()=>{
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
    if( this.state.expand == false ){
      alert(this.state.expandableLayoutHeight)
      this.setState({ 
        updatedHeight: this.state.expandableLayoutHeight, 
        expand: true, 
        buttonText: 'Click Here To Collapse' 
      }); 
    } else {
      this.setState({ 
        updatedHeight: 0, 
        expand: false, 
        buttonText: 'Click Here To Expand' 
      });
    }
  }

  renderItem = (item) =>{
    var data = item.item
    console.log("data ------>",data)
    console.log("job completado",this.props.navigation.state.params.jobData.attributes.proposals.data)
    return(
      <View style={styles.renderRowView1}>
        {(data.attributes.agent != null) ? (this.state.jobData.status == "completed") ?
          <View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={styles.userImageView} >
                {(data.attributes.agent.data.attributes.avatar.url != null)?
                  <Image source={{uri : data.attributes.agent.data.attributes.avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
                :
                <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
              </View>
              <View style={{flex:1}}>
                <Text onPress={() => this.props.navigation.navigate("CustomerAgentReviewScreen",{isHired : false,jobData : data, review : data.attributes.agent.data.attributes.rewiews_average, statusJob : this.state.jobData.status })} style={styles.titleText}>{data.attributes.agent.data.attributes.first_name + " "+ data.attributes.agent.data.attributes.last_name}</Text>
              </View>
              <StarRating
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={data.attributes.agent.data.attributes.rewiews_average}
                starSize={18}
                fullStarColor={'#ffd700'}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:40}}>
              <Text style={{color:'gray'}}>{data.attributes.agent.data.attributes.rewiews_count+" Trabajos Completados"}</Text>
              <Text style={{color:'gray'}}>{data.attributes.agent.data.attributes.rewiews_count+" Opiniones"}</Text>
            </View>
            <TouchableOpacity onPress={() => this.agentContract(data.id)} >
              <View style={{backgroundColor:'#1e67a9',marginHorizontal:10,alignItems:'center',justifyContent:'center',paddingVertical:7,marginTop:10}}>
                <Text style={[styles.titleText,{color:'#fff'}]}>{"Contratar Agente"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          :
          <View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={styles.userImageView} >
                {(data.attributes.agent.data.attributes.avatar.url != null)?
                  <Image source={{uri : data.attributes.agent.data.attributes.avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
                :
                <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
              </View>
              <View style={{flex:1}}>
                <Text onPress={() => this.props.navigation.navigate("CustomerAgentReviewScreen",{isHired : false,jobData : data, review : data.attributes.agent.data.attributes.rewiews_average, statusJob : this.state.jobData.status })} style={styles.titleText}>{data.attributes.agent.data.attributes.first_name + " "+ data.attributes.agent.data.attributes.last_name}</Text>
              </View>
              <StarRating
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={data.attributes.agent.data.attributes.rewiews_average}
                starSize={18}
                fullStarColor={'#ffd700'}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:40}}>
              <Text style={{color:'gray'}}>{data.attributes.agent.data.attributes.rewiews_count+" Trabajos Completados"}</Text>
              <Text style={{color:'gray'}}>{data.attributes.agent.data.attributes.rewiews_count+" Opiniones"}</Text>
            </View>
            <TouchableOpacity onPress={() => this.agentContract(data.id)} >
              <View style={{backgroundColor:'#1e67a9',marginHorizontal:10,alignItems:'center',justifyContent:'center',paddingVertical:7,marginTop:10}}>
                <Text style={[styles.titleText,{color:'#fff'}]}>{"Contratar Agente"}</Text>
              </View>
            </TouchableOpacity>
          </View> 
          : <View><Text>Trabajo completado</Text></View>}
      </View>
    )
  }

  ListEmptyComponent =() =>{
    return(
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text>{"No hay agentes postulados"}</Text>
      </View>
    )
  }  

  //======================================================================
  // render
  //======================================================================
  
  render(){
    var name = this.state.jobData.customer && this.state.jobData.customer.first_name  || "" + " "+ this.state.jobData.customer && this.state.jobData.customer.last_name || ""
    var initials = this.state.jobData.customer && this.state.jobData.customer.first_name.charAt(0)
    initials +=  this.state.jobData.customer && this.state.jobData.customer.last_name.charAt(0)
    var description = ""
    var subDescription = ""
    this.state.jobData.job_details.map((val,index)=>{
      if(val.service.type_service == "base"){
      }else{
        subDescription += val.service.name + " x" + val.value + ", "
      }
    })
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
            {(this.state.jobData.customer && this.state.jobData.customer.avatar  && this.state.jobData.customer.avatar.url) ?
              <Image source={{uri :  this.state.jobData.customer.avatar.url}} style={styles.profileImage} resizeMode={"cover"}/>
              :
              <View style={[styles.profileImage,{backgroundColor : 'gray',alignItems:'center',justifyContent:'center'}]} >
                <Text style={{color:'#fff'}}>{initials}</Text>
              </View> 
            }
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20,fontWeight:'600'}}>{ name}</Text>
          </View>
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
            <Text style={styles.opinionsText}>{this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_count+" opiniones"}</Text>
          </View>
        </View>
        <View style={{flex:1}}>
          <ScrollView>
            <TouchableOpacity activeOpacity = { 0.7 } onPress = {() => this.setState({isCallapseOpen : !this.state.isCallapseOpen})}>
              <View style={{padding:10,backgroundColor:'rgb(240,240,240)',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.mainTitleText}>{"Detalles del trabajo"}</Text>
                <Entypo name={(this.state.isCallapseOpen) ? "chevron-down" : "chevron-up"} color={"gray"} size={25} />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.isCallapseOpen} duration={200}>
              <View >
                <View style={styles.renderRowView}>
                  <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{this.state.jobData.job_details[0].service.name}</Text>
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
                  <Text style={styles.titleText}>{"Frecuencia"}</Text>
                  <Text style={styles.subText}>{frequency}</Text>
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
              </View>
            </Collapsible>
            <TouchableOpacity activeOpacity = { 0.7 } onPress = {() => this.setState({isCallapseOpen1 : !this.state.isCallapseOpen1})}>
              <View style={{padding:10,backgroundColor:'gray',flexDirection:'row',justifyContent:'space-between'}}>
                <Text>{"Agentes postulados"}</Text>
                <Entypo name={(this.state.isCallapseOpen1) ? "chevron-down" : "chevron-up"} color={"#fff"} size={25} />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.isCallapseOpen1}>
              {(this.state.jobData && this.state.jobData.agent ) ?
                <View style={styles.renderRowView1}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={styles.userImageView} >
                      {(this.state.jobData.agent.avatar.url != null)?
                        <Image source={{uri : this.state.jobData.agent.avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
                      :
                      <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
                    </View>
                    <View style={{flex:1}}>
                      <Text onPress={() => this.props.navigation.navigate("CustomerAgentReviewScreen",{isHired : true ,jobData : this.state.jobData.agent, reviews : this.state.jobData.agent_rewiews , review : this.state.jobData.agent_rewiews_average })} style={styles.titleText}>{this.state.jobData.agent.first_name + " "+ this.state.jobData.agent.last_name}</Text>
                    </View>
                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.jobData.agent_rewiews_average}
                      starSize={18}
                      fullStarColor={'#ffd700'}/>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:40}}>
                    <Text style={{color:'gray'}}>{this.state.jobData.agent_rewiews_count+" Trabajos Completados"}</Text>
                    <Text style={{color:'gray'}}>{this.state.jobData.agent_rewiews_count+" Opiniones"}</Text>
                  </View>
                  {(this.state.canReview == true) ? (
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerReviewScreen",{jobData : this.props.navigation.state.params.jobData})} >
                        <View style={{backgroundColor:'rgb(7,225,43)',marginHorizontal:10,alignItems:'center',justifyContent:'center',paddingVertical:7,marginTop:10}}>
                          <Text style={[styles.titleText,{color:'#fff'}]}>{"Calificar"}</Text>
                        </View>
                      </TouchableOpacity>
                    ):((this.state.jobData.status == "accepted" && this.state.canReview == false)?(
                      <TouchableOpacity>
                        <View style={{backgroundColor:'rgb(7,225,43)',marginHorizontal:10,alignItems:'center',justifyContent:'center',paddingVertical:7,marginTop:10}}>
                          <Text style={[styles.titleText,{color:'#fff'}]}>{"Contratado"}</Text>
                        </View>
                      </TouchableOpacity>
                    ):(
                      <View><Text>{""}</Text></View>
                    )
                  )}
                </View>
              :
              <FlatList
                data={this.props.navigation.state.params.jobData.attributes.proposals.data || []}
                renderItem={this.renderItem}
                ListEmptyComponent={this.ListEmptyComponent}
              />}
            </Collapsible>
          </ScrollView>
        </View>
        {(this.state.jobData.status != "pending") ? (this.state.jobData.status == "completed") ? (this.state.jobData.status == "accepted") ?
          <TouchableOpacity>
            <View style={[styles.bottomButton,{alignSelf:'auto'}]}>
              <Text style={[styles.titleText,{color:'rgb(7,225,43)'}]}>{""}</Text>
            </View>
          </TouchableOpacity>
        :
          <TouchableOpacity>
            <View style={[styles.bottomButton,{alignSelf:'auto'}]}>
              <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{"Trabajo Completado"}</Text>
            </View>
          </TouchableOpacity>
        :
          <TouchableOpacity>
            <View style={[styles.bottomButton,{alignSelf:'auto'}]}>
              <Text style={[styles.titleText,{color:'rgb(7,225,43)'}]}>{"Trabajo Aceptado"}</Text>
            </View>
          </TouchableOpacity>
        :
          <TouchableOpacity onPress={this.tapOnCancle} >
            <View style={[styles.bottomButton,{alignSelf:'auto'}]}>
              <Text style={[styles.titleText,{color:'red'}]}>{"Cancelar trabajo"}</Text>
            </View>
          </TouchableOpacity>
        }
      </SafeAreaView>
    )
  }
}