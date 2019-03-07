import React, {Component} from 'react';
import {Text,TouchableOpacity,View,FlatList,Image,Dimensions,SafeAreaView,Alert} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { API } from '../../../util/api';
import * as globals from '../../../util/globals';

const {width} = Dimensions.get('window')
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}
const styles = require('./CustomerBillingListStyle');

export default class CustomerBillingList extends Component {
    
  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      billingList : [],
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    API.getDetailsListsCreateJob(this.detailsListsResponseData, {}, true);
  }

  detailsListsResponseData = {
    success: (response) => {
      try {
        let temDetailList = response.invoice_detail.data.map((item) => {
          item.isChecked = false;
          return item
        })
        this.setState({
          billingList: temDetailList
        })
      } catch (error) {
        console.log('getCardResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getCardResponseData error ' + JSON.stringify(err));
    }
  }

  //======================================================================
  //renderItem
  //======================================================================

  renderItem = (item) => {
    var data = item.item
    return (
      <View style={styles.childContainer}>
        <View style={styles.itemView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 0.6 }}>
              {item.item.attributes.social_reason}
            </Text>
            <Text style={{ flex: 0.4 }}>
              {item.item.attributes.address}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>
              {item.item.attributes.identification}
            </Text>
          </View>
        </View>
        <FontAwesome name={(data.isChecked) ? "edit" : "edit"} size={30} onPress={() => this.props.navigation.navigate('CustomerAddBillingScreen',{data:data, is_edit:true})} style={{ color: '#1F68A9' }}  />
        <FontAwesome name={(data.isChecked) ? "remove" : "remove"} size={30} onPress={() => this.detroyCard(data.id)} style={{ color: '#1F68A9' }}  />
      </View>
    )
  }

  detroyCard(i){
    Alert.alert(globals.APP_NAME,"¿Seguro que quieres eliminar?",[
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Si', onPress: () => {API.destroyInvoice(this.destroyInvoiceResponse,i,true)}},
    ],{cancelable:false})
  }

  destroyInvoiceResponse = {
    success: (response) => {
      try {
        Alert.alert('NOC NOC',response.message,[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
      } catch (error) {
        Alert.alert('NOC NOC','Error al borrar detalles de facturación',[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
      }
    },
    error: (err) => {
      Alert.alert('NOC NOC','Error al borrar detalles de facturación',[{text:'OK', onPress: () => this.props.navigation.navigate('CustomerProfile')}],{cancelable:false});
    }
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () =>{
    return(
      <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center'}} >
        <Text style={styles.emptyText}>No has registrado datos para el envío de tu factura electrónica.</Text>
      </View>
    )
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    var initials = globals.first_name && globals.first_name.charAt(0)
    initials +=  globals.last_name && globals.last_name.charAt(0)
    var initials = initials
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.navigate('CustomerProfile')} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
          <View style={styles.profileView}>
            {(this.state.jobData && this.state.jobData.avatar && this.state.jobData.avatar.url) ?
              <Image source={{ uri: this.state.jobData.avatar.url }} style={styles.profileImage} resizeMode={"cover"} />
              :
              <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                <Text style={{ color: '#fff' }}>{initials}</Text>
              </View>
            }
          </View>
          <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
            <Text style={{fontSize:20,fontWeight:'600'}}>{globals.first_name} {globals.last_name}</Text>
          </View>
          <View style={styles.topTitleView}>
            <Text style={styles.mainTitleText}>{"Detalles de facturación"}</Text>
          </View>
        </View> 
        <View style={{flex:1}}>
          <FlatList 
            data = {this.state.billingList}
            renderItem = {this.renderItem}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={this.ListEmptyComponent}
          />
        </View>
        <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerAddBillingScreen')}>
            <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar nueva facturación"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}