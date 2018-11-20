import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,TextInput,Keyboard, KeyboardAvoidingView, AsyncStorage, Picker} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import { ImagePicker, Camera, Permissions  } from 'expo';
import ImageUpload from '../../../util/ImageUpload';
import ActionSheet from 'react-native-actionsheet'
const styles = require('./CreatePropertiesStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CreateProperties extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            isLoading : true,
            avatar : globals.avatar,
            nobre : '',
            neighborhoodID : '',
            street1 : '',
            street2 : '',
            numeracion : '',
            reference : '',
            userData : null,
            city : [],
            neightborhood : []
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        AsyncStorage.getItem("customerData").then((item) =>{
            // const data = this.state.data;
            const data = JSON.parse(item)
            this.setState({userData : data})
        })
        API.getCity(this.getCityResponse,{},true);
        
    }

     //======================================================================
    // jobApplyResponse
    //======================================================================

    getCityResponse = {
        success: (response) => {
            try {
                
                console.log("City data-->"+JSON.stringify(response))
                this.setState({
                    city : response.city && response.city.data || []
                })
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("Noc Noc",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    btnUpdateTap = () =>{
        
        data = {
            "property": {
                "name": this.state.nobre,
                "neightborhood_id": this.state.neighborhoodID, 
                "p_street": this.state.street1,
                "s_street": this.state.street2,
                "number": this.state.numeracion,
                "phone": this.state.numeracion,
                "aditional_references0": this.state.reference
            }
        }
        API.createProperties(this.createResponse,data,true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    createResponse = {
        success: (response) => {
            try {
                
                console.log("create properties data-->"+JSON.stringify(response))
                this.props.navigation.state.params.refresProperties()
                Alert.alert("Noc Noc",response.message,[{text: 'OK', onPress: () => {
                        this.props.navigation.goBack()    
                }}])
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("Noc Noc",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
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

    selectCity(cityId){
        API.getNeightborhoods(this.getneightborhoodResponse,this.state.city[cityId - 1].id,true);
    }

    getneightborhoodResponse = {
        success: (response) => {
            try {
                
                console.log("neightborhood data-->"+JSON.stringify(response))
                this.setState({
                  neightborhood : response.neightborhood && response.neightborhood.data || []
                })
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("Noc Noc",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // render
    //======================================================================
    
    render(){
        if(this.state.userData != null){
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
                                        <Image source={{uri : this.state.avatar}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
                                        :
                                        <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                            <Text style={{ color: '#fff' }}>{initials}</Text>
                                        </View>
                                    }
                                </View>
                                
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.userData.customer.data.attributes.first_name + " "+ this.state.userData.customer.data.attributes.last_name}</Text>
                                </View>
                                
                            
                            <View style={styles.topTitleView}>
                                <Text style={styles.mainTitleText}>{"Nueva Propiedad"}</Text>
                            </View>
                        </View>
                            
                            <View>
                                <View style={{flex:1,marginHorizontal:20,marginBottom:20}}>
                                    <View style={styles.textInputVieW}>
                                        <TextInput  ref={ref => (this.firtNameInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Nobre"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.nobre}
                                                    onChangeText={(nobre) => this.setState({nobre : nobre})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("cityInput")} />
                                    </View>

                                    <View style={[styles.textInputVieW,{borderWidth:1,borderRadius:5,borderColor:"lightgray",height:40,justifyContent:'center'}]}>
                                        {(this.state.city && this.state.city.length > 0) ?
                                        <Picker
                                            selectedValue={this.state.language}
                                            style={{ height: 50, width: width - 20 }}
                                            onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex)}>
                                            <Picker.Item label={"Cuidad"} value={"Cuidad"} key={-1} />
                                            { this.state.city.map((item, key)=>{
                                                return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                            })}
                                        </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{"Cuidad"}</Text>}

                                        {/* <TextInput  ref={ref => (this.cityInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Cuidad"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.city}
                                                    onChangeText={(city) => this.setState({city :city})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("neighborhoodInput")} /> */}
                                    </View>

                                    <View style={[styles.textInputVieW,{borderWidth:1,borderRadius:5,borderColor:"lightgray",height:40,justifyContent:'center'}]}>
                                    { (this.state.neightborhood && this.state.neightborhood.length > 0)? 
                                        <Picker
                                            selectedValue={this.state.language}
                                            style={{ height: 50, width: width - 20 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({neighborhoodID: this.state.neightborhood[itemIndex - 1].id})}>
                                            <Picker.Item label={"Barrio"} value={"Barrio"} key={-1} />
                                            {this.state.neightborhood.map((item, key)=>{
                                                return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                            })}
                                        </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{"Barrio"}</Text>}
                                        {/* <TextInput  ref={ref => (this.neighborhoodInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Barrio "}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.neighborhood}
                                                    onChangeText={(neighborhood) => this.setState({neighborhood : neighborhood})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("streetInput")} /> */}
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <TextInput  ref={ref => (this.streetInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Calle Principal"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.street1}
                                                    onChangeText={(street1) => this.setState({street1 : street1})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("street2Input")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <TextInput  ref={ref => (this.street2Input = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Calle Secundaria"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.street2}
                                                    onChangeText={(street2) => this.setState({street2 : street2})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("numeracionInput")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <TextInput  ref={ref => (this.numeracionInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Numeracion"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.numeracion}
                                                    onChangeText={(numeracion) => this.setState({numeracion : numeracion})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("referenceInput")} />
                                    </View>

                                    <View style={styles.textInputVieW}>
                                        <TextInput  ref={ref => (this.referenceInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Referencias adicionales"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.reference}
                                                    onChangeText={(reference) => this.setState({reference : reference})}
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
                    title={'Select avatar'}
                    options={['Take Photo', 'Choose from Library', 'Cancel']}
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