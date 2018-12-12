import React, {Component} from 'react';
import {Text, View, FlatList, Image, Dimensions,SafeAreaView, AsyncStorage} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as globals from '../../../util/globals';
import StarRating from '../../../lib/react-native-star-rating';
const {width} = Dimensions.get('window')
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
      isLoading : true,
      data : [],
      userData : null,
      firstName : globals.first_name,
      lastName : globals.last_name,
      avatar : globals.avatar
    }
  }

  //======================================================================
  // componentDidMount
  //======================================================================

  componentDidMount(){
    AsyncStorage.getItem("customerData").then((item) =>{
      const data = JSON.parse(item)
      this.setState({userData : data})
    })
    API.getCustomerCommentsProfile(this.getAgentCommentsProfileResponse,{},true);
  }

  refresComments = () =>{
    API.getCustomerCommentsProfile(this.getAgentCommentsProfileResponse,{},true);
  }

  //======================================================================
  // getAgentCommentsProfileResponse
  //======================================================================

  getAgentCommentsProfileResponse = {
    success: (response) => {
      try {
        console.log("Response data-->"+JSON.stringify(response))
        response.review && response.review.data && this.setState({data : response.review.data})          
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

  renderItem = (itemData) =>{
    var data = itemData.item
    return (
      <View style={{flex:1,marginHorizontal:20}}>
        <View style={styles.textInputVieW}>
          <Text style={styles.textInputTitleText}>{data.attributes.my_reviews.data.attributes.reviewee_first_name + " "+ data.attributes.my_reviews.data.attributes.reviewee_last_name}</Text>
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
    // let item = itemData.item
    // let address =  item.attributes.p_street && item.attributes.p_street || '' + " "
    // address += item.attributes.s_street && item.attributes.s_street || '' + " "
    // address += item.attributes.number && item.attributes.number || '' + " "
    // address += item.attributes.neightborhood && item.attributes.neightborhood || '' + " "
    
    // return(
    //   <View style={{borderBottomColor:'lightgray',borderBottomWidth:1,paddingHorizontal:20}}>
    //     <View style={{flexDirection:'row',alignItems:'center'}}>
    //       <Entypo name={"home"} size={40}  />
    //       <Text style={{fontWeight:'900',fontSize:20,marginLeft:10}}>{item.attributes && item.attributes.name && item.attributes.name || ''}</Text>
    //     </View>
    //     <Text numberOfLines={2} style={{color:'gray',fontFamily : 'helvetica'}}>{address}</Text>
    //   </View>
    // )
  }
  
  // renderItem = (item) =>{
  //   var data = item.item
  //   return(
  //     <View style={styles.renderRowView}>
  //       <View style={{flexDirection:'row',alignItems:'center'}}>
  //         <View style={styles.userImageView} >
  //           {(data.attributes.owner.data.attributes.avatar.url != null)?
  //             <Image source={{uri : data.attributes.owner.data.attributes.avatar.url || ""}} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/> 
  //           :
  //           <Image source={require("../../../../assets/img/profile_placehoder.png")} style={styles.userImage} resizeMode={"cover"} defaultSource={require("../../../../assets/img/profile_placehoder.png")}/>}
  //         </View>
  //         <View style={{flex:1}}>
  //           <Text style={styles.titleText}>{data.attributes.owner.data.attributes.first_name + " "+ data.attributes.owner.data.attributes.last_name}</Text>
  //         </View>
  //         <StarRating
  //           disabled={true}
  //           emptyStar={'ios-star-outline'}
  //           fullStar={'ios-star'}
  //           halfStar={'ios-star-half'}
  //           iconSet={'Ionicons'}
  //           maxStars={5}
  //           rating={data.attributes.qualification || 0}
  //           starSize={18}
  //           fullStarColor={'gray'}/>
  //       </View>
  //       <Text style={styles.subText} numberOfLines={0}>{data.attributes.comment}</Text> 
  //     </View>
  //   )
  // }

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
    var initial = this.state.lastName && this.state.firstName.charAt(0)
    initial += this.state.firstName && this.state.lastName.charAt(0)
    var initials = initial
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
          <View style={styles.profileView}>
            {(this.state.avatar != null) ?
              <Image source={{ uri: this.state.avatar }} style={styles.profileImage} resizeMode={"cover"} />
              :
              <View style={[styles.profileImage, { backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }]} >
                <Text style={{ color: '#fff' }}>{initials}</Text>
              </View>
            }
          </View>
          <View style={{alignItems:'center',justifyContent:'center',marginVertical:10}}>
            <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " " + this.state.lastName}</Text>
          </View>
          <View style={styles.topTitleView}>
            <Text style={styles.mainTitleText}>{"Comentarios"}</Text>
          </View>
        </View>
        <FlatList 
          data = {this.state.data}
          renderItem = {this.renderItem}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item)=>item.id.toString()}
          ListEmptyComponent={this.ListEmptyComponent}
        />
      </SafeAreaView>
    )
  }
}