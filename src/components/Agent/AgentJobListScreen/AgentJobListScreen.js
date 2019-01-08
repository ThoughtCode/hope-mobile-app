import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
import JobList from "./_JobList";
const styles = require('./AgentJobListScreenStyles');
import * as globals from '../../../util/globals';
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
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
            jobList : [],
            isOnRefresh : false,
            filterdata : null,
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
        AgentJobListScreen.getJobsAPICall()
    }

    //======================================================================
    // getJobsAPICall
    //======================================================================

    static getJobsAPICall(){
        _this.setState({jobList : []})
        var data =  ""
        if(_this.state.filterdata != null && _this.state.filterdata != ""){
            data = _this.state.filterdata,
            data += "&current_page=1"
        }else{
            data += "?current_page=1"
        }
        API.getJobs(_this.getJobResponseData,data,true);
    }

    //======================================================================
    // onRefresh
    //======================================================================

    onRefresh = () =>{
        this.setState({isOnRefresh : true,isAPICall : true,page :1})
        var data =  ""
        if(this.state.filterdata != null){
            data = this.state.filterdata,
            data += "&current_page=1"
        }else{
            data += "?current_page=1"
        }
        API.getJobs(_this.getJobResponseData,data,true);
    }

    //======================================================================
    // onEndReached
    //======================================================================

    onEndReached = () =>{
        if(!this.onEndReachedCalledDuringMomentum){
            if(this.state.isPagination && !this.state.isAPICall){
                var data =  ""
                if(this.state.filterdata != null){
                    data += this.state.filterdata,
                    data += "&current_page="+Number(this.state.page + 1)
                }else{
                    data += "?current_page="+Number(this.state.page + 1)
                }

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
    // setFilterData
    //======================================================================

    setFilterData = (value) =>{
        this.setState({
            filterdata : value,
            page : 1,
            jobList : []
        },() => AgentJobListScreen.getJobsAPICall())
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
                        var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                        // console.log("New JobData-->",JSON.stringify(newJobData))

                        this.setState({
                            jobList : newJobData || [],
                            isOnRefresh : false,
                            isAPICall : false,
                            isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                        })
                    })
                }else{
                    var newJobData = (response.job) ? [...this.state.jobList,...response.job.data] : this.state.jobList
                    this.setState({
                        // jobList : (response.job) ? response.job.data || [] : [],
                        jobList : newJobData || [],
                        isOnRefresh : false,
                        isAPICall : false,
                        isPagination : (response.job) ? response.job.data.length == 0 ?  false : true : false
                    })
                }

            } catch (error) {
                this.setState({
                    jobList :  [],
                    isOnRefresh : false,
                    isAPICall : false,
                    isPagination : false
                })
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
            this.setState({
                isAPICall : false,
                isOnRefresh : false
            })
        },
        complete: () => {
            this.setState({
                isAPICall : false,
                isOnRefresh : false
            })
        }
    }

    //======================================================================
    // navigateToDetail
    //======================================================================

    navigateToDetail = (item,setRow) =>{
        this.props.navigation.navigate("AgentJobDetailScreen",{jobData: item.item,setRow: setRow,index: item.index})
    }

    //======================================================================
    // render
    //======================================================================

    render(){
        if(globals.status != "pending"){
            return(
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage}/>
                        <View style={styles.topTitleView}>
                            <Text style={styles.mainTitleText}>{"Trabajos"}</Text>

                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.filterView,{marginRight:10}]}>
                                    <TouchableOpacity onPress={() => this.setState({filterdata : ""},()=> AgentJobListScreen.getJobsAPICall())}>
                                        <Text style={styles.filterText}>{"Todos"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.filterView}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AgentFilterScreen",{setFilterData : this.setFilterData})}>
                                        <Text style={styles.filterText}>{"Filtrar"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <JobList isAgent={true} isLoading={this.state.isAPICall} jobList={this.state.jobList} navigateToDetail={this.navigateToDetail} setRow={this.setRow} onRefresh={this.onRefresh} isOnRefresh={this.state.isOnRefresh} onEndReached={this.onEndReached} onMomentumScrollBegin={this.onMomentumScrollBegin}/>
                    </View>
                </SafeAreaView>
            )
        }else{
            var name = globals.first_name  || "" + " "+ globals.last_name || ""
            return(
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop:30}}>
                      <Text style={styles.titleText}>{"Hola, "+name}</Text>
                      <Text style={[styles.textFont, { fontSize:16,marginTop:20,color:"#0069a7", textAlign:"center" }]}>{"Estamos evaluando tu postulación."}</Text>
                      <Text style={styles.logo_container}>
                        <Image
                          style={styles.logo_image}
                          source={require('../../../../assets/img/logo_azul.png')}
                        />
                      </Text>
                      <Text style={[styles.textFont, { fontSize:16,marginTop:20,color:"#0069a7", textAlign:"center" }]}>{"Muy pronto nos pondremos en contacto contigo"}</Text>
                    </View>
                </SafeAreaView>
            )
        }
    }
}
