import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './AddCardScreenStyle';
import { API } from '../../../util/api';
const { height, width } = Dimensions.get('window')
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class AddCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            number: '',
            month: '',
            cvc: '',
            year: ''
        }
    }

    addCardDataResponseData = {
        success: (response) => {
            try {
                Alert.alert("Hope",response.message)
                console.log("Response data-->" + JSON.stringify(response))
                // this.setState({
                //     jobCommentList: response.review.data
                // })
            } catch (error) {
                console.log('getJobResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getJobResponseData error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }
    validation() {
        if (this.state.name === "") {
            console.log("Enter Name")
        }
        else if (this.state.number === "") {
            console.log("Enter Number")
        }
        else if (this.state.month === "") {
            console.log("Enter Month")
        }
        else if (this.state.year === "") {
            console.log("Enter Year")
        }
        else if (this.state.cvc === "") {
            console.log("Enter CVC")
        }
        else {
            console.log("Sucess")
            var data = {
                payment: {
                    "holder_name": this.state.name,
                    "card_type": "vi",
                    "number": this.state.number,
                    "token": "9209405777683805561",
                    "status": "valid",
                    "expiry_month": this.state.month,
                    "expiry_year": this.state.year
                }
            }
            API.setAddCard(this.addCardDataResponseData, data, true);
            // JSON.stringify(this.state.jobCommentList)
            // this.props.navigation.navigate('AddressForm')
        }
    }



    render() {
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                    <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
                        <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Direcciones"}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            underlineColorAndroid='transparent'
                            placeholder='Name'
                            style={styles.textInputStyle}
                            onChangeText={(name) => this.setState({ name: name })} />
                    </View>
                    <Text style={styles.textStyle}>{"Numero de tarjeta"}</Text>
                    <View style={styles.textInputStyleContainer}>
                        <TextInput
                            ref={input => {
                                this.textInput = input
                            }}
                            maxLength={10}
                            underlineColorAndroid='transparent'
                            placeholder='Card Number'
                            style={styles.textInputStyle}
                            onChangeText={(no) => this.setState({ number: no })} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>{"Mes"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    keyboardType="numeric"
                                    maxLength={2}
                                    underlineColorAndroid='transparent'
                                    placeholder='Mes'
                                    style={styles.textInputStyle}
                                    onChangeText={(month) => this.setState({ month: month })} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>{"Ano"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    maxLength={2}
                                    keyboardType="numeric"
                                    underlineColorAndroid='transparent'
                                    placeholder='Ano'
                                    style={styles.textInputStyle}
                                    onChangeText={(year) => this.setState({ year: year })} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>{"CVC"}</Text>
                            <View style={styles.textInputStyleContainer}>
                                <TextInput
                                    ref={input => {
                                        this.textInput = input
                                    }}
                                    maxLength={3}
                                    keyboardType="numeric"
                                    underlineColorAndroid='transparent'
                                    placeholder='CVC'
                                    style={styles.textInputStyle}
                                    onChangeText={(cvc) => this.setState({ cvc: cvc })} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => this.validation()}>
                        <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}