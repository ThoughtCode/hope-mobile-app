import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './DirectionScreenStyles';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
export default class DirectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            data : [],
            // data: [
            //     {
            //         name: 'Casa',
            //         description: '6060 La Floresta, Quito Ecuador',
            //         icon : 'home'
            //     },
            //     {
            //         name: 'Trabajo',
            //         description: '6161 La Floresta, Quito Ecuador',
            //         icon : 'home'
            //     }
            // ]
        }
    }

    componentDidMount(){
        API.customerProperties(this.getAddressResponse,{},true);
    }

    //======================================================================
    // jobApplyResponse
    //======================================================================

    getAddressResponse = {
        success: (response) => {
            try {
                console.log("getAddressResponse data-->"+JSON.stringify(response))
                response.property && response.property.data && this.setState({data : response.property.data})
                
            } catch (error) {
                console.log('getAddressResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getAddressResponse error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    refresProperties = () =>{
        API.customerProperties(this.getAddressResponse,{},true);
    }

    renderRow = (item) =>{
        let data = item.item
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddressForm",{propertyData:data,isUpdate : true,refresProperties : this.refresProperties})}>
                <View style={styles.childContainer}>
                    <Entypo name={"home"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                    <View style={styles.itemView}>
                        <Text>
                            {data.attributes.name || "Casa"}
                        </Text>
                        <Text>
                            {data.attributes.number +" "+data.attributes.s_street + " "+data.attributes.p_street+" "+data.attributes.city}
                        </Text>
                    </View>
                    <Entypo name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                </View>
            </TouchableOpacity>
        )
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () =>{
        return(
            <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
                <Text style={{fontSize:18,fontFamily:'helvetica'}}>{"No tiene propiedades, por favor\ningrese una Nueva Direccion"}</Text>
            </View>
        )
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
                <View style={{flex:1}}>
                    <FlatList
                        data={data}
                        extraData={this.state}
                        renderItem={this.renderRow}
                        ListEmptyComponent={this.ListEmptyComponent}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressForm',{refresProperties : this.refresProperties,isUpdate : false})}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Nueva Direccion"}</Text>
                    </TouchableOpacity>
                </View>
                {(this.state.data.length > 0) ? <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('thirdScreen')}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>Escoger</Text>
                        </View>
                    </TouchableOpacity>
                </View> : null}
            </View>
        );
    }
}