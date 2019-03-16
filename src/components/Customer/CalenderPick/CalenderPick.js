import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Alert} from 'react-native';
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
      time : null,
      date:  this.props.navigation.state.params.start_date.format('l'),
      is_start : this.props.navigation.state.params.is_start,
      isHoliday: null,
      isDateTimePickerVisible: false,
      selectedUpdateDate : false
    }
  }

  componentDidMount() {
    this.handleTimePicker(Moment());
  }

  onDateChange = (date) => {
    this.setState({
      date: date.format('l')
    });
  }

  onPress = () =>{
    var initialDate = Moment(this.state.date).format('l - ') + this.state.time
    if(!this.state.selectedStartDate == this.state.selectedStartDate){
      this.setState({selectedUpdateDate:true})
    }
    this.setState({
      selectedStartDate: initialDate
    });
    API.getHoliday(this.getHolidayResponse, this.props.navigation.state.params.service_id, true)
  }

  getHolidayResponse = {
    success: (response) => {
      const { setDate } = this.props.navigation.state.params;
      let selectedStartDate = Moment(this.state.selectedStartDate, 'l - hh:mm a');
      let date = Moment(this.state.selectedStartDate, 'l - hh:mm a');
      let isHoliday = false
      // Primero ver si es sabado o domingo
      if(date.day() == 0 || date.day() == 6) {
        isHoliday = true
        setDate(selectedStartDate, this.state.is_start, isHoliday, this.state.selectedUpdateDate)
        this.props.navigation.goBack();
      }
      // Ver si es holiday
      response.holiday.data.map(item =>{
        if(item.attributes.holiday_date == date.format('YYYY-MM-DD')){
          isHoliday = true
          setDate(selectedStartDate, this.state.is_start, isHoliday, this.state.selectedUpdateDate)
          this.props.navigation.goBack();
        }
      })
      // Si no es holiday re
      setDate(selectedStartDate, this.state.is_start, isHoliday, this.state.selectedUpdateDate)
      this.props.navigation.goBack();
    },
    error: (err) => {
      console.log('getHolidayData error ' + JSON.stringify(err));
    }
  }
  
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleTimePicker = (date) => {
    var time = Moment(date);
    var minutes = Moment(date).minutes();
    if (minutes > 0 && minutes <= 30) {
      time = Moment(date).minutes(30)
    } else {
      if (minutes > 30 && minutes <= 59) {
        time = Moment(date).minutes(0)
        time = time.hour(time.hour() + 1)
      }
    }
    this.setState({time: time.format('hh:mm a')})
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
            selectedStartDate={this.state.date}
            weekdays={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
            months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
            previousTitle="Anterior"
            nextTitle="Próximo"
            minuteInterval={30}
          />
          {this.state.is_start != false ? 
          <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={{fontSize:28,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{this.state.time}</Text>
            </TouchableOpacity>
            <TimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleTimePicker}
              onCancel={this._hideDateTimePicker}
              mode='time'
              is24Hour= {false}
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