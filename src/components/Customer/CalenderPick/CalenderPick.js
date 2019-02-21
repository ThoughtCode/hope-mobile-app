import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './CalenderPickStyles';
import Moment from 'moment';
import { API } from '../../../util/api';
import TimePicker from 'react-native-modal-datetime-picker';

export default class CalenderPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: this.props.navigation.state.params.start_date,
      time : this.props.navigation.state.params.start_date.hours() + " : "+ this.props.navigation.state.params.start_date.minutes(),
      is_start : this.props.navigation.state.params.is_start,
      isHoliday: null,
      isDateTimePickerVisible: false,
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    var initialDate = Moment.utc(new Date(date)).set(
      {h: this.props.navigation.state.params.start_date.hours(), m: this.props.navigation.state.params.start_date.minutes()}
    )
    this.setState({
      selectedStartDate: initialDate
    });
  }

  onPress = () =>{
    API.getHoliday(this.getHolidayResponse, this.props.navigation.state.params.service_id, true)
  }

  getHolidayResponse = {
    success: (response) => {
      const { setDate } = this.props.navigation.state.params;
      let selectedDate = this.state.selectedStartDate;
      let date = this.state.selectedStartDate
      let isHoliday = false
      // Primero ver si es sabado o domingo
      if(date.day() == 0 || date.day() == 6) {
        isHoliday = true
        setDate(selectedDate, this.state.is_start, isHoliday)
        this.props.navigation.goBack();
      }
      // Ver si es holiday
      response.holiday.data.map(item =>{
        if(item.attributes.holiday_date == date.format('YYYY-MM-DD')){
          isHoliday = true
          setDate(selectedDate, this.state.is_start, isHoliday)
          this.props.navigation.goBack();
        }
      })
      // Si no es holiday re
      setDate(selectedDate, this.state.is_start, isHoliday)
      this.props.navigation.goBack();
    },
    error: (err) => {
      console.log('getHolidayData error ' + JSON.stringify(err));
    }
  }
  
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    let updateTime = Moment(date).format('LT')
    date_with_hours = date
    date_with_hours = this.state.selectedStartDate.set({h: Moment(date).format('hh'), m: Moment(date).format('mm')});
    this.setState({
      time : updateTime,
      selectedStartDate: date_with_hours
    })
    this._hideDateTimePicker();
  };
    
  render() {
    let { data, checked } = this.state;
    return (
      <View style={styles.container}>
        <View style ={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Fecha y Hora"}</Text>
        </View>
        <View style={{flex:1,justifyContent:'space-around'}}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            selectedStartDate={this.state.selectedStartDate}
            weekdays={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
            months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
            previousTitle="Anterior"
            nextTitle="Próximo"
          />
          {this.state.is_start != false ? 
          <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={{fontSize:28,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{this.state.time}</Text>
            </TouchableOpacity>
            <TimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode='time'
            />
          </View>: null}
        </View>
        <View style={{ marginVertical:10 }}>
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>Escoger</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}