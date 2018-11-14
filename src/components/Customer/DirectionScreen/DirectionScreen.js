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
const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}
export default class DirectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            data: [
                {
                    name: 'Casa',
                    description: '6060 La Floresta, Quito Ecuador',
                    icon : 'home'
                },
                {
                    name: 'Trabajo',
                    description: '6161 La Floresta, Quito Ecuador',
                    icon : 'home'
                }
            ]
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
                        keyExtractor={(item, index) => index.toString()} />
                </View>
                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('thirdScreen')}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>Escoger</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}