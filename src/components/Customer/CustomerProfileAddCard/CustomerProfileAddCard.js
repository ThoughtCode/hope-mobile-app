import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, Image, Dimensions,SafeAreaView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CustomerProfileAddCardStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerProfileAddCard extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        
        this.state = {
            cardList : [],
            
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        console.log("Response data-->"+JSON.stringify(this.state.cardList))
        // API.getJobsComments(this.getJobCommentsResponseData,this.state.jobData.customer.hashed_id,true);
    }

    //======================================================================
    //getJobCommentsResponseData
    //======================================================================

    getJobCommentsResponseData = {
        success: (response) => {
            try {
                console.log("Response data-->"+JSON.stringify(response.review.data))
                this.setState({
                    jobCommentList : response.review.data
                })
            } catch (error) {
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // render
    //======================================================================

    render(){
        // var initials = this.state.jobData.first_name && this.state.jobData.first_name.charAt(0)
        // initials +=  this.state.jobData.last_name && this.state.jobData.last_name.charAt(0)
        var initials = "JS"
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                    
                    <View style={styles.profileView}>
                        {(this.state.jobData && this.state.jobData.avatar && this.state.jobData.avatar.url) ?
                            <Image source={{ uri: this.state.jobData.avatar.url }} style={styles.profileImage} resizeMode={"cover"} />
                            :
                            <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                <Text style={{ color: '#fff' }}>{initials}</Text>
                            </View>
                        }
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                        {/* <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.jobData.first_name + " "+this.state.jobData.last_name}</Text> */}
                        <Text style={{fontSize:20,fontWeight:'600'}}>{"Jose Castellanows"}</Text>
                    </View>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Metodo de pago"}</Text>
                    </View>
                </View> 
                
                <View style={{flex:1,marginTop:20}}>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                        <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Name'
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({name : text})} />
                        </View>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Name'
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({name : text})} />
                    </View>
                    <View style={{flexDirection:'row'}}> 
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"Mes"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"Ano"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>     
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"CVC"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        )
    }
}