import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CustomerBillingListStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerBillingList extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        
        this.state = {
            billingList : [],
            
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        console.log("Response data-->"+JSON.stringify(this.state.billingList))
        // API.getJobsComments(this.getJobCommentsResponseData,this.state.jobData.customer.hashed_id,true);
    }

    //======================================================================
    //getJobCommentsResponseData
    //======================================================================

    getJobCommentsResponseData = {
        success: (response) => {
            try {
                console.log("Response data-->"+JSON.stringify(response.review.data))
                this.setState({
                    jobCommentList : response.review.data
                })
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

    //======================================================================
    //renderItem
    //======================================================================

    renderItem = (item) =>{
        var data = item.item
        return(
            <View style={styles.renderRowView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={styles.userImageView} >
                        <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.titleText}>{data.attributes.owner.data.attributes.first_name + " "+ data.attributes.owner.data.attributes.last_name}</Text>
                    </View>
                </View>
                <Text style={styles.subText} numberOfLines={0}>{data.attributes.comment}</Text> 
            </View>
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

    //======================================================================
    // render
    //======================================================================

    render(){
        // var initials = this.state.jobData.first_name && this.state.jobData.first_name.charAt(0)
        // initials +=  this.state.jobData.last_name && this.state.jobData.last_name.charAt(0)
        var initials = "JS"
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                    
                    <View style={styles.profileView}>
                        {(this.state.jobData && this.state.jobData.avatar && this.state.jobData.avatar.url) ?
                            <Image source={{ uri: this.state.jobData.avatar.url }} style={styles.profileImage} resizeMode={"cover"} />
                            :
                            <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                <Text style={{ color: '#fff' }}>{initials}</Text>
                            </View>
                        }
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                        {/* <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.jobData.first_name + " "+this.state.jobData.last_name}</Text> */}
                        <Text style={{fontSize:20,fontWeight:'600'}}>{"Jose Castellanows"}</Text>
                    </View>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Detalles de facturacion"}</Text>
                    </View>
                </View> 
                <View style={{flex:1}}>
                    <FlatList 
                        data = {this.state.billingList}
                        renderItem = {this.renderItem}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        keyExtractor={(item)=>item.id.toString()}
                        ListEmptyComponent={this.ListEmptyComponent}
                    />
                </View>
                <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerAddBillingScreen')}>
                        <Text style={{color:'#1F68A9',fontFamily:'helvetica',fontSize:20,fontWeight:'bold'}}>{"Agregar nueva facturacion"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical:10 }}>
                    <TouchableOpacity onPress={() => alert("Seleccionar")}>
                        <View style={styles.buttonViewStyle}>
                            <Text style={styles.buttonTextStyle}>{"Seleccionar"}</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
                
            </SafeAreaView>
        )
    }
}