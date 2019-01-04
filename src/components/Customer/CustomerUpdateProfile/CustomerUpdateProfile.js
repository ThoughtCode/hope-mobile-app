import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,TextInput,Keyboard, KeyboardAvoidingView, AsyncStorage, Modal} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import { ImagePicker, Camera, Permissions  } from 'expo';
import ImageUpload from '../../../util/ImageUpload';
import ActionSheet from 'react-native-actionsheet'
const styles = require('./CustomerUpdateProfileStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerUpdateProfile extends Component {

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
            phone : globals.cell_phone,
            hasCameraPermission: null,
            isCameraOpen : false,
            userData : null
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        AsyncStorage.getItem("customerData").then((item) =>{
            // const data = this.state.data;
            const data = JSON.parse(item)
            this.setState({userData : data,
                firstName : data.customer.data.attributes.first_name,
                lastName : data.customer.data.attributes.last_name,
                // avatar : data.customer.data.attributes.avatar.url,
                email : data.customer.data.attributes.email,
                phone : data.customer.data.attributes.cell_phone
            })
      
        })
    }

    btnUpdateTap = () =>{
        
        data = {
            "customer": {
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "email": this.state.email,
                "cell_phone": this.state.phone,
              }
        } 
        if(this.state.profilePhoto != null){
            this.uploadPhoto()
        }
        API.customerUpdateProfile(this.updateUserResponse,data,true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    updateUserResponse = {
        success: (response) => {
            try {
                console.log("updateUserResponse data-->"+JSON.stringify(response))
                AsyncStorage.setItem("customerData",JSON.stringify(response))
                Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => {
                    this.props.navigation.state.params.updatePhoto()
                    // AsyncStorage.multiSet([["access_token",response.agent.data.attributes.access_token || ""],
                    // ['first_name', response.agent.data.attributes.first_name || ""],
                    // ['last_name', response.agent.data.attributes.last_name || ""],
                    // ['email', response.agent.data.attributes.email || ""],
                    // ['cell_phone', response.agent.data.attributes.cell_phone || ""],
                    // ['avatar', response.agent.data.attributes.avatar.url || ""]],()=>{

                        globals.access_token = response.customer.data.attributes.access_token ||""
                        globals.first_name = response.customer.data.attributes.first_name || ""
                        globals.last_name = response.customer.data.attributes.last_name || ""
                        globals.email = response.customer.data.attributes.email || ""
                        globals.cell_phone = response.customer.data.attributes.cell_phone || ""
                        globals.avatar = response.customer.data.attributes.avatar.url || ""
                        // this.props.navigation.state.params.setData()
                        this.props.navigation.goBack()    
                    // })
                    
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
    // selectedPhoto
    //======================================================================

    selectedPhoto = async (index) => {

        if(index == 0){
            const { status_camera } = await Permissions.askAsync(Permissions.CAMERA);
            const { status_cameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // this.setState({ hasCameraPermission: status === 'granted' });
            // if(status_camera === 'granted' || status_cameraRoll === 'granted'){
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                });
            
                console.log(result);
            
                if (!result.cancelled) {
                    this.setState({ profilePhoto: result.uri });
                }
            // }
            
        }else{
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                mediaTypes : "Images"
              });
          
              console.log(result);
          
              if (!result.cancelled) {
                this.setState({ profilePhoto: result.uri });
            }
        }
        
    }

    //======================================================================
    // cameraPhoto
    //======================================================================

    cameraPhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    //======================================================================
    // uploadPhoto
    //======================================================================

    uploadPhoto = () =>{
        var filetype = this.state.profilePhoto.split(".").pop()
        var profiePicture = {
            uri: this.state.profilePhoto,
            type: 'image/jpeg', // or photo.type image/jpg
            name: 'profilepic.jpg',
          }

          var data = {
            "customer": profiePicture,
          }
      
          console.log("Data-->"+JSON.stringify(data))
          ImageUpload.imageUpload(profiePicture,false)
    }

    _onOpenActionSheet = () => {
        this.ActionSheet.show();
      }

    //======================================================================
    // render
    //======================================================================
    
    render(){
        if(this.state.userData != null) {
            var initials = this.state.userData.customer.data.attributes.first_name.charAt(0)
            initials += this.state.userData.customer.data.attributes.last_name.charAt(0) || ""
        
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
                                        <TouchableOpacity onPress={this._onOpenActionSheet}>
                                            {(this.state.profilePhoto != null) ? <Image source={{uri : this.state.profilePhoto}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/camera.png")}/> 
                                            :
                                            <Image source={{uri : this.state.avatar}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> }
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={this._onOpenActionSheet}>
                                            {(this.state.profilePhoto != null) ? <Image source={{uri : this.state.profilePhoto}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/camera.png")}/>
                                            : 
                                            <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                                <Text style={{ color: '#fff' }}>{initials}</Text>
                                            </View>
                                            }
                                    </TouchableOpacity>}
                                </View>
                                    
                                
                                
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                                </View>
                                
                            
                            <View style={styles.topTitleView}>
                                <Text style={styles.mainTitleText}>{"Mi cuenta"}</Text>
                            </View>
                        </View>
                            
                            <View>
                                <View style={{flex:1,marginHorizontal:20,marginBottom:20}}>
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
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Seleccionar imagen'}
                    options={['Tomar foto', 'Elige de la galeria', 'Cancelar']}
                    cancelButtonIndex={2}
                    onPress={(index) => { this.selectedPhoto(index) }}
                    />
            </SafeAreaView>
        )
        }else{
            return null
        }
    }
}