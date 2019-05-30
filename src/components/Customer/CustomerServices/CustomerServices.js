import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Moment from 'moment';
import React, { Component } from 'react';
import { Animated, AsyncStorage, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as urls from '../../../constants/api';

const { width } = Dimensions.get('window');
const styles = require('./CustomerServicesStyles');
var _this = null;

export default class CustomerServices extends Component {
  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView
  constructor(props) {
    super(props);
    _this = this
    this.state = {
      servicesTypes: [],
      activeSlide: null
    };
    this.getServicesTypes = this.getServicesTypes.bind(this);
  }

  static navigateToDetail = () => {
    _this.props.navigation.navigate("CustomerLogin")
  }

  getServicesTypes = () => {
    servicesTypesURL = urls.STAGING_URL + urls.SERVICE_TYPES;
    fetch(servicesTypesURL).then((response) => response.json()).then((responseJson) => {
              //console.log(responseJson)
              let servicesTypes = responseJson.service_type.data;
              this.setState({ servicesTypes });
            }).catch((error) => this.setState({ errorMessage: error.message }));
    };

    componentDidMount() {
        this.getServicesTypes();
    }

  render() {
    // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
    let position = Animated.divide(this.scrollX, width);
    return (
      <View style={styles.container}>
        <Image source={require('../../../../assets/img/dashboard-home.png')} style={styles.banner_image} />
        <Image source={require('../../../../assets/img/logo_blanco.gif')} style={styles.logo_image} />
        <ScrollView>
          <Text style={styles.section_title}>Servicios</Text>
          <View style={styles.section_servicios_container}>
            <ScrollView
              contentContainerStyle={styles.servicios_container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
              )}
              scrollEventThrottle={16}
            >
              {
                this.state.servicesTypes.map((serviceType) => {
                  return (
                    <View key={serviceType.id} style={styles.servicios_item}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerLogin")}>
                        <Image source={{ uri: serviceType.attributes.image.url }} style={styles.servicios_item_image} />
                      </TouchableOpacity>  
                      <View style={{width:'100%',height:'30%',flexDirection:'row'}}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerLogin")} style={{width:'60%',padding:10}}>
                              <Text style={{textAlign:'left'}}>{serviceType.attributes.name}</Text>
                           </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerLogin")} style={{width:'40%',padding:10}}>
                              <Text style={{textAlign:'center',fontSize:20, color: "#0069A7",}}>Contratar</Text>
                          </TouchableOpacity>
                      </View>          
                    </View>
                  );
                })
              }
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
              {this.state.servicesTypes.map((_, i) => {
                let opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp'
                });
                return (
                  <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} />
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View style={{flex: 1, justifyContent: "flex-end", alignItems: 'center',flexDirection:'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CustomerSignUp')}
            >
              <View style={styles.signup_button_container}>
                <Text style={styles.action_buttons}>REGISTRO</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CustomerLogin')}
            >
              <View style={styles.login_button_container}>
                <Text style={styles.action_buttons}>INICIAR SESIÓN</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}