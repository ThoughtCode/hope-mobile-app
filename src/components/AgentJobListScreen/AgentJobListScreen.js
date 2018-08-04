import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../util/api';
import Moment from 'moment';
import JobList from "./_JobList";
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
            jobList : [],
            isOnRefresh : false
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
    // onRefresh
    //======================================================================

    onRefresh = () =>{
        this.setState({isOnRefresh : true})
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
    // navigateToDetail
    //======================================================================

    navigateToDetail = (item,setRow) =>{
        this.props.navigation.navigate("AgentJobDetailScreen",{jobData: item.item,setRow: setRow,index: item.index})
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
                <JobList jobList={this.state.jobList} navigateToDetail={this.navigateToDetail} setRow={this.setRow} onRefresh={this.onRefresh} isOnRefresh={this.state.isOnRefresh}/>
            </SafeAreaView>
        )
    }
}