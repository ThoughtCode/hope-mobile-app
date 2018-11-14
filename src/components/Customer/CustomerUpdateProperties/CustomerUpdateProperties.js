import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,FlatList,Keyboard, KeyboardAvoidingView, AsyncStorage, Modal} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import { ImagePicker, Camera, Permissions  } from 'expo';
import ImageUpload from '../../../util/ImageUpload';
import ActionSheet from 'react-native-actionsheet'
const styles = require('./CustomerUpdatePropertiesStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerUpdateProperties extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            isLoading : true,
            data : [],
            userData : null,
            avatar : globals.avatar
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
        API.customerProperties(this.propertiesResponse,{},true);
    }

    refresProperties = () =>{
        API.customerProperties(this.propertiesResponse,{},true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    propertiesResponse = {
        success: (response) => {
            try {
                console.log("updateUserResponse data-->"+JSON.stringify(response))
                response.property && response.property.data && this.setState({data : response.property.data})
                
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

    btnCreateProperties = () =>{

    }

    renderItem = (itemData) =>{
        let item = itemData.item
        let address =  item.attributes.p_street && item.attributes.p_street || '' + " "
        address += item.attributes.s_street && item.attributes.s_street || '' + " "
        address += item.attributes.number && item.attributes.number || '' + " "
        address += item.attributes.neightborhood && item.attributes.neightborhood || '' + " "
        
        return(
            <View style={{borderBottomColor:'lightgray',borderBottomWidth:1,paddingHorizontal:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Entypo name={"home"} size={40}  />
                    <Text style={{fontWeight:'900',fontSize:20,marginLeft:10}}>{item.attributes && item.attributes.name && item.attributes.name || ''}</Text>
                </View>
                <Text numberOfLines={2} style={{color:'gray',fontFamily : 'helvetica'}}>{address}</Text>
            </View>
        )
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
                                        <Image source={{uri : this.state.avatar+'?time=' + new Date()}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
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
                                    <Text style={styles.mainTitleText}>{"Propiedades"}</Text>
                                </View>
                            </View>
                                
                            <View style={{flex:1}}>
                                <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                />
                            </View>
                                
                            </ScrollView>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateProperties",{refresProperties : this.refresProperties})}>
                                    <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                                        <Text style={[styles.titleText,{color:'#fff'}]}>{"Agregar Propiedad"}</Text>
                                    </View>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>            
                </SafeAreaView>
            )
        }else{
            return null
        }
    }
}