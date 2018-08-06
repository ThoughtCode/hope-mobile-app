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
            isLoading : true,
            profilePhoto : null
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
            <TouchableOpacity onPress={()=> (item.index == 0) ? this.props.navigation.navigate("AgentUpdateProfile",{setData : this.setData,updatePhoto : this.updatePhoto}) : this.props.navigation.navigate("AgentUpdatePassword",{})}>
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

    selectedPhoto = () => {
        //Open Image Picker
    
        const options = {
            quality: 0.8,
            maxWidth: 500,
            maxHeight: 500,
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else {
                let source = { uri: response.uri };
                this.setState({
                    profilePhoto: source
                });
            }
        });
    }

   updatePhoto = () =>{
       this.setState({avatar : globals.avatar})
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
                            {(this.state.avatar != "")?
                                <Image source={{uri : this.state.avatar +'?time=' + new Date()}} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>
                                :
                            //  <View style={{backgroundColor:"rgba(99,99,99,0.7)"}}>
                            <TouchableOpacity onPress={() => this.selectedPhoto}>
                                <Image source={require("../../../assets/img/profile_placehoder.png")} style={styles.profileImage} resizeMode={"cover"} defaultSource={require("../../../assets/img/profile_placehoder.png")}/>
                            </TouchableOpacity>}
                        </View>
                        
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>{this.state.firstName + " "+ this.state.lastName}</Text>
                        </View>
                        
                    
                    <View style={styles.topTitleView}>
                        <Text style={styles.mainTitleText}>{"Perfil de Agente"}</Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <FlatList 
                        data = {[{title : "Mi cuenta",key : 'update_profile'},{title : "Contrasena",key : 'update_password'}]}
                        renderItem = {this.renderItem}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        keyExtractor={(item)=>item.key.toString()}
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