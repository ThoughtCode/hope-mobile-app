import React, {Component} from 'react';
import {Text, TouchableOpacity, FlatList, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,TextInput,Keyboard, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import StarRating from '../../../lib/react-native-star-rating';
import EvilIcons from '@expo/vector-icons/EvilIcons';
const {height , width} = Dimensions.get('window')
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import { API } from '../../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';

const styles = require('./AgentCommentStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class AgentComment extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            userData : null,
            isLoading : true,
            firstName : globals.first_name,
            lastName : globals.last_name,
            avatar : globals.avatar,
            reviewsCommentList : []
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        API.getAgentCommentsProfile(this.getAgentCommentsProfileResponse,data,true);
    }

    //======================================================================
    //getAgentCommentsResponseData
    //======================================================================

    getAgentCommentsProfileResponse = {
        success: (response) => {
            console.log("-------------------------------> RESPONSE",response)
            try {
                console.log("getAgentCommentsProfileResponse data-->"+JSON.stringify(response.review.data))
                this.setState({
                    reviewsCommentList : response.review.data
                })
            } catch (error) {
                console.log('getAgentCommentsProfileResponse catch error ' + JSON.stringify(error));
            }
        },
        error: (err) => {
            console.log('getAgentCommentsProfileResponse error ' + JSON.stringify(err));
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
            // <View style={styles.renderRowView}>
            //     <View style={{flexDirection:'row',alignItems:'center'}}>
            //         <View style={styles.userImageView} >
            //             {(data.attributes.my_reviews.data.attributes.reviewee_avatar.url != null)?
            //                 <Image source={{uri : data.attributes.my_reviews.data.attributes.reviewee_avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
            //             :
            //             <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
            //         </View>
            //         <View style={{flex:1}}>
            //             <Text style={styles.titleText}>{data.attributes.my_reviews.data.attributes.reviewee_first_name + " "+ data.attributes.my_reviews.data.attributes.reviewee_last_name}</Text>
            //         </View>
            //         <StarRating
            //             disabled={true}
            //             emptyStar={'ios-star-outline'}
            //             fullStar={'ios-star'}
            //             halfStar={'ios-star-half'}
            //             iconSet={'Ionicons'}
            //             maxStars={5}
            //             rating={data.attributes.qualification}
            //             starSize={18}
            //             fullStarColor={'#ffd700'}/>
            //     </View>
            //     <Text style={styles.subText} numberOfLines={0}>{data.attributes.comment}</Text> 
            // </View>
            <View style={{flex:1,marginHorizontal:20}}>
                <View style={styles.textInputVieW}>
                    <Text style={styles.textInputTitleText}>{data.attributes.my_reviews.data.attributes.owner_first_name + " "+ data.attributes.my_reviews.data.attributes.owner_last_name}</Text>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={"Ionicons"}
                        maxStars={5}
                        rating={data.attributes.qualification}
                        starSize={20}
                        fullStarColor={'#ffd700'}
                    />
                </View>
                <View>
                <Text style={styles.textInputCommentText}>{data.attributes.comment}</Text>
                </View>
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
        var initials = globals.first_name.charAt(0) || ""
        initials += globals.last_name.charAt(0) || ""
        return(
            <SafeAreaView style={styles.container}>
                 <KeyboardAvoidingView
                    style={{flex:1}}
                    behavior="padding">
                    <ScrollView style={{flex:1}} bounces={false}>
                        <View>
                            <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                                <View style={styles.profileView}>

                                    {(this.state.avatar != "")?
                                        <Image source={{uri : this.state.avatar+'?time=' + new Date()}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>
                                        :
                                        <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                            <Text style={{ color: '#fff' }}>{initials}</Text>
                                        </View>
                                    }
                                </View>

                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                                </View>
                                <View style={styles.opinionsView}>
                                    <StarRating
                                        disabled={true}
                                        emptyStar={'ios-star-outline'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={"Ionicons"}
                                        maxStars={5}
                                        rating={2}
                                        starSize={20}
                                        fullStarColor={'#ffd700'}
                                    />
                                </View>
                            <View style={styles.topTitleView}>
                                <Text style={styles.mainTitleText}>{"Comentarios"}</Text>
                            </View>
                        </View>
                        <FlatList 
                            data = {this.state.reviewsCommentList}
                            renderItem = {this.renderItem}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            keyExtractor={(item)=>item.id.toString()}
                            ListEmptyComponent={this.ListEmptyComponent}
                        />
                        
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
