import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {API} from '../../../util/api';
import JobList from "./_JobList";

const styles = require('./CustomerJobListStyles');
var _this = null;

export default class CustomerJobList extends Component {

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

  static jobsApiCall(){
    _this.setState({isAPICall:true,page : 1,jobList:[]})
    API.getCustomerJobs(_this.getJobResponseData,"/"+_this.state.type+"?current_page=1",true);
  }

  getJobsAPICall(){
    this.setState({isAPICall:true})
    API.getCustomerJobs(this.getJobResponseData,"/"+this.state.type+"?current_page=1",true);
  }

  //======================================================================
  // onRefresh
  //======================================================================

  onRefresh = () =>{
    this.setState({isOnRefresh : true,isAPICall:true,page : 1})
    API.getCustomerJobs(this.getJobResponseData,"/"+this.state.type+"?current_page=1",true);
  }

  //======================================================================
  // getJobResponseData
  //======================================================================

  getJobResponseData = {
      success: (response) => {
        console.log("ESTA MIERDA ES EL APIII CUSTOMER",response)
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

                console.log('RECIBIENDO INFO DE API')
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
                    API.getCustomerJobs(this.getJobResponseData,data,true);
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

    navigateToDetail = (item) =>{
      // this.props.navigation.navigate("CustomerJobDetailScreen",{jobData:job})
      this.props.screenProps.navigateToDetail(item,this.props.type)
    }
    
    //======================================================================
    // render
    //======================================================================

    render(){
      return(
        <SafeAreaView style={styles.container}>
          <JobList isLoading={this.state.isAPICall} jobList={this.state.jobList} type={this.state.type} setRow={this.setRow} onRefresh={this.onRefresh} isOnRefresh={this.state.isOnRefresh} onEndReached={this.onEndReached} onMomentumScrollBegin={this.onMomentumScrollBegin} navigateToDetail={this.navigateToDetail}/>
        </SafeAreaView>
      )
    }
}