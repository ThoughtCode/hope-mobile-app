import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions,SafeAreaView, Slider} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {height , width} = Dimensions.get('window')
import { API } from '../../util/api';
import Moment from 'moment';
import TrabajosTab from '../Navigator/_TrabajosTab';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DatePicker from 'react-native-datepicker'

const styles = require('./AgentFilterScreenStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png"),
    LOGO : require("../../../assets/img/logo_blanco.png")
}
var _this = null;

export default class AgentFilterScreen extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            sliderValue: [0, 300],
            startData : null,
            endDate : null,
            unvez : false,
            semanal : false,
            quinenal : false,
            mensual : false,
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        
    }

    //======================================================================
    // onValueChange
    //======================================================================

    onValueChange = (values) =>{
        this.setState({
            sliderValue: values,
          });
    }

    //======================================================================
    // btnFilterTap
    //======================================================================

    btnFilterTap = () =>{
        var url = "?"

        url += "min_price="+this.state.sliderValue[0]
        url += "&max_price="+this.state.sliderValue[1]
        if(this.state.startData != null){
            url += "&date_from="+this.state.startData
        }

        if(this.state.endDate != null){
            url += "&date_to="+this.state.endDate
        }
        
        url += "&frequency="+0
        console.log("Filter URL-->"+url)
        this.props.navigation.state.params.setFilterData(url)
        this.props.navigation.goBack()
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
                    <Text style={styles.titleStyle} >{"Filtrar Trabajos"}</Text>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:1,marginHorizontal:20}}>
                        <Text style={styles.mainTitleText}>{"Monte del trabajo"}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <View>
                                <Text style={styles.textStyle}>{"$0"}</Text>
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text style={styles.textStyle}>{"$150"}</Text>
                            </View>
                            <View>
                                <Text style={styles.textStyle}>{"$300"}</Text>
                            </View>
                        </View>
                        
                        <MultiSlider
                            values={[this.state.sliderValue[0], this.state.sliderValue[1]]}
                            sliderLength={width - 20}
                            onValuesChange={this.onValueChange}
                            min={0}
                            max={300}
                            step={1}
                            allowOverlap
                            snapped
                        />

                        <Text style={styles.mainTitleText}>{"Fecha del trabajo"}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Text style={styles.textStyle}>{"Desde"}</Text>
                            
                            <DatePicker
                                style={{flex:1,marginLeft:10}}
                                date={this.state.date}
                                mode="date"
                                placeholder=""
                                format="YYYY-MM-DD"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconComponent={<Octicons name={"calendar"} size ={30} style={{color:'gray', position:'absolute', left : 10, borderRightWidth: 1, paddingRight:5}} />}
                                onDateChange={(date) => {this.setState({date: date})}}
                                />
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Text style={styles.textStyle}>{"Hasta"}</Text>
                            
                            <DatePicker
                                style={{flex:1,marginLeft : 10}}
                                date={this.state.date}
                                mode="date"
                                placeholder=""
                                format="YYYY-MM-DD"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconComponent={<Octicons name={"calendar"} size ={30} style={{color:'gray', position:'absolute', left : 10, borderRightWidth: 1, paddingRight:5}} />}
                                onDateChange={(date) => {this.setState({date: date})}}
                                />
                        </View>

                        <Text style={[styles.mainTitleText,{marginTop:10}]}>{"Frecuencia"}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                <FontAwesome name={(this.state.unvez) ? "check-square" : "square-o"} size={30} onPress={() => this.setState({unvez : !this.state.unvez})} />
                                <Text style={[styles.textStyle,{marginLeft:5}]}>{"Una vez"}</Text>
                            </View>
                            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                <FontAwesome name={(this.state.semanal) ? "check-square" : "square-o"} size={30} onPress={() => this.setState({semanal : !this.state.semanal})} />
                                <Text style={[styles.textStyle,{marginLeft:5}]}>{"Semanal"}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',marginTop:10}}>
                            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                <FontAwesome name={(this.state.quinenal) ? "check-square" : "square-o"} size={30} onPress={() => this.setState({quinenal : !this.state.quinenal})} />
                                <Text style={[styles.textStyle,{marginLeft:5}]}>{"Quinenal"}</Text>
                            </View>
                            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                <FontAwesome name={(this.state.mensual) ? "check-square" : "square-o"} size={30} onPress={() => this.setState({mensual : !this.state.mensual})} />
                                <Text style={[styles.textStyle,{marginLeft:5}]}>{"Mensual"}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={this.btnFilterTap}>
                        <View style={[styles.bottomButton,{alignItems:'center',backgroundColor:'rgb(0,121,189)'}]}>
                            <Text style={[styles.titleText,{color:'#fff'}]}>{"Filtrar"}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        )
    }
}