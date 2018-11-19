import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './AddCardScreenStyle';
const {height , width} = Dimensions.get('window')
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
export default class AddCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        }
    }

    render() {
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                    <View style={{position:'absolute',zIndex:1,alignItems:'center',justifyContent:'center',marginTop:50,width : width}}>
                        <Text style={{color:'#fff',fontSize:22,fontFamily:'helvetica'}}>{"Direcciones"}</Text>
                    </View>
                </View>
                <View style={{flex:1,marginTop:20}}>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                        <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Name'
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({name : text})} />
                        </View>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Name'
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({name : text})} />
                    </View>
                    <View style={{flexDirection:'row'}}> 
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"Mes"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"Ano"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>     
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>{"CVC"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Name'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({name : text})} />
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressForm')}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}