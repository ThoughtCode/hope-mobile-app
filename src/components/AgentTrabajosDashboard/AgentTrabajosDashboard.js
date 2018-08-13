import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions,SafeAreaView} from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../util/api';
import Moment from 'moment';
import TrabajosTab from '../Navigator/_TrabajosTab';

const styles = require('./AgentTrabajosDashboardStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png"),
    LOGO : require("../../../assets/img/logo_blanco.png")
}
var _this = null;

export default class AgentTrabajosDashboard extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            jobList : []
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        
    }

    //======================================================================
    // navigateToDetail
    //======================================================================

    static navigateToDetail = (item,setRow,type) =>{
        _this.props.navigation.navigate("AgentJobDetailScreen",{jobData: item.item,setRow:setRow,index: item.index,type : type})
    }

    //======================================================================
    // render
    //======================================================================

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage}/>
                    <Image source={IMAGES.LOGO} style={styles.logoStyle} />
                    <Text style={styles.titleStyle} >{"Mis Trabajos"}</Text>
                </View>
                <TrabajosTab navigateToDetail={this.navigateToDetail} />
            </SafeAreaView>
        )
    }
}