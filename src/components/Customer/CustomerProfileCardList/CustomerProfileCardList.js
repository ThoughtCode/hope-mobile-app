import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView,AsyncStorage} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';

const styles = require('./CustomerProfileCardListStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerProfileCardList extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        
        this.state = {
            cardListData : [],
            avatar : globals.avatar,
            data : null
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        AsyncStorage.getItem("customerData").then((item) =>{
            // const data = this.state.data;
            const data = JSON.parse(item)
            this.setState({data : data})
            console.log("Customer data-->",item)
      
          })
        this.getCardList()   
    }

    //======================================================================
    //cardListsResponseData
    //======================================================================

    cardListsResponseData = {
        success: (response) => {
            try {
                console.log("Response data-->" + JSON.stringify(response.payment.data))

                let temCardList = response.payment.data.map((item) => {
                    item.isChecked = false;
                    return item
                })
                this.setState({
                    cardListData: temCardList
                })
            } catch (error) {
                console.log('getCardResponseData catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getCardResponseData error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    selectCatdTap(index){
        let cardData = this.state.cardListData;
        let newCardList = cardData.map((x) => {x.isChecked = false; return x})
        let selectedObject = newCardList[index];
        selectedObject.isChecked = !selectedObject.isChecked
        newCardList.slice(selectedObject,index);
        this.setState({ cardListData : newCardList });
        console.log("CradList-->",JSON.stringify(newCardList))
    }

    //======================================================================
    //renderItem
    //======================================================================

    renderItem = (item) =>{
        var data = item.item
        return (
            <TouchableOpacity onPress={() => this.selectCatdTap(item.index)}>
                <View style={styles.childContainer}>
                    <FontAwesome name={(data.isChecked) ? "check-square" : "square-o"} size={30} onPress={() => this.selectCatdTap(item.index)} style={{ color: '#1F68A9' }}  />
                    <View style={styles.itemView}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name={"cc-visa"} size={20} color={"rgb(0,121,189)"} style={styles.iconStyle} />
                            <Text style={{ flex: 0.6 }}>
                                {item.item.attributes.number}
                            </Text>
                            <Text style={{ flex: 0.4 }}>
                                {"Exp." + item.item.attributes.expiry_month + "/" + item.item.attributes.expiry_year}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                {"Nombre : " + item.item.attributes.holder_name}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //======================================================================
    //ItemSeparatorComponent
    //======================================================================

    ItemSeparatorComponent = () =>{
        return(
            <View style={{height:0.5,width:width,backgroundColor:'gray'}} />
        )
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () =>{
        return(
            <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
                <Text style={styles.emptyText}>{"Sin Comentarios"}</Text>
            </View>
        )
    }

    getCardList = ()=>{
        API.getCardLists(this.cardListsResponseData, {}, true);
    }

    //======================================================================
    // render
    //======================================================================

    render(){
        if(this.state.data != null){
            var initials = this.state.data.customer.data.attributes.first_name.charAt(0)
            initials += this.state.data.customer.data.attributes.last_name.charAt(0) || ""
            return(
                <SafeAreaView style={styles.container}>
                    <View>
                        <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                        <View style={styles.profile_picture_name_container}>
                            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"} />
                            {(this.state.avatar && this.state.avatar != "") ?
                                <Image source={{ uri: this.state.avatar + '?time=' + new Date() }} style={styles.profile_image} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")} />
                                :
                                <View style={[styles.profile_image, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', width: 100, borderRadius: 50 }]} >
                                    <Text style={{ color: '#fff' }}>{initials}</Text>
                                </View>
                            }
                            {this.state.data && <Text style={styles.profile_name}>
                                {this.state.data.customer.data.attributes.first_name} {this.state.data.customer.data.attributes.last_name}
                            </Text>}
                        </View>
                        <View style={styles.topTitleView}>
                            <Text style={styles.mainTitleText}>{"Comentarios"}</Text>
                        </View>
                    </View> 
                    <View style={{flex:1}}>
                        <FlatList 
                            data = {this.state.cardListData}
                            renderItem = {this.renderItem}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            keyExtractor={(item)=>item.id.toString()}
                            ListEmptyComponent={this.ListEmptyComponent}
                        />
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerProfileAddCard',{getCardList : this.getCardList})}>
                            <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar nueva tarjeta"}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </SafeAreaView>
            )
        }else{
            return null
        }
    }
}