import React, {Component} from 'react';
import {Text,TouchableOpacity,View,ScrollView,Image,Dimensions,SafeAreaView,Alert,TextInput,Keyboard,KeyboardAvoidingView,AsyncStorage,Picker} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
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
      selectedValue: null,
      isLoading : true,
      avatar : globals.avatar,
      name : '',
      city : [],
      street1 : '',
      street2 : '',
      numeracion : '',
      reference : '',
      userData : null,
      neightborhood : [],  
      data : null,
      neighborhoodID : 0,
      selectNeighborhood : '',
      cityID : null,
      cityName: '',
      directionData: null,
      data: [
        "Javascript",
        "Go",
        "Java",
        "Kotlin",
        "C++",
        "C#",
        "PHP"
      ]
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
        this.setState({
          city : response.city && response.city.data || []
        },() =>{
          if(this.state.isUpdate){
            this.state.cityId && this.selectCity(this.state.cityId)
          }
        })
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

    btnUpdateTap = () =>{
      let valid = true;
      if(this.state.name == ""){
        valid = false;
        Alert.alert('Error de validación', 'El nombre no puede estar vacío', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.city === "Ciudad" || 0 || []){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione una ciudad', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.neighborhoodID == 0){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.street1 == ""){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.street2 == ""){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.numeracion == ""){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
      if(this.state.reference == ""){
        valid = false;
        Alert.alert('Error de validación', 'Seleccione un barrio', [{ text: 'OK' }], {
          cancelable: false
        });
        return valid;
      }
        
        data = {
            "property": {
                "name": this.state.name,
                "city": this.state.city,
                "neightborhood_id": this.state.neighborhoodID, 
                "p_street": this.state.street1,
                "s_street": this.state.street2,
                "number": this.state.numeracion,
                "aditional_references0": this.state.reference
            }
        }
        // API.createProperties(this.createResponse,data,true);
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

    selectCity(itemIndex){
      API.getNeightborhoods(this.getneightborhoodResponse,itemIndex,true);
      this.state.city.map(r=>{
        this.setState({cityName: r.attributes.name})
      })
      return
    }

  //======================================================================
  // getneightborhoodResponse
  //======================================================================

  getneightborhoodResponse = {
    success: (response) => {
      try {
        this.setState({
          neightborhood : response.neightborhood.data || [],
          neighborhoodID : response.neightborhood.data.id,
        })
          
      } catch (error) {
        Alert.alert("NOC NOC",error.message)
      }
    },
    error: (err) => {
      console.log('create properties error ' + JSON.stringify(err));
    }
  }

  updateNeighborhood = (name, id) => {
    console.log("estoy aqui =================",name,id)
    if(id != 0){
      this.setState({ 
        selectNeighborhood: name, 
        neighborhoodID: id 
      })
    }
  }

  _onOpenActionSheet = () => {
    this.ActionSheet.show();
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
                                                placeholder={"Nombre"}
                                                placeholderTextColor={"gray"}
                                                value={this.state.name}
                                                onChangeText={(name) => this.setState({name : name})}
                                                // returnKeyType={"next"}
                                                // onSubmitEditing={() => this.setFocus("cityInput")}
                                    />
                                  </View>

                                  <View style={[styles.textInputVieW, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                                  {(this.state.city && this.state.city.length > 0) ?
                                    // <TouchableOpacity onPress={this._onOpenActionSheet}>
                                    //   {this.state.city.map((item, key) => {
                                    //     return (<Text>{item.attributes.name}</Text>)
                                    //   })}
                                    // </TouchableOpacity>
                                    <Picker
                                      selectedValue={this.state.cityID}
                                      // style={{ height: 50, width: width - 20 }}
                                      onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex, itemValue)}>
                                      <Picker.Item label={this.state.cityName || "Ciudad"} value={this.state.cityName} key={-1} />
                                        {this.state.city.map((item, key) => {
                                          return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                        })}
                                    </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Ciudad"}</Text>
                                  }
                                </View>

                                  <View style={[styles.textInputVieW, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                                    {(this.state.neightborhood && this.state.neightborhood.length > 0) ?
                                      <Picker
                                        selectedValue={this.state.neighborhoodID}
                                        // style={{ height: 50, width: width - 20 }}
                                        onValueChange={(itemValue, itemIndex) => this.updateNeighborhood(itemValue, itemIndex)}
                                        >
                                        <Picker.Item label={ this.state.selectNeighborhood || "Barrio"} value={this.state.selectNeighborhood} key={-1} />
                                          {this.state.neightborhood.map((item, key) => {
                                            return (<Text label={item.attributes.name} value={item.attributes.name} key={key} />)
                                          })}
                                      </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Barrio"}</Text>
                                    }
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
                {/* {console.log("AQUI ---------------------==================>>>>>>>>",this.state.city.map((c)=>[c]))}             */}
                {/* <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={'Seleccionar ciudad'}
                  options={this.state.city.map((c)=>[c.attributes.name])}
                  // cancelButtonIndex={1}
                  // id={this.state.city.map((c)=>[c.id])}
                  // name={this.state.city.map((c)=>[c.attributes.name])}
                  onPress={(index) => { this.updateNeighborhood(index) }}
                /> */}
            </SafeAreaView>
        )
        }else{
            return null
        }
    }
}