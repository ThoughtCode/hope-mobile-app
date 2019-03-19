import React, {Component} from 'react';
import {Image,ScrollView,Text,TouchableOpacity,View,AsyncStorage,Linking} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as globals from '../../../util/globals';
import * as urls from '../../../constants/api';

const styles = require('./CustomerProfileStyles');

const IMAGES = {
  TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerProfile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data : null,
        avatar : globals.avatar,
      };
    this.signOutCustomer = this.signOutCustomer.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      this.setState({data : data})
      console.log("Customer data-->",item)

    })
  }

  signOutCustomer = (authToken) => {
    signoutURL = urls.BASE_URL + urls.CUSTOMER_SIGNOUT;
    fetch(signoutURL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
    }).then((response) => {
      if (response.status === 200) {
        this.props.navigation.navigate('CustomerLogin');
      }
    }).catch((error) => this.setState({errorMessage: error.message}));
  };

  _renderHeader(section) {
    return (
      <View style={styles.accordion_header}>
        <Text style={styles.accordion_header_title}>{section.title}</Text>
        <Ionicons name="ios-arrow-forward" size={24} color='#2478AE' />
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.accordion_content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  updatePhoto = () =>{
    this.setState({avatar : globals.avatar})
  }

  setData = () =>{
    this.setState({
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
    })
  }

  render() {
    if(this.state.data != null){
      var initials = this.state.data.customer.data.attributes.first_name.charAt(0)
      initials += this.state.data.customer.data.attributes.last_name.charAt(0) || ""
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.main_content}>
            <View style={styles.profile_picture_name_container}>
              <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
              {( this.state.avatar && this.state.avatar != "")?
                <Image source={{ uri: this.state.avatar + '?time=' + new Date() }} style={styles.profile_image} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")} />
                :
                <View style={[styles.profile_image, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center',width:100,borderRadius:50 }]} >
                  <Text style={{ color: '#fff' }}>{initials}</Text>
                </View>
                } 
              <Text style={styles.profile_name}>
                {this.state.data.customer.data.attributes.first_name} {this.state.data.customer.data.attributes.last_name}
              </Text>
            </View>
            <View style={{backgroundColor:'rgb(237,235,237)',paddingHorizontal:20,paddingVertical:10}}>
              <Text>{"Perfil de Cliente"}</Text>
            </View>
            <ScrollView>
              <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdateProfile",{updatePhoto : this.updatePhoto,setData : this.setData})}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Mi cuenta"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE' />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdatePassword")}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Contraseña"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE' />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdateProperties")}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Dirección de Propiedades"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE' />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CommentListScreen")}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Comentarios"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE'/>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerProfileCardList")}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Método de pago"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE'/>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerBillingList")}>
                  <View style={styles.accordion_header}>
                    <Text style={styles.accordion_header_title}>{"Detalles de facturación"}</Text>
                    <Ionicons name="ios-arrow-forward" size={24} color='#2478AE' />
                  </View>
                </TouchableOpacity>

                <View style={styles.accordion_header_contact}>
                  <Text style={styles.accordion_header_title}>{"Contáctanos"}</Text>
                </View>
                <View style={styles.accordion_header_contact}>
                  <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.nocnoc.com.ec/#contact')}}>
                    <Text style={{ textAlign: 'center', color:'blue'}}>
                      Escríbenos aqui.
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{Linking.openURL(`whatsapp://send?phone=+593995388728`)}}>
                    <Ionicons name={"logo-whatsapp"} size={24} color='green'/>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={styles.logout_container}>
              <TouchableOpacity style={styles.logout_button} onPress={() => this.signOutCustomer(this.state.data.customer.data.attributes.access_token)}>
                <Text style={styles.logout_button_text}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }else{
      return <View />
    }
  }
}