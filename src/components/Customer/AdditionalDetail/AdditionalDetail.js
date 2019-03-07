import React,{Component} from 'react';
import {Text,View,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './AdditionalDetailStyle';

export default class AdditionalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailText : ''            
    }
  }

  onPress = () =>{
    const {setAdditionalInfo} = this.props.navigation.state.params
    setAdditionalInfo(this.state.detailText)
    this.props.navigation.goBack()
  }
    
  render() {
    let { data, checked } = this.state;
    return (
      <View style={styles.container}>
        <View style ={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
          <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
          <Text style={{fontSize:24,fontFamily:'helvetica',color:'#2478AE',marginLeft:20}}>{"DETALLES ADICIONALES"}</Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={{flex:1}}>
            <TextInput
              ref={input => {
                this.textInput = input
              }}
              underlineColorAndroid='transparent'
              placeholder='Ingrese cualquier información adicional para este trabajo.'
              multiline= {true}
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({detailText : text})}
            />
          </View>
          <View style={{ marginVertical:10 }}>
            <TouchableOpacity onPress={this.onPress}>
              <View style={styles.buttonViewStyle}>
                <Text style={styles.buttonTextStyle}>{"Guardar"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}