import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    CheckBox
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './CalenderPickStyles';

export default class CalenderPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
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
                        <Text style={{fontSize:28,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"12:00 hrs"}</Text>
                    </View>
                </View>
                
                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('thirdScreen')}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>Escoger</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}