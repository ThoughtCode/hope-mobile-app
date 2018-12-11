import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
import JobList from "../AgentJobListScreen/_JobList";

const styles = require('./AgentActulesStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png"),
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
            isOnRefresh : false,
            isPagination : true,
            page : 1,
            isAPICall : false
        }
        this.onEndReachedCalledDuringMomentum = true;
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
        this.setState({isAPICall:true})
        API.getJobs(this.getJobResponseData,"/"+this.state.type+"?current_page=1",true);
    }

    //======================================================================
    // onRefresh
    //======================================================================

    onRefresh = () =>{
        this.setState({isOnRefresh : true,isAPICall:true,page : 1})
        API.getJobs(this.getJobResponseData,"/"+this.state.type+"?current_page=1",true);
    }

    //======================================================================
    // getJobResponseData
    //======================================================================

    getJobResponseData = {
        success: (response) => {
            try {
                if(this.state.isOnRefresh){
                    this.setState({
                        jobList : []
                    },() =>{
                        if(response.job && response.job.data){
                            var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                            this.setState({
                                jobList : newJobData || [],
                                isOnRefresh : false,
                                isAPICall : false,
                                isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                            })
                        }else{
                            this.setState({isOnRefresh : false,isAPICall : false,isPagination:false})    
                        }

                    })
                }else{
                    if(response.job && response.job.data){
                        var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                        this.setState({
                            jobList : newJobData || [],
                            isOnRefresh : false,
                            isAPICall : false,
                            isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                        })
                    }else{
                        this.setState({isOnRefresh : false,isAPICall : false,isPagination:false})    
                    }
                }
                
            } catch (error) {
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
                this.setState({isOnRefresh : false,isAPICall : false,})
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
            this.setState({isOnRefresh : false,isAPICall : false,})
        },
        complete: () => {
            this.setState({isOnRefresh : false,isAPICall : false,})
        }
    }

    //======================================================================
    // onEndReached
    //======================================================================

    onEndReached = () =>{
        if(!this.onEndReachedCalledDuringMomentum){
            if(this.state.isPagination && !this.state.isAPICall){
                var data = "/"+this.state.type+"?current_page="+Number(this.state.page + 1)
                this.setState({isAPICall : true,page : this.state.page + 1},() =>{
                    API.getJobs(this.getJobResponseData,data,true);
                })
            }
        }
    }

    //======================================================================
    // onMomentumScrollBegin
    //======================================================================

    onMomentumScrollBegin = () =>{
        this.onEndReachedCalledDuringMomentum = false;
    }
    
    //======================================================================
    // render
    //======================================================================

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <JobList isAgent={true} isLoading={this.state.isAPICall} jobList={this.state.jobList} type={this.state.type} setRow={this.setRow} navigateToDetail={this.props.navigateToDetail} onRefresh={this.onRefresh} isOnRefresh={this.state.isOnRefresh} onEndReached={this.onEndReached} onMomentumScrollBegin={this.onMomentumScrollBegin}/>
            </SafeAreaView>
        )
    }
}