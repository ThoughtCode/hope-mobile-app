import React, {Component} from 'react';
import {Text, View, ScrollView, Image, Dimensions,SafeAreaView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Agenda } from 'react-native-calendars';
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import Moment from 'moment';

const styles = require('./AgentCalendarStyles');

const IMAGES = {
  TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class AgentComment extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    _this = this
    this.state = {
      userData : null,
      isLoading : true,
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
      items : {},
      dataList : [],
      type : props.type || "",
      isOnRefresh : false,
      isPagination : true,
      page : 1,
      isAPICall : false,
      // isAgent : props.isAgent || false
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
    this.setState({isAPICall:true})
    API.getJobsAccepted(this.getJobResponseData,"/"+this.state.type+"?current_page=1",true);
  }

  //======================================================================
  // getJobResponseData
  //======================================================================

  getJobResponseData = {
    success: (response) => {
      try {
        this.setState({
          dataList : response.job.data
        })
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

  loadItems() {
    setTimeout(() => {
      this.state.dataList.map((data) => {
        const strTime = this.timeToString(data.attributes.started_at);
        if (!this.state.items[strTime]) {
          var serviceBase = ""
          data.attributes.job_details.map((s) => {
            if (s.service.type_service == "base") {
              serviceBase = s.service.name
            }
          })
          var items = this.state.items;
          var idJob = data.id
          var startedAt = data.attributes.started_at
          var finishedAt = data.attributes.finished_at
          var city = data.attributes.property.data.attributes.city
          var number = data.attributes.property.data.attributes.number
          var pStreet = data.attributes.property.data.attributes.p_street
          var sStreet = data.attributes.property.data.attributes.s_street
          var phone = data.attributes.property.data.attributes.phone
          var firstName = data.attributes.property.data.attributes.customer.data.attributes.first_name
          var lastName = data.attributes.property.data.attributes.customer.data.attributes.last_name
          items[strTime] = [];
          items[strTime].push({
            idJob: idJob,
            name: serviceBase,
            startedAt: Moment.utc(new Date(startedAt)).utcOffset(-5).format('l - hh:mm a'),
            finishedAt: Moment.utc(new Date(finishedAt)).utcOffset(-5).format('l - hh:mm a'),
            city: city,
            number: number,
            pStreet: pStreet,
            sStreet: sStreet,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            // height: Math.max(50, Math.floor(Math.random() * 150))
          });
          this.setState({items: items})
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      });
    },1000)
  }

  //======================================================================
  // setRow
  //======================================================================

  setRow = (index) =>{
    var tempArray = this.state.dataList
    tempArray.splice(index,1);
    this.setState({dataList : tempArray})
  }

  //======================================================================
  //onPressEvent
  //======================================================================
  
  onPressEvent(item){
    console.log(item)
    // this.props.navigation.navigate("AgentJobDetailScreen",{})
    // if(this.state.isAgent){
    //   if(this.props.type != null){
    //     AgentJobDetailScreen.navigateToDetail(item, this.state.dataList, this.setRow)
    //   }else{
    //     this.props.navigateToDetail(item,this.setRow)
    //   }
    // }else{
    //   CustomerTrabajosDashboard.navigateToDetail(item, this.state.dataList, this.setRow)
    // }
  }

  //======================================================================
  //renderItem
  //======================================================================

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onPressEvent(item)}>
        <View style={[styles.item, {height: item.height}]}>
          <Text>{item.name}</Text>
          <Text>{item.startedAt} {item.finishedAt}</Text>
          <Text>{item.city} {item.number} {item.pStreet} {item.sStreet}</Text>
          <Text>{item.firstName} {item.lastName} {item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  //======================================================================
  // renderEmptyDate
  //======================================================================

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Sin trabajos para esta fecha!</Text></View>
    );
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    var initials = globals.first_name.charAt(0) || ""
    initials += globals.last_name.charAt(0) || ""
    return(
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{flex:1}}
          behavior="padding">
          <ScrollView style={{flex:1}} bounces={false}>
            <View>
              <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
              <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                <View style={styles.profileView}>
                  {(this.state.avatar != "")?
                    <Image source={{uri : this.state.avatar+'?time=' + new Date()}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
                    :
                    <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                      <Text style={{ color: '#fff' }}>{initials}</Text>
                    </View>
                  }
                </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                </View>
              <View style={styles.topTitleView}>
                <Text style={styles.mainTitleText}>{"Calendario"}</Text>
              </View>
            </View>
          </ScrollView>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData = {this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
