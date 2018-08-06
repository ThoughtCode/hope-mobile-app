import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'
import StarRating from 'react-native-star-rating';
import { API } from '../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';

const styles = require('./AgentJobDetailScreenStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
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
                console.log("jobApplyResponse data-->"+JSON.stringify(response))
                
                this.setState({isJobReview : response.can_review,isLoading:false})
                
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
            Alert.alert("Hope","Ya te has postulado para este trabajo")
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
                    Alert.alert("Hope",response.message,[{text: 'OK', onPress: () => this.props.navigation.goBack()}])
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
        
        this.state.jobData.job_details.map((val,index)=>{
            if(val.service.type_service == "base"){
                description += val.service.name
            }else{
                subDescription += val.service.name + " X " + val.service.time
                subDescription += (data.job_details && data.job_details.length - 1 == index) ? "" : ", " 
            }
        
        })
        var location = this.state.jobData.property.data.attributes.p_street + ", " + this.state.jobData.property.data.attributes.s_street +", "+this.state.jobData.property.data.attributes.city
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                        <View style={styles.profileView}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                                <Image source={{uri : this.state.jobData.customer.avatar.url}} style={styles.profileImage} resizeMode={"cover"}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.jobData.customer.first_name + " "+this.state.jobData.customer.last_name}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    {/* </TouchableOpacity> */}
                    <View style={styles.opinionsView}>
                        <StarRating
                            disabled={true}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_average}
                            starSize={20}
                            fullStarColor={'gray'}
                        />
                        <Text style={styles.opinionsText}>{this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_count+" opiniones"}</Text>
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
                            <Text style={styles.titleText}>{"Servicious Adicionales"}</Text>
                            <Text style={[styles.subText]}>{subDescription}</Text>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Detalls a Considerar"}</Text>
                            <Text style={styles.subText}>{this.state.jobData.details}</Text>
                        </View>

                        <View style={[styles.renderRowView]}>
                            <Text style={styles.titleText}>{"Vbicacion"}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}> 
                                <EvilIcons name={"location"} size={20} />
                                <Text style={styles.subText}>{location}</Text>
                            </View>
                        </View>
                        <View style={styles.renderRowView}>
                            <Text style={styles.titleText}>{"Precio"}</Text>
                            <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{"$ "+ this.state.jobData.total}</Text>
                        </View>
                    </ScrollView>
                </View>
                {(this.state.type != "completed") ?
                <TouchableOpacity onPress={this.tapJobApplyTap} disabled={this.state.isJobApply}>
                    <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:(this.state.isJobApply) ? 'rgb(7,225,43)': 'rgb(0,121,189)'}]}>
                        <Text style={[styles.titleText,{color:'#fff'}]}>{(!this.state.isJobReview) ? (this.state.isJobApply)? "Postulado" :"Aplicar" : "Clificar"}</Text>
                    </View>
                </TouchableOpacity>
                : null}
                
            </SafeAreaView>
        )
    }
}