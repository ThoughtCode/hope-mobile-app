import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Image,
    Picker
} from 'react-native';
import styles from './AddressFormStyle';
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import Ionicons from '@expo/vector-icons/Ionicons'
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
            nobre : '',
            neighborhoodID : '',
            street1 : '',
            street2 : '',
            numeracion : '',
            phone : '',
            reference : '',
            userData : null,
            city : [],
            neightborhood : [],
            isUpdate : props.navigation.state.params.isUpdate || false,
            propertyData : props.navigation.state.params.propertyData || null,
            cityID : null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("customerData").then((item) =>{
          // const data = this.state.data;
          const data = JSON.parse(item)
          this.setState({data : data})
          console.log("Customer data-->",item)
        })
        API.getCity(this.getCityResponse,{},true);

        if(this.state.isUpdate){
            this.setState({
                nobre : this.state.propertyData.attributes.name,
                neighborhoodID : this.state.propertyData.attributes.neightborhood_id, 
                street1 : this.state.propertyData.attributes.s_street,
                street2 : this.state.propertyData.attributes.p_street,
                numeracion : this.state.propertyData.attributes.number,
                phone : this.state.propertyData.attributes.phone,
                reference : this.state.propertyData.attributes.additional_reference,
                cityID : this.state.propertyData.attributes.city_id
            })
        }
    }

     //======================================================================
    // getCityResponse
    //======================================================================

    getCityResponse = {
        success: (response) => {
            try {
                
                console.log("City data-->"+JSON.stringify(response))
                this.setState({
                    city : response.city && response.city.data || []
                },() =>{
                    if(this.state.isUpdate){
                        this.state.cityId && this.selectCity(this.state.cityId)
                    }
                })
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("NOC NOC",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // selectCity
    //======================================================================
    selectCity(cityId){
        API.getNeightborhoods(this.getneightborhoodResponse,this.state.city[cityId - 1].id,true);
    }

    //======================================================================
    // getneightborhoodResponse
    //======================================================================

    getneightborhoodResponse = {
        success: (response) => {
            try {
                
                console.log("neightborhood data-->"+JSON.stringify(response))
                this.setState({
                  neightborhood : response.neightborhood && response.neightborhood.data || []
                })
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("NOC NOC",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    onPressHandle = () =>{
        let data = {
            "property": {
                "name": this.state.nobre,
                "neightborhood_id": this.state.neighborhoodID, 
                "p_street": this.state.street1,
                "s_street": this.state.street2,
                "number": this.state.numeracion,
                "phone": this.state.numeracion,
                "aditional_references0": this.state.reference
            }
        }
        if(!this.state.isUpdate){
            API.createProperties(this.createPropertiesResponse,data,true);
        }else{
            this.state.propertyData && this.state.propertyData.id && API.updateProperties(this.createPropertiesResponse,data,true,this.state.propertyData.id);
        }
        
    }

    //======================================================================
    // createPropertiesResponse
    //======================================================================

    createPropertiesResponse = {
        success: (response) => {
            try {
                console.log("create properties data-->"+JSON.stringify(response))
                this.props.navigation.state.params.refresProperties()
                Alert.alert("NOC NOC",response.message,[{text: 'OK', onPress: () => {
                        this.props.navigation.goBack()    
                }}])
                
            } catch (error) {
                console.log('create propertiescatch error ' + JSON.stringify(error));
                Alert.alert("NOC NOC",error.message)
            }
        },
        error: (err) => {
            console.log('create properties error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //======================================================================
    // setFocus
    //======================================================================

    setFocus = (textField) =>{
        this[textField].focus()
    }

    render() {
        if(this.state.data != null){
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding">
                        <ScrollView style={{ flex: 1 }} bounces={false}>
                            <View>
                                <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />

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
                                    <Text style={styles.titleTextStyle}>{"Nueva Propiedad"}</Text>
                                </View>
                            </View>

                            <View>
                                <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 20 }}>
                                    <View style={styles.textInputStyleContainer}>
                                        <TextInput ref={ref => (this.firtNameInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Nobre"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.nobre}
                                            onChangeText={(nobre) => this.setState({ nobre: nobre })}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("cityInput")} />
                                    </View>

                                    <View style={[styles.textInputStyleContainer, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                                        {(this.state.city && this.state.city.length > 0) ?
                                            <Picker
                                                selectedValue={this.state.language}
                                                style={{ height: 50, width: width - 20 }}
                                                onValueChange={(itemValue, itemIndex) => this.selectCity(itemIndex)}>
                                                <Picker.Item label={this.state.city_id && this.state.city[this.state.city_id - 1] || "Cuidad"} value={this.state.city_id && this.state.city[this.state.city_id - 1] || "Cuidad"} key={-1} />
                                                {this.state.city.map((item, key) => {
                                                    return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                                })}
                                            </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Cuidad"}</Text>}

                                        {/* <TextInput  ref={ref => (this.cityInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Cuidad"}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.city}
                                                    onChangeText={(city) => this.setState({city :city})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("neighborhoodInput")} /> */}
                                    </View>

                                    <View style={[styles.textInputStyleContainer, { borderWidth: 1, borderRadius: 5, borderColor: "lightgray", height: 40, justifyContent: 'center' }]}>
                                        {(this.state.neightborhood && this.state.neightborhood.length > 0) ?
                                            <Picker
                                                selectedValue={this.state.language}
                                                style={{ height: 50, width: width - 20 }}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ neighborhoodID: this.state.neightborhood[itemIndex - 1].id })}>
                                                <Picker.Item label={ this.state.neighborhoodID && this.state.neightborhood[this.state.neighborhoodID - 1] || "Barrio"} value={this.state.neighborhoodID && this.state.neightborhood[this.state.neighborhoodID - 1] || "Barrio"} key={-1} />
                                                {this.state.neightborhood.map((item, key) => {
                                                    return (<Picker.Item label={item.attributes.name} value={item.attributes.name} key={key} />)
                                                })}
                                            </Picker> : <Text style={{ color: 'lightgray', paddingLeft: 10 }}>{"Barrio"}</Text>}
                                        {/* <TextInput  ref={ref => (this.neighborhoodInput = ref)}
                                                    underlineColorAndroid={"transparent"}
                                                    style={styles.textInputStyle}
                                                    placeholder={"Barrio "}
                                                    placeholderTextColor={"gray"}
                                                    value={this.state.neighborhood}
                                                    onChangeText={(neighborhood) => this.setState({neighborhood : neighborhood})}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => this.setFocus("streetInput")} /> */}
                                    </View>

                                    <View style={styles.textInputStyleContainer}>
                                        <TextInput ref={ref => (this.streetInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Calle Principal"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.street1}
                                            onChangeText={(street1) => this.setState({ street1: street1 })}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("street2Input")} />
                                    </View>

                                    <View style={styles.textInputStyleContainer}>
                                        <TextInput ref={ref => (this.street2Input = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Calle Secundaria"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.street2}
                                            onChangeText={(street2) => this.setState({ street2: street2 })}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("numeracionInput")} />
                                    </View>

                                    <View style={styles.textInputStyleContainer}>
                                        <TextInput ref={ref => (this.numeracionInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Numeracion"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.numeracion}
                                            onChangeText={(numeracion) => this.setState({ numeracion: numeracion })}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => this.setFocus("referenceInput")} />
                                    </View>

                                    <View style={styles.textInputStyleContainer}>
                                        <TextInput ref={ref => (this.referenceInput = ref)}
                                            underlineColorAndroid={"transparent"}
                                            style={styles.textInputStyle}
                                            placeholder={"Referencias adicionales"}
                                            placeholderTextColor={"gray"}
                                            value={this.state.reference}
                                            onChangeText={(reference) => this.setState({ reference: reference })}
                                            returnKeyType={"done"}
                                            onSubmitEditing={() => Keyboard.dismiss()} />
                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity onPress={this.onPressHandle}>
                            <View style={styles.buttonViewStyle}>
                                <Text style={styles.buttonTextStyle}>{"Guardar"}</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
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
                        <View style={{marginHorizontal:20}}>
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
                        </View>
                        <TouchableOpacity onPress={this.onPressHandle}>
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