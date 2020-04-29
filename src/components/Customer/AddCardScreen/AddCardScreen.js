import React from 'react';
import { TouchableOpacity,Text,Image,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
import * as globals from '../../../util/globals';
import { View } from 'react-native-animatable';

import styles from './AddCardScreenStyle';
const { width } = Dimensions.get('window')
const IMAGES = {
  TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}

export default class AddCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
          <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, width: width }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>{"Agregar Tarjeta"}</Text>
          </View>
        </View>
        <WebView
          // javaScriptEnabled={true}
          // domStorageEnabled={true}
          source={{ uri: `https://hopeec-production.herokuapp.com/add_credit_card?email=${globals.email}&id=${globals.id}` }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("CardListScreen",{jobActualState:this.props.navigation.state.params.jobActualState})} style={styles.back_button}>
            <Text style={{ color: '#1F68A9', fontFamily: 'helvetica', fontSize: 20, fontWeight: 'bold' }}>{"REGRESAR"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}