import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    CheckBox,
    TimePickerAndroid
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './CalenderPickStyles';
import Moment from 'moment';
// import { TimePickerAndroid  } from 'expo';

export default class CalenderPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: this.props.navigation.state.params.start_date,
            time : this.props.navigation.state.params.start_date.hours() + " : "+ this.props.navigation.state.params.start_date.minutes(),
            is_start : this.props.navigation.state.params.is_start
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

    async onTimechage(){
        console.log("mostrar hora cambiando")
        console.log(this.props.navigation.state.params.start_date)
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: true, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                date_with_hours = this.state.selectedStartDate.set({h: hour, m: minute});
                this.setState({
                    time : hour + " : " + minute,
                    selectedStartDate: date_with_hours
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    onPress = () =>{
        const { setDate } = this.props.navigation.state.params;
        let selectedDate = this.state.selectedStartDate; 
        setDate(selectedDate, this.state.is_start)
        this.props.navigation.goBack();
    }
    
    render() {

        console.log('MOSTRANDO ESTADO --->', this.state)
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View style ={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Fecha y Hora."}</Text>
                </View>
                <View style={{flex:1,justifyContent:'space-around'}}>
                    <CalendarPicker
                        onDateChange={this.onDateChange}
                        selectedStartDate={this.state.selectedStartDate}
                    />
                    {this.state.is_start != false ? 
                    <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:28,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}} onPress={() => this.onTimechage()}>{this.state.time}</Text>
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