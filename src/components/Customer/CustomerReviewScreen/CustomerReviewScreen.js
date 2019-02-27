import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, SafeAreaView, TextInput, Keyboard,Alert} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import StarRating from '../../../lib/react-native-star-rating';
import { API } from '../../../util/api';

const styles = require('./CustomerReviewScreenStyles');

const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class CustomerReviewScreen extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            jobData : props.navigation.state.params.jobData.attributes,
            isLoading : true,
            comment : '',
            starCount : 0
        }
    }

    //======================================================================
    // tapJobReviewTap
    //======================================================================

    tapJobReviewTap = () =>{
        if(this.state.comment != ""){
            data = {
                "review" : {
                    "qualification" : this.state.starCount,
                    "comment" : this.state.comment
                }
            }
            API.setCustomerReview(this.reviewJobResponse,data,this.props.navigation.state.params.jobData.id,true);
        }else{
            Alert.alert("NOC NOC","Por favor ingrese un comentario")
        }
        
    }

    //======================================================================
    // canReviewJobResponse
    //======================================================================

    reviewJobResponse = {
        success: (response) => {
            try {
                Alert.alert("NOC NOC",response.message,[{text: 'OK',  onPress: ()=> this.props.navigation.navigate("CustomerDashboard")}])
            } catch (error) {
                console.log('reviewJobResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('reviewJobResponse error ' + JSON.stringify(err));
            Alert.alert("NOC NOC",err.message,[{text: 'OK',  onPress: ()=> this.props.navigation.navigate("CustomerDashboard")}])
        },
        complete: () => {
        }
    }

    //======================================================================
    // onStarRatingPress
    //======================================================================

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }

    //======================================================================
    // render
    //======================================================================
    
    render(){
        var initials = this.state.jobData.customer && this.state.jobData.customer.first_name.charAt(0)
        initials +=  this.state.jobData.customer && this.state.jobData.customer.last_name.charAt(0)
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                        <View style={styles.profileView}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                            {(this.state.jobData.customer && this.state.jobData.customer.avatar && this.state.jobData.customer.avatar.url) ?
                                <Image source={{ uri: this.state.jobData.customer.avatar.url }} style={styles.profileImage} resizeMode={"cover"} />
                                :
                                <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                    <Text style={{ color: '#fff' }}>{initials}</Text>
                                </View>
                            }
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
                            fullStarColor={'#ffd700'}
                        />
                        <Text style={styles.opinionsText}>{this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_count+" opiniones"}</Text>
                    </View>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Califica este trabajo"}</Text>
                    </View>
                </View>

                <View style={{flex:1,marginHorizontal:10}}>
                    <ScrollView>
                        <View style={styles.textInputVieW}>
                            <Text style={styles.textInputTitleText}>{"Opinión sobre el cliente"}</Text>
                            <TextInput  ref={ref => (this.firtNameInput = ref)}
                                        underlineColorAndroid={"transparent"}
                                        style={styles.textInputStyle}
                                        placeholder={""}
                                        placeholderTextColor={"#ffd700"}
                                        value={this.state.comment}
                                        onChangeText={(comment) => this.setState({comment : comment})}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => Keyboard.dismiss() } />
                        </View>
                        <View style={styles.textInputVieW}>
                            <Text style={styles.textInputTitleText}>{"Puntaje"}</Text>
                            <StarRating
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                containerStyle = {{width : "30%"}}
                                maxStars={5}
                                rating={this.state.starCount}
                                starSize={20}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'#ffd700'}
                            />
                        </View>
                    </ScrollView>
                </View>
                
                <TouchableOpacity onPress={this.tapJobReviewTap} >
                    <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                        <Text style={[styles.titleText,{color:'#fff'}]}>{ "Calificar"}</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}