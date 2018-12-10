import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    CheckBox
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './FrequencyStyle';

export default class Frequency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Una vez',
                    description: 'Te visitaremos una sola vez en la fecha seleccionada',
                    isSelected : false
                },
                {
                    name: 'Semanal',
                    description: 'Te visitaremos semanaimente el dia que tu elijas',
                    isSelected : false
                },
                {
                    name: 'Quincenal',
                    description: 'Te visitaremos cada 15 dias el dia que tu elijas',
                    isSelected : false
                },
                {
                    name: 'Mensual',
                    description: 'Te Visitaremos mensualmente el dia que tu elijas',
                    isSelected : false
                }
            ]
        }
    }

    handleChange = (index) => {
        let tempCheckedData = this.state.data;
        let checkedData = tempCheckedData.map((x) => { x.isSelected = false; return x; })
        let selectedObject = checkedData[index];
        selectedObject.isSelected = !selectedObject.isSelected
        checkedData.slice(selectedObject,index);
        this.setState({ data : checkedData });
    }

    renderRow = (item) =>{
        return(
            <View style={styles.childContainer}>
                <MaterialCommunityIcons name={(item.item.isSelected) ? "checkbox-marked" : "checkbox-blank-outline"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => this.handleChange(item.index)} />
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

    onPress = () =>{
        const { setFrequency } = this.props.navigation.state.params
        let frequencyArray = this.state.data && this.state.data.filter(x => x.isSelected == true)
        setFrequency(frequencyArray)
        this.props.navigation.goBack()
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