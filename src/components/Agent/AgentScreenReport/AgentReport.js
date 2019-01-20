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
    console.log('FECHAS INICIALES --->', this.state.startDate, this.state.endDate)
    var url = "?"+"date_from="+this.state.startDate+"&date_to="+this.state.endDate+"&current_page=1"
    API.getAgentReportProfile(this.getAgentReportProfileResponse,url,true);
  }

   //======================================================================
  // btnFilterJobs
  //======================================================================

  btnFilterJobs = () =>{

    // tomer los nuevos inputs

    // guardar en unas variables los inputs

    // setear correctamente abajo (NO TOMAR DEL ESTADO)

    console.log("Estoy aca filtro --------------------------------------------------->", this.state.startDate, this.state.endDate)
    var url = "?"
    
    if(this.state.startDate != null){
      url += "date_from=" + this.state.startDate
    }

    if(this.state.endDate != null){
      url += "&date_to=" + this.state.endDate
    }
    url = url + '&current_page=1'

    API.getAgentReportProfile(this.getAgentReportProfileResponse, url ,true);
  }

  //======================================================================
  //getAgentCommentsResponseData
  //======================================================================

  getAgentReportProfileResponse = {
    success: (response) => {
      try {
        if (response.job != undefined) {
          console.log("getAgentReportProfileResponse data------------------------------>"+JSON.stringify(response.job))
          this.setState({
            reportList : response.job.data
          })
        } else {
          this.setState({
            reportList : []
          })
        }
      } catch (error) {
        console.log('getAgentReportProfileResponse catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getAgentReportProfileResponse error ' + JSON.stringify(err));
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
    var startedAt = Moment.utc(new Date(data.attributes.started_at)).utcOffset(-5).format('l - hh:mm a')
    data.attributes.job_details.map((data) => {
      if(data.service.type_service == "base"){
        nameService = data.service.name
      }
    })
    return(
      <View style={{marginVertical:5,marginTop:20,alignItems:'center'}}>
        <View style={styles.textInputVieW}>
          <View style={{flex:2}}>
            <Text>{nameService}</Text>
          </View>
          <View style={{flex:1.3}}>
            <Text>Total Trab.</Text>
          </View>
          <View style={{flex:0.8}}>
            <Text>I.V.A</Text>
          </View>
          <View style={{flex:1.2}}>
            <Text>Noc Noc</Text>
          </View>
          <View style={{flex:0.9}}>
            <Text>TOTAL</Text>
          </View>
        </View>
        <View style={styles.textInputVieW}>
          <View style={{flex:2}}>
            <Text style={styles.textInputCommentText}>{firstName} {lastName}</Text>
          </View>
          <View style={{flex:1.3}}>
            <Text>${subTotal.toFixed(2)}</Text>
          </View>
          <View style={{flex:0.8}}>
            <Text>${vat.toFixed(2)}</Text>
          </View>
          <View style={{flex:1.2}}>
            <Text>${fee.toFixed(2)}</Text>
          </View>
          <View style={{flex:0.9}}>
            <Text>${total.toFixed(2)}</Text>
          </View>
          
        </View>
        <View style={styles.textInputVieW}>
          <View style={{flex:2}}>
            <Text style={styles.textInputCommentText}>{startedAt}</Text>
          </View>
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
              <TouchableOpacity onPress={this.btnFilterJobs}>
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
