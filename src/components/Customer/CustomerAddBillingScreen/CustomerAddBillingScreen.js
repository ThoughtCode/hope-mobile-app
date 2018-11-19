import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, Image, Dimensions,SafeAreaView,Picker} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CustomerAddBillingScreenStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerAddBillingScreen extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        
        this.state = {
            city : [
                {attributes : { name : "AAA"}},
                {attributes : { name : "BBB"}},
                {attributes : { name : "CCC"}},
                {attributes : { name : "DDD"}},
                {attributes : { name : "EEE"}},
            ],
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){

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
                        <Text style={styles.mainTitleText}>{"Detalles de facturacion"}</Text>
                    </View>
                </View> 
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"Razon Social:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                value={"Jose Castellanows"}
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                            </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"Identification:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            {(this.state.city && this.state.city.length > 0) ?
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50, width: width - 20 }}
                                    onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex)}>
                                    <Picker.Item label={"Cuidad"} value={"Cuidad"} key={-1} />
                                    { this.state.city.map((item, key)=>{
                                        return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                    })}
                                </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{"Cedula"}</Text>}
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"N de identification:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                value={"092837546er"}
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                            </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"Correo electronico:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                value={"rj.ravi111@gmail.com"}
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                            </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"Dirccion:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                value={"la floresst"}
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                            </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={styles.textStyle}>
                            <Text>{"Tefefono:"}</Text>
                        </View>
                        <View style={styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                value={"+93742364 8783"}
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                            </View>
                    </View>

                </View>
                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={() => alert("Guardar")}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>{"Guardar"}</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
                
            </SafeAreaView>
        )
    }
}