import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './CardListScreenStyle';
const { height, width } = Dimensions.get('window')
import { API } from '../../../util/api';
const IMAGES = {
    TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class CardListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            cardListData: [],
        }
    }

    componentDidMount() {
        API.getCardLists(this.cardListsResponseData, {}, true);
    }

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

    renderRow = (item) => {
        var data = item.item
        console.log('Item -->', data)
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
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () => {
        return (
            <View style={{ flex: 1, width: width, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }} >
                <Text style={{ fontSize: 18, fontFamily: 'helvetica' }}>{"No tiene propiedades, por favor\ningrese una Nueva Direccion"}</Text>
            </View>
        )
    }

    onPress = () =>{
        const { setCard } = this.props.navigation.state.params
        let cardData = this.state.cardListData && this.state.cardListData.filter(x => x.isChecked == true)[0]
        setCard(cardData)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
                    <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
                        <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Tarjetas"}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.cardListData}
                        renderItem={this.renderRow}
                        ListEmptyComponent={this.ListEmptyComponent}
                        keyExtractor={(item, index) => index.toString()} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCardScreen')}>
                        <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={this.onPress}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>{"Escoger"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}