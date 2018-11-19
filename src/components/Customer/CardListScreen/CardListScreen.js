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
import styles from './CardListScreenStyle';
const {height , width} = Dimensions.get('window')
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
export default class CardListScreen extends Component {
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

    handleChange = (index) => {
        let checked = [...this.state.checked];
        checked[index] = !checked[index];
        this.setState({ checked });
    }

    renderRow = (item) =>{
        return(
            <View style={styles.childContainer}>
                <Entypo name={"home"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
                <View style={styles.itemView}>
                    <Text>
                        {item.item.name}
                    </Text>
                    <Text>
                        {item.item.description}
                    </Text>
                </View>
                <Entypo name={"edit"} size={30} color={"rgb(0,121,189)"} style={styles.iconStyle} onPress={() => alert("onClick")} />
            </View>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCardScreen')}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar tarjeta"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}