import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CommentListScreenStyle');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CommentListScreen extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        
        this.state = {
            jobCommentList : [],
            
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        console.log("Response data-->"+JSON.stringify(this.state.jobCommentList))
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
                        {(data.attributes.owner.data.attributes.avatar.url != null)?
                            <Image source={{uri : data.attributes.owner.data.attributes.avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
                        :
                        <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.titleText}>{data.attributes.owner.data.attributes.first_name + " "+ data.attributes.owner.data.attributes.last_name}</Text>
                    </View>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={data.attributes.qualification || 0}
                        starSize={18}
                        fullStarColor={'gray'}/>
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
                        <Text style={styles.mainTitleText}>{"Comentarios"}</Text>
                    </View>
                </View> 

                <FlatList 
                    data = {this.state.jobCommentList}
                    renderItem = {this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    keyExtractor={(item)=>item.id.toString()}
                    ListEmptyComponent={this.ListEmptyComponent}
                />
            </SafeAreaView>
        )
    }
}