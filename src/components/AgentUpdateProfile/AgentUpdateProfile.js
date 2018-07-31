import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,TextInput,Keyboard, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as globals from '../../util/globals';
import { API } from '../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';

const styles = require('./AgentUpdateProfileStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
}

export default class AgentProfile extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            isLoading : true,
            firstName : globals.first_name,
            lastName : globals.last_name,
            avatar : globals.avatar,
            email : globals.email,
            phone : globals.cell_phone
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        
    }

    btnUpdateTap = () =>{
        data = {
            "agent": {
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "email": this.state.email,
                "cell_phone": this.state.phone,
              }
        } 
        API.updateUser(this.updateUserResponse,data,true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    updateUserResponse = {
        success: (response) => {
            try {
                
                console.log("updateUserResponse data-->"+JSON.stringify(response))
                Alert.alert("Hope",response.message,[{text: 'OK', onPress: () => {

                    AsyncStorage.multiSet([["access_token",response.agent.data.attributes.access_token || ""],
                    ['first_name', response.agent.data.attributes.first_name || ""],
                    ['last_name', response.agent.data.attributes.last_name || ""],
                    ['email', response.agent.data.attributes.email || ""],
                    ['cell_phone', response.agent.data.attributes.cell_phone || ""],
                    ['avatar', response.agent.data.attributes.avatar.url || ""]],()=>{

                        globals.access_token = response.agent.data.attributes.access_token ||""
                        globals.first_name = response.agent.data.attributes.first_name || ""
                        globals.last_name = response.agent.data.attributes.last_name || ""
                        globals.email = response.agent.data.attributes.email || ""
                        globals.cell_phone = response.agent.data.attributes.cell_phone || ""
                        globals.avatar = response.agent.data.attributes.avatar.url || ""
                        this.props.navigation.state.params.setData()
                        this.props.navigation.goBack()    
                    })
                    
                }}])
                
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
    // setFocus
    //======================================================================

    setFocus = (textField) =>{
        this[textField].focus()
    }

    //======================================================================
    // render
    //======================================================================
    
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={{flex:1}}
                    behavior="padding">    
                        <ScrollView style={{flex:1}} bounces={false}>
                        <View>
                            <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                                <View style={styles.profileView}>
                                    
                                    {(this.state.avatar != "")?
                                        <Image source={{uri : this.state.jobData.customer.avatar.url}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/> 
                                        :
                                        <Image source={require("../../../assets/img/profile_placehoder.png")} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>}
                                    
                                </View>
                                
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                                </View>
                                
                            
                            <View style={styles.topTitleView}>
                                <Text style={styles.mainTitleText}>{"Mi cuenta"}</Text>
                            </View>
                        </View>
                            
                            <View>
                                <View style={{flex:1,marginHorizontal:20}}>
                                    <View style={styles.textInputVieW}>
                                        <Text style={styles.textInputTitleText}>{"Nombre"}</Text>
                                        <TextInput  ref={ref => (this.firtNameInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Jose"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.firstName}
                                                    onChangeText={(firstName) => this.setState({firstName : firstName})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("lastNameInput")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <Text style={styles.textInputTitleText}>{"Apellido"}</Text>
                                        <TextInput  ref={ref => (this.lastNameInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Castellanos"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.lastName}
                                                    onChangeText={(lastName) => this.setState({lastName :lastName})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("emailInput")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <Text style={styles.textInputTitleText}>{"Correo"}</Text>
                                        <TextInput  ref={ref => (this.emailInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"neural@neural "}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.email}
                                                    onChangeText={(email) => this.setState({email : email})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("phoneInput")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <Text style={styles.textInputTitleText}>{"Teléfono"}</Text>
                                        <TextInput  ref={ref => (this.phoneInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"+593 99999999"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.phone}
                                                    onChangeText={(phone) => this.setState({phone : phone})}
                                                    returnKeyType={"done"}
                                                    onSubmitEditing={() => Keyboard.dismiss()} />
                                    </View>

                                </View>
                        </View>
                        </ScrollView>
                        <TouchableOpacity onPress={this.btnUpdateTap}>
                                <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                                    <Text style={[styles.titleText,{color:'#fff'}]}>{"Guardar"}</Text>
                                </View>
                        </TouchableOpacity>
                </KeyboardAvoidingView>            
            </SafeAreaView>
        
        )
    }
}