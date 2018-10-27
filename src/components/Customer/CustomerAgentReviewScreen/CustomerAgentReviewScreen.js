import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import StarRating from '../../../lib/react-native-star-rating';
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';

const styles = require('./CustomerAgentReviewScreenStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../../assets/img/topbg.png")
}

export default class CustomerAgentReviewScreen extends Component {
    
    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)

        this.state = {
            jobData : props.navigation.state.params.jobData.attributes,
            // jobCommentList : []
            jobCommentList : props.navigation.state.params.jobData && props.navigation.state.params.jobData.attributes && props.navigation.state.params.jobData.attributes.agent_rewiews && props.navigation.state.params.jobData.attributes.agent_rewiews.data || []
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        console.log("Response data-->"+JSON.stringify(this.state.jobData.agent_rewiews))
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
                        rating={data.attributes.qualification}
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
        var initials = this.state.jobData.customer && this.state.jobData.customer.first_name.charAt(0)
        initials +=  this.state.jobData.customer && this.state.jobData.customer.last_name.charAt(0)
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                    <View style={styles.profileView}>
                        {(this.state.jobData.customer && this.state.jobData.customer.avatar && this.state.jobData.customer.avatar.url) ?
                            <Image source={{ uri: this.state.jobData.customer.avatar.url }} style={styles.profileImage} resizeMode={"cover"} />
                            :
                            <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                                <Text style={{ color: '#fff' }}>{initials}</Text>
                            </View>
                        }
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
                        <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.jobData.customer.first_name + " "+this.state.jobData.customer.last_name}</Text>

                        <View style={styles.opinionsView}>
                            <StarRating
                                disabled={true}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_average}
                                starSize={20}
                                fullStarColor={'gray'}
                            />
                            <Text style={styles.opinionsText}>{this.state.jobData.property.data.attributes.customer.data.attributes.rewiews_count+" opiniones"}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            {(this.state.jobData.customer.email != null) ?
                            <View style={{flexDirection:'row'}}>
                                <View><MaterialCommunityIcons name={"email"} size={18} /></View>
                                <Text style={[styles.subText,{marginHorizontal:5}]}>{this.state.jobData.customer.email || ""}</Text>
                            </View> : null}
                            {(this.state.jobData.customer.cell_phone != null) ?
                            <View style={{flexDirection:'row'}}>
                                <View><MaterialCommunityIcons name={"credit-card-plus"} size={18} /></View>
                                <Text style={[styles.subText,{marginHorizontal:5}]}>{this.state.jobData.customer.cell_phone || ""}</Text> 
                            </View> : null}
                        </View>
                        
                    </View>
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Comentarios de otros Agentes"}</Text>
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