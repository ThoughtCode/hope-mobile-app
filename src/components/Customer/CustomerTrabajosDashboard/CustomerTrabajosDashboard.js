import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions,SafeAreaView, Modal, AsyncStorage, ScrollView} from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
import TrabajosTab from '../../Navigator/_CustomerTrabajosTab';
import * as urls from '../../../constants/api';
const styles = require('./CustomerTrabajosDashboardStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png"),
    LOGO : require("../../../../assets/img/logo_blanco.png")
}
var _this = null;

export default class CustomerTrabajosDashboard extends Component {

    //======================================================================
    // constructor
    //======================================================================

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
        AsyncStorage.getItem("customerData").then((item) =>{
            // const data = this.props.navigation.getParam('data');
            const data = JSON.parse(item)
            const authToken = data.customer.data.attributes.access_token;
            this.getServicesTypes(authToken);
        })
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

    static navigateToDetail = (item,setRow,type) =>{
        _this.props.navigation.navigate("CustomerJobDetailScreen",{jobData: item.item,setRow:setRow,index: item.index,type : type})
    }

    //======================================================================
    // Modal Display
    //======================================================================

    displayModal(){
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => console.log("Modal close")}>

                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'#fff',width: width - 40,}}>
                        <View style={styles.section_servicios_container}>
                            <ScrollView
                                contentContainerStyle={styles.servicios_container}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
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
                    <Text style={styles.subTitleStyle} onPress={() => this.setState({modalVisible : true})} >{"Nuevo trabajo"}</Text>
                </View>
                <TrabajosTab navigateToDetail={this.navigateToDetail} />
            </SafeAreaView>
        )
    }
}