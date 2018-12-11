import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './AdditionalDetailStyle';

export default class AdditionalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailText : ''            
        }
    }

    onPress = () =>{
        const {setAdditionalInfo} = this.props.navigation.state.params
        setAdditionalInfo(this.state.detailText)
        this.props.navigation.goBack()
    }
    
    render() {
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View style ={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"DETALLES ADICIONALES."}</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        underlineColorAndroid='transparent'
                        placeholder='Provide any important details for you Tasker.\n For example, what supples are needed. where to park. or timing restrictions.'
                        multiline= {true}
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({detailText : text})} />
                </View>
                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={this.onPress}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>{"Gaurdar"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}