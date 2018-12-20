import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView,AsyncStorage} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo';
import StarRating from '../../../lib/react-native-star-rating';
import * as globals from '../../../util/globals';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CustomerBillingListStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerBillingList extends Component {
    
  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props) 
    this.state = {
      invoicesList : [],
      data : [],
      userData : null,
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================
  
  componentDidMount(){
    console.log("Response data-->"+JSON.stringify(this.state.invoicesList))
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      this.setState({userData : data})
    })
    API.getInvoiceDetails(this.getInvoiceDetailsResponseData,{},true);
  }

  refresComments = () =>{
    API.getInvoiceDetails(this.getInvoiceDetailsResponseData,{},true);
  }

  //======================================================================
  //getInvoiceDetailsResponseData
  //======================================================================

  getInvoiceDetailsResponseData = {
    success: (response) => {
      try {
        console.log("Response data-->"+JSON.stringify(response))
        this.setState({
          invoicesList : response.invoice_detail.data
        })
      } catch (error) {
        console.log('getInvoiceDetailsResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getInvoiceDetailsResponseData error ' + JSON.stringify(err));
    },
    complete: () => {
    }
  }

  //======================================================================
  //handleChange
  //======================================================================
  
  handleChange = (index) => {
    console.log(index)
    this.props.navigation.navigate('CustomerAddBillingScreen')
    // let tempCheckedData = this.state.data;
    // let checkedData = tempCheckedData.map((x) => { x.isSelected = false; return x; })
    // let selectedObject = checkedData[index];
    // selectedObject.isSelected = !selectedObject.isSelected
    // checkedData.slice(selectedObject,index);
    // this.setState({ data : checkedData });
  }

  //======================================================================
  //renderItem
  //======================================================================

  renderItem = (item) =>{
    var data = item.item
    console.log('------------>',data)
    return(
      <View style={styles.renderRowView}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={{flex:1}}>
            <Text style={styles.subText} numberOfLines={0}><Text style={{color:'#000'}}>Razon social: </Text>{data.attributes.social_reason}</Text> 
            <Text style={styles.subText} numberOfLines={0}><Text style={{color:'#000'}}>N° de Identificatión: </Text>{data.attributes.identification}</Text> 
          </View>
          <Entypo name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => this.props.navigation.navigate('CustomerEditBillingScreen')} />
        </View>
      </View>
    )
  }

  //======================================================================
  //ItemSeparatorComponent
  //======================================================================

  ItemSeparatorComponent = () =>{
    return(
      <View style={{height:0.5,width:width,backgroundColor:'gray'}} />
    )
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () =>{
    return(
      <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
        <Text style={styles.emptyText}>{"Sin detalles de facturación"}</Text>
      </View>
    )
  }

    //======================================================================
    // render
    //======================================================================

    render(){
      console.log(this.state.invoicesList)
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
            <FlatList
              data = {this.state.invoicesList}
              renderItem = {this.renderItem}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
              keyExtractor={(item)=>item.id.toString()}
              ListEmptyComponent={this.ListEmptyComponent}
            />
          </View>
          <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerAddBillingScreen', {data: this.state.invoicesList})}>
              <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar nueva facturacion"}</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ marginVertical:10 }}>
            <TouchableOpacity onPress={() => alert("Seleccionar")}>
              <View style={styles.buttonViewStyle}>
                <Text style={styles.buttonTextStyle}>{"Seleccionar"}</Text>
              </View>
            </TouchableOpacity>
          </View>  */}
        </SafeAreaView>
      )
    }
}