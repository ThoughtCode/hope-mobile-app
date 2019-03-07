import React,{Component} from 'react';
import {Text,View,TouchableOpacity,FlatList,Image,Dimensions,AsyncStorage} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './DirectionScreenStyles';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';
const {width} = Dimensions.get('window')
import { API } from '../../../util/api';
const IMAGES = {
  TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
export default class DirectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      data : [],
      servicesTypes : [],
      jobCurrentState: this.props.navigation.state.params.jobActualState,
    }
    this.getServicesTypes = this.getServicesTypes.bind(this);
  }

  getServicesTypes = (authToken) => {
    servicesTypesURL = urls.BASE_URL + urls.SERVICE_TYPES;
    fetch(servicesTypesURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => response.json()).then((data) => {
      let servicesTypes = data.service_type.data;
      this.setState({servicesTypes});
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  componentDidMount(){
    API.customerProperties(this.getAddressResponse,{},true);
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      const authToken = data.customer.data.attributes.access_token;
      globals.access_token = authToken;
      this.getServicesTypes(authToken);
    })
  }

  //======================================================================
  // jobApplyResponse
  //======================================================================

  getAddressResponse = {
    success: (response) => {
      try {
        response.property && response.property.data && this.setState({data : response.property.data})
      } catch (error) {
        console.log('getAddressResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getAddressResponse error ' + JSON.stringify(err));
    }
  }

  refresProperties = () =>{
    API.customerProperties(this.getAddressResponse,{},true);
  }

  setDirection(data){
    if(data == null || "" || undefined){
      Alert.alert('Error de selección','Error de selección, debe seleccionar una dirección',[{text:'OK'}],{ cancelable: false });
    }else{
      let directionUpdate = data
      let jobCurrentStateSend = this.props.navigation.state.params.jobActualState
      this.state.servicesTypes.map((serviceType) => {
        this.props.navigation.navigate("CustomerCleaning",{serviceType : serviceType, is_second_load: true, jobCurrentState: jobCurrentStateSend, newJobData: directionUpdate })
      })
    }
  }

  renderRow = (item) =>{
    let data = item.item
    return(
      <TouchableOpacity onPress={() => this.setDirection(data)}>
        <View style={styles.childContainer}>
          <Entypo name={"home"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle}
          />
          <View style={styles.itemView}>
            <Text>
              {data.attributes.name || "Casa"}
            </Text>
            <Text>
              {data.attributes.neightborhood +" "+ data.attributes.p_street +" "+ data.attributes.number +" "+data.attributes.s_street}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () =>{
    return(
      <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
        <Text style={{fontSize:16,color:'#1e67a9',fontFamily : 'helvetica'}}>
          {"No tiene propiedades, por favor\ningrese una nueva dirección"}
        </Text>
      </View>
    )
  }

  render() {
    let {data} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
          <View style={{position:'absolute',zIndex:1,alignItems:'center',justifyContent:'center',marginTop:50,width : width}}>
            <Text style={{color:'#fff',fontSize:22,fontFamily:'helvetica'}}>{"Dirección"}</Text>
          </View>
        </View>
        <View style={{flex:1}}>
          <FlatList
            data={data}
            extraData={this.state}
            renderItem={this.renderRow}
            ListEmptyComponent={this.ListEmptyComponent}
            keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressForm',{refresProperties : this.refresProperties,isUpdate : false,refresProperties : this.refresProperties, jobActualState : this.props.navigation.state.params.jobActualState})}>
            <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Nueva Dirección"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}