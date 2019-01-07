import React, {Component} from 'react';
import {Text, TouchableOpacity, FlatList, View, ScrollView, Image, Dimensions,SafeAreaView,KeyboardAvoidingView} from 'react-native';
const {width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import DatePicker from 'react-native-datepicker';
import Octicons from '@expo/vector-icons/Octicons';
import Moment from 'moment';

const styles = require('./AgentReportStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class AgentComment extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      userData : null,
      isLoading : true,
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar,
      reportList : [],
      startDate : Moment().startOf('week').format(),
      endDate : Moment().endOf('week').format(),
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    var url = "?"+"date_from="+this.state.startDate+"&date_to="+this.state.endDate
    API.getAgentReportProfile(this.getAgentReportProfileResponse,url,true);
    console.log("--------------->Report",this.state.reportList)
  }

  //======================================================================
  //getAgentCommentsResponseData
  //======================================================================

  getAgentReportProfileResponse = {
    success: (response) => {
      try {
        console.log("getAgentReportProfileResponse data-->"+JSON.stringify(response.job.data))
        this.setState({
          reportList : response.job.data
        })
      } catch (error) {
        console.log('getAgentReportProfileResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getAgentReportProfileResponse error ' + JSON.stringify(err));
    },
    complete: () => {
    }
  }

  //======================================================================
  //renderItem
  //======================================================================

  renderItem = (item) =>{
    var data = item.item
    var nameService = ""
    var firstName = data.attributes.customer.first_name
    var lastName = data.attributes.customer.last_name
    var subTotal = data.attributes.total
    var vat = data.attributes.vat
    var fee = data.attributes.service_fee
    var total = subTotal - fee - vat
    data.attributes.job_details.map((data) => {
      if(data.service.type_service == "base"){
        nameService = data.service.name
      }
    })
    return(
      <View style={{marginVertical:5,marginTop:20}}>
        <View style={styles.textInputVieW}>
          <Text>{nameService}</Text>
          <Text>Total Trab.</Text>
          <Text>I.V.A</Text>
          <Text>Noc Noc</Text>
          <Text>TOTAL</Text>
        </View>
        <View style={styles.textInputVieW}>
          <Text style={styles.textInputCommentText}>{firstName} {lastName}</Text>
          <Text>${subTotal.toFixed(2)}</Text>
          <Text>${vat.toFixed(2)}</Text>
          <Text>${fee.toFixed(2)}</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
      </View>
    )
  }

  //======================================================================
  //ItemSeparatorComponent
  //======================================================================

  ItemSeparatorComponent = () =>{
    return(
      <View style={{height:0.5,width:width,backgroundColor:'gray'}} />
    )
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () =>{
    return(
      <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
        <Text style={styles.emptyText}>{"No tienes trabajos en ésta fecha"}</Text>
      </View>
    )
  }
  
  //======================================================================
  // Btn Fiter
  //======================================================================

  btnFilterTap = () =>{
    var url = "?"+"date_from="+this.state.startDate+"&date_to="+this.state.endDate
    API.getAgentReportProfile(this.getAgentReportProfileResponse,url,true);
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    var initials = globals.first_name.charAt(0) || ""
    var total_earning = 0
    initials += globals.last_name.charAt(0) || ""
    this.state.reportList.map((d) => {
      var vat_earning = d.attributes.vat
      var fee_earning = d.attributes.service_fee
      total_earning += d.attributes.total - vat_earning - fee_earning
    })
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
                <Text style={styles.mainTitleText}>{"Reportes"}</Text>
              </View>
              <TouchableOpacity onPress={this.btnFilterTap}>
                <View style={[styles.bottomButton,{alignItems:'center',backgroundColor:'rgb(0,121,189)'}]}>
                  <Text style={[styles.titleText,{color:'#fff'}]}>{"Filtrar"}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,marginHorizontal:20}}>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text style={styles.textStyle}>{"Desde"}</Text>
                <DatePicker
                  style={{flex:1,marginLeft:10}}
                  date={this.state.startDate}
                  mode="date"
                  placeholder=""
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={<Octicons name={"calendar"} size ={30} style={{color:'gray', position:'absolute', left : 10, borderRightWidth: 1, paddingRight:5}} />}
                  onDateChange={(date) => {this.setState({startDate: date})}}
                />
              </View>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginLeft:5}}>
                <Text style={styles.textStyle}>{"Hasta"}</Text>
                <DatePicker
                  style={{flex:1,marginLeft : 10}}
                  date={this.state.endDate}
                  mode="date"
                  placeholder=""
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={<Octicons name={"calendar"} size ={30} style={{color:'gray', position:'absolute', left : 10, borderRightWidth: 1, paddingRight:5}} />}
                  onDateChange={(date) => {this.setState({endDate: date})}}
                />
              </View>
              <FlatList 
                data = {this.state.reportList}
                renderItem = {this.renderItem}
                ItemSeparatorComponent={this.ItemSeparatorComponent}
                keyExtractor={(item)=>item.id.toString()}
                ListEmptyComponent={this.ListEmptyComponent}
              />
            </View>
          </ScrollView>
          <View style={styles.renderRowView}>
            <Text style={styles.titleText}>
              {"Tú ganancia"}
              <Text style={[styles.titleText,{color:'rgb(0,121,189)'}]}>{" $"+total_earning.toFixed(2)}</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}