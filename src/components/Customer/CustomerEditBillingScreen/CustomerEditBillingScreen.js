import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, Image, Dimensions,SafeAreaView,ScrollView, Picker, Icon, FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
const {height , width} = Dimensions.get('window')

const styles = require('./CustomerEditBillingScreenStyle');

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
      data : this.props.navigation.state.params.data,
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
      razonSocial : '',
      identification : '',
      nIdentification : '',
      email : globals.email,
      address : '',
      cellPhone : globals.cell_phone,
      selected : "Consumidor Final",
      valueType : ""
    }
  }

  onValueChange(value) {
    this.setState({
      selected: value,
      valueType: value
    });
  }

  //======================================================================
  // componentDidMount getInvoiceDetails
  //======================================================================

  componentDidMount(){
    // API.getJobsComments(this.getJobCommentsResponseData,this.state.jobData.customer.hashed_id,true);
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    var d = this.state.data
    var data = d[0]["attributes"]
    console.log("---------------------->", data.identification_type)
    var type = ""
    if(data.identification_type == "consumidor_final"){
      type = "Consumidor Final"
    } else if(data.identification_type == "cedula"){
      type = "Cedula"
    }
    var initial = this.state.firstName && this.state.firstName.charAt(0)
    initial +=  this.state.lastName && this.state.lastName.charAt(0)
    var initials = initial
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>  
          <View style={styles.profileView}>
            {(this.state.avatar != null) ?
              <Image source={{ uri: this.state.avatar }} style={styles.profileImage} resizeMode={"cover"} />
              :
              <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                <Text style={{ color: '#fff' }}>{initials}</Text>
              </View>
            }
          </View>
          <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
            <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " " + this.state.lastName}</Text>
          </View>
          <View style={styles.topTitleView}>
            <Text style={styles.mainTitleText}>{"Detalles de facturación"}</Text>
          </View>
        </View> 
        <View style={{flex:1}}>
          <ScrollView>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Razon Social:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => { this.razonSocial = input }}
                  style={styles.textInputStyle}
                  underlineColorAndroid='transparent'
                  placeholder='Razon Social'
                  value={data.social_reason}
                  onChangeText={(razonSocial) => this.setState({razonSocial : razonSocial})}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.setFocus("identification")} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Identificatión:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                {/* <TextInput
                  ref={input => { this.identification = input }}
                  style={styles.textInputStyle}
                  underlineColorAndroid='transparent'
                  placeholder='Identificación'
                  value={data.identification_type}
                  onChangeText={(identification) => this.setState({identification : identification})}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.setFocus("nIdentification")} /> */}
                  <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item
                      label={(type == "Consumidor Final" || "Cedula") ? ("Consumidor Final" , "Cedula") : ('')}
                      value={(type ==  "Cedula" || "Cedula") ? ("Consumidor Final" , "Cedula") : ('')}
                    />
                  </Picker>
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"N° de identification:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => { this.nIdentification = input }}
                  style={styles.textInputStyle}
                  underlineColorAndroid='transparent'
                  placeholder='N° de identification:'
                  value={data.identification}
                  onChangeText={(nIdentification) => this.setState({nIdentification : nIdentification})}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.setFocus("email")} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Correo electrónico:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => { this.email = input }}
                  style={styles.textInputStyle}
                  underlineColorAndroid='transparent'
                  placeholder='Correo electrónico'
                  value={data.email}
                  onChangeText={(email) => this.setState({email : email})}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.setFocus("address")} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
              <View style={styles.textStyle}>
                <Text>{"Dirccion:"}</Text>
              </View>
              <View style={styles.textInputStyleContainer}>
                <TextInput
                  ref={input => { this.address = input }}
                  style={styles.textInputStyle}
                  underlineColorAndroid='transparent'
                  placeholder='Dirccion:'
                  value={data.address}
                  onChangeText={(address) => this.setState({address : address})}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.setFocus("cellPhone")} />
              </View>
            </View>
            <View style={{flexDirection:'row',marginVertical:5}}>
                <View style={styles.textStyle}>
                  <Text>{"Teléfono:"}</Text>
                </View>
                <View style={styles.textInputStyleContainer}>
                    <TextInput
                      ref={input => { this.cellPhone = input}}
                      style={styles.textInputStyle}
                      underlineColorAndroid='transparent'
                      placeholder='Teléfono:'
                      value={data.telephone}
                      onChangeText={(cellPhone) => this.setState({cellPhone : cellPhone})} />
                  </View>
              </View>
          </ScrollView>
        </View>
        <View style={{ marginVertical:10 }}>
          <TouchableOpacity onPress={() => alert("Editar")}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>{"Editar"}</Text>
            </View>
          </TouchableOpacity>
        </View>     
      </SafeAreaView>
    )
  }
}