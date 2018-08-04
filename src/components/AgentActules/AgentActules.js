import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../util/api';
import Moment from 'moment';
import JobList from "../AgentJobListScreen/_JobList";

const styles = require('./AgentActulesStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
}
var _this = null;
export default class AgentActules extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            jobList : [],
            type : props.type || "",
            isOnRefresh : false
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        this.getJobsAPICall()
    }

    //======================================================================
    // getJobsAPICall
    //======================================================================

    getJobsAPICall(){
        API.getJobs(_this.getJobResponseData,"/"+_this.state.type,true);
    }

    //======================================================================
    // onRefresh
    //======================================================================

    onRefresh = () =>{
        this.setState({isOnRefresh : true})
        API.getJobs(_this.getJobResponseData,"/"+_this.state.type,true);
    }

    //======================================================================
    // getJobResponseData
    //======================================================================

    getJobResponseData = {
        success: (response) => {
            try {
                console.log("Response data-->"+JSON.stringify(response.job.data))
                this.setState({
                    jobList : response.job.data,
                    isOnRefresh : false
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
    // render
    //======================================================================

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <JobList jobList={this.state.jobList} type={this.state.type} setRow={this.setRow} navigateToDetail={this.props.navigateToDetail} onRefresh={this.onRefresh} isOnRefresh={this.state.isOnRefresh}/>
            </SafeAreaView>
        )
    }
}