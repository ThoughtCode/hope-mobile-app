import React, {Component} from 'react';
import {Text,TouchableOpacity,View,ScrollView,Image,Dimensions,SafeAreaView,Alert,TextInput,Keyboard,KeyboardAvoidingView,AsyncStorage,Picker,Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import ActionSheet from 'react-native-actionsheet'

const {width} = Dimensions.get('window')
const styles = require('./CreatePropertiesStyles');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class CreateProperties extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      isLoading : true,
      avatar : globals.avatar,
      nombres : '',
      neighborhoodID : '',
      street1 : '',
      street2 : '',
      numeracion : '',
      reference : '',
      userData : null,
      city : [],
      neightborhood : [],
      pickerOpacity: 0,
      opacityOfOtherItems: 1, //THIS IS THE OPACITY OF ALL OTHER ITEMS, WHICH COLLIDES WITH YOUR PICKER.
      label: 'Firstvalue'
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
              Alert.alert("NOC NOC",error.message)
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
              "name": this.state.nombres,
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
        Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => {
          this.props.navigation.goBack()    
        }}])
      } catch (error) {
        console.log('create propertiescatch error ' + JSON.stringify(error));
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
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
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  checkIfIOS(){
    if(Platform.OS === 'ios'){ // check if ios
      console.log("IOS!!!");
      //this button will (onpress) set our picker visible
      return (<Button buttonStyle={{backgroundColor:'#D1D1D1', opacity: this.state.opacityOfOtherItems}} onPress={this.toggle()} color="#101010" title={this.state.label} onPress={this.changeOpacity}/>); 
    }else if(Platform.OS === 'android'){ //check if android
      
      console.log("ANDROID!!!");
    }
  }

  toggle(){
    if(Platform.OS === 'ios'){
      if(this.state.pickerOpacity == 0){
        this.setState({
          pickerOpacity: 1,
          opacityOfOtherItems: 0 // THIS WILL HIDE YOUR BUTTON!
        });
        }else{
          this.setState({
            pickerOpacity: 0,
            opacityOfOtherItems: 1
        });
      }
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
                                                    placeholder={"nombres"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.nombres}
                                                    onChangeText={(nombres) => this.setState({nombres : nombres})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("cityInput")} />
                                    </View>
                                    {this.checkIfIOS()}
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
                                                    placeholder={"Numeración"}
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
                    title={'Seleccionar imagen'}
                    options={['Tomar foto', 'Elige de la galería', 'Cancelar']}
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