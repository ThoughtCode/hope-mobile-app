import React,{Component} from 'react';
import {
    Switch,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './ServiceDetailStyle';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class ServiceDetail extends Component {
    constructor() {
        super();
        this.state = {
            switchValue: false,
            habitaciones : 0,
            banos : 0
        }
    }
    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        console.log('Switch is: ' + value)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10}}>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"Detalles del servicio"}</Text>
                </View>
            
                <View style={styles.titleViewContainer}>
                    <Text style={styles.titleTextStyle}>Numero de habitaciones</Text>
                </View>
                <View style={styles.childContainer}>
                    <View style={styles.subChildContainer}>
                        <View style={styles.itemViewCotainer}>
                            <TouchableOpacity onPress={() => this.setState({habitaciones :  this.state.habitaciones - 1})}>
                                <View style={styles.minusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        -
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ width: 150, textAlign: 'center' }}>
                            {this.state.habitaciones + " Habitaciones"}
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({habitaciones :  this.state.habitaciones + 1})}>
                                <View style={styles.plusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titleViewContainer}>
                        <Text style={styles.titleTextStyle}>Numero de banos</Text>
                    </View>
                    <View style={styles.subChildContainer}>
                        <View style={styles.itemViewCotainer}>
                            <TouchableOpacity onPress={() => this.setState({banos :  this.state.banos - 1})}>
                                <View style={styles.minusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        -
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ width: 150, textAlign: 'center' }}>
                            {this.state.banos+ " banos"}
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({banos :  this.state.banos + 1})}>
                                <View style={styles.plusView}>
                                    <Text style={{ textAlign: 'center' }}>
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.titleViewContainer}>
                    <Text style={styles.titleTextStyle}>Servicios adicionales</Text>
                </View>

                <View style={{ margin: 10 }}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.itemTextStyle}>
                            Refrigerador
                        </Text>
                        <Switch
                            style={styles.swithStyle}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue}
                        />
                    </View>
                    <View
                        style={styles.deviderStyle} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.itemTextStyle}>
                            Horno
                        </Text>
                        <Switch
                            style={styles.swithStyle}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue}
                        />
                    </View>
                    <View style={styles.deviderStyle} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.itemTextStyle}>
                            Lavado Ropa
                        </Text>
                        <Switch
                            style={styles.swithStyle}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue}
                        />
                    </View>
                    <View style={styles.deviderStyle} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.itemTextStyle}>
                            Secado Ropa
                        </Text>
                        <Switch
                            style={styles.swithStyle}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue}
                        />
                    </View>
                    <View style={styles.deviderStyle} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.itemTextStyle}>
                            Planchado
                        </Text>
                        <Switch
                            style={styles.swithStyle}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue}
                        />
                    </View>
                    <View style={styles.deviderStyle} />
                </View>
                <TouchableOpacity>
                    <View style={styles.buttonViewStyle}>
                        <Text style={styles.buttonTextStyle}>Escoger</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}