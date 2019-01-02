import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, Image, Dimensions,SafeAreaView,Alert} from 'react-native';
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
            name: '',
            number: '',
            month: '',
            cvc: '',
            year: ''
            
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        console.log("Response data-->"+JSON.stringify(this.state.cardList))
    }

    addCardDataResponseData = {
        success: (response) => {
            try {
                Alert.alert("NOC NOC",response.message,[
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ])
                this.props.navigation.state.params.getCardList();
                console.log("Response data-->" + JSON.stringify(response))
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

    validation() {
        if (this.state.name === "") {
            console.log("Enter Name")
        }
        else if (this.state.number === "") {
            console.log("Enter Number")
        }
        else if (this.state.month === "") {
            console.log("Enter Month")
        }
        else if (this.state.year === "") {
            console.log("Enter Year")
        }
        else if (this.state.cvc === "") {
            console.log("Enter CVC")
        }
        else {
            console.log("Sucess")
            var data = {
                payment: {
                    "holder_name": this.state.name,
                    "card_type": "vi",
                    "number": this.state.number,
                    "token": "9209405777683805561",
                    "status": "valid",
                    "expiry_month": this.state.month,
                    "expiry_year": this.state.year
                }
            }
            API.setAddCard(this.addCardDataResponseData, data, true);
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
                    <Text style={styles.textStyle}>{"Numero de Completo"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Card Number'
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({number : text})} />
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
                                    placeholder='mes'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({month : text})} />
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
                                    placeholder='ano'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({year : text})} />
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
                                    placeholder='cvc'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({cvc : text})} />
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <TouchableOpacity onPress={() => this.validation()}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        )
    }
}