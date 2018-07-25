import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../util/api';
import Moment from 'moment';

const styles = require('./AgentJobListScreenStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
}
var _this = null;
export default class AgentJobListScreen extends Component {

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
        AgentJobListScreen.getJobsAPICall()
    }

    //======================================================================
    // getJobsAPICall
    //======================================================================

    static getJobsAPICall(){
        API.getJobs(_this.getJobResponseData,"",true);
    }

    //======================================================================
    // getJobResponseData
    //======================================================================

    getJobResponseData = {
        success: (response) => {
            try {
                console.log("Response data-->"+JSON.stringify(response.job.data))
                this.setState({
                    jobList : response.job.data
                })
            } catch (error) {
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // setRow
    //======================================================================

    setRow = (index) =>{
        var tempArray = this.state.jobList
        tempArray.splice(index,1);
        this.setState({jobList : tempArray})
    }

    //======================================================================
    // renderItem
    //======================================================================

    renderItem = (item) =>{
        data = item.item.attributes
        var description = ""
        var subDescription = ""
        
        data.job_details.map((val,index)=>{
            if(val.service.type_service == "base"){
                description += val.service.name
            }else{
                subDescription += val.service.name + " X " + val.service.time
                subDescription += (data.job_details.length - 1 == index) ? "" : ", " 
            }
        })
        var date = Moment(data.started_at).format('MMM DD - hh:mm a')
        var location = data.property.data.attributes.p_street + ", " + data.property.data.attributes.s_street +", "+data.property.data.attributes.city
        return(
            <TouchableOpacity onPress={()=> this.props.navigation.navigate("AgentJobDetailScreen",{jobData: item.item,setRow:this.setRow,index: item.index})}>
                <View style={styles.renderRowView}>
                    <View style={styles.listTitleView}>
                        <Text style={styles.titleText}>{data.customer.first_name + " "+data.customer.last_name}</Text>
                        <Text style={[styles.textFont,{color:'rgb(0,121,189)'}]}>{date}</Text>
                    </View>
                    <Text style={[styles.textFont]}>{description}</Text>
                    <View style={styles.subtextViewStyle}>
                        <View>
                            <Text style={[styles.textFont,{fontSize:12}]}>{subDescription}</Text>
                        </View>
                        <Text style={[styles.textFont,{color:'rgb(0,121,189)',fontSize:20}]}>{data.total+" $"}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <EvilIcons name={"location"} size={16} />
                        <Text style={[styles.textFont,{marginLeft:5,fontSize:12}]}>{location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //======================================================================
    // ItemSeparatorComponent
    //======================================================================

    ItemSeparatorComponent = () =>{
        return(
            <View style={{height:1,width:width,backgroundColor:'gray'}} />
        )
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () =>{
        return(
            <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
                <Text style={styles.emptyText}>{"No hay trabajos, regrese mas trade"}</Text>
            </View>
        )
    }

    //======================================================================
    // render
    //======================================================================

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage}/>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Trabajos"}</Text>
                        <View style={styles.filterView}>
                            <Text style={styles.filterText}>{"Filtrar"}</Text>
                        </View>
                    </View>
                </View>
                <FlatList 
                    data = {this.state.jobList}
                    renderItem = {this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    keyExtractor={(item)=>item.id.toString()}
                    ListEmptyComponent={this.ListEmptyComponent}
                />
            </SafeAreaView>
        )
    }
}