import React from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    CheckBox,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
import FontAwesome from '@expo/vector-icons/FontAwesome'
import styles from './PaymentScreenStyle';
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            data: [
                {
                    name: 'ALL',
                    price: '$2.0'
                },
                {
                    name: 'Android',
                    price: '$2.0'
                },
                {
                    name: 'iOS',
                    price: '$2.0'
                },
                {
                    name: 'React Native',
                    price: '$2.0'
                }
            ]
        }
    }
    render() {
        let { data, checked } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                    <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
                        <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Limpieza de casa"}</Text>
                    </View>
                </View>
                <Text style={{ margin: 10, fontSize: 18, fontFamily: "helvetica" }}>
                    23 de mayo de 2018 - 12:00H
                </Text>
                <View style={styles.deviderStyle} />
                <View style={{ flex: 0.9 }}>
                    <FlatList data={data}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.childContainer}>
                                <View style={styles.itemView}>
                                    <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                                        {item.price}
                                    </Text>
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()} />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ flex: 0.4,fontSize: 16, fontFamily: "helvetica" }}>
                        Total cleaning hours
                    </Text>
                    <Text style={{ flex: 0.6, fontSize: 16,fontFamily: "helvetica", color: '#288fe2' }}>
                        6 hours
                    </Text>
                </View>
                <View style={styles.deviderStyle} />
                <View style={{ marginTop: 25, marginBottom: 25, marginRight: 20, marginLeft: 20, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.7, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                        Total
                    </Text>
                    <Text style={{ flex: 0.3, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                        $ 14.00
                    </Text>
                </View>
                <View style={styles.deviderStyle} />
                <Text style={{ margin: 10 }}>
                    You want to defer your payment
                </Text>
                <View style={styles.textInputStyleContainer}>
                    <TextInput
                        ref={input => {
                            this.textInput = input
                        }}
                        placeholder='No defer your payment'
                        underlineColorAndroid='transparent'
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.enterText(text)} />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <FontAwesome name={"check-square"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                    <Text style={{ textAlign: 'center', margin: 5 }}>
                        I accept terms and conditions
                    </Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('thirdScreen')}>
                    <View style={styles.buttonViewStyle}>
                        <Text style={styles.buttonTextStyle}>Payment</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}