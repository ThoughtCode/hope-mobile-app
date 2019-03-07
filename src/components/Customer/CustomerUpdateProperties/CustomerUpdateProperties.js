import React, {Component} from 'react';
import {Text,TouchableOpacity,View,ScrollView,Image,SafeAreaView,FlatList,KeyboardAvoidingView,AsyncStorage,Alert} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';

const styles = require('./CustomerUpdatePropertiesStyles');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

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
    }
  }

  renderItem = (itemData) =>{
    let item = itemData.item
    let address = item.attributes.neightborhood && item.attributes.neightborhood + " "  || '' + " " 
    address += item.attributes.p_street && item.attributes.p_street + " "  || '' + " "
    address += item.attributes.number && item.attributes.number + " "  || '' + " "
    address += item.attributes.s_street && item.attributes.s_street + " "  || '' + " "
    return(
      <View style={styles.childContainer}>
        <View style={styles.itemView}>
          <Text style={{fontWeight:'900',fontSize:16,marginRight:5}}>{item.attributes && item.attributes.name && item.attributes.name || ''}</Text>
          <Text numberOfLines={2} style={{color:'gray',fontFamily : 'helvetica', margin:5}}>{address}</Text>
        </View>
        <FontAwesome name={"edit"} size={20} onPress={() => this.props.navigation.navigate('CreateProperties',{data:item, is_edit:true, refresProperties : this.refresProperties})} style={{ color: '#1F68A9' }}/>
        <FontAwesome name={"remove"} size={20} onPress={() => this.detroyProperties(item.id)} style={{ color: '#1F68A9' }}/>
      </View>
    )
  }

  detroyProperties(i){
    Alert.alert(globals.APP_NAME,"¿Seguro que quieres eliminar?",[
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Si', onPress: () => {API.detroyProperty(this.detroyPropertyResponse,i,true)}},
    ],{cancelable:false})
  }

  detroyPropertyResponse = {
    success: (response) => {
      try {
        Alert.alert('NOC NOC',response.message,[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
      } catch (error) {
        Alert.alert('NOC NOC',error.message,[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
      }
    },
    error: (err) => {
      Alert.alert('NOC NOC',err.message,[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
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
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">    
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
              <FlatList data={this.state.data} renderItem={this.renderItem} />
            </View>
            </ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateProperties",{is_edit:false, refresProperties : this.refresProperties})}>
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