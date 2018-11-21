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
import styles from './FrequencyStyle';

export default class Frequency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            data: [
                {
                    name: 'Una vez',
                    description: 'Te visitaremos una sola vez en la fecha seleccionada'
                },
                {
                    name: 'Semanal',
                    description: 'Te visitaremos semanaimente el dia que tu elijas'
                },
                {
                    name: 'Quincenal',
                    description: 'Te visitaremos cada 15 dias el dia que tu elijas'
                },
                {
                    name: 'Mensual',
                    description: 'Te Visitaremos mensualmente el dia que tu elijas'
                }
            ]
        }
    }
    handleChange = (index) => {
        let checked = [...this.state.checked];
        checked[index] = !checked[index];
        this.setState({ checked });
    }

    renderRow = (item) =>{
        return(
            <View style={styles.childContainer}>
                <FontAwesome name={"check-square"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                <View style={styles.itemView}>
                    <Text>
                        {item.item.name}
                    </Text>
                    <Text>
                        {item.item.description}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View style ={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Elige la frecuencia."}</Text>
                </View>
                <View style={{flex:1}}>
                    <FlatList
                        data={data}
                        extraData={this.state}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()} />
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