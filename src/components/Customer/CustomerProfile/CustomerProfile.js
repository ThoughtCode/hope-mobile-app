import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
}
  from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';
import * as globals from '../../../util/globals';
import * as urls from '../../../constants/api';


const styles = require('./CustomerProfileStyles');

const SECTIONS = [
  {
    title: 'Mi información',
    content: 'MI INFORMACION'
  },
  {
    title: 'Mi cuenta',
    content: 'MI CUENTA'
  },
  {
    title: 'Mis lugares',
    content: 'MIS LUGARES'
  },
  {
    title: 'Pagos',
    content: 'PAGOS'
  }
];

const IMAGES = {
  TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerProfile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        // servicesTypes: [],
        // nextJobs: [],
        // pastJobs: []
        data : null,
        avatar : globals.avatar,
      };
    //   this.getServicesTypes = this.getServicesTypes.bind(this);
    //   this.getNextJobs = this.getNextJobs.bind(this);
    //   this.getPastJobs = this.getPastJobs.bind(this);
    this.signOutCustomer = this.signOutCustomer.bind(this);
    
  }

  componentDidMount(){
    
    AsyncStorage.getItem("customerData").then((item) =>{
      // const data = this.state.data;
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
          <FontAwesome
              name="chevron-right"
              size={24}
              color='#2478AE'
          />
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
          {/* <View style={styles.header}>
            <Text style={styles.header_title}>Perfil</Text>
          </View> */}
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
            {/* <Accordion
                sections={SECTIONS}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            /> */}
            <View style={{backgroundColor:'rgb(237,235,237)',paddingHorizontal:20,paddingVertical:10}}>
              <Text>{"Perfil de Cliente"}</Text>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdateProfile",{updatePhoto : this.updatePhoto,setData : this.setData})}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Mi cuenta"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdatePassword")}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Contrasena"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerUpdateProperties")}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Propiedades"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CommentListScreen")}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Comentarios"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerProfileCardList")}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Metodo de pago"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerBillingList")}>
                <View style={styles.accordion_header}>
                  <Text style={styles.accordion_header_title}>{"Detalles de facturación"}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={24}
                    color='#2478AE'
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.logout_container}>
              <TouchableOpacity style={styles.logout_button}
                                onPress={() => this.signOutCustomer(this.state.data.customer.data.attributes.access_token)}>
                <Text style={styles.logout_button_text}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* <View style={styles.footer}>
            <TouchableOpacity style={styles.footer_item}
                              onPress={() => this.props.navigation.navigate('CustomerDashboard', {data: this.state.data})}>
              <FontAwesome
                  name="home"
                  size={24}
                  color='gray'
              />
              <Text style={styles.footer_item_text}>
                Home
              </Text>
            </TouchableOpacity>
            <View style={styles.footer_item}>
              <TouchableOpacity
                  style={styles.footer_item}
                  onPress={() => this.props.navigation.navigate('CustomerJobs', {data: this.state.data})}
              >
                <FontAwesome
                    name="briefcase"
                    size={24}
                    color='gray'
                />
                <Text style={styles.footer_item_text}>Trabajos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer_item}>
              <TouchableOpacity
                  style={styles.footer_item}
                  onPress={() => this.props.navigation.navigate('CustomerProfile', {data: this.state.data})}
              >
                <FontAwesome
                    name="user"
                    size={24}
                    color='gray'
                />
                <Text style={styles.footer_item_text}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
    );
    }else{
      return <View />
    }
  }
}
