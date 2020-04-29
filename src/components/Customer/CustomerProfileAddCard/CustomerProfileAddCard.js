import React, {Component} from 'react';
import {Text, TouchableOpacity,Image,SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import * as globals from '../../../util/globals';
import { View } from 'react-native-animatable';

const styles = require('./CustomerProfileAddCardStyle');
const IMAGES = {TOP_BACKGROUND : require("../../../../assets/img/topbg.png")}

export default class CustomerProfileAddCard extends Component {
    
  //======================================================================
  // constructor
  //======================================================================

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  //======================================================================
  // render
  //======================================================================

  render(){
    var initials = globals.first_name && globals.first_name.charAt(0)
    initials +=  globals.last_name && globals.last_name.charAt(0)
    var initials = initials
    return(
      <SafeAreaView style={styles.container}>
        <View>
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
            <Text style={{fontSize:20,fontWeight:'600'}}>{globals.first_name} {globals.last_name}</Text>
          </View>
          <View style={styles.topTitleView}>
            <Text style={styles.mainTitleText}>{"Método de pago"}</Text>
          </View>
        </View> 
        <View style={{flex: 1}}>
          <WebView
            // javaScriptEnabled={true}
            // domStorageEnabled={true}
            source={{ uri: `https://hopeec-production.herokuapp.com/add_credit_card?email=${globals.email}&id=${globals.id}` }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomerProfileCardList")} style={styles.back_button}>
              <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"REGRESAR"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}