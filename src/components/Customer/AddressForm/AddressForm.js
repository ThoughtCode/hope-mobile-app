import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ScrollView,
    Image,
    Picker
} from 'react-native';
import styles from './AddressFormStyle';
import * as globals from '../../../util/globals';
const {height , width} = Dimensions.get('window')

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class AddressForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            avatar : globals.avatar,
            data : null,
            name : '',
            city : [
                {attributes : { name : "AAA"}},
                {attributes : { name : "BBB"}},
                {attributes : { name : "CCC"}},
                {attributes : { name : "DDD"}},
                {attributes : { name : "EEE"}},
            ],
            neighborhoodID : '',
            mainStreet : '',
            secondScreet : '',
            numeration : ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("customerData").then((item) =>{
          // const data = this.state.data;
          const data = JSON.parse(item)
          this.setState({data : data})
          console.log("Customer data-->",item)
    
        })
    }

    render() {
        if(this.state.data != null){
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.profile_picture_name_container}>
                            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"} />
                            {/* <Image source={require('../../../../assets/img/customer_profile.png')} style={styles.profile_image}/> */}
                            {(this.state.avatar && this.state.avatar != "") ?
                                <Image source={{ uri: this.state.avatar + '?time=' + new Date() }} style={styles.profile_image} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")} />
                                :
                                //  <View style={{backgroundColor:"rgba(99,99,99,0.7)"}}>
                                <View style={[styles.profile_image, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', width: 100, borderRadius: 50 }]} >
                                    <Text style={{ color: '#fff' }}>{initials}</Text>
                                </View>
                            }
                            <Text style={styles.profile_name}>
                                {this.state.data.customer.data.attributes.first_name} {this.state.data.customer.data.attributes.last_name}
                            </Text>
                        </View>
                        <View style={styles.titleTextViewStyle}>
                            <Text style={styles.titleTextStyle}>
                                New Property
                            </Text>
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({name : text})} />
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            {(this.state.city && this.state.city.length > 0) ?
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50, width: width - 20 }}
                                    onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex)}>
                                    <Picker.Item label={"Cuidad"} value={"Cuidad"} key={-1} />
                                    { this.state.city.map((item, key)=>{
                                        return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                    })}
                                </Picker> : <Text style={{color:'lightgray',paddingLeft:10}}>{"Cuidad"}</Text>}
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Neighborhood'
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({neighborhoodID :  text})} />
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Main Street'
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({mainStreet : text})} />
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Secondary Street'
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({secondScreet : text})} />
                        </View>
                        <View style={
                            styles.textInputStyleContainer}>
                            <TextInput
                                ref={input => {
                                    this.textInput = input
                                }}
                                underlineColorAndroid='transparent'
                                placeholder='Numeration'
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.setState({numeration : text})} />
                        </View>
                        <TouchableOpacity onPress={() => alert("Gaurdar")}>
                            <View style={styles.buttonViewStyle}>
                                <Text style={styles.buttonTextStyle}>Gaurdar</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                </ScrollView>
            )
        }else{
            return null
        }
    }
    enterText(text)
    {
        console.log('Text Input---------->',text)
    }
}