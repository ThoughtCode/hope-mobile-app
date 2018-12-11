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
            selectedStartDate: null,
            time : new Date().getHours() + " : "+ new Date().getMinutes()
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        var initialDate = Moment.utc(new Date(date)).format("DD [de] MMM [de] YYYY")
        this.setState({
          selectedStartDate: initialDate
        });
    }

    async onTimechage(){
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: true, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                this.setState({time : hour + " : "+minute})
            }
        } catch ({ code, message }) {

            console.warn('Cannot open time picker', message);
        }
    }

    onPress = () =>{
        const { setDate } = this.props.navigation.state.params;
        let selectedDate = this.state.selectedStartDate;
        selectedDate += " - "+this.state.time+"H",
        setDate(selectedDate)
        this.props.navigation.goBack();
    }
    
    render() {
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
                    />
                    <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:28,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}} onPress={() => this.onTimechage()}>{this.state.time+" hrs"}</Text>
                    </View>
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