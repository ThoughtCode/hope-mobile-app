import React, { Component } from 'react';
import {Text,View,TouchableOpacity,FlatList,Image,Dimensions,AsyncStorage} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './CardListScreenStyle';
import { API } from '../../../util/api';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';
const { width } = Dimensions.get('window')
const IMAGES = {
  TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}

export default class CardListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      cardListData: [],
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

  componentDidMount() {
    API.getCardLists(this.cardListsResponseData, {}, true);
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      const authToken = data.customer.data.attributes.access_token;
      globals.access_token = authToken;
      this.getServicesTypes(authToken);
    })
  }

  cardListsResponseData = {
    success: (response) => {
      try {
        let temCardList = response.payment.data.map((item) => {
          item.isChecked = false;
          return item
        })
        this.setState({
          cardListData: temCardList
        })
      } catch (error) {
        console.log('getCardResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getCardResponseData error ' + JSON.stringify(err));
    }
  }

  selectCardTap(index){
    let cardData = this.state.cardListData;
    let newCardList = cardData.map((x) => {x.isChecked = false; return x})
    let selectedObject = newCardList[index];
    selectedObject.isChecked = !selectedObject.isChecked
    newCardList.slice(selectedObject,index);
    this.setState({ cardListData : newCardList });
  }

  renderRow = (item) => {
    var data = item.item
    console.log('Item -->', data)
    return (
      <TouchableOpacity onPress={() => this.selectCardTap(item.index)}>
        <View style={styles.childContainer}>
          <FontAwesome name={(data.isChecked) ? "check-square" : "square-o"} size={30} onPress={() => this.selectCardTap(item.index)} style={{ color: '#1F68A9' }}  />
          <View style={styles.itemView}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name={"cc-visa"} size={20} color={"rgb(0,121,189)"} style={styles.iconStyle} />
              <Text style={{ flex: 0.6 }}>
                {item.item.attributes.number}
              </Text>
              <Text style={{ flex: 0.4 }}>
                {"Exp." + item.item.attributes.expiry_month + "/" + item.item.attributes.expiry_year}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>
                {"Nombre : " + item.item.attributes.holder_name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, width: width, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }} >
        <Text style={{ fontSize: 18, fontFamily: 'helvetica' }}>{"No tienes tarjetas, por favor ingresa una."}</Text>
      </View>
    )
  }

  onPress = () =>{
    let cardData = this.state.cardListData && this.state.cardListData.filter(x => x.isChecked == true)[0]
    let jobCurrentStateSend = this.props.navigation.state.params.jobActualState
    this.state.servicesTypes.map((serviceType) => {
      this.props.navigation.navigate("CustomerCleaning",{serviceType : serviceType, is_second_load: true, jobCurrentState: jobCurrentStateSend, newCardData: cardData })
    })
  }

  render() {
    console.log("STATE SECUNDARIO COMPONENT ------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>")
    return (
      <View style={styles.container}>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={this.onPress} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
          <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Tarjetas"}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.cardListData}
            renderItem={this.renderRow}
            ListEmptyComponent={this.ListEmptyComponent}
            keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCardScreen',{jobActualState : this.props.navigation.state.params.jobActualState})}>
            <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"Agregar tarjeta"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical:10 }}>
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>{"Escoger"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}