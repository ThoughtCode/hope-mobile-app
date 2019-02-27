import React, {Component} from 'react';
import {Text,TouchableOpacity,View,Image,Dimensions,SafeAreaView,Modal,ScrollView,Animated} from 'react-native';
import TrabajosTab from '../../Navigator/_CustomerTrabajosTab';
import * as urls from '../../../constants/api';
import * as globals from '../../../util/globals';
const {width} = Dimensions.get('window')
const styles = require('./CustomerTrabajosDashboardStyles');

const IMAGES = {
  TOP_BACKGROUND : require("../../../../assets/img/topbg.png"),
  LOGO : require("../../../../assets/img/logo_blanco.gif")
}

export default class CustomerTrabajosDashboard extends Component {

  //======================================================================
  // constructor
  //======================================================================
  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView
  constructor(props){
    super(props)
    _this = this
    this.state = {
      modalVisible : false,
      servicesTypes : [],
    }
    this.getServicesTypes = this.getServicesTypes.bind(this);
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    this.getServicesTypes(globals.access_token);
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

  //======================================================================
  // navigateToDetail
  //======================================================================

  navigateToDetail = (item,type) =>{
    this.props.navigation.navigate("CustomerJobDetailScreen",{jobData: item,type : type})
  }

  //======================================================================
  // Modal Display
  //======================================================================

  displayModal(){
    let position = Animated.divide(this.scrollX, width);
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({modalVisible : false})}>

        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={() => this.setState({modalVisible : false})}>
            <Text style={{color:'#fff',alignItems:'flex-start',justifyContent: 'flex-start'}}>X</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'transparent',width: width - 40,}}>
            <View style={styles.section_servicios_container}>
              <ScrollView
                contentContainerStyle={styles.servicios_container}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
                )}
              >
              {
                this.state.servicesTypes.map((serviceType) => {
                  return (
                    <View key={serviceType.id} style={styles.servicios_item}>
                      <TouchableOpacity onPress={() => this.setState({modalVisible : false},()=> {this.props.navigation.navigate("CustomerCleaning", { serviceType: serviceType })})}>
                        <Image source={{ uri: serviceType.attributes.image.url }}
                          style={styles.servicios_item_image}
                          resizeMode={"cover"}
                        />
                        <Text style={styles.servicios_item_description}>{serviceType.attributes.name}</Text>
                      </TouchableOpacity>
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
                    <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#fff', margin: 8, borderRadius: 5 }}/>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    return(
      <SafeAreaView style={styles.container}>
        {this.displayModal()}
        <View>
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage}/>
          <Image source={IMAGES.LOGO} style={styles.logoStyle} />
          <Text style={styles.titleStyle} >{"Mis Trabajos"}</Text>
        </View>
        <TrabajosTab screenProps={{navigateToDetail: this.navigateToDetail}} />
        <View style={styles.logout_container}>
          <TouchableOpacity style={styles.logout_button} onPress={() => this.setState({modalVisible : true})}>
            <Text style={styles.logout_button_text}>{"Nuevo trabajo"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}