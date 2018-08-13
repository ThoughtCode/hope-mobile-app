import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,TextInput,Keyboard, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../util/globals';
import { API } from '../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';

const styles = require('./AgentUpdatePasswordStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
}

export default class AgentUpdatePassword extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            userData : null,
            isLoading : true,
            firstName : globals.first_name,
            lastName : globals.last_name,
            avatar : globals.avatar,
            currentPassword : "",
            newPassword : "",
            confirmPassword : "",
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        
    }

    //======================================================================
    // tapJobApplyTap
    //======================================================================

    updatePasswordTap = () =>{

        if(this.state.currentPassword == globals.password){
            if(this.state.newPassword == this.state.confirmPassword){
                data = {
                    "agent": {
                        "current_password": this.state.currentPassword,
                        "password": this.state.newPassword,
                        "password_confirmation": this.state.confirmPassword
                    }
                }
                API.updatePassword(this.updatePasswordResponse,data,true);
            }else{
                Alert.alert(globals.APP_NAME,"Mismatch new password")
            }
        }else{
            Alert.alert(globals.APP_NAME,"Current password wrong")
        }
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    updatePasswordResponse = {
        success: (response) => {
            try {
                console.log("jobApplyResponse data-->"+JSON.stringify(response))
                Alert.alert("Hope",response.message,[{text: 'OK', onPress: () => {
                    AsyncStorage.clear().then(()=>{
                        this.props.navigation.navigate("AgentLogin")
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
                                        <Image source={{uri : this.state.avatar}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>
                                        :
                                        <Image source={require("../../../assets/img/profile_placehoder.png")} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>}
                                    
                                </View>
                                
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                                </View>
                                
                            
                            <View style={styles.topTitleView}>
                                <Text style={styles.mainTitleText}>{"Actualizar Contrasena"}</Text>
                            </View>
                        </View>

                        <View style={{flex:1,marginHorizontal:20}}>
                            <View style={styles.textInputVieW}>
                                <Text style={styles.textInputTitleText}>{"Ingrese clave actual"}</Text>
                                <TextInput  ref={ref => (this.currentPasswordInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Current password"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.currentPassword}
                                            onChangeText={(currentPassword) => this.setState({currentPassword : currentPassword})}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("newPasswordInput")} />
                            </View>

                            <View style={styles.textInputVieW}>
                                <Text style={styles.textInputTitleText}>{"Nueva Contraseña"}</Text>
                                <TextInput  ref={ref => (this.newPasswordInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"New password"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.newPassword}
                                            onChangeText={(newPassword) => this.setState({newPassword : newPassword})}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("confirmPasswordInput")} />
                            </View>

                            <View style={styles.textInputVieW}>
                                <Text style={styles.textInputTitleText}>{"Confirme nueva contraseña"}</Text>
                                <TextInput  ref={ref => (this.confirmPasswordInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Confirm password"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.confirmPassword}
                                            onChangeText={(confirmPassword) => this.setState({confirmPassword : confirmPassword})}
                                            returnKeyType={"done"}
                                            onSubmitEditing={() => Keyboard.dismiss()} />
                            </View>

                        </View>
                        
                    </ScrollView>
                    <TouchableOpacity onPress={this.updatePasswordTap}>
                        <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                            <Text style={[styles.titleText,{color:'#fff'}]}>{"Guardar"}</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}