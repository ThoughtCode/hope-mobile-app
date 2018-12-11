import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
const styles = require('./CustomerCleaningStyles');
import * as globals from '../../../util/globals';
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
var _this = null;
export default class CustomerCleaning extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){

    }

    //======================================================================
    // render
    //======================================================================

    render(){
        
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View>
                        <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                        <View style={{position:'absolute',zIndex:1,alignItems:'center',justifyContent:'center',marginTop:50,width : width}}>
                            <Text style={{color:'#fff',fontSize:22,fontFamily:'helvetica'}}>{"Limpieza de casa"}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.rowStyle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
                                <View style={styles.rowText}>
                                    <Text style={styles.titleText}>{"Dettale del Servicioaaaa"}</Text>
                                    <Text style={styles.subTitleText}>{"Sala x1, Habitacion "}</Text>
                                </View>
                            </TouchableOpacity>
                            <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                                <Text style={styles.titleText}>{"Frecuencia"}</Text>
                                <Text style={styles.subTitleText}>{"Unz vez"}</Text>
                            </View>
                            <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                                <Text style={styles.titleText}>{"Fecha y Hora"}</Text>
                                <Text style={styles.subTitleText}>{"23 de mayo de 2018 - 12:00 H"}</Text>
                            </View>
                            <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                                <Text style={styles.titleText}>{"Direccion"}</Text>
                                <Text style={styles.subTitleText}>{"2603 La floresta, Quito Ecuador"}</Text>
                            </View>
                            <Entypo name={"location-pin"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                                <Text style={styles.titleText}>{"Detallens adicionales del trabajo"}</Text>
                                <Text style={styles.subTitleText}>{"Information adicional del Servicio"}</Text>
                            </View>
                            <MaterialIcons name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={styles.rowStyle}>
                            <View style={styles.rowText}>
                                <Text style={styles.titleText}>{"Ingresa tu forma de Pago"}</Text>
                                <Text style={{fontFamily:"helvetica",fontSize:18}}>{"N XXXX-1111 Exp. 9/2020"}</Text>
                                <Text style={{fontFamily:"helvetica",fontSize:15}}>{"Nombre: Jose Castellanos"}</Text>
                            </View>
                            <EvilIcons name={"chevron-right"} size={50} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                        </View>

                        <View style={{paddingVertical:10,paddingHorizontal:15}}>
                            <Text style={{fontFamily:"helvetica",fontSize: 20, fontWeight:'bold',marginBottom:5,color : 'rgb(0,121,189)'}}>{"Total trabajo: 2.5$"}</Text>
                        </View>

                        <View style={{backgroundColor:'rgb(0,121,189)',paddingVertical:15,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontFamily:"helvetica",fontSize: 20, fontWeight:'bold',color:'#fff'}}>{"Solicitar servicio"}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}