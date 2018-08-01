import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, Image, Dimensions,SafeAreaView,Alert,FlatList} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as globals from '../../util/globals';
import { API } from '../../util/api';
import AgentJobListScreen from '../AgentJobListScreen/AgentJobListScreen';

const styles = require('./AgentProfileStyles');

const IMAGES = {
    TOP_BACKGROUND : require("../../../assets/img/topbg.png")
}

export default class AgentProfile extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        this.state = {
            firstName : globals.first_name,
            lastName : globals.last_name,
            avatar : globals.avatar,
            isLoading : true
        }
    }

    //======================================================================
    // componentDidMount
    //======================================================================

    componentDidMount(){
        
    }

    setData = () =>{
        this.setState({
            firstName : globals.first_name,
            lastName : globals.last_name,
            avatar : globals.avatar,
        })
    }


    //======================================================================
    // renderItem
    //======================================================================

    renderItem = (item) =>{
        data = item.item
        return(
            <TouchableOpacity onPress={()=> (item.index == 0) ? this.props.navigation.navigate("AgentUpdateProfile",{setData : this.setData}) : this.props.navigation.navigate("AgentUpdatePassword",{})}>
                <View style={styles.renderRowView}>
                        <Text style={[styles.rowtitleText]}>{data.title}</Text>
                        <EvilIcons name={"chevron-right"} size={36} style={{color:"#1e67a9"}} />
                </View>
            </TouchableOpacity>
        )
    }

    //======================================================================
    // ItemSeparatorComponent
    //======================================================================

    ItemSeparatorComponent = () =>{
        return(
            <View style={{height:1,width:width,backgroundColor:'gray'}} />
        )
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () =>{
        return(
            <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
                <Text style={styles.emptyText}>{"No hay trabajos, regrese mas trade"}</Text>
            </View>
        )
    }

    //======================================================================
    // render
    //======================================================================
    
    render(){
      
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    {/* <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} /> */}
                    <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} resizeMode={"cover"} resizeMethod={"auto"}/>
                        <View style={styles.profileView}>
                            <TouchableOpacity disabled={true} onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                                {(this.state.avatar != "")?
                                 <Image source={{uri : this.state.jobData.customer.avatar.url}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>
                                 :
                                <Image source={require("../../../assets/img/profile_placehoder.png")} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={true} onPress={()=> this.props.navigation.navigate("AgentJobCommentScreen",{jobData : this.props.navigation.state.params.jobData})}>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                            </View>
                        </TouchableOpacity>
                    
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Perfil de Usuario Agente"}</Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <FlatList 
                        data = {[{title : "Mi cuenta",key : 'update_profile'},{title : "Contrasena",key : 'update_password'}]}
                        renderItem = {this.renderItem}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        keyExtractor={(index)=>index.toString()}
                        // keyExtractor={(item)=>item.id.toString()}
                        ListEmptyComponent={this.ListEmptyComponent}
                    />
                </View>

             
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AgentLogin")}>
                    <View style={[styles.bottomButton,{alignSelf:'auto',backgroundColor:'rgb(0,121,189)'}]}>
                        <Text style={[styles.titleText,{color:'#fff'}]}>{"Cerrar Sesion"}</Text>
                    </View>
                </TouchableOpacity>
                
            </SafeAreaView>
        )
    }
}